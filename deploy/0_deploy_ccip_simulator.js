const { getNamedAccounts, deployments, network } = require("hardhat");

const { developmentChains } = require("../help-hardhat.config");

module.exports = async ({ account, deployments }) => {
  if (developmentChains.includes(network.name)) {
    const { firstAccount } = await getNamedAccounts();
    const { deploy, log } = deployments;
    log("Deploy CCIPLocalSimulator contract");
    await deploy("CCIPLocalSimulator", {
      contract: "CCIPLocalSimulator",
      from: firstAccount,
      log: true,
      args: [],
    });
    log("CCIPLocalSimulator contract deploy sucessfully");
  }
};

module.exports.tags = ["test", "all"];
