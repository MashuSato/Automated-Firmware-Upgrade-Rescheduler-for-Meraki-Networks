function updateCurrentUpgradeDate() {
    const { apiKey } = getCredentials(); // Retrieve only the API key
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const scheduleExecutionSheet = spreadsheet.getSheetByName("ScheduleExecution");
    const confirmationSheet = spreadsheet.getSheetByName("Confirmation");
  
    // Retrieve data from the ScheduleExecution tab
    const scheduleData = scheduleExecutionSheet.getDataRange().getValues();
  
    // Base URL for the API
    const apiUrlBase = "https://api.meraki.com/api/v1/networks";
  
    // Process the data to be updated
    for (let i = 1; i < scheduleData.length; i++) { // Skip the header row
      const networkId = scheduleData[i][1]; // Network ID (Column B)
      const networkName = scheduleData[i][0]; // Network Name (Column A)
      const submittedDateTime = scheduleData[i][3]; // Submitted DateTime (Column D)
      const confirmationRow = i + 1; // Row number in the Confirmation tab
  
      // Skip if the network ID is empty
      if (!networkId) {
        Logger.log(`Skipped: Network ID is empty (Row: ${i + 1})`);
        continue;
      }
  
      // API request URL
      const apiUrl = `${apiUrlBase}/${networkId}/firmwareUpgrades`;
  
      // API request options
      const options = {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Cisco-Meraki-API-Key': apiKey
        }
      };
  
      try {
        // Send the API request
        Logger.log(`Sending API request (Network ID: ${networkId})`);
        const response = UrlFetchApp.fetch(apiUrl, options);
        const responseData = JSON.parse(response.getContentText());
  
        // Check the selected product category in the UpgradeInfo tab
        const upgradeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UpgradeInfo");
        const selectedProductType = upgradeSheet.getRange("K5").getValue().toLowerCase(); // Cell K5 (Selected Product Type)
  
        if (!responseData.products[selectedProductType]) {
          Logger.log(`Skipped: Product category ${selectedProductType} not found (Network ID: ${networkId})`);
          continue;
        }
  
        const productInfo = responseData.products[selectedProductType];
  
        // Retrieve nextUpgrade.time
        const nextUpgradeTime = productInfo.nextUpgrade?.time || "No Upgrade Scheduled"; // Default value
        const upgradeToVersion = productInfo.nextUpgrade?.toVersion?.firmware || "N/A";
        const currentVersion = productInfo.currentVersion?.firmware || "N/A";
  
        if (!nextUpgradeTime || nextUpgradeTime === "No Upgrade Scheduled") {
          Logger.log(`Warning: nextUpgrade.time not found (Network ID: ${networkId}). Default value is set.`);
        }
  
        // Update the Confirmation tab
        Logger.log(`Preparing to write: Network Name: ${networkName}, Network ID: ${networkId}, Current Upgrade Date: ${nextUpgradeTime}, Submitted DateTime: ${submittedDateTime}, Upgrade To Version: ${upgradeToVersion}, ProductType: ${selectedProductType}, Current Version: ${currentVersion}`);
        
        confirmationSheet.getRange(confirmationRow, 1).setValue(networkName); // Column A (Network Name)
        confirmationSheet.getRange(confirmationRow, 2).setValue(networkId); // Column B (Network ID)
        confirmationSheet.getRange(confirmationRow, 3).setValue(nextUpgradeTime); // Column C (Current Upgrade Date)
        confirmationSheet.getRange(confirmationRow, 4).setValue(submittedDateTime); // Column D (Submitted DateTime)
        confirmationSheet.getRange(confirmationRow, 5).setValue(selectedProductType); // Column E (Product Type)
        confirmationSheet.getRange(confirmationRow, 6).setValue(currentVersion); // Column F (Current Version)
        confirmationSheet.getRange(confirmationRow, 7).setValue(upgradeToVersion); // Column G (Upgrade To Version)
  
        // Calculate the Rescheduled? column
        const rescheduledStatus = nextUpgradeTime === submittedDateTime ? "Successful" : "Failed";
        const statusCell = confirmationSheet.getRange(confirmationRow, 8); // Column H (Rescheduled?)
        statusCell.setValue(rescheduledStatus);
  
        // Set the font color
        if (rescheduledStatus === "Successful") {
          statusCell.setFontColor("#5DAB47"); // Green
        } else {
          statusCell.setFontColor("#E9662E"); // Red
        }
  
        Logger.log(`Successfully updated: Confirmation tab (Network ID: ${networkId}, Row: ${confirmationRow})`);
  
      } catch (error) {
        Logger.log(`Error (Network ID: ${networkId}): ${error.message}`);
      }
    }
  
    Logger.log("The Confirmation tab has been updated.");
  }