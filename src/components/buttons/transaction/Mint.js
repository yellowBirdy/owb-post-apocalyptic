import React, {useState} from "react"
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"

import mintUrl from "../../../cadence/transactions/mint.cdc";
import execute_transaction_factory from "../../../flow/execute_transaction_factory"

//TODO: extract mint for reuse into transaction handlers
const mint = async ({classId = 2, targetAddress}) => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    const do_mint = await execute_transaction_factory(mintUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress
    })
    const tx = do_mint([
        fcl.arg(2, types.UInt32),
        fcl.arg(targetAddress, types.Address), //TODO: pass targetAddress here
      ])
}   



export default () => {
    const [selectedAccount, setSelectedAccount] = useState('0x179b6b1cb6755e31')

    const mintSelected = async () => {
        mint({targetAddress: selectedAccount});
    }

    return (<div className="mintForm">
        <button onClick={mintSelected}>Mint</button>
        <select onChange={e=>{setSelectedAccount(e.target.value)}} value={selectedAccount}>
            <option value="0x179b6b1cb6755e31">Contract Acc</option>
            <option value="0xf3fcd2c1a78f5eee">Some Guy or Gal</option>
        </select>
    </div>)
}
