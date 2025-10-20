---
type: lesson
title: Reliable Channels
focus: /main.js
---

# Send and Receive Messages with Reliable Channels

Learn how to use Waku's **ReliableChannel** for guaranteed message delivery with automatic synchronization and delivery tracking!

## What is a Reliable Channel?

A ReliableChannel provides:
- **Guaranteed delivery** - Messages are reliably delivered across the network
- **Automatic sync** - Participants can recover missing messages
- **Delivery tracking** - Track when messages are sent and acknowledged
- **Message ordering** - Messages maintain their order

:::warning
ReliableChannel is an experimental feature with some [limitations](https://github.com/waku-org/js-waku/pull/2526).
:::

## Channel Setup

To use a ReliableChannel, you need:
1. **Channel name** - Identifies the conversation (like a room name)
2. **Sender ID** - Unique identifier for each participant
3. **Content topic** - Defines the message type
4. **Encoder/Decoder** - For message formatting

## Message Lifecycle

ReliableChannel provides events to track message delivery:
- **`message-received`** - New message arrived
- **`message-sent`** - Message successfully sent (✔)
- **`message-acknowledged`** - Other participants confirmed receipt (✔✔)
- **`sending-message-irrecoverable-error`** - Message failed permanently (❌)

:::tip
These work like messaging app checkmarks - one check for sent, two for delivered!
:::

## Your task

In `main.js`, build a complete reliable messaging app:

1. Import required modules (`ReliableChannel`, `Protocols`, `createEncoder`, `createDecoder`, `createRoutingInfo`, `protobuf`)
2. Set up network config with auto sharding
3. Create a Light Node and wait for peers
4. Create routing info, encoder, and decoder
5. Set up a Protobuf message structure
6. Create a ReliableChannel with a channel name and sender ID
7. Add a message-received listener to display incoming messages
8. Add delivery tracking listeners (sent, acknowledged, error)
9. Send messages with an input field and button
10. Display messages with their delivery status

:::info[Auto-start Feature]
The ReliableChannel automatically starts the Waku node and begins fetching messages when created!
:::

## Expected output

You should be able to type messages, send them, see them appear in the message list, and track their delivery status (sent → acknowledged).

:::tip Congratulations!
Once complete, you'll have a fully working Waku Reliable Channel app with guaranteed message delivery using protocols like Scalable Data Sync (SDS) and P2P Reliability!
:::
