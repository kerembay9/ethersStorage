const ethers = require("ethers");
const fs = require("fs-extra");
async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
    const wallet = new ethers.Wallet("0xcfc7cfcb830b1994596cd810d42b770253bdb04b6f2250a3aace1a1751a1ccda",provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf-8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf-8");
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying, please wait");
    const contract = await contractFactory.deploy();
    const transactionReceipt = await contract.deploymentTransaction().wait(1);
}

main()
.then(() => process.exit(0))
.catch((error) =>{
    console.error(error);
    process.exit(1);
}); 