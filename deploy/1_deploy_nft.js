

module.exports = async({account,deployments})=>{
    const {firstAccount} = await getNamedAccounts();
    const {deploy,log} = await deployments
    log("Deploy nft contract")
   await deploy("MyToken",{
        contract:"MyToken",
        from:firstAccount,
        log:true,
        args:["MyToken","MT"]
    })
    log("nft contract deploy sucessfully")
}

module.exports.tags = ["sourcechain","all"]