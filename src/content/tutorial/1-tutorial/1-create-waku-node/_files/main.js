// TODO: Import createLightNode and HealthStatus from '@waku/sdk'

const statusEl = document.getElementById('status');

async function initWaku() {
  statusEl.textContent = 'Creating Waku node...';

  // TODO: Create a Light Node with defaultBootstrap: true
  // const node = await createLightNode({ defaultBootstrap: true });

  // TODO: Update status to show the node's peer ID
  // statusEl.textContent = `Node created! Peer ID: ${node.libp2p.peerId.toString()}`;

  // TODO: Add event listener for 'waku:health' events
  // node.events.addEventListener("waku:health", (event) => {
  //   const health = event.detail;
  //
  //   if (health === HealthStatus.SufficientlyHealthy) {
  //     statusEl.textContent = '✅ Connected to Waku Network!';
  //   } else if (health === HealthStatus.MinimallyHealthy) {
  //     statusEl.textContent = '⚠️ Connected but may have issues';
  //   } else {
  //     statusEl.textContent = '❌ Disconnected from network';
  //   }
  // });

  statusEl.textContent = 'Complete the TODOs to create a node and monitor health!';
}

// Start the app
initWaku().catch(console.error);
