import { createLightNode, createEncoder, createDecoder, Protocols } from "@waku/sdk";
import { createRoutingInfo } from "@waku/utils";
import protobuf from "protobufjs";

// Network configuration using autosharding
const networkConfig = {
  clusterId: 1,
  numShardsInCluster: 8,
};

// Content topic for messages
const contentTopic = "/light-guide/1/message/proto";

// Create routing info for message routing
const routingInfo = createRoutingInfo(networkConfig, { contentTopic });

// Create encoder and decoder for messages
const encoder = createEncoder({ contentTopic, routingInfo });
const decoder = createDecoder(contentTopic, routingInfo);

// Create message structure using Protobuf
const DataPacket = new protobuf.Type("DataPacket")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("sender", 2, "string"))
  .add(new protobuf.Field("message", 3, "string"));

async function main() {
  console.log("Creating Waku Light Node...");

  // Create and start a Light Node
  const node = await createLightNode({
    defaultBootstrap: true,
    networkConfig,
  });

  console.log("Waiting for peers...");

  // Wait for peer connections with Light Push and Filter protocols
  await node.waitForPeers([Protocols.LightPush, Protocols.Filter]);

  console.log("Connected to peers!");

  // TODO: Create a callback function to process received messages
  // Hint: The callback should check for payload and decode the message using DataPacket
  const callback = (wakuMessage) => {
    // Your code here
  };

  // TODO: Subscribe to messages using Filter protocol
  // Hint: Use node.filter.subscribe() with decoder and callback

  // Send a test message
  console.log("Sending message...");

  const protoMessage = DataPacket.create({
    timestamp: Date.now(),
    sender: "Alice",
    message: "Hello, Waku!",
  });

  const serialisedMessage = DataPacket.encode(protoMessage).finish();

  await node.lightPush.send(encoder, {
    payload: serialisedMessage,
  });

  console.log("Message sent!");

  // Keep the node running to receive messages
  console.log("Listening for messages... (Node will stay active)");
}

main().catch(console.error);
