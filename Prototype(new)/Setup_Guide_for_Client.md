# ASLS Booking System - Setup Guide

## Quick Setup (5-10 minutes)

This guide will help you connect your booking form to Google Sheets so all bookings are automatically saved.

---

## What You'll Need
- A Google account
- The `chatbot.js` file
- 10 minutes

---

## Step 1: Create Your Google Sheet

1. Go to https://sheets.google.com
2. Click **+ Blank** to create a new sheet
3. Name it: **ASLS Bookings**
4. Add these headers in Row 1:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|----|----|----|----|----|----|----|-----|
| Timestamp | Name | Email | Venue | Event Type | Attendees | Preferred Date | Message |

---

## Step 2: Add the Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

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
5. Name the project: **ASLS Booking Handler**

---

## Step 3: Deploy the Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Configure:
   - **Description:** ASLS Booking System
   - **Execute as:** Me
   - **Who has access:** **Anyone** ⚠️ (IMPORTANT!)
4. Click **Deploy**

---

## Step 4: Authorize

Google will ask for authorization (this is normal):

1. Click **Review permissions**
2. Choose your Google account
3. Click **Advanced** → **Go to ASLS Booking Handler**
   - *This warning is normal for custom scripts*
4. Click **Allow**

---

## Step 5: Get Your URL

After authorization:

1. You'll see a **Web App URL** like:
   ```
   https://script.google.com/macros/s/AKfycbz...../exec
   ```
2. Click the **Copy** button 📋
3. **SAVE THIS URL** - you'll need it in the next step

---

## Step 6: Update the Javascript File

1. Open `chatbot.js` in a text editor (Notepad, VS Code, etc.)
2. Find line 8 (or search for `GOOGLE_SHEETS_URL`)
3. Replace `PASTE_YOUR_WEB_APP_URL_HERE` with your actual URL

**Before:**
```javascript
const GOOGLE_SHEETS_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

**After:**
```javascript
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_URL_HERE/exec';
```

4. Save the file

---

## Step 7: Test

1. Open `chatbot.js` in your browser
2. Fill out the booking form with test data
3. Click **Submit Enquiry**
4. Check your Google Sheet - a new row should appear!

---

## ✅ You're Done!

Your booking system is now live. Every booking will automatically be saved to your Google Sheet.

---

## Managing Bookings

**To view bookings:**
- Go to https://sheets.google.com
- Open "ASLS Bookings"

**To share with team:**
- Click **Share** button in Google Sheets
- Add team members' emails

**To export:**
- File → Download → CSV or Excel

---

## Troubleshooting

**Problem: No bookings appearing**
- Check that "Who has access" is set to **Anyone** (Step 3)
- Verify the URL in `chatbot.js` is correct (Step 6)

**Problem: Can't find my URL**
- Apps Script → Deploy → Manage deployments → Copy URL

**Need to update the script?**
- Make changes in Apps Script
- Deploy → Manage deployments → Edit → New version → Deploy
- URL stays the same (no need to update the file)

---

## Support

If you encounter any issues:
1. Review the steps above
2. Check the Troubleshooting section
3. Ensure all steps were completed exactly as written

For any other issues with the website or booking system, contact us.
---

*Your booking data is automatically backed up by Google and accessible from any device.*
