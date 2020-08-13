//import NonFungibleToken from 0x01cf0e2f2f715450
import NonFungibleToken from 0xNFTStandardAddress

import ExampleNFT from 0xNFTAddress

// This transaction returns an array of all the nft ids in the collection

pub fun main(): [UInt64] {
    let acct = getAccount(0x179b6b1cb6755e31)
    let collectionRef = acct.getCapability(/public/NFTCollection)!.borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    log(collectionRef.getIDs())
    return collectionRef.getIDs()
}
 