---
type: lesson
title: Retro Chat
focus: /index.html
---

# Retro Chat

A retro IRC-style chat application built with Waku, featuring:

- **Real-time messaging** using Waku's Reliable Channel protocol
- **Message replies** with threading support
- **Missing message recovery** to ensure message delivery
- **Browser notifications** for new messages
- **Retro terminal aesthetic** with green-on-black IRC-style UI
- **PWA support** for mobile installation

## Features

### Reliable Messaging
Uses Waku's Reliable Channel protocol to ensure message delivery, even in unstable network conditions. Missing messages are automatically detected and recovered.

### Message Threading
Reply to any message to create conversation threads. The UI shows reply context and allows navigation between related messages.

### Notifications
Enable browser notifications to receive alerts for new messages, even when the app is in the background.

## How It Works

The app uses:
- **@waku/sdk** for decentralized messaging
- **Protobuf** for message serialization
- **LocalStorage** for nickname persistence
- **Service Worker** for PWA functionality

Open `index.html` to see the complete implementation in a single file.

## Try It Out

1. The app will automatically connect to the Waku network
2. Set your nickname in the header
3. Start chatting! Messages are sent to all connected peers
4. Try enabling notifications for the full experience
5. Test the reply feature by clicking on any message

The system window shows connection status and recovered messages.
