import SurvivalNFT from 0xNFTAddress

transaction (combinationId: UInt32, ingredientIds: [UInt64] ,adminAddress: Address) {
    
    let ingredients: @SurvivalNFT.Collection
    let myReceiver: &{SurvivalNFT.SurvivalCollectionPublic}
    prepare (signer: AuthAccount) {
        // check if admin account
        self.ingredients <- SurvivalNFT.createEmptyCollection()
        let myCollection = signer.borrow<&SurvivalNFT.Collection>(from: /storage/NFTCollection)!
        //deposit ingredients into the collection to be sent to the minter
        for id in ingredientIds {
            let ingredient <- myCollection.withdraw(withdrawID: id)
            self.ingredients.deposit(token: <-ingredient)
        }
        self.myReceiver = //signer.getCapability(/public/NFTCollection)!
            signer.borrow<&{SurvivalNFT.SurvivalCollectionPublic}>(from: /storage/NFTCollection)!
    }

    execute {

        let artisan = getAccount(targetAddress).getCapability(/public/NFTCombinationMinter)!
            .borrow<&{SurvivalNFT.NFTCombinationMinter}>()!

       
        artisan.mintNFTFromCombination(recipient: self.myReceiver, ingredients: self.ingredients, combinationId: combinationId)
        log("Total Supply:")
        log(SurvivalNFT.totalSupply)
    }

}
 