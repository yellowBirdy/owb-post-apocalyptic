import * as fcl from "@onflow/fcl"

import get_form_dataUrl from "../../cadence/scripts/get_form_data.cdc";
import execute_script_factory from "../../flow/execute_script_factory"



export default async ({formId}) => {
    const NFTAddress = "0x179b6b1cb6755e31"
    const do_get_form_data = await execute_script_factory(get_form_dataUrl, {
        query: /(0xNFTAddress|id_placeholder)/g,
        "0xNFTAddress": NFTAddress,
        "id_placeholder": formId
    }, 
    true)

    let fd = await do_get_form_data()
    console.log(fd)
    window.fd = fd

    return await fcl.decode(fd)
}   