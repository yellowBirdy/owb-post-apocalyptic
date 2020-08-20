// This is an example implementation of a Flow Non-Fungible Token
// It is not part of the official standard but it assumed to be
// very similar to how many NFTs would implement the core functionality.

import NonFungibleToken from 0xNFTStandardAddress

//import NonFungibleToken from 0x045a1763c93006ca

pub contract SurvivalNFT: NonFungibleToken {

    pub var version: UInt16
    pub var totalSupply: UInt64
    pub var formCount: UInt32
    pub var combinationCount: UInt32

    pub var forms: @[Form]
    pub var formNameToId: {String: UInt32}
    pub var formData: [FormData]
    pub var combinations: [Combination]
    pub var combinationNameToId: {String: UInt32}


    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Minted(id: UInt64, formId: UInt32)
            
    pub event FormCreated(id: UInt32, name: String)
    pub event FormDataCreated(id: UInt32, fields: {String: String})
    
    pub event CombinationCreated(id: UInt32, ingredients: [UInt32], products: [UInt32])

    

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let contractVersion: UInt16

        //TODO: Enforce nontransferable and consumable resources

        pub let formId: UInt32

        init(formId : UInt32) {
            pre {
                SurvivalNFT.forms.length > Int(formId): "Can't mint an NFT from nonexisting form"
            }
            self.contractVersion = SurvivalNFT.version
            self.id = SurvivalNFT.totalSupply
            self.formId = formId
            SurvivalNFT.totalSupply = SurvivalNFT.totalSupply + UInt64(1)

            emit Minted(id: self.id, formId: self.formId)
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

        init(id: UInt32, fields: {String: String}) {
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
	pub resource NFTAdmin {

		// mintNFT mints a new NFT with a new ID
		// and deposit it in the recipients collection using their collection reference
		pub fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}) {

			// create a new NFT
            var formId: UInt32 = 0

			var newNFT <- create NFT(formId: formId)

			// deposit it in the recipient's account using their reference
			recipient.deposit(token: <-newNFT)

           
            //double generate every 10th token on average
            if unsafeRandom() % UInt64(10) == UInt64(0)   {
                var newerNFT <- create NFT(formId: formId)

			// deposit it in the recipient's account using their reference
			    recipient.deposit(token: <-newerNFT)

            }
		}
        pub fun mintForm(name: String, fields: {String: String}) {
            pre {
                //TODO: enforce unique name
                name.length > 0: "A form has to have a name"
                fields.length > 0: "Form has to have at least one field"
            }
            let newForm <-create Form(name: name, fields: fields)
            SurvivalNFT.formNameToId[name] = newForm.id
            SurvivalNFT.formData.append(FormData(id: newForm.id, fields: fields))

            SurvivalNFT.forms.append(<-newForm)
        }
        pub fun crateCombination () {

        }
	}
    
    // getFormData returns all the fields associated with a specific Form
    // 
    // Parameters: formId: The id of the Form that is being searched
    //
    // Returns: The metadata as a String to String mapping optional
    pub fun getFormData(_ formId: UInt32): {String: String} {
        pre {
            formId < SurvivalNFT.formCount: "Trying to access nonexisting form "
        }
        return self.formData[formId].fields
    }
    // getFormDataByField returns the metadata associated with a 
    //                        specific field of the metadata
    //                        Ex: field: "power_level" will return something
    //                        like "9001"
    // 
    // Parameters: formId: The id of the Form that is being searched
    //             field: The field to search for
    //
    // Returns: The metadata field as a String Optional
 /*    pub fun getFormDataByField(formId: UInt32, field: String): String? {
        // Don't force a revert if the playID or field is invalid
        if let form = SurvivalNFT.formData[formId] {
            return form.fields[field]
        } else {
            return nil
        }
    }
*/
	init() {
        // Initialize the total supply
        self.totalSupply      = 0
        self.formCount        = 0
        self.combinationCount = 0
        self.version          = 0 //remember to increment in code or find a way to remember the totalSupply etc
                                  // between contract ver deployments, perhaps in a resource

        self.forms        <- []
        self.formData     =  []
        self.formNameToId =  {}
        self.combinations =  []
        self.combinationNameToId = {}


        // Create an Admin resource and save it to storage
        let oldAdmin <- self.account.load<@NFTAdmin>(from:/storage/NFTAdmin)
        destroy oldAdmin


        let admin <- create NFTAdmin()

        //mint initial form
        let fields: {String: String} = {
            "durability": "ideatic", 
            "power_level": "9001",
            "transferable": "F"
            }
        admin.mintForm(name: "Alpha-Omega NRG Cell", fields: fields )

        self.account.save(<-admin, to: /storage/NFTAdmin)


        emit ContractInitialized()
	}
}
 