import NonFungibleToken from 0xNFTStandardAddress

import SurvivalNFT from 0xNFTAddress

// This transaction returns an array of all the nft ids in the collection together with their metadata

pub fun main(): {UInt64: {String: String}} {
    let acct = getAccount(0xtargetAddress)
    let collectionRef = acct.getCapability(/public/NFTCollection)!.borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    let ids = collectionRef.getIDs()
    let details: {UInt64: {String: String}} = {}
    for id in ids {
        details[id] = SurvivalNFT.getFormData(id)
    }

    log(details)
    return details
}
 
    