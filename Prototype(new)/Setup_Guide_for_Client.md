# ASLS Booking System - Setup Guide

## Quick Setup (15-20 minutes)

This guide will help you connect your booking form to Google Sheets so all enquiries are automatically saved.

Because the website has **three separate venues**, each venue routes its enquiries to its **own dedicated Google Sheet**. This means you will complete the setup process **three times** — once per venue — using the same steps and the same script code each time.

**At the end of this guide you will have:**
- ✅ 3 Google Sheets (one per venue)
- ✅ 3 Apps Scripts (one per Sheet, identical code)
- ✅ 3 deployment URLs (one per Script, pasted into `chatbot.js`)

---

## What You'll Need
- A Google account
- The updated `chatbot.js` file
- 15–20 minutes (about 5–7 minutes per venue)

---

## Naming Reference (You can set any names you want)

Use these names throughout the setup to stay organised:

| Venue | Google Sheet Name | Apps Script Name |
|-------|-------------------|------------------|
| The Island | ASLS Bookings – The Island | ASLS Booking Handler – Island |
| Arts Mansion | ASLS Bookings – Arts Mansion | ASLS Booking Handler – Mansion |
| Sparks Bristol | ASLS Bookings – Sparks Bristol | ASLS Booking Handler – Sparks |

---

## Step 1: Create Three Google Sheets

Repeat the following **for each of the three venues**:

1. Go to https://sheets.google.com
2. Click **+ Blank** to create a new sheet
3. Name it using the names from the table above (e.g. **ASLS Bookings – The Island**)
4. Add these headers in Row 1:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|----|----|----|----|----|----|----|-----|
| Timestamp | Name | Email | Venue | Event Type | Attendees | Preferred Date | Message |

> ⚠️ **Important:** The column headers must be in exactly this order. The script reads them by position.

---

## Step 2: Add the Apps Script (Repeat for Each Sheet)

Do the following **inside each of your three Google Sheets**:

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code — it is **identical for all three sheets**:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.venue,
      data.eventType,
      data.attendees,
      data.preferredDate,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Booking saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾)
5. Name the project using the names from the table above (e.g. **ASLS Booking Handler – Island**)

---

## Step 3: Deploy Each Script as a Web App

Still inside Apps Script **for each sheet**:

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Configure:
   - **Description:** use the sheet name (e.g. ASLS Bookings – The Island)
   - **Execute as:** Me
   - **Who has access:** **Anyone** ⚠️ (IMPORTANT — must be set to Anyone or the form will not work)
4. Click **Deploy**

---

## Step 4: Authorise Each Deployment

Google will ask for permission the first time you deploy each script. This is normal and safe.

1. Click **Review permissions**
2. Choose your Google account
3. Click **Advanced** → **Go to [project name]**
   - *This warning is normal for custom scripts*
4. Click **Allow**

> ℹ️ **Note:** You will need to go through this authorisation process once for each of the three scripts.

---

## Step 5: Copy Your Three URLs

After deploying each script you will see a **Web App URL** like:

```
https://script.google.com/macros/s/AKfycbz...../exec
```

1. Click the **Copy** button 📋
2. **Save each URL somewhere safe** (e.g. a notes app or text file) before moving on
3. Label each URL clearly so you know which venue it belongs to

> 📌 **Tip:** Do not close the deployment window until you have copied and saved the URL.

---

## Step 6: Update `chatbot.js`

1. Open `chatbot.js` in a text editor (Notepad, VS Code, etc.)
2. Find the `VENUE_SHEETS_URLS` block near the top of the file (around line 8)
3. Replace each placeholder with the matching URL you saved in Step 5

**Before:**
```javascript
const VENUE_SHEETS_URLS = {
    'the-island':    'PASTE_THE_ISLAND_EXEC_URL_HERE',
    'arts-mansion':  'PASTE_ARTS_MANSION_EXEC_URL_HERE',
    'sparks-bristol':'PASTE_SPARKS_BRISTOL_EXEC_URL_HERE'
};
```

**After:**
```javascript
const VENUE_SHEETS_URLS = {
    'the-island':    'https://script.google.com/macros/s/YOUR_ISLAND_URL/exec',
    'arts-mansion':  'https://script.google.com/macros/s/YOUR_MANSION_URL/exec',
    'sparks-bristol':'https://script.google.com/macros/s/YOUR_SPARKS_URL/exec'
};
```

4. Save the file

---

## Step 7: Test All Three Venues

1. Open `Enquire.html` in your browser
2. Fill out the booking form and select **The Island** as the venue
3. Click **Submit Enquiry**
4. Check **ASLS Bookings – The Island** — a new row should appear ✅
5. Repeat the test for **Arts Mansion** and **Sparks Bristol**

---

## ✅ You're Done!

Your booking system is now live. Every enquiry will automatically be saved to the correct venue's Google Sheet.

---

## Managing Bookings

**To view bookings:**
- Go to https://sheets.google.com
- Open the sheet for the relevant venue

**To share with your team:**
- Each sheet can be shared independently with different venue managers
- Click **Share** in Google Sheets and add team members' email addresses

**To export:**
- File → Download → CSV or Excel

---

## Troubleshooting

**Problem: No bookings appearing in a sheet**
- Check that "Who has access" is set to **Anyone** for that venue's deployment (Step 3)
- Verify the correct URL is pasted for that venue's key in `chatbot.js` (Step 6)
- Make sure the venue dropdown in the form is selecting the right option

**Problem: A venue shows a configuration warning**
- If you see a warning saying *"Google Sheets is not configured for [venue]"*, the placeholder text has not been replaced in `VENUE_SHEETS_URLS` — go back to Step 6 for that venue

**Problem: Can't find a deployment URL**
- Apps Script → Deploy → Manage deployments → Copy URL from the relevant deployment

**Need to update a script after changes?**
- Make your changes in Apps Script
- Deploy → Manage deployments → Edit → New version → Deploy
- The URL stays the same, so no changes to `chatbot.js` are needed

---

## Support

If you encounter any issues:
1. Review the steps above
2. Check the Troubleshooting section
3. Ensure all steps were completed exactly as written

For any other issues with the website or booking system, contact us.

---

*Your booking data is automatically backed up by Google and accessible from any device.*