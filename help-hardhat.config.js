developmentChains = ["hardhat","local"]

networkConfig={
    1115511:{
        name:"sepolia",
        sourceRouter:"0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
        linkToken:"0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"
    },
    80002:{
        name:"amoy",
        sourceRouter:"0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2",
        linkToken:"0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904"
    }
}

module.exports = {
    developmentChains,
    networkConfig
}