import React, {useState} from "react"

import {mint} from "../../../flow/admin_actions"
import {SelectAccount} from "../../subcomponents"


export default () => {
    const [selectedAccount, setSelectedAccount] = useState("")

    const mintSelected = async () => {
        mint({targetAddress: selectedAccount});
    }

    return (<div className="mintForm">
        <button onClick={mintSelected}>Mint</button>
        <SelectAccount onChange={e=>setSelectedAccount(e.target.value)} value={selectedAccount} />
    </div>)
}
