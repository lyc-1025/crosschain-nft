const { getNamedAccounts, ethers, network } = require("hardhat")
const {developmentChains,networkConfig} = require("../help-hardhat.config");

module.exports = async({account,deployments})=>{
    const {firstAccount}  = await getNamedAccounts();
    const {deploy,log} = await deployments;
    log("Deploy pool burn and mint contract...")
    const wnftDeployment = await deployments.get("WrappedMyToken")
    let destChainRouter
    let linkTokenAddr
    if(developmentChains.includes(network.name)){
        const ccipDeployment = await deployments.get("CCIPLocalSimulator")
        const ccipLocalSimulator =
         await ethers.getContractAt("CCIPLocalSimulator",ccipDeployment.address)
         //设置配置信息，由ccip提供
         const ccipConfig =await ccipLocalSimulator.configuration()
         destChainRouter = ccipConfig.destinationRouter_
         linkTokenAddr = ccipConfig.linkToken_
    }else{
        destChainRouter = networkConfig[network.config.chainId].sourceRouter
        linkTokenAddr = networkConfig[network.config.chainId].linkToken
    }
   
   await deploy("NFTBurnAndMint",{
        contract:"NFTBurnAndMint",
        from:firstAccount,
        log:true,
        args:[destChainRouter,linkTokenAddr,wnftDeployment.address]
    })

    log("NFTBurnAndMint contact delpoy successfully" )
}

module.exports.tags = ["destchain" ,"all"] 