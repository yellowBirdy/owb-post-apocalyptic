import React from "react";

import mintUrl from "../../cadence/transactions/mint.cdc";
import execute_transaction from "../../flow/execute_transaction"


const mint = async (classId, targetAddress) => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    execute_transaction(mintUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress
    })
}   

export default () => <button onClick={mint}>Mint</button>
