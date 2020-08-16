import React, {useState} from "react"
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"

import mintUrl from "../../../cadence/transactions/mint.cdc";
import execute_transaction_factory from "../../../flow/execute_transaction_factory"

import {SelectAccount} from "../../subcomponents"


//TODO: extract mint for reuse into transaction handlers
const mint = async ({classId = 2, targetAddress}) => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    const do_mint = await execute_transaction_factory(mintUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress
    })
    const mintTx = await do_mint([
        fcl.arg(2, types.UInt32),
        fcl.arg(targetAddress, types.Address), //TODO: pass targetAddress here
    ])
    fcl.tx(mintTx).subscribe(txStatus => {
        if (fcl.tx.isExecuted(txStatus)) {
          console.log("SurvivalNFT has been minted for: "+targetAddress);
        }
    });
      
}   



export default () => {
    const [selectedAccount, setSelectedAccount] = useState("")

    const mintSelected = async () => {
        mint({targetAddress: selectedAccount});
    }

    return (<div className="mintForm">
        <button onClick={mintSelected}>Mint</button>
        <SelectAccount onChange={e=>setSelectedAccount(e.target.value)} value={selectedAccount} />
    </div>)
}
