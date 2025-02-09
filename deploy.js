const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf-8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf-8");
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying, please wait");
    const contract = await contractFactory.deploy();
    await contract.deploymentTransaction().wait(1);
    console.log(`Contract Address:${contract.target}`)
    const currentFavoriteNumber = await contract.retrieve();
    console.log(currentFavoriteNumber.toString());
    const transactionResponse = await contract.store("7");
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();
    console.log(`updated favorite number is ${updatedFavoriteNumber}`)
}

main()
.then(() => process.exit(0))
.catch((error) =>{
    console.error(error);
    process.exit(1);
}); 