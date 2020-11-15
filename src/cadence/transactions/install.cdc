import NonFungibleToken from 0xNFTStandardAddress

import SurvivalNFT from 0xNFTAddress

transaction {
    prepare (signer:AuthAccount) {
        let newCollection <- SurvivalNFT.createEmptyCollection() as! @SurvivalNFT.Collection
        signer.save<@SurvivalNFT.Collection>(<-newCollection, to: /storage/NFTCollection)
        signer.link<&{SurvivalNFT.SurvivalCollectionPublic}>(/public/NFTCollection, target: /storage/NFTCollection)
    }
}
 
