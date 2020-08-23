import * as fcl from "@onflow/fcl"

import get_idslUrl from "../../cadence/scripts/get_collection_detailed.cdc";
import execute_script_factory from "../../flow/execute_script_factory"



export default async ({targetAddress}) => {

    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
    const do_get_collection = await execute_script_factory(get_idslUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress|0xtargetAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress,
        "0xtargetAddress": targetAddress
    }, 
    true)
    return await fcl.decode(await do_get_collection())
}   