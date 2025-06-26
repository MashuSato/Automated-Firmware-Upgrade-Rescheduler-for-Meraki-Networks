# Automated-Firmware-Upgrade-Rescheduler-for-Meraki-Networks
A versatile tool designed to simplify firmware upgrade rescheduling for Meraki networks. By combining Google Sheets, Forms, and the Meraki API, this tool empowers branch managers to submit their preferences while reducing the workload for IT administrators managing large-scale network environments.



https://github.com/user-attachments/assets/91cc2bef-2ef3-450a-b35b-8a35b2faadd4



<h1><strong>Meraki Firmware Upgrade Management Tool</strong></h1>

<h2><strong>About the Tool</strong></h2>

<h3><strong>Why This Tool Was Created</strong></h3>
<p>Managing firmware upgrades for large-scale network environments often presents significant challenges.<br>
This tool was developed to address specific issues faced by organizations managing hundreds of networks under a single template.</p>
<p>By leveraging automation and user-friendly workflows, the tool simplifies the process of scheduling and managing firmware upgrades across multiple networks.</p>

<hr>

<h3><strong>Challenges</strong></h3>
<ol>
  <li><strong>Hundreds of Networks per Template</strong><br>
      In many cases, a single template may have hundreds of networks associated with it. Upgrading firmware for all networks under the same template at once is often not feasible due to varying operational requirements across locations.<br>
      Although Meraki’s UI allows for rescheduling upgrade dates on a per-network basis, manually adjusting dates for hundreds of networks is time-consuming and impractical.
  </li>
  <li><strong>Different Maintenance Windows Across Locations</strong><br>
      Each location (e.g., individual stores or branches) has different operating hours, making it challenging for IT administrators to manually coordinate and manage upgrade schedules for all networks.<br>
      IT teams often lack the visibility into local schedules, further complicating the process.
  </li>
  <li><strong>Inconsistent Date and Time Formats</strong><br>
      When relying on manual input, there is often inconsistency in how dates and times are entered (e.g., <code>2025/06/11</code>, <code>2025-06-11</code>, or <code>June 11, 2025</code>). This can lead to errors in scheduling and wasted time verifying the data.
  </li>
  <li><strong>IT Centralized Management Overload</strong><br>
      The responsibility for managing firmware upgrades typically falls on the central IT team. However, IT administrators may not have the necessary insights into local conditions, such as peak business hours or specific maintenance windows for each location.<br>
      Without local input, it is challenging to create an effective and efficient upgrade schedule.
  </li>
</ol>

<hr>

<h3><strong>How This Tool Solves These Challenges</strong></h3>
<ol>
  <li><strong>Automated Scheduling with Per-Network Control</strong><br>
      This tool allows users to schedule firmware upgrades for individual networks using the Meraki API. Instead of relying on the Meraki UI, the tool automates the process of adjusting upgrade dates for each network, saving time and reducing manual effort.
  </li>
  <li><strong>Decentralized Scheduling by Store Managers</strong><br>
      Rather than relying solely on IT administrators, this tool enables local store managers to specify their preferred upgrade dates and times through a simple Google Form. This decentralization empowers local teams to have control over their schedules while reducing the workload on central IT.
  </li>
  <li><strong>Standardized Date and Time Input</strong><br>
      To avoid inconsistencies in how dates and times are entered, the tool provides a dropdown-based interface for selecting dates and times. This ensures that all inputs are standardized and compatible with the Meraki API’s required format (e.g., <code>2025-06-11T01:00:00Z</code>).
  </li>
  <li><strong>Streamlined Management Across Hundreds of Networks</strong><br>
      By automating the scheduling process and integrating store manager inputs, the tool enables efficient management of firmware upgrades for hundreds of networks. IT administrators can review the consolidated schedules and execute them with minimal effort.
  </li>
  <li><strong>Support for Predefined Default Scheduling</strong><br>
      The tool supports scenarios where an initial upgrade schedule is set manually (e.g., 30 days in the future) for all networks. Managers can then use the tool to make adjustments to individual networks as needed, ensuring flexibility and accuracy.
  </li>
