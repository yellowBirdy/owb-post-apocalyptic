import React, {useState} from "react"
import { Tab } from "semantic-ui-react"

import {Scavenge, Craft} from "./components/sections"



const {Pane} = Tab
const providerPanes = ({forms, combinations})=> [
    { menuItem: "Scavenge", render: () => <Scavenge forms={forms}></Scavenge>},
    { menuItem: "Craft", render: () => <Craft forms={forms} combinations={combinations}></Craft> },
  ]
const constructorPanes = [
    { menuItem: "The Bunker", render: () => <Pane>Bunking</Pane> },
    { menuItem: "The Base", render: () => <Pane>Basing</Pane> },
  
]
  

export default () => {
    const [forms, setForm] = useState([{
            "name": "Alpha-Omega NRG Cell",
            "version:": "MK1",
            "category": "energy",
            "consumable": "T",
            "durability": "ideatic", 
            "power_level": "8889",
            "transferable": "F",
            "rarity": "common",
            "id": "0"
        },{
            "name": "Alpha-Omega NRG Generator Template",
            "version:": "MK1",
            "category": "energy",
            "consumable": "F",
            "durability": "ideatic", 
            "power_level": "8889",
            "transferable": "F",
            "rarity": "common",
            "id": "1"
        },{
            "name": "Alpha-Omega NRG Generator",
            "version:": "MK1",
            "category": "energy",
            "consumable": "T",
            "durability": "ideatic", 
            "power_level": "9001",
            "transferable": "F",
            "rarity": "common",
            "id": "2"
        },{
            "name": "Green Lasecannon Construction Kit",
            "version:": "MK1",
            "category": "weapon",
            "consumable": "T",
            "durability": "ideatic", 
            "power_level": "9001",
            "transferable": "T",
            "rarity": "epic",
            "id": "3"
        }
    ])
    const [combinations, setCombinations] = useState([{
            name:        "Alpha-Omega NRG Generator", 
            ingredients: ["Alpha-Omega NRG Cell", "Alpha-Omega NRG Generator Template"], 
            products:    ["Alpha-Omega NRG Generator"],
            consumed:    ["Alpha-Omega NRG Cell"]
        }
    ])

    const panes = [...providerPanes({forms, combinations}), ...constructorPanes]
    return (
        <Tab panes={panes} />    
    )
}