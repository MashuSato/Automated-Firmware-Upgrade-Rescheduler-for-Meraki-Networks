function updateFormOptions() {
    const form = FormApp.openById("1r83rprhTBb-SFDEVtApRt41zaMKN_NgMzYQIKLKIpNY"); // Specify the Google Form ID
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NetworkMappings");
  
    // Retrieve the list of network names and keep only unique values
    const networks = sheet.getRange(3, 1, sheet.getLastRow() - 2, 1).getValues().flat(); // Get the list of network names
    const uniqueNetworks = [...new Set(networks)]; // Remove duplicates
  
    // Retrieve the dropdown question from the Google Form
    const item = form.getItems(FormApp.ItemType.LIST)[0].asListItem(); // Get the dropdown question
    item.setChoiceValues(uniqueNetworks); // Set the dropdown options with unique network names
  }