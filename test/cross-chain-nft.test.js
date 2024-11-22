const { getNamedAccounts, ethers, deployments } = require("hardhat")
const {expect} = require("chai")

let firstAccount
let ccipLocalSimulator
let nft
let poolLockAndRelease
let wnft
let poolBurnAndMint
let chainSelect

before(async function(){
   firstAccount = (await getNamedAccounts()).firstAccount
   await deployments.fixture(["all"])

   ccipLocalSimulator =await ethers.getContract("CCIPLocalSimulator",firstAccount)
   nft = await ethers.getContract("MyToken",firstAccount)
   poolLockAndRelease =
     await ethers.getContract("NFTPoolLockAndRelease",firstAccount
    )
    wnft =await ethers.getContract("WrappedMyToken",firstAccount)
    poolBurnAndMint =await ethers.getContract("NFTBurnAndMint",firstAccount)
    
   const ccipConfig= await ccipLocalSimulator.configuration()
   chainSelect = ccipConfig.chainSelector_

})

describe("source chain -> dest chain tests",async function(){
    it("test if user can mint a nft form nft contract successfully",
        async function(){
        await nft.safeMint(firstAccount)
        const newOwner = await nft.ownerOf(0)
        expect(newOwner).to.equal(firstAccount)
    })

    it("nft transferFrom firstAccount to NFTLockAndRelease",
        async function(){
         await nft.approve(poolLockAndRelease.target,0)
         await ccipLocalSimulator.requestLinkFromFaucet(poolLockAndRelease.target,ethers.parseEther("10"))
         await poolLockAndRelease.lockAndSendNFT(0,firstAccount,chainSelect,poolBurnAndMint.target)
         const nftNewOwner = await nft.ownerOf(0)
         expect(nftNewOwner).to.equal(poolLockAndRelease.target)
    })

    it("wnft owner is firstAccount",async function(){
        const owner=  await wnft.ownerOf(0)
        expect(owner).to.equal(firstAccount)
    })

    describe("dest chain => source chain tests",async function(){
        it("burn wnft and release nft",async function(){

         await wnft.approve(poolBurnAndMint.target,0)   
         await ccipLocalSimulator.requestLinkFromFaucet(poolBurnAndMint.target,ethers.parseEther("10"))
         await poolBurnAndMint.burnAndSendNFT(0,firstAccount,chainSelect,poolLockAndRelease.target)
        
         //下面两种方式都能验证
        //  const totalSupply = await wnft.totalSupply()
        //  expect(totalSupply).to.equal(0)

         const nftNewOwner = await nft.ownerOf(0)
         expect(nftNewOwner).to.equal(firstAccount)
        })
    })
})