import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a202fe09dda14511880bd532b37f2179");

const web3  = new Web3(provider);

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const address = "0x7c52CD838486842E4f219412B1B718473dDdEC68";

const checkSumValue = web3.utils.toChecksumAddress(address)
console.log('value of checksumb', checkSumValue);
const vmContract = new web3.eth.Contract(abi,"0x7c52CD838486842E4f219412B1B718473dDdEC68");
export default vmContract;
