function fetchNetworks() {
    const { organizationId, apiKey } = getCredentials(); // Retrieve values from the GettingStarted tab
    const url = `https://api.meraki.com/api/v1/organizations/${organizationId}/networks`;
  
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Cisco-Meraki-API-Key': apiKey,
      },
    };
  
    const response = UrlFetchApp.fetch(url, options);
    const networks = JSON.parse(response.getContentText());
  
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NetworkMappings");
    const searchKeyword = sheet.getRange("B1").getValue().toLowerCase(); // Search keyword from the input box
  
    // Clear existing data (keep the header)
    sheet.getRange("A3:C").clearContent();
  
    networks.forEach(network => {
      const networkName = network.name.toLowerCase();
      if (networkName.includes(searchKeyword)) {
        sheet.appendRow([network.name, network.id, network.timeZone]);
      }
    });
  }