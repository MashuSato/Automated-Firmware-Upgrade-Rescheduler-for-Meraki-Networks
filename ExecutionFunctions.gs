function rescheduleFirmwareUpgrades() {
    const { apiKey } = getCredentials(); // Retrieve only the API key
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ScheduleExecution");
    const data = sheet.getDataRange().getValues();
  
    data.forEach((row, index) => {
      if (index === 0) return; // Skip the header row
  
      const networkId = row[1];
      const formattedDateTime = row[3];
      const productType = row[4];
  
      const url = `https://api.meraki.com/api/v1/networks/${networkId}/firmwareUpgrades`;
  
      const payload = {
        products: {
          [productType]: {
            nextUpgrade: {
              time: formattedDateTime,
            },
          },
        },
      };
  
      const options = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'X-Cisco-Meraki-API-Key': apiKey,
        },
        payload: JSON.stringify(payload),
      };
  
      try {
        const response = UrlFetchApp.fetch(url, options);
        sheet.getRange(index + 1, 8).setValue("Success");
      } catch (e) {
        sheet.getRange(index + 1, 8).setValue("Failed");
      }
    });
  }