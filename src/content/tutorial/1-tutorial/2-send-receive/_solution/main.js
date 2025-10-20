import { createLightNode, Protocols, createEncoder, createDecoder } from '@waku/sdk';
import { createRoutingInfo } from '@waku/utils';
import protobuf from 'protobufjs';

const statusEl = document.getElementById('status');
const messagesEl = document.getElementById('messages');

async function initWaku() {
  statusEl.textContent = 'Creating Waku node...';

  // Choose a content topic
  const contentTopic = '/my-app/1/notifications/proto';

  // Create network config for auto sharding
  const networkConfig = {
    clusterId: 1,
    contentTopics: [contentTopic],
    numShardsInCluster: 7,
  };

  // Create node with auto sharding (recommended)
  // Note: createLightNode already calls node.start() by default
  const node = await createLightNode({
    defaultBootstrap: true,
    networkConfig,
  });

  statusEl.textContent = 'Waiting for peers...';

  // Wait for peers with Light Push and Filter protocols
  await node.waitForPeers([Protocols.LightPush, Protocols.Filter]);

  // Create routing info for the content topic
  const routingInfo = createRoutingInfo(networkConfig, { contentTopic });

  // Create an encoder and decoder using the SDK functions
  const encoder = createEncoder({
    contentTopic,
    routingInfo
  });
  const decoder = createDecoder(contentTopic, routingInfo);

  // Create a message structure using Protobuf
  const DataPacket = new protobuf.Type("DataPacket")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("sender", 2, "string"))
    .add(new protobuf.Field("message", 3, "string"));

  // Create the callback function for receiving messages
  const callback = (wakuMessage) => {
    if (!wakuMessage.payload) return;
    const messageObj = DataPacket.decode(wakuMessage.payload);

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
      <div class="message-sender">${messageObj.sender}</div>
      <div class="message-time">${new Date(Number(messageObj.timestamp)).toLocaleString()}</div>
      <div class="message-content">${messageObj.message}</div>
    `;
    messagesEl.appendChild(messageDiv);
  };

  // Subscribe to Filter to receive messages
  await node.filter.subscribe(decoder, callback);

  statusEl.textContent = 'Subscription active! Sending test message...';

  // Send a test message using Light Push
  const protoMessage = DataPacket.create({
    timestamp: Date.now(),
    sender: "Alice",
    message: "Hello, Waku!",
  });
  const serialisedMessage = DataPacket.encode(protoMessage).finish();

  const result = await node.lightPush.send(encoder, {
    payload: serialisedMessage,
  });

  if (result.successes && result.successes.length > 0) {
    statusEl.textContent = 'Ready! Test message sent successfully!';
  } else {
    statusEl.textContent = 'Message failed to send. Check console for details.';
    console.error('Send failures:', result.failures);
  }
}

initWaku().catch(console.error);
