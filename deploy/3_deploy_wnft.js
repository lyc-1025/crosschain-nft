

module.exports = async({account,deployments})=>{
    const {firstAccount} = await getNamedAccounts();
    const {deploy,log} = await deployments
    log("Deploy wnft contract")
   await deploy("WrappedMyToken",{
        contract:"WrappedMyToken",
        from:firstAccount,
        log:true,
        args:["WrappedMyToken","WMT"]
    })
    log("wnft contract deploy sucessfully")
}

module.exports.tags = ["destchain","all"]