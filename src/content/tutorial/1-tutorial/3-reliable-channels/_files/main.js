// TODO: Import createLightNode, Protocols, createEncoder, createDecoder, ReliableChannel from '@waku/sdk'
// TODO: Import createRoutingInfo from '@waku/utils'
// TODO: Import protobuf from 'protobufjs'

const statusEl = document.getElementById('status');
const messagesEl = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let reliableChannel;
let DataPacket;
let senderId;

async function initWaku() {
  statusEl.textContent = 'Creating Waku node...';

  // TODO: Choose a content topic
  // const contentTopic = '/my-app/1/chat/proto';

  // TODO: Create network config for auto sharding
  // const networkConfig = {
  //   clusterId: 1,
  //   contentTopics: [contentTopic],
  //   numShardsInCluster: 7,
  // };

  // TODO: Create node with auto sharding
  // const node = await createLightNode({
  //   defaultBootstrap: true,
  //   networkConfig,
  // });

  statusEl.textContent = 'Waiting for peers...';

  // TODO: Wait for peers with Light Push and Filter protocols
  // await node.waitForPeers([Protocols.LightPush, Protocols.Filter]);

  // TODO: Create routing info
  // const routingInfo = createRoutingInfo(networkConfig, { contentTopic });

  // TODO: Create encoder and decoder
  // const encoder = createEncoder({
  //   contentTopic,
  //   routingInfo
  // });
  // const decoder = createDecoder(contentTopic, routingInfo);

  // TODO: Create a Protobuf message structure
  // DataPacket = new protobuf.Type("DataPacket")
  //   .add(new protobuf.Field("timestamp", 1, "uint64"))
  //   .add(new protobuf.Field("sender", 2, "string"))
  //   .add(new protobuf.Field("message", 3, "string"));

  // TODO: Generate a unique sender ID
  // senderId = `user-${Math.random().toString(36).substring(7)}`;

  // TODO: Choose a channel name
  // const channelName = "my-chat-room";

  // TODO: Create a ReliableChannel
  // reliableChannel = await ReliableChannel.create(
  //   node,
  //   channelName,
  //   senderId,
  //   encoder,
  //   decoder
  // );

  // TODO: Add message-received listener
  // reliableChannel.addEventListener("message-received", (event) => {
  //   const wakuMessage = event.detail;
  //   if (!wakuMessage.payload) return;
  //
  //   const { timestamp, sender, message } = DataPacket.decode(wakuMessage.payload);
  //
  //   const messageDiv = document.createElement('div');
  //   messageDiv.className = 'message';
  //   messageDiv.innerHTML = `
  //     <div class="message-sender">${sender}</div>
  //     <div class="message-time">${new Date(Number(timestamp)).toLocaleString()}</div>
  //     <div class="message-content">${message}</div>
  //   `;
  //   messagesEl.appendChild(messageDiv);
  // });

  // TODO: Add delivery tracking listeners
  // reliableChannel.addEventListener("sending-message-irrecoverable-error", (event) => {
  //   console.error('Failed to send message:', event.detail.error);
  //   statusEl.textContent = '❌ Error sending message';
  // });
  //
  // reliableChannel.addEventListener("message-sent", (event) => {
  //   console.log('Message sent:', event.detail);
  //   statusEl.textContent = '✔ Message sent!';
  // });
  //
  // reliableChannel.addEventListener("message-acknowledged", (event) => {
  //   console.log('Message acknowledged:', event.detail);
  //   statusEl.textContent = '✔✔ Message acknowledged!';
  // });

  // TODO: Update status and enable send button
  // statusEl.textContent = 'Ready! Type a message and click Send!';
  // sendButton.disabled = false;

  statusEl.textContent = 'Complete the TODOs to enable reliable messaging!';
}

// TODO: Implement the sendMessage function
function sendMessage() {
  const messageText = messageInput.value.trim();
  if (!messageText || !reliableChannel) return;

  // TODO: Create a message object
  // const protoMessage = DataPacket.create({
  //   timestamp: Date.now(),
  //   sender: senderId,
  //   message: messageText,
  // });

  // TODO: Serialize the message
  // const payload = DataPacket.encode(protoMessage).finish();

  // TODO: Send the message and get the message ID
  // const messageId = reliableChannel.send(payload);
  // console.log('Sending message with ID:', messageId);

  // Clear the input
  messageInput.value = '';
  statusEl.textContent = 'Sending message...';
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

initWaku().catch(console.error);