</ol>

<hr>

<h3><strong>Key Benefits</strong></h3>
<ul>
  <li><strong>Time Savings</strong>: Automates the scheduling process, reducing the need for IT administrators to manually manage hundreds of networks.</li>
  <li><strong>Improved Accuracy</strong>: Standardizes date and time inputs, minimizing errors and inconsistencies.</li>
  <li><strong>Decentralized Control</strong>: Empowers local managers to make informed scheduling decisions based on their specific operational needs.</li>
  <li><strong>Scalability</strong>: Handles large-scale network environments with ease, enabling efficient management of hundreds of networks under a single template.</li>
  <li><strong>Flexibility</strong>: Supports both centralized and decentralized scheduling workflows, catering to the unique needs of different organizations.</li>
</ul>

<hr>

<h3><strong>Conclusion</strong></h3>
<p>This tool bridges the gap between centralized IT management and local operational needs. By automating the scheduling process and incorporating inputs from local managers, it provides a scalable, accurate, and user-friendly solution for managing firmware upgrades across large-scale networks.</p>

<hr>




## **Prerequisites (IMPORTANT)**

Before using this tool, please ensure you complete the following steps:

1.  **Copy this Google Spreadsheet**
    Click on the link below to make a copy of this spreadsheet to your Google Drive.
    
    [**Click here to make a copy of the Google Spreadsheet**](https://docs.google.com/spreadsheets/d/1ciOF8IqBuITHDi4BEXk0RNRtJ5KCfdIN5VD_QaGGacQ/copy)
    
    *(Alternatively, you can open the [spreadsheet](https://docs.google.com/spreadsheets/d/1ciOF8IqBuITHDi4BEXk0RNRtJ5KCfdIN5VD_QaGGacQ/edit?usp=sharing)　and go to `File > Make a copy`)*

    **Important Note:** When you make a copy of this Google Spreadsheet using the link above, all associated Apps Script functions (`.gs` files) are automatically copied with it. Therefore, there is no need to download separate `.gs` files from this repository or download the spreadsheet as an Excel file.

 **If you were to download this file as an Excel spreadsheet, please be aware that it is NOT recommended.** Doing so will break the embedded Apps Script functionality. If you were to proceed with an Excel file, you would then need to:
    *   Upload the Excel file to Google Drive.
    *   Convert it to Google Spreadsheet format.
    *   Open the Apps Script editor (`Extensions > Apps Script`).
    *   Manually create all `.gs` files and copy-paste the script code from this GitHub repository into them.
    *   Re-assign the functions to the buttons (drawing objects) on the spreadsheet.
    For these reasons, it is highly recommended to use the 'Make a copy' link provided above for a seamless setup.
    


2.  **Set up the linked Google Form**
    After making a copy of the spreadsheet, a linked Google Form will also be copied automatically. To access the form:
    *   Go to the **FormResponses** tab.
    *   Click on `Form > Go to live form` in the menu bar.
    *   This will open the copied Google Form in a new tab.
    Verify that the form is linked to your copied spreadsheet by submitting a test response. The response should appear in the **FormResponses** tab of your spreadsheet.

3.  **Copy the Google Form ID**
    While viewing the copied Google Form, locate the **Form ID** in the URL. The Form ID is the long string of characters in the form's URL:
    `https://docs.google.com/forms/d/<FORM_ID>/edit`

4.  **Update the App Script with your Google Form ID**
    Open the copied spreadsheet.
    Navigate to `Extensions > Apps Script` in the menu bar.
    In the Apps Script editor, locate the `FormFunctions.gs` file.
    Replace `"YOUR_FORM_ID_HERE"` with the Form ID you copied in step 3.
    Example:
    `const form = FormApp.openById("1r83rprhTBb-SFDEVtApRt41zaMKN_NgMzYQIKLKIpNY");`
    Save the script by clicking the **Save** icon.
    
## **Setup**

### **Process Overview**

This tool follows a step-by-step process across multiple tabs in the spreadsheet:

1. **NetworkMappings Tab**  
   - Filter networks by name and retrieve relevant network details from the Meraki API.

2. **FormResponses Tab**  
   - Populate a Google Form with a list of networks for scheduling purposes.  
   - Collect user-submitted scheduling preferences via the form.

3. **UpgradeInfo Tab**  
   - Select a product category (e.g., appliance, switch).  
   - Merge network data and user-submitted preferences.  
   - Format scheduling data for compatibility with the Meraki API.

4. **ScheduleExecution Tab**  
   - Review the final list of networks and scheduling data.  
   - Execute the firmware upgrade rescheduling process.

5. **Confirmation Tab**  
   - Verify that the submitted scheduling preferences match the current scheduling status in Meraki.

---

## **Step-by-Step Instructions**

### **Step 1: Network Filtering**  
**Purpose**: Retrieve and filter networks by name from the Meraki API.  

**Instructions**:  
1. Navigate to the **NetworkMappings** tab.  
2. Enter a network name or keyword in the search bar (cell B1).  
3. Click the **Filter Networks** button.  
4. **Result**: The table below will be populated with networks matching the keyword, including their names, IDs, and time zones.  

**Why filter with a keyword?**  
Without filtering, all networks under the organization ID will appear here, and currently, there are no API endpoints to filter networks by template ID. The best practice is to include a consistent keyword in the names of networks bound to a specific template. This makes it easier to filter and identify them quickly.

---

### **Step 2: Populate Form for Scheduling**  
**Purpose**: Populate a Google Form with a list of networks for scheduling purposes.  

**Instructions**:  
1. Navigate to the **FormResponses** tab.  
2. Click the **Update Form Options** button.  
3. **Result**: The Google Form will be updated with a dropdown menu containing the list of networks for selection.

---

### **Step 3: Collect User Preferences**  
**Purpose**: Gather scheduling preferences (date and time) from users via the Google Form.  

**Instructions**:  
1. Share the Google Form with users.  
2. Collect responses from users, which will appear automatically in the **FormResponses** tab.  
3. If necessary, use the **Clear Form Responses** button to reset the form responses.

---

### **Step 4: Merge Data and Format Scheduling Information**  
**Purpose**: Merge network data and user-submitted preferences, and format the scheduling information for Meraki API compatibility.  

**Instructions**:  
1. Navigate to the **UpgradeInfo** tab.  
2. Select a product category (e.g., appliance) from the dropdown menu in cell K5.  
3. Click the **Filter and Format Data** button.  
4. **Result**: The tab will display a formatted list of networks, scheduling data, and upgrade versions.

---

### **Step 5: Finalize Scheduling**  
**Purpose**: Prepare the finalized list of scheduling data for execution.  

**Instructions**:  
1. In the **UpgradeInfo** tab, review the data to ensure correctness.  
2. Click the **Move to Schedule Execution** button to transfer the finalized data to the **ScheduleExecution** tab.

---

### **Step 6: Execute Scheduling**  
**Purpose**: Apply the scheduling data to the Meraki API.  

**Instructions**:  
1. Navigate to the **ScheduleExecution** tab.  
2. Review the final list of networks, upgrade versions, and scheduling times.  
3. Click the **Execute Rescheduling** button to apply the changes via the Meraki API.  
4. **Result**: The scheduling process will be executed, and the status of each operation will be displayed in the **Status** column.

---

### **Step 7: Verify Scheduling**  
**Purpose**: Verify that the submitted scheduling preferences were successfully applied.  

**Instructions**:  
1. Navigate to the **Confirmation** tab.  
2. Click the **Verify Scheduling** button to check the current scheduling status in Meraki.  
3. **Result**: The tool will compare the current scheduling status with the submitted preferences and display the results in the tab.

---

## **Notes**

- The tool requires a valid API Key and OrgID to function correctly.  
- Ensure that the Google Form is configured correctly with a dropdown question for network selection.
