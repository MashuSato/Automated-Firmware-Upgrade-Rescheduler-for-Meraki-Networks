function resetFormResponses() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const formResponsesSheet = spreadsheet.getSheetByName("FormResponses");
  
    if (!formResponsesSheet) {
      Logger.log("Error: The 'FormResponses' tab was not found.");
      return;
    }
  
    // Get the full data range of the sheet
    const lastRow = formResponsesSheet.getLastRow();
  
    // If the sheet only contains the header row, do nothing
    if (lastRow <= 1) {
      Logger.log("The 'FormResponses' tab has no response data. Reset is not needed.");
      return;
    }
  
    // Delete data from the second row onward
    formResponsesSheet.deleteRows(2, lastRow - 1);
    Logger.log(`The response data in the 'FormResponses' tab has been reset (${lastRow - 1} rows deleted).`);
  }