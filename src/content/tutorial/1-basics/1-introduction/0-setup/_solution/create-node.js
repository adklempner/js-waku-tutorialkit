import { createLightNode } from "@waku/sdk";

async function main() {
  console.log("Creating Waku Light Node...");

  // Create a light node with autosharding configuration
  const waku = await createLightNode({
    defaultBootstrap: true,
    networkConfig: {
      clusterId: 1,
      numShardsInCluster: 8
    }
  });

  console.log("Waku node created successfully!");
  console.log("Node peer ID:", waku.libp2p.peerId.toString());

  // Display node info
  console.log("Network configuration:", {
    clusterId: 1,
    numShardsInCluster: 8,
    usingDefaultBootstrap: true
  });

  console.log("Node is ready to connect to the Waku Network!");
}

main().catch(console.error);
