package com.example.chatbot;

import java.util.*;

public class UWEAIChatbot {
    private static final Map<String, String> knowledgeBase = new HashMap<>();

    static {
        knowledgeBase.put("password reset", "I see you're having trouble with your password, {name}. No worries! You can reset it by visiting MyUWE and clicking on 'Forgot Password'. If you still have issues, let me know, and I can guide you through the process.");
        knowledgeBase.put("wifi issues", "Hey {name}, struggling with WiFi? Make sure you're connected to 'eduroam' with your UWE credentials. If it still doesn't work, restarting your device or checking the MyUWE FAQs might help!");
        knowledgeBase.put("software access", "Need access to software, {name}? You can get Microsoft Office, Adobe Suite, and other student software via UWE's student portal. Let me know if you need step-by-step installation help!");
        knowledgeBase.put("email login", "Having trouble logging in, {name}? Use your student ID followed by '@uwe.ac.uk'. If it's still not working, you might need to reset your password through MyUWE.");
        knowledgeBase.put("blackboard issues", "Blackboard acting up, {name}? Try clearing your browser cache, using Chrome or Firefox, and ensuring pop-ups are enabled. If issues persist, contact UWE IT Support.");
        knowledgeBase.put("printing services", "Need to print, {name}? UWE printers are available across campus. You can send prints via the MyPrint portal and collect them using your student card.");
        knowledgeBase.put("escalation", "It looks like your issue might need extra help, {name}. You can reach the UWE IT Helpdesk via MyUWE or call 0117 32 83612. I'm here to make things easier for you!");
        knowledgeBase.put("peak hour support", "Hey {name}, I understand waiting times can be frustrating, especially in September and October. If you need quick help, try checking self-service options before contacting support.");
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Hello! I'm the UWE AI IT Support Chatbot. Before we start, what's your name?");
        System.out.print("You: ");
        String userName = scanner.nextLine().trim();

        System.out.println("Nice to meet you, " + userName + "! How can I assist you today? (Type 'exit' to quit)");

        while (true) {
            System.out.print("You: ");
            String userInput = scanner.nextLine().toLowerCase();

            if (userInput.equals("exit")) {
                System.out.println("Chatbot: Thanks for chatting, " + userName + "! Have a great day!");
                break;
            }

            String bestMatch = findBestMatch(userInput, userName);
            System.out.println("Chatbot: " + bestMatch);
        }
        scanner.close();
    }

    private static String findBestMatch(String userInput, String name) {
        for (String key : knowledgeBase.keySet()) {
            if (userInput.contains(key)) {
                return knowledgeBase.get(key).replace("{name}", name);
            }
        }
        return "I'm sorry, " + name + ", I couldn't find an answer. Please visit MyUWE IT Support or contact a helpdesk representative.";
    }
}
