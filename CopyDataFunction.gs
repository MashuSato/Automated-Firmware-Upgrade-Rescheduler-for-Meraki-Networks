function moveToScheduleExecution() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const upgradeInfoSheet = spreadsheet.getSheetByName("UpgradeInfo");
    const scheduleExecutionSheet = spreadsheet.getSheetByName("ScheduleExecution");
  
    // Retrieve data from the UpgradeInfo tab
    const data = upgradeInfoSheet.getRange(2, 1, upgradeInfoSheet.getLastRow() - 1, 9).getValues(); // Columns A to I (Network Name to Upgrade To Version)
  
    // Clear the ScheduleExecution tab and set the header
    scheduleExecutionSheet.clear(); // Clear all data
    scheduleExecutionSheet.appendRow(["Network Name", "Network ID", "Original Upgrade Date", "Formatted DateTime", "ProductType", "Current Version", "Upgrade To Version", "Status"]);
  
    // Format and copy data
    const outputData = data.map(row => {
      const networkName = row[0]; // Network Name
      const networkId = row[1]; // Network ID
      const originalUpgradeDate = row[2]; // Original Upgrade Date
      const formattedDateTime = row[5]; // Formatted DateTime (Column F in UpgradeInfo tab)
      const productType = row[6]; // ProductType
      const currentVersion = row[7]; // Current Version
      const upgradeToVersion = row[8]; // Upgrade To Version
  
      return [networkName, networkId, originalUpgradeDate, formattedDateTime, productType, currentVersion, upgradeToVersion, ""]; // Status column is left blank
    });
  
    // Write data to the ScheduleExecution tab
    if (outputData.length > 0) {
      scheduleExecutionSheet.getRange(2, 1, outputData.length, outputData[0].length).setValues(outputData);
    }
  
    Logger.log("Data has been copied from UpgradeInfo to ScheduleExecution.");
  }