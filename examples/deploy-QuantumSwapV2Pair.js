const path = require("node:path");
const { Initialize } = require("quantumcoin/config");
const { getProvider } = require("quantumcoin");
const { createTestWallet } = require("./_test-wallet");
const parentQswapPath = path.join(__dirname, "..");
const { QuantumSwapV2Pair__factory } = require(parentQswapPath);

async function main() {
  const rpcUrl = process.env.QC_RPC_URL;
  if (!rpcUrl) throw new Error("QC_RPC_URL is required");
  const chainId = process.env.QC_CHAIN_ID ? Number(process.env.QC_CHAIN_ID) : 123123;
  await Initialize(null);

  const provider = getProvider(rpcUrl, chainId);
  const wallet = createTestWallet(provider);

  const factory = new QuantumSwapV2Pair__factory(wallet);
  const contract = await factory.deploy({ gasLimit: 600000 });
  const tx = contract.deployTransaction();
  if (tx) await tx.wait(1, 600_000);

  console.log("Deployed QuantumSwapV2Pair at:", contract.target);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
