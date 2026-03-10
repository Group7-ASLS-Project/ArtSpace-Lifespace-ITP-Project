// ============================================
// ASLS BOOKING SYSTEM - Main JavaScript File
// ============================================

// ============================================
// CONFIGURATION Please follow the guide to get the link
// ============================================
const GOOGLE_SHEETS_URL = 'Make your exec link into here';

// ============================================
// KNOWLEDGE BASE
// ============================================
const knowledgeCategories = [
    {
        id: "who are we?",
        keywords: ["who", "asls", "artspace", "lifespace", "charity", "mission", "about"],
        response: "Artspace Lifespace (ASLS) is a Bristol-based charity that recycles vacant buildings into creative resources like studios and event spaces."
    },
    {
        id: "venues",
        keywords: ["venue", "space", "island", "mansion", "sparks", "location", "where", "building"],
        response: "We manage several unique venues: The Island, Arts Mansion, Sparks Bristol, and The Vestibules. Each offers unique character and amenities for creative events."
    },
    {
        id: "accessibility",
        keywords: ["access", "disabled", "wheelchair", "step-free", "inclusive"],
        response: "ASLS is committed to inclusivity. Many sites like Sparks offer step-free access and quiet spaces. Let us know your specific needs!"
    },
    {
        id: "project info",
        keywords: ["project", "prototype", "bot", "system", "support"],
        response: "This chatbot is a prototype supporting a new digital enquiry system to help users find info and route requests efficiently."
    },
    {   
        id: "Contact Info",
        keywords: ["contact", "email", "phone", "address", "phone number", "reach"],
        response: "For general inquiries, email info@artspacelifespace.org or call +441173763457."
    },
];

