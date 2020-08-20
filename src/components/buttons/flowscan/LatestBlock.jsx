import React, {useState} from 'react'
import * as fcl from "@onflow/fcl"



export default () => { 
    const [blockData, setBlockData] = useState('NA')

    const getLatestBlock = async () => {
        const response = await fcl.send([
            fcl.getLatestBlock()
        ])
        setBlockData(await fcl.decode(response))
    }

    return (<div className="latestBlock">
        <button onClick={getLatestBlock}>Get letest block</button>
        <p>Latest Block Data: {blockData && JSON.stringify(blockData, null, 4)}</p>
    </div>)
}