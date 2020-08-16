import * as fcl from "@onflow/fcl"

import installUrl from "../../cadence/transactions/install.cdc";
import execute_transaction_factory from "../execute_transaction_factory"


export default async () => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    const do_install = await execute_transaction_factory(installUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress
    })
    const installTx = await do_install()

    fcl.tx(installTx).subscribe(txStatus => {
        if (fcl.tx.isExecuted(txStatus)) {
            console.log(`SurvivalNFT has been installed for current account.`)
        }
    })
}  