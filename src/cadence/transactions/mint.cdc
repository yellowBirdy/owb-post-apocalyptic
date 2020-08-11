//import NonFungibleToken from 0x01cf0e2f2f715450
import NonFungibleToken from 0xNFTStandardAddress

import ExampleNFT from 0xNFTAddress

transaction (classId: UInt32, targetAddress: Address) {

    let minter: &ExampleNFT.NFTMinter
    prepare (signer: AuthAccount) {
        // check if admin account
        self.minter = signer.borrow<&ExampleNFT.NFTMinter>(from:/storage/NFTMinter) ?? 
            panic("Can't borrow minter, trying to mint from nonadmin account.")
    }

    execute {
        //let target = getAccount(0x179b6b1cb6755e31).getCapability(/public/NFTCollection)!
        let target = getAccount(targetAddress).getCapability(/public/NFTCollection)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()!

        self.minter.mintNFT(recipient: target)
        log("Total Supply:")
        log(ExampleNFT.totalSupply)
    }

}
 