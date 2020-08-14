import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

import get_idslUrl from "../../../cadence/scripts/get_ids.cdc";
import execute_script_factory from "../../../flow/execute_script_factory"


const get_ids = async () => {
    const NFTStandardAddress = "0x01cf0e2f2f715450"
        , NFTAddress = "0x179b6b1cb6755e31"
        , userData = await fcl.currentUser().snapshot()
        , targetAddress = `0x${userData.addr}`
    const do_get_ids = await execute_script_factory(get_idslUrl, {
        query: /(0xNFTStandardAddress|0xNFTAddress|0xtargetAddress)/g,
        "0xNFTStandardAddress": NFTStandardAddress,
        "0xNFTAddress": NFTAddress,
        "0xtargetAddress": targetAddress
    }, 
    true)
    //return await do_get_ids()
    return await fcl.decode(await do_get_ids())
}   



export default () => {
    const [NFT_ids, setNFT_ids] = useState([])
    const [targetAddress, setCurrentAddress] = useState('No user')
    
    useEffect( () => {
        async function getCurrentAddress () {
            const userData = await fcl.currentUser().snapshot()
            setCurrentAddress(`0x${userData.addr}`)
        }
        getCurrentAddress()
    }, [NFT_ids])

    return <div>
        <button onClick={async ()=>setNFT_ids(await get_ids())}>Show Collection</button>
            <p>User {targetAddress} posses following tokens: {NFT_ids.join(", ")} </p>
    </div>
}