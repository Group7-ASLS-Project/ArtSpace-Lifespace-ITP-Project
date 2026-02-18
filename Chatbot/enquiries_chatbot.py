import csv
from datetime import datetime


def save_booking(details):
    """Save booking enquiry to CSV file."""
    file_name = "booking_enquiries.csv"
    file_exists = False

    try:
        with open(file_name, "r"):
            file_exists = True
    except FileNotFoundError:
        file_exists = False

    with open(file_name, "a", newline="") as file:
        writer = csv.writer(file)

        if not file_exists:
            writer.writerow([
                "Timestamp",
                "Name",
                "Email",
                "Preferred Date",
                "Message"
            ])

        writer.writerow(details)


def booking_enquiry():
    print("\n--- Booking Enquiry ---")

    consent = input("Do you consent to us storing your enquiry details? (yes/no): ").strip().lower()

    if consent != "yes":
        print("We cannot proceed without consent.\n")
        return

    name = input("Please enter your full name: ").strip()
    email = input("Please enter your email address: ").strip()
    date = input("Preferred booking date (DD/MM/YYYY): ").strip()
    message = input("Additional message (optional): ").strip()

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    save_booking([timestamp, name, email, date, message])

    print("\nThank you. Your booking enquiry has been recorded successfully.")
    print("Our team will contact you via email shortly.\n")


def enquiries_chatbot():
    print("=" * 50)
    print("Welcome to ArtSpace LifeSpace Enquiries Chatbot")
    print("=" * 50)

    while True:
        print("\nHow can we assist you today?")
        print("1. Booking Enquiry")
        print("2. Opening Hours")
        print("3. Event Information")
        print("4. Contact Details")
        print("5. Exit")

        choice = input("Please enter a number (1-5): ").strip()

        if choice == "1":
            booking_enquiry()

        elif choice == "2":
            print("\nOpening Hours:")
            print("Monday–Friday: 9:00 AM – 6:00 PM")
            print("Saturday: 10:00 AM – 4:00 PM")
            print("Sunday: Closed\n")

        elif choice == "3":
            print("\nEvent Information:")
            print("Please visit our website under the 'Events' section for upcoming programmes.")
            print("You may also contact us directly for private bookings.\n")

        elif choice == "4":
            print("\nContact Details:")
            print("Email: info@artspacelifespace.co.uk")
            print("Phone: 01234 567890\n")

        elif choice == "5":
            print("\nThank you for using ArtSpace LifeSpace Enquiries Chatbot.")
            print("Goodbye.")
            break

        else:
            print("\nInvalid input. Please select a valid option (1-5).\n")


if __name__ == "__main__":
    enquiries_chatbot()
