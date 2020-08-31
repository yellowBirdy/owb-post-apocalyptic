import React, {useState} from "react"
import { Tab, Table, Button, Card } from "semantic-ui-react"

import {mint} from "../../../flow/admin_actions/"
import {NFTAddress} from "../../../config" 

export default () => {
    const [onMission, setOnMission] = useState(false)
    const [loot, setLoot] = useState([])
    const {Pane} = Tab

    const cb = () => {
        setTimeout(()=>{
            setOnMission(false)
            alert("Mission Success!")
            setLoot([{name: "one two three"}])
        }, 5000)
    }
    

    const onClick = (e)=>{
        e.preventDefault()
        setOnMission(true)
        mint({targetAddress: NFTAddress, formId:0, cb})
    }
    return (
        <Pane>
            Go scavenge, chose a sector around you and sand you men.
            At first scan the area adjacent to the Bunker In case anything interesting can be found there.

            <p>Region: Jungle whereabouts</p>

            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Drop Chance</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                <Table.Row>
                    <Table.Cell>Alpha-Omega NRG Cell</Table.Cell>
                    <Table.Cell>89%</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Green Lasecannon construction kit</Table.Cell>
                    <Table.Cell>5%</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Scraps</Table.Cell>
                    <Table.Cell>93%</Table.Cell>
                </Table.Row>
                </Table.Body>
            </Table>
            <Button onClick={onClick}>Start the mission</Button>
            <p>Status: {onMission? "On Mission": "Idle"}</p>
            {loot.length? loot.map(piece=><p key={piece.name}>{piece.name}</p>): null}
        </Pane> 
    )
}