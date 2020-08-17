// This is an example implementation of a Flow Non-Fungible Token
// It is not part of the official standard but it assumed to be
// very similar to how many NFTs would implement the core functionality.

import NonFungibleToken from 0xNFTStandardAddress

//import NonFungibleToken from 0x045a1763c93006ca

pub contract SurvivalNFT: NonFungibleToken {

    pub var totalSupply: UInt64
    pub var formCount: UInt32
    pub var combinationCount: UInt32

    pub event ContractInitialized( )
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Minted(id: UInt64)
            
    pub event FormCreated(id: UInt32, name: String)
    pub event FormDataCreated(id: UInt32, fields: {String: String})
    
    pub event CombinationCreated(id: UInt32, ingredients: [UInt32], products:[UInt32])

    

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64

        pub var metadata: {String: String}

        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }
    }

    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        // withdraw removes an NFT from the collection and moves it to the caller
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @SurvivalNFT.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // borrowNFT gets a reference to an NFT in the collection
        // so that the caller can read its metadata and call its methods
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }
    pub resource Form {
        //this is a "template" resource  holding reference to the FromData and 
        // acting as a template for the actual nfts
        pub let id: UInt32
        pub let name: String
        
        init(name: String, fields: {String: String}) {
            pre {
                name.length > 0: "New Form has to have a non empty name" //TODO: enforec uniqueness
            }
            self.id = SurvivalNFT.formCount + UInt32(1)
            SurvivalNFT.formCount = SurvivalNFT.formCount + UInt32(1)
            self.name = name

            //TODO crate a new FormData in a corresponding array which needs to be declared on the contract level

            emit FormCreated(id: self.id, name: self.name)


        }
    }


    pub struct FormData {

        pub let id: UInt32
        pub let fields: {String: String}

        init(fields: {String: String}, id: UInt32) {
            pre {
                fields.length > 0: "New Form fields can't be empty"
                id == SurvivalNFT.formCount: "New Form Data can only be created for newly created Form"
            }
            self.id = id

            self.fields = fields

            emit FormDataCreated(id: self.id, fields: self.fields)
        }
    }
    pub struct Combination {

        pub let id: UInt32
        pub let ingredients: [UInt32] // array of consumable form ids
        pub let products: [UInt32] // array of product form ids
        //TODO: add probability distribution for the products

        init(ingredients: [UInt32], products: [UInt32]) {
            pre {
                ingredients.length > 0: "New Combination ingredients can't be empty"
                products.length > 0: "New Combination products can't be empty"
            }
            self.id = SurvivalNFT.combinationCount + UInt32(1)
            SurvivalNFT.combinationCount = SurvivalNFT.combinationCount + UInt32(1)

            self.ingredients = ingredients
            self.products = products 

            emit CombinationCreated(id: self.id, ingredients: self.ingredients, products: self.products)

        }
    }

    // TODO: MintCombination function 
    // would rquire a multisig - not possible in fcl now (doublecheck)
    // or somekind of a marketplace maybe with a whitelist 


    // public function that anyone can call to create a new empty collection
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    // Resource that an admin or something similar would own to be
    // able to mint new NFTs
    //
	pub resource NFTMinter {

		// mintNFT mints a new NFT with a new ID
		// and deposit it in the recipients collection using their collection reference
		pub fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}) {

			// create a new NFT
			var newNFT <- create NFT(initID: SurvivalNFT.totalSupply)

			// deposit it in the recipient's account using their reference
			recipient.deposit(token: <-newNFT)

            SurvivalNFT.totalSupply = SurvivalNFT.totalSupply + UInt64(1)
            //double generate every 5th token
            /*if SurvivalNFT.totalSupply % UInt64(5) == UInt64(0)   {
                var newerNFT <- create NFT(initID: SurvivalNFT.totalSupply)

			// deposit it in the recipient's account using their reference
			    recipient.deposit(token: <-newerNFT)

                SurvivalNFT.totalSupply = SurvivalNFT.totalSupply + UInt64(1)
            }
            */
            //double generate every 5th token on average
            if unsafeRandom() % UInt64(5) == UInt64(0)   {
                var newerNFT <- create NFT(initID: SurvivalNFT.totalSupply)

			// deposit it in the recipient's account using their reference
			    recipient.deposit(token: <-newerNFT)

                SurvivalNFT.totalSupply = SurvivalNFT.totalSupply + UInt64(1)
            }

		}
	}

	init() {
        // Initialize the total supply
        self.totalSupply      = 0
        self.formCount        = 0
        self.combinationCount = 0

        // Create a Collection resource and save it to storage
        if self.account.load<&Collection>(from: /storage/NFTCollection) != nil  {
            let collection <- create Collection()
            self.account.save(<-collection, to: /storage/NFTCollection)
                    // create a public capability for the collection

            self.account.link<&{NonFungibleToken.CollectionPublic}>(
            /public/NFTCollection,
            target: /storage/NFTCollection
)
        
        }


        // Create a Minter resource and save it to storage
        let oldMinter <- self.account.load<@NFTMinter>(from:/storage/NFTMinter)
        destroy oldMinter


        let minter <- create NFTMinter()
        self.account.save(<-minter, to: /storage/NFTMinter)

        emit ContractInitialized()
	}
}
 