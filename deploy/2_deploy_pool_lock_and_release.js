const { network } = require("hardhat");
const {developmentChains,networkConfig} = require("../help-hardhat.config");

module.exports = async({account,deployments})=>{
    const {firstAccount}  = await getNamedAccounts();
    const {deploy,log} = await deployments;
    log("Deploy pool lock and release contract...")
    const nftDeployment = await deployments.get("MyToken")
    let sourceChainRouter
    let linkTokenAddr
    if(developmentChains.includes(network.name)){
        const ccipDeployment = await deployments.get("CCIPLocalSimulator")
        // const nft = await ethers.getContractAt("NFTPoolLockAndRelease",nftDeployment.address)
        const ccipLocalSimulator =
         await ethers.getContractAt("CCIPLocalSimulator",ccipDeployment.address)
         //设置配置信息，由ccip提供
         const ccipConfig =await ccipLocalSimulator.configuration()
         sourceChainRouter = ccipConfig.sourceRouter_
         linkTokenAddr = ccipConfig.linkToken_
    }else{
        sourceChainRouter = networkConfig[network.config.chainId].sourceRouter
        linkTokenAddr = networkConfig[network.config.chainId].linkToken
    }
   
  await  deploy("NFTPoolLockAndRelease",{
        contract:"NFTPoolLockAndRelease",
        from:firstAccount,
        log:true,
        args:[sourceChainRouter,linkTokenAddr,nftDeployment.address]
    })

    log("NFTPoolLockAndRelease contact delpoy successfully" )
}

module.exports.tags = ["soucchain" ,"all"]