function getCredentials() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GettingStarted");
  if (!sheet) {
    throw new Error("The 'GettingStarted' tab is missing.");
  }
  const organizationId = sheet.getRange("B1").getValue(); // Organization ID
  const apiKey = sheet.getRange("B2").getValue(); // API Key

  if (!organizationId || !apiKey) {
    throw new Error("The values in cells B1 (Organization ID) or B2 (API Key) are missing in the 'GettingStarted' tab.");
  }

  return { organizationId, apiKey };
}