const venueDetails = {
    "the-island": {
        name: "The Island",
        capacity: "50-100 people",
        features: "Waterfront location, outdoor space, natural lighting",
        suitable: "Workshops, exhibitions, small gatherings"
    },
    "arts-mansion": {
        name: "Arts Mansion",
        capacity: "100-200 people",
        features: "Historic building, multiple rooms, high ceilings",
        suitable: "Art shows, performances, conferences"
    },
    "sparks-bristol": {
        name: "Sparks Bristol",
        capacity: "30-80 people",
        features: "Modern facilities, step-free access, tech-equipped",
        suitable: "Meetings, creative workshops, screenings"
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================
let userName = "";
let userEmail = "";
let bookingState = "idle";
let tempBookingData = {};
let currentStep = 0;
let chatGreeted = false; // tracks whether the greeting has been shown

// ============================================
// CHATBOT FUNCTIONS
// ============================================

function toggleChat() {
    const win = document.getElementById('chat-window');
    if (win.style.display === 'flex') {
        win.style.display = 'none';
    } else {
        win.style.display = 'flex';
        // Only greet once per page load
        if (!chatGreeted) {
            chatGreeted = true;
            setTimeout(() => {
                addMessage("👋 Welcome to ArtSpace LifeSpace!", false);
                setTimeout(() => {
                    addMessage("Before we get started, what's your name?", false);
                }, 500);
            }, 200);
        }
    }
}

function addMessage(text, isUser, isHTML = false) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.className = isUser ? 'message user-msg' : 'message bot-msg';
    if (isHTML) msgDiv.innerHTML = text; else msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showOptions() {
    let optionsHTML = `
        <div style="margin-bottom: 8px;"><strong>Choose a topic:</strong></div>
        <button class="option-button" onclick="selectOption('who are we?')">Who are we?</button>
        <button class="option-button" onclick="selectOption('venues')">Our Venues</button>
        <button class="option-button" onclick="startBooking()">📅 Book an Event</button>
        <button class="option-button" onclick="selectOption('accessibility')">Accessibility</button>
        <button class="option-button" onclick="selectOption('Contact Info')">Contact Info</button>
    `;
    addMessage(optionsHTML, false, true);
}

function findResponse(input) {
    const lowerInput = input.toLowerCase();
    for (const cat of knowledgeCategories) {
        if (cat.keywords.some(kw => lowerInput.includes(kw))) return cat.response;
    }
    return null;
}

function selectOption(choice) {
    addMessage(choice, true);
    const response = findResponse(choice);
    addMessage(response || "I'm not sure about that. Let me show you the main menu.", false);
    setTimeout(() => {
        addMessage(`<button class="option-button" onclick="showOptions()">⬅️ Back to main menu</button>`, false, true);
    }, 800);
}

function startBooking() {
    addMessage("Book an Event", true);
    bookingState = "collecting";
    currentStep = 0;
    tempBookingData = { name: userName, email: userEmail };
    
    addMessage("Great! I'll help you book an event. Let me collect some details.", false);
    setTimeout(() => askNextBookingQuestion(), 500);
}

function askNextBookingQuestion() {
    switch(currentStep) {
        case 0:
            if (!userName) {
                addMessage("First, what's your name?", false);
            } else {
                tempBookingData.name = userName;
                currentStep++;
                askNextBookingQuestion();
            }
            break;
        case 1:
            if (!userEmail) {
                addMessage("What's your email address?", false);
            } else {
                tempBookingData.email = userEmail;
                currentStep++;
                askNextBookingQuestion();
            }
            break;
        case 2:
            let venueHTML = `
                <div style="margin-bottom: 8px;"><strong>Which venue would you like to book?</strong></div>
                <button class="option-button" onclick="selectVenue('the-island')">The Island</button>
                <button class="option-button" onclick="selectVenue('arts-mansion')">Arts Mansion</button>
                <button class="option-button" onclick="selectVenue('sparks-bristol')">Sparks Bristol</button>
                <button class="option-button" onclick="showVenueDetails()">ℹ️ Tell me more about the venues</button>
            `;
            addMessage(venueHTML, false, true);
            break;
        case 3:
            addMessage("What type of event are you planning? (e.g., workshop, exhibition, performance, meeting)", false);
            break;
        case 4:
            addMessage("How many people do you expect to attend?", false);
            break;
        case 5:
            addMessage("What date would you prefer? (e.g., March 15, 2026)", false);
            break;
        case 6:
            addMessage("Any additional requirements or questions? (Type 'none' if not)", false);
            break;
        case 7:
            showBookingSummary();
            break;
    }
}

function showVenueDetails() {
    addMessage("Tell me more about the venues", true);
    let detailsHTML = `
        <div style="background: #f9f9f9; padding: 10px; border-radius: 8px; margin: 8px 0;">
            <strong>🏛️ The Island</strong><br>
            Capacity: ${venueDetails["the-island"].capacity}<br>
            Features: ${venueDetails["the-island"].features}<br>
            Suitable for: ${venueDetails["the-island"].suitable}<br><br>
            
            <strong>🎨 Arts Mansion</strong><br>
            Capacity: ${venueDetails["arts-mansion"].capacity}<br>
            Features: ${venueDetails["arts-mansion"].features}<br>
            Suitable for: ${venueDetails["arts-mansion"].suitable}<br><br>
            
            <strong>✨ Sparks Bristol</strong><br>
            Capacity: ${venueDetails["sparks-bristol"].capacity}<br>
            Features: ${venueDetails["sparks-bristol"].features}<br>
            Suitable for: ${venueDetails["sparks-bristol"].suitable}
        </div>
        <div style="margin-top: 8px;">
            <button class="option-button" onclick="askNextBookingQuestion()">Choose a venue</button>
        </div>
    `;
    addMessage(detailsHTML, false, true);
}

function selectVenue(venueId) {
    const venue = venueDetails[venueId];
    tempBookingData.building = venueId;
    tempBookingData.venueName = venue.name;
    
    addMessage(venue.name, true);
    addMessage(`Excellent choice! ${venue.name} features: ${venue.features}. Capacity: ${venue.capacity}. Suitable for: ${venue.suitable}`, false);
    
    currentStep++;
    setTimeout(() => askNextBookingQuestion(), 800);
}

function showBookingSummary() {
    let summary = `
        <div style="background: #f0f8ff; padding: 12px; border-radius: 8px; margin: 8px 0;">
            <strong>📋 Booking Summary:</strong><br>
            <strong>Name:</strong> ${tempBookingData.name}<br>
            <strong>Email:</strong> ${tempBookingData.email}<br>
            <strong>Venue:</strong> ${tempBookingData.venueName}<br>
            <strong>Event Type:</strong> ${tempBookingData.eventType}<br>
            <strong>Attendees:</strong> ${tempBookingData.attendees}<br>
            <strong>Preferred Date:</strong> ${tempBookingData.date}<br>
            ${tempBookingData.message !== 'none' ? `<strong>Additional Notes:</strong> ${tempBookingData.message}<br>` : ''}
        </div>
        <div style="margin-top: 12px;">
            <button class="option-button" onclick="confirmBooking()">✅ Confirm & Submit</button>
            <button class="option-button" onclick="cancelBooking()">❌ Cancel</button>
        </div>
    `;
    addMessage(summary, false, true);
}

function confirmBooking() {
    addMessage("Confirm & Submit", true);
    
    // Populate the form (only on Enquire.html where the form exists)
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const buildingField = document.getElementById('building');
    const messageField = document.getElementById('message');

    if (nameField) nameField.value = tempBookingData.name;
    if (emailField) emailField.value = tempBookingData.email;
    if (buildingField) buildingField.value = tempBookingData.building;

    if (messageField) {
        let formMessage = `Event Type: ${tempBookingData.eventType}\n`;
        formMessage += `Expected Attendees: ${tempBookingData.attendees}\n`;
        formMessage += `Preferred Date: ${tempBookingData.date}\n`;
        if (tempBookingData.message !== 'none') {
            formMessage += `Additional Notes: ${tempBookingData.message}`;
        }
        messageField.value = formMessage;
    }

    if (nameField) {
        addMessage("✅ Perfect! I've filled out the booking form for you. Please review and submit it below.", false);
        addMessage("The page will scroll to the form in a moment...", false);
        setTimeout(() => {
            const enquireSection = document.getElementById('enquire');
            if (enquireSection) {
                enquireSection.scrollIntoView({ behavior: 'smooth' });
                enquireSection.style.border = '3px solid #4CAF50';
                setTimeout(() => { enquireSection.style.border = ''; }, 2000);
            }
        }, 1500);
    } else {
        // On other pages, redirect to Enquire.html with data in sessionStorage
        sessionStorage.setItem('pendingBooking', JSON.stringify(tempBookingData));
        addMessage("✅ Great! Taking you to the enquiry form now...", false);
        setTimeout(() => { window.location.href = 'Enquire.html'; }, 1200);
    }
    
    // Reset booking state
    bookingState = "idle";
    tempBookingData = {};
    currentStep = 0;
}

function cancelBooking() {
    addMessage("Cancel", true);
    addMessage("No problem! Booking cancelled. How else can I help you?", false);
    bookingState = "idle";
    tempBookingData = {};
    currentStep = 0;
    setTimeout(() => showOptions(), 800);
}

function processChat() {
    const inputField = document.getElementById('user-chat-input');
    const userInput = inputField.value.trim();
    if (!userInput) return;

    addMessage(userInput, true);
    inputField.value = "";

    // Step 1: Collect name on first message
    if (!userName) {
        userName = userInput;
        addMessage(`Nice to meet you, ${userName}! How can I assist you today?`, false);
        setTimeout(() => showOptions(), 400);
        return;
    }

    if (bookingState === "collecting") {
        switch(currentStep) {
            case 0:
                tempBookingData.name = userInput;
                userName = userInput;
                currentStep++;
                askNextBookingQuestion();
                break;
            case 1:
                if (validateEmail(userInput)) {
                    tempBookingData.email = userInput;
                    userEmail = userInput;
                    currentStep++;
                    askNextBookingQuestion();
                } else {
                    addMessage("Please enter a valid email address (e.g., name@example.com)", false);
                }
                break;
            case 3:
                tempBookingData.eventType = userInput;
                currentStep++;
                askNextBookingQuestion();
                break;
            case 4:
                tempBookingData.attendees = userInput;
                currentStep++;
                askNextBookingQuestion();
                break;
            case 5:
                tempBookingData.date = userInput;
                currentStep++;
                askNextBookingQuestion();
                break;
            case 6:
                tempBookingData.message = userInput;
                currentStep++;
                askNextBookingQuestion();
                break;
        }
        return;
    }

    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('book') || lowerInput.includes('reserve') || 
        lowerInput.includes('hire') || lowerInput.includes('event')) {
        startBooking();
        return;
    }

    if (lowerInput.includes('venue') && (lowerInput.includes('info') || 
        lowerInput.includes('detail') || lowerInput.includes('tell me'))) {
        showVenueDetails();
        return;
    }

    const response = findResponse(userInput);
    if (response) {
        addMessage(response, false);
        setTimeout(() => {
            addMessage(`<button class="option-button" onclick="showOptions()">⬅️ Back to main menu</button>`, false, true);
        }, 800);
    } else {
        addMessage(`I'm not sure about that, ${userName}. Let me show you what I can help with:`, false);
        setTimeout(() => showOptions(), 500);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// GOOGLE SHEETS INTEGRATION
// ============================================

function getVenueName(venueId) {
    const venueNames = {
        'the-island': 'The Island',
        'arts-mansion': 'Arts Mansion',
        'sparks-bristol': 'Sparks Bristol'
    };
    return venueNames[venueId] || venueId;
}

function parseBookingMessage(message) {
    const details = { eventType: '', attendees: '', preferredDate: '' };
    const lines = message.split('\n');
    lines.forEach(line => {
        if (line.startsWith('Event Type:')) {
            details.eventType = line.replace('Event Type:', '').trim();
        } else if (line.startsWith('Expected Attendees:')) {
            details.attendees = line.replace('Expected Attendees:', '').trim();
        } else if (line.startsWith('Preferred Date:')) {
            details.preferredDate = line.replace('Preferred Date:', '').trim();
        }
    });
    return details;
}

function showStatus(message, isSuccess) {
    const statusDiv = document.getElementById('status-message');
    if (!statusDiv) return;
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
    statusDiv.style.color = isSuccess ? '#155724' : '#721c24';
    statusDiv.style.border = `1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'}`;
    setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
}

async function sendToGoogleSheets(bookingData) {
    if (GOOGLE_SHEETS_URL === 'Make your exec link into here') {
        alert('⚠️ Google Sheets integration not configured yet!\n\nPlease follow the setup guide to get your Web App URL.');
        return false;
    }

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    try {
        await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        if (submitBtn) { submitBtn.textContent = 'Submit Enquiry'; submitBtn.disabled = false; }
        return true;
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        if (submitBtn) { submitBtn.textContent = 'Submit Enquiry'; submitBtn.disabled = false; }
        return false;
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // Pre-fill form if redirected from another page via chatbot
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    if (pendingBooking) {
        try {
            const data = JSON.parse(pendingBooking);
            sessionStorage.removeItem('pendingBooking');
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const buildingField = document.getElementById('building');
            const messageField = document.getElementById('message');
            if (nameField) nameField.value = data.name || '';
            if (emailField) emailField.value = data.email || '';
            if (buildingField) buildingField.value = data.building || '';
            if (messageField) {
                let msg = '';
                if (data.eventType) msg += `Event Type: ${data.eventType}\n`;
                if (data.attendees) msg += `Expected Attendees: ${data.attendees}\n`;
                if (data.date) msg += `Preferred Date: ${data.date}\n`;
                if (data.message && data.message !== 'none') msg += `Additional Notes: ${data.message}`;
                messageField.value = msg;
            }
            // Also restore name into chatbot state
            if (data.name) userName = data.name;
        } catch(e) { console.warn('Could not restore pending booking', e); }
    }

    // Form submission handler
    const form = document.getElementById('main-enquiry-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = document.getElementById('message').value;
            const bookingDetails = parseBookingMessage(message);
            const bookingData = {
                timestamp: new Date().toLocaleString(),
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                venue: getVenueName(document.getElementById('building').value),
                eventType: bookingDetails.eventType,
                attendees: bookingDetails.attendees,
                preferredDate: bookingDetails.preferredDate,
                message: message
            };
            const success = await sendToGoogleSheets(bookingData);
            if (success || GOOGLE_SHEETS_URL !== 'Make your exec link into here') {
                showStatus(`✅ Thank you, ${bookingData.name}! Your booking enquiry has been submitted.`, true);
                document.getElementById('main-enquiry-form').reset();
            } else {
                showStatus('⚠️ Please configure the Google Sheets URL first. See setup guide.', false);
            }
        });
    }

    // Chat input enter key
    const chatInput = document.getElementById('user-chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') processChat();
        });
    }
});
