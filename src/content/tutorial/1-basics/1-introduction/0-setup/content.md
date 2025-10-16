---
type: lesson
title: Create Your First Waku Node
focus: /create-node.js
---

# Create Your First Waku Node

Welcome! In this lesson, you'll verify that the Waku SDK is working correctly in the WebContainer environment by creating your first Light Node.

## What is a Light Node?

A **Light Node** is a lightweight Waku client that can send and receive messages without needing to store the entire message history. It's perfect for resource-constrained environments like browsers!

## Your Task

In the `create-node.js` file, you'll see a `TODO` comment where you need to create a Waku Light Node. The node will automatically connect to the Waku Network using default bootstrap peers.

### Configuration Options Explained

Let's understand each configuration parameter:

- **`defaultBootstrap: true`** - Automatically discover and connect to Waku Network bootstrap peers
- **`networkConfig`** - Network sharding configuration
  - `clusterId: 1` - The Waku Network cluster ID (cluster 1 is the main public network)
  - `numShardsInCluster: 8` - Number of shards in this cluster for autosharding

### Complete the Code

Replace the `// Your code here` comment with the following:

```js add={1-6}
const waku = await createLightNode({
  defaultBootstrap: true,
  networkConfig: {
    clusterId: 1,
    numShardsInCluster: 8
  }
});
```

## Understanding Bootstrap and Network Configuration

**Default Bootstrap** automatically connects your node to well-known Waku Network peers. This is perfect for browser environments like WebContainer where you can't run local test nodes.

**Autosharding** distributes messages across 8 shards based on content topics. By setting `numShardsInCluster: 8`, your node knows how to route messages across the network efficiently.

## Expected Output

Once you complete the code, you should see:

```
Creating Waku Light Node...
Waku node created successfully!
Node peer ID: 16Uiu2HA...
Network configuration: { clusterId: 1, numShardsInCluster: 8, usingDefaultBootstrap: true }
Node is ready to connect to the Waku Network!
```

The peer ID shown is your node's unique identifier on the network!

## Why This Matters

By successfully creating a node in WebContainer, you've verified:
- ✅ `@waku/sdk` package is properly installed
- ✅ WebContainer can run Waku's browser-compatible code
- ✅ The node can be configured with custom settings
- ✅ You're ready to send and receive messages!

In the next lesson, we'll use this node to actually communicate over the Waku Network.
