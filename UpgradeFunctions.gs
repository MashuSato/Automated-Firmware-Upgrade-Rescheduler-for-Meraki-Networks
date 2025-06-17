function fetchFilteredUpgradeInfo() {
    const { organizationId, apiKey } = getCredentials(); // Retrieve values from the GettingStarted tab
    const url = `https://api.meraki.com/api/v1/organizations/${organizationId}/networks`;
  
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Cisco-Meraki-API-Key': apiKey,
      },
    };
  
    // Fetch network information from the Meraki API
    const response = UrlFetchApp.fetch(url, options);
    const networks = JSON.parse(response.getContentText());
  
    // Retrieve filtered network names from the NetworkMappings tab
    const mappingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NetworkMappings");
    const filteredNetworkNames = mappingsSheet.getRange(3, 1, mappingsSheet.getLastRow() - 2, 1).getValues().flat(); // Column A (Network Names)
  
    // Retrieve form response data from the FormResponses tab
    const responsesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FormResponses");
    const formResponses = responsesSheet.getDataRange().getValues();
    const formResponseNames = formResponses.map(row => row[1]); // Store names from column B
  
    Logger.log(`Filtered network names: ${JSON.stringify(filteredNetworkNames)}`);
    Logger.log(`Form response store names: ${JSON.stringify(formResponseNames)}`);
  
    // Retrieve the selected product type from cell K5
    const upgradeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UpgradeInfo");
    const selectedProductType = upgradeSheet.getRange("K5").getValue().toLowerCase(); // Selected product type
  
    if (!selectedProductType) {
      Logger.log("Error: No product type selected in cell K5.");
      return;
    }
  
    Logger.log(`Selected product type: ${selectedProductType}`);
  
    // Initialize the UpgradeInfo tab
    if (upgradeSheet.getLastRow() > 1) {
      upgradeSheet.getRange(2, 1, upgradeSheet.getLastRow() - 1, 10).clearContent();
    }
    upgradeSheet.getRange(1, 1, 1, 9).setValues([["Network Name", "Network ID", "Original Upgrade Date", "Date", "Time", "Formatted DateTime", "Product Type", "Current Version", "Upgrade To Version"]]);
  
    const outputData = []; // Temporary storage for data to be written
  
    networks.forEach(network => {
      const networkId = network.id;
      const networkName = network.name;
  
      // Skip if the network is not in both NetworkMappings and FormResponses tabs
      if (!filteredNetworkNames.includes(networkName) || !formResponseNames.includes(networkName)) {
        Logger.log(`Skipped: Network ${networkName} (${networkId}) is not included.`);
        return;
      }
  
      // API call to retrieve product information for each network
      const productUrl = `https://api.meraki.com/api/v1/networks/${networkId}/firmwareUpgrades`;
      const productResponse = UrlFetchApp.fetch(productUrl, options);
      const productData = JSON.parse(productResponse.getContentText());
  
      if (!productData.products[selectedProductType]) {
        Logger.log(`Skipped: Product type ${selectedProductType} not found for network ${networkName} (${networkId}).`);
        return;
      }
  
      const productInfo = productData.products[selectedProductType];
      const currentVersion = productInfo.currentVersion?.firmware || "N/A";
      const upgradeToVersion = productInfo.nextUpgrade?.toVersion?.firmware || "N/A";
      const originalUpgradeTime = productInfo.nextUpgrade?.time || "";
      const formattedOriginalDateTime = originalUpgradeTime
        ? Utilities.formatDate(new Date(originalUpgradeTime), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss'Z'")
        : "";
  
      // Retrieve the preferred upgrade date and time from form responses
      const formResponse = formResponses.find(row => row[1] === networkName); // Find the matching store name
      let requestedDate = formResponse ? formResponse[2] : ""; // Preferred upgrade date
      let requestedTime = formResponse ? formResponse[3] : ""; // Preferred upgrade time
  
      // Format the date and time
      if (requestedDate instanceof Date) {
        requestedDate = Utilities.formatDate(requestedDate, Session.getScriptTimeZone(), "yyyy-MM-dd");
      }
      if (requestedTime instanceof Date) {
        requestedTime = Utilities.formatDate(requestedTime, Session.getScriptTimeZone(), "HH:mm:ss");
      }
  
      // Format the preferred upgrade datetime in ISO format
      let formattedRequestedDateTime = "";
      if (requestedDate && requestedTime) {
        const requestedDateTime = new Date(`${requestedDate}T${requestedTime}Z`);
        if (!isNaN(requestedDateTime.getTime())) {
          formattedRequestedDateTime = Utilities.formatDate(requestedDateTime, "UTC", "yyyy-MM-dd'T'HH:mm:ss'Z'");
        } else {
          Logger.log(`Invalid DateTime: ${requestedDate} ${requestedTime}`);
        }
      }
  
      Logger.log(`Processing: ${networkName}, Current Version: ${currentVersion}, Upgrade To Version: ${upgradeToVersion}, Date: ${requestedDate}, Time: ${requestedTime}, Formatted DateTime: ${formattedRequestedDateTime}`);
  
      // Add data to the output array
      outputData.push([
        networkName, // Network Name
        networkId, // Network ID
        formattedOriginalDateTime, // Original Upgrade Date
        requestedDate, // Date
        requestedTime, // Time
        formattedRequestedDateTime, // Formatted DateTime
        selectedProductType, // Product Type
        currentVersion, // Current Version
        upgradeToVersion, // Upgrade To Version
      ]);
    });
  
    // Write data to the UpgradeInfo tab
    if (outputData.length > 0)  {
      upgradeSheet.getRange(2, 1, outputData.length, outputData[0].length).setValues(outputData);
    }
  
    Logger.log("Finished writing to the UpgradeInfo tab.");
  }