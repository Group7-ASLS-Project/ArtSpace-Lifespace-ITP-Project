# ArtSpace LifeSpace — Staff User Guide
### Managing Bookings & the Website

---

## What This Guide Covers

This guide is for ASLS staff who need to:
- View and manage booking enquiries
- Understand how the chatbot and enquiry form work
- Know what to do when something goes wrong
- Make basic content changes to the website

---

## 1. How Bookings Come In

Visitors can make a booking enquiry in two ways:

**Via the Enquiry Form** (Enquire page)
- The visitor fills in their name, email, venue, and message, then clicks **Submit Enquiry**.

**Via the Chatbot** (💬 button, bottom-right of every page)
- The chatbot walks the visitor through a step-by-step booking flow, then redirects them to the Enquiry page with the form pre-filled.

Both routes send the booking data to the same place — your **ASLS Bookings Google Sheet**.

---

## 2. Viewing Bookings in Google Sheets

All submitted enquiries appear automatically in your Google Sheet.

1. Go to [sheets.google.com](https://sheets.google.com)
2. Open the sheet named **ASLS Bookings** 
3. Each row is one enquiry, with these columns:

| Column | What it contains |
|--------|-----------------|
| Timestamp | Date and time the enquiry was submitted |
| Name | Visitor's full name |
| Email | Visitor's email address |
| Venue | Which venue they selected |
| Event Type | Type of event (e.g. workshop, exhibition) |
| Attendees | Expected number of attendees |
| Preferred Date | Their requested date |
| Message | Full message including any extra notes |

> **Tip:** New bookings appear at the bottom of the sheet. Sort by **Timestamp** (Column A) descending to always see the latest at the top.

---

## 3. Responding to Enquiries

The website does not send automatic reply emails — you will need to follow up manually.

1. Open the **ASLS Bookings** sheet
2. Find the new enquiry row
3. Copy the visitor's **Email** address
4. Reply from your usual ASLS email account (info@artspacelifespace.org)

**Suggested response time:** within 2 working days.

---

## 4. Sharing the Sheet with Team Members

To give a colleague access to view or edit bookings:

1. Open the **ASLS Bookings** sheet
2. Click **Share** (top right)
3. Enter their email address
4. Set their permission to **Viewer** (read only) or **Editor** (can edit)
5. Click **Send**

---

## 5. Exporting Bookings

To download a copy of your bookings (e.g. for records or reporting):

1. Open the **ASLS Bookings** sheet
2. Go to **File → Download**
3. Choose **Microsoft Excel (.xlsx)** or **CSV (.csv)**

---

## 6. The Three Venues — Quick Reference

The booking form and chatbot both refer to these venues:

| Venue | Capacity | Key Features |
|-------|----------|--------------|
| The Island | 50–100 people | City centre, waterfront, outdoor space, natural light |
| Arts Mansion | 100–200 people | Historic building at Ashton Court, multiple rooms, high ceilings |
| Sparks Bristol | 30–80 people | Step-free access, quiet sensory pod, prayer room, modern facilities |

---

## 7. Website Pages — What Each One Does

| Page | Purpose |
|------|---------|
| **Home** (index.html) | Overview of ASLS, links to venues and enquiry |
| **Venues** | Detailed info on The Island, Arts Mansion, and Sparks Bristol |
| **Events** | Lists upcoming events; links to Headfirst ticketing |
| **Community** | Mission, history map, what ASLS offers |
| **Enquire** | The main booking enquiry form |

The chatbot (💬) appears on every page and connects to the same Google Sheet.

---

## 8. Accessibility Features

The website has two built-in accessibility tools in the top bar on every page:

- **Aa Larger Text** — increases text size across the page
- **◑ High Contrast** — switches to a high-contrast black and white display

These are toggled by clicking the buttons. They reset when the page is refreshed, so visitors will need to re-enable them each visit.

---

## 9. Troubleshooting

**A visitor says they submitted a form but nothing appeared in the sheet**
- Check the sheet is still open and accessible at [sheets.google.com](https://sheets.google.com)
- Ask your developer to verify the Google Sheets connection in `chatbot.js` is still active
- Check the Apps Script deployment hasn't expired (your developer can re-deploy if needed)

**The chatbot isn't responding**
- Make sure `chatbot.js` is in the same folder as the HTML files
- Try refreshing the page — the chatbot resets on each page load

**A booking came through with blank fields**
- The visitor may have typed their enquiry into the message box rather than using the chatbot flow — this is fine, the message field will still contain their details

**You need to update venue details or pricing**
- Contact your developer to update the content in `chatbot.js` (venue details) or the relevant HTML page

---

## 10. Key Contacts

| Role | Contact |
|------|---------|
| ASLS Office | info@artspacelifespace.org |
| Office Phone | 0117 3763 457 |
| Office Hours | Weekdays, 10am – 4pm |

For any technical issues with the website or booking system, contact the developer who built and handed over this project.

---

*ArtSpace LifeSpace — Registered Charity No: 1168150*
*c/o The Island, Nelson Street, Bristol, BS1 2BE*