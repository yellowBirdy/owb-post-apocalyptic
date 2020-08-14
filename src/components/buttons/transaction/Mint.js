import React from "react"
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"

import mintUrl from "../../../cadence/transactions/mint.cdc";
import execute_transaction_factory from "../../../flow/execute_transaction_factory"


const mint = async (classId, targetAddress) => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    const do_mint = await execute_transaction_factory(mintUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress
    })
    const tx = do_mint([
        fcl.arg(2, types.UInt32),
        fcl.arg(NFTAddress, types.Address), //TODO: pass targetAddress here
      ])

}   

export default () => <button onClick={mint}>Mint</button>
