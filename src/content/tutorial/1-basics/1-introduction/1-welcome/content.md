---
type: lesson
title: Send and Receive Messages Using Light Push and Filter
focus: /waku-light.js
---

# Send and Receive Messages Using Light Push and Filter

Welcome to the Waku SDK tutorial! In this lesson, you'll learn how to use the `@waku/sdk` package to send and receive messages over the Waku Network using a [Light Node](https://docs.waku.org/learn/glossary#light-node).

## What You'll Build

You'll set up a Light Node that can:
- Connect to the Waku Network using the Light Push and Filter protocols
- Send messages using **Light Push**
- Receive messages using **Filter**

## The Code Structure

Let's examine the starter code in `waku-light.js`. The file already includes:

1. **Imports** - The necessary packages from `@waku/sdk`, `@waku/utils`, and `protobufjs`
2. **Network Configuration** - Using autosharding with 8 shards in cluster 1
3. **Content Topic** - Defines the message channel: `/light-guide/1/message/proto`
4. **Routing Info** - Created using `createRoutingInfo()` for message routing
5. **Encoder/Decoder** - For serializing and deserializing messages
6. **Protobuf Schema** - Defines the message structure (timestamp, sender, message)

## Your Task

The node is already set up to create a Light Node and wait for peers, but **two critical pieces are missing**:

### 1. Create the Message Callback

The callback function needs to process incoming messages. It should:
- Check if the message has a payload
- Decode the payload using `DataPacket.decode()`
- Log the received message to the console

```js add={3-11}
const callback = (wakuMessage) => {
  // Your code here
  // Check if there is a payload on the message
  if (!wakuMessage.payload) return;

  // Decode and display the message
  const messageObj = DataPacket.decode(wakuMessage.payload);
  console.log("Received message:", {
    sender: messageObj.sender,
    message: messageObj.message,
    timestamp: new Date(Number(messageObj.timestamp)).toLocaleString(),
  });
};
```

### 2. Subscribe to Messages

After defining the callback, you need to subscribe to the Filter protocol to receive messages:

```js add={1-6}
// Subscribe to messages using Filter protocol
const success = await node.filter.subscribe([decoder], callback);

if (!success) {
  console.error("Failed to subscribe to messages");
  return;
}

console.log("Successfully subscribed to Filter!");
```

## How It Works

Once you add these pieces:

1. **Light Node Creation** - The node connects to the Waku Network with autosharding configuration
2. **Peer Discovery** - `waitForPeers()` ensures connections to peers supporting Light Push and Filter
3. **Message Subscription** - The Filter protocol listens for messages on your content topic
4. **Message Sending** - Light Push sends a test message to the network
5. **Message Reception** - Your callback processes any received messages

## Key Concepts

- **Routing Info**: Required for all encoders/decoders in the new API. It's created using `createRoutingInfo()` with your network config and content topic.
- **Autosharding**: Automatically distributes content across shards based on the content topic. You specify `numShardsInCluster` instead of explicit shard IDs.
- **Light Push**: A lightweight protocol for sending messages without running a full relay node.
- **Filter**: A lightweight protocol for receiving messages on specific content topics.

## Try It Out

Add the missing code sections, then check the preview on the right. You should see:
- "Creating Waku Light Node..."
- "Waiting for peers..."
- "Connected to peers!"
- "Successfully subscribed to Filter!"
- "Sending message..."
- "Message sent!"
- "Received message: ..." (your own message echoed back)

The Waku Network enables decentralized, privacy-preserving communication. You've just built your first Waku application!
