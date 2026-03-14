const path = require("node:path");
const { Initialize } = require("quantumcoin/config");
const { getProvider } = require("quantumcoin");
const parentQswapPath = path.join(__dirname, "..");
const { WQ } = require(parentQswapPath);

async function main() {
  const rpcUrl = process.env.QC_RPC_URL;
  if (!rpcUrl) throw new Error("QC_RPC_URL is required");
  const chainId = process.env.QC_CHAIN_ID ? Number(process.env.QC_CHAIN_ID) : 123123;
  const address = process.env.CONTRACT_ADDRESS;
  if (!address) throw new Error("CONTRACT_ADDRESS is required");
  await Initialize(null);

  const provider = getProvider(rpcUrl, chainId);
  const contract = WQ.connect(address, provider);

  console.log("WQ:", contract.target);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
