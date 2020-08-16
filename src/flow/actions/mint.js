import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"

import mintUrl from "../../cadence/transactions/mint.cdc";
import execute_transaction_factory from "../execute_transaction_factory"

export default async ({classId = 2, targetAddress}) => {
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