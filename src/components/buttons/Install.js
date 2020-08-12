import React from "react"

import installUrl from "../../cadence/transactions/install.cdc";
import execute_transaction_factory from "../../flow/execute_transaction_factory"


const install = async () => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    const do_install = await execute_transaction_factory(installUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress
    })
    const tx = do_install()
}   

export default () => <button onClick={install}>Install</button>
