import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"


import mintUrl from "../../cadence/admin_transactions/mint.cdc";
import execute_transaction_factory from "../execute_transaction_factory"

export default async ({classId = 2, targetAddress}) => {
    const do_mint = await execute_transaction_factory(mintUrl)
    
    const mintTx = await do_mint([
        fcl.arg(classId, types.UInt32),
        fcl.arg(targetAddress, types.Address), //TODO: pass targetAddress here
    ])
    fcl.tx(mintTx).subscribe(txStatus => {
        if (fcl.tx.isExecuted(txStatus)) {
          console.log("SurvivalNFT has been minted for: "+targetAddress);
        }
    });
      
} 