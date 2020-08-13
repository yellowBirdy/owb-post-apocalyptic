import React from "react"
import * as fcl from "@onflow/fcl"

import get_idslUrl from "../../../cadence/scripts/get_ids.cdc";
import execute_script_factory from "../../../flow/execute_script_factory"


const do_get_ids = async () => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    const do_get_ids = await execute_script_factory(get_idslUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress
    }, 
    true)
    //return await do_get_ids()
    console.log(await fcl.decode(await do_get_ids()))

}   

export default () => <button onClick={do_get_ids}>Show Collection</button>
