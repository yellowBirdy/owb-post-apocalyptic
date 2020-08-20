import React, {useState} from 'react'
import * as fcl from "@onflow/fcl"

//TODO: find out when removed and how to replace it


export default () => { 
    const [address, setAddress] = useState('')
    const [accountData, setAccountData] = useState(null)

    //TODO: move it to utils
    const getAccData = async (address) => {
        const response = await fcl.send([
            fcl.getAccount(address)
        ])
        return (await fcl.decode(response))
    }

    const fetchAccData = async () => {
        setAccountData(await getAccData(address))
    }

    return (<div className="latestBlock">
        <button onClick={fetchAccData}>Get acc data</button>
        <input type="text" onChange={e=>setAddress(e.target.value)} value={address} />
        <p>Acc: {accountData && JSON.stringify(accountData, null, 4)}</p>
    </div>)
}