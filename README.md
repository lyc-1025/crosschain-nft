# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```



安装openzeppelin
npm install -D @openzeppelin/contracts

NFTPoolLockAndRelease.sol  复制chainlink CCIP 中提供好的：
https://docs.chain.link/ccip/tutorials/send-arbitrary-data
安装CCIP :npm install -D @chainlink/contracts-ccip
![alt text](ccip-示意图.png)