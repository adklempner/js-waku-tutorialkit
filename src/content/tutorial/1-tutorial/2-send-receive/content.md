---
type: lesson
title: Send and Receive with Light Push & Filter
focus: /main.js
---

# Send and Receive Messages Using Light Push and Filter

Now let's set up message sending with the **Light Push** protocol and message receiving with the **Filter** protocol!

## What are Light Push and Filter?

- **Light Push**: A protocol for sending messages to the Waku Network through relay nodes
- **Filter**: A protocol for receiving messages from the network without downloading everything

:::tip
These protocols are perfect for resource-constrained environments like browsers, as they offload heavy work to relay nodes!
:::

## Auto Sharding

For most applications, it's recommended to use auto sharding. This automatically routes your messages to the right network shards based on your content topics.

:::info
The node will use auto sharding configuration with `clusterId: 1` and your specified content topics.
:::

## Choose a Content Topic

A [content topic](/learn/concepts/content-topics) identifies what type of messages you're sending. Think of it like a channel or room name.

:::info
Content topics follow this format: `/{application-name}/{version}/{content-topic-name}/{encoding}`

For example: `/my-app/1/notifications/proto`
:::

## Create Encoder and Decoder

- **Encoder**: Prepares your messages for sending via Light Push
- **Decoder**: Processes received messages from Filter

Both must use the same content topic to communicate!

## Send and Receive Messages

Once you have encoder and decoder set up:
- Use `node.lightPush.send()` to send messages
- Use `node.filter.subscribe()` to receive messages with a callback function

## Your task

In `main.js`, complete the following:

1. Import `Protocols`, `createEncoder`, `createDecoder`, and `protobuf` from their packages
2. Create a node with auto sharding configuration
3. Wait for peers with Light Push and Filter protocols
4. Choose a content topic (e.g., `/my-app/1/notifications/proto`)
5. Create encoder and decoder
6. Create a Protobuf message structure
7. Set up Filter subscription to receive messages
8. Send a test message using Light Push

:::tip[Protocol Specification]
You can specify which protocols to wait for:
```js
await node.waitForPeers([Protocols.LightPush, Protocols.Filter]);
```
:::

## Expected output

You should see a test message appear in the messages area after it's sent and received through the network!
