# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:
```shell
工具安装 
https://www.bilibili.com/video/BV1RFsfe5Ek5?spm_id_from=333.788.videopod.episodes&vd_source=57542c9de3d2d63bcaa34d762a4872ae&p=4
0:14:35 - 
homebrew 安装 nvm
nvm 安装各个版本nodejs

通过brew安装工具
brew -v 
brew update
brew install nvm
```

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
```shell
git pull --rebase origin main
安装openzeppelin
npm install -D @openzeppelin/contracts
NFTPoolLockAndRelease.sol  复制chainlink CCIP 中提供好的：
https://docs.chain.link/ccip/tutorials/send-arbitrary-data
安装CCIP :npm install -D @chainlink/contracts-ccip
```
![alt text](ccip-示意图.png)

```shell
安装env-enc:
npm install --save-dev @chainlink/env-enc
```