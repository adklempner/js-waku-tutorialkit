// TODO: Import Protocols, createEncoder, and createDecoder from '@waku/sdk'
// TODO: Import createRoutingInfo from '@waku/utils'
// TODO: Import protobuf from 'protobufjs'
import { createLightNode } from '@waku/sdk';

const statusEl = document.getElementById('status');
const messagesEl = document.getElementById('messages');

async function initWaku() {
  statusEl.textContent = 'Creating Waku node...';

  // TODO: Choose a content topic
  // const contentTopic = '/my-app/1/notifications/proto';

  // TODO: Create network config for auto sharding
  // const networkConfig = {
  //   clusterId: 1,
  //   contentTopics: [contentTopic],
  //   numShardsInCluster: 7,
  // };

  // TODO: Create node with auto sharding (recommended)
  // Note: createLightNode already calls node.start() by default
  // const node = await createLightNode({
  //   defaultBootstrap: true,
  //   networkConfig,
  // });

  const node = await createLightNode({ defaultBootstrap: true });

  statusEl.textContent = 'Waiting for peers...';

  // TODO: Wait for peers with Light Push and Filter protocols
  // await node.waitForPeers([Protocols.LightPush, Protocols.Filter]);

  // TODO: Create routing info for the content topic
  // const routingInfo = createRoutingInfo(networkConfig, { contentTopic });

  // TODO: Create encoder and decoder using the SDK functions
  // const encoder = createEncoder({
  //   contentTopic,
  //   routingInfo
  // });
  // const decoder = createDecoder(contentTopic, routingInfo);

  // TODO: Create a message structure using Protobuf
  // const DataPacket = new protobuf.Type("DataPacket")
  //   .add(new protobuf.Field("timestamp", 1, "uint64"))
  //   .add(new protobuf.Field("sender", 2, "string"))
  //   .add(new protobuf.Field("message", 3, "string"));

  // TODO: Create the callback function for receiving messages
  // const callback = (wakuMessage) => {
  //   if (!wakuMessage.payload) return;
  //   const messageObj = DataPacket.decode(wakuMessage.payload);
  //
  //   const messageDiv = document.createElement('div');
  //   messageDiv.className = 'message';
  //   messageDiv.innerHTML = `
  //     <div class="message-sender">${messageObj.sender}</div>
  //     <div class="message-time">${new Date(Number(messageObj.timestamp)).toLocaleString()}</div>
  //     <div class="message-content">${messageObj.message}</div>
  //   `;
  //   messagesEl.appendChild(messageDiv);
  // };

  // TODO: Subscribe to Filter to receive messages
  // await node.filter.subscribe(decoder, callback);

  // TODO: Send a test message using Light Push
  // const protoMessage = DataPacket.create({
  //   timestamp: Date.now(),
  //   sender: "Alice",
  //   message: "Hello, Waku!",
  // });
  // const serialisedMessage = DataPacket.encode(protoMessage).finish();
  //
  // const result = await node.lightPush.send(encoder, {
  //   payload: serialisedMessage,
  // });
  //
  // if (result.successes && result.successes.length > 0) {
  //   statusEl.textContent = 'Ready! Test message sent successfully!';
  // } else {
  //   statusEl.textContent = 'Message failed to send. Check console for details.';
  //   console.error('Send failures:', result.failures);
  // }

  statusEl.textContent += '\nComplete the TODOs to send and receive messages!';
}

initWaku().catch(console.error);
