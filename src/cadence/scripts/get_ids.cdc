//import NonFungibleToken from 0x01cf0e2f2f715450
import NonFungibleToken from 0x045a1763c93006ca

import ExampleNFT from 0x179b6b1cb6755e31

// This transaction returns an array of all the nft ids in the collection

pub fun main() {
    let acct = getAccount(0x179b6b1cb6755e31)
    let collectionRef = acct.getCapability(/public/NFTCollection)!.borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    log("acc 0x179b6b1cb6755e31")
    log(collectionRef.getIDs())

    let acct2 = getAccount(0x01cf0e2f2f715450)
        let collectionRef2 = acct2.getCapability(/public/NFTCollection)!.borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")
        
    log("acc 0x01cf0e2f2f715450")
    log(collectionRef2.getIDs())

}
 