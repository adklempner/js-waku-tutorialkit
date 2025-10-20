---
type: lesson
title: Create a Waku Node
focus: /main.js
---

# Create a Waku Node

Let's create a Light Node to connect to the Waku Network and monitor its connection status!

## What is a Light Node?

A Light Node is a lightweight client that can:
- Connect to the Waku Network
- Send and receive messages
- Use minimal resources (perfect for browsers!)

:::tip
Light Nodes don't store the full message history - they rely on other nodes for that. This makes them ideal for web applications.
:::

## Bootstrap the node

When creating a node, you need to connect it to the network. The easiest way is using `defaultBootstrap: true`, which automatically connects to known bootstrap nodes.

:::info
Bootstrap nodes help your node discover other peers on the network. Check out the [Bootstrap Nodes and Discover Peers](/build/javascript/configure-discovery) guide to learn about other discovery methods.
:::

## Monitor Connection Health

The Waku node emits health events to help you know whether it's connected to the network. This is crucial for providing feedback to users!

### Health Status Levels

The node provides three health levels:

1. **SufficientlyHealthy** - Fully connected, everything works
2. **MinimallyHealthy** - Connected but may have issues
3. **Unhealthy** - Disconnected from the network

:::tip
You can use these states to show different UI indicators (green/yellow/red status dots, for example).
:::

## Your task

In `main.js`, complete the following:

1. Import `createLightNode` and `HealthStatus` from `@waku/sdk`
2. Create a Light Node with default bootstrap enabled
3. Add an event listener for `waku:health` events on the node
4. Check the health status and update the UI accordingly
5. Show different messages for each health level

:::tip[Async/Await]
Creating a node is an asynchronous operation. Use `await` to wait for the node to be created!
:::

:::tip[Event Structure]
The event contains the health status in `event.detail`. You can access it like:
```js
node.events.addEventListener("waku:health", (event) => {
  const health = event.detail;
  // health is one of the HealthStatus values
});
```
:::

## Expected output

The status should update to show the current connection state, changing as the node connects to peers.
