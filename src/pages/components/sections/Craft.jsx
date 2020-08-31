import React, {useState} from "react"
import { Tab, Table, Button, Card } from "semantic-ui-react"

import {mintCombination} from "../../../flow/actions/"

export default ({forms}) => {
    const [combination, setCombination] = useState(null)
    const [loot, setLoot] = useState([])
    const {Pane} = Tab

    const cb = () => {
        setTimeout(()=>{
            alert(`Crafting successful!
            received: ${forms[2].name}`) 
            setLoot([forms[2]])
        }, 2000)
    }
    

    const onClick = (e)=>{
        e.preventDefault()
        mintCombination({ingredientIds:[0,1], cb})
    }
    return (
        <Pane>
            Produce better equipment and subprotudcs (cooperative crafting comming soon)!

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>Inventory</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Consumable</Table.HeaderCell>
                        <Table.HeaderCell>Rarity</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                <Table.Row>
                    <Table.Cell>Alpha-Omega NRG Generator Template</Table.Cell>
                    <Table.Cell>energy</Table.Cell>
                    <Table.Cell>not</Table.Cell>
                    <Table.Cell>common</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Alpha-Omega NRG Cell</Table.Cell>
                    <Table.Cell>energy</Table.Cell>
                    <Table.Cell>yes</Table.Cell>
                    <Table.Cell>common</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Green Lasecannon construction kit</Table.Cell>
                    <Table.Cell>weapon</Table.Cell>
                    <Table.Cell>yes</Table.Cell>
                    <Table.Cell>epic</Table.Cell>
                </Table.Row>

                </Table.Body>
            </Table>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>Available for crafting</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Ingredients</Table.HeaderCell>
                        <Table.HeaderCell>Consuming</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                <Table.Row onClick={e=>setCombination("Alpha-Omega NRG Generator")}>
                    <Table.Cell>Alpha-Omega NRG Generator</Table.Cell>
                    <Table.Cell>Alpha-Omega NRG Generator Template, Alpha-Omega NRG Cell</Table.Cell>
                    <Table.Cell>Alpha-Omega NRG Cell</Table.Cell>
                </Table.Row>
        
        
                </Table.Body>
            </Table>
             <Button onClick={onClick}>Start crafting {combination || "nothing"}</Button>
            
            {loot.length? loot.map(piece=>
                <Card key={piece.id}
                    header={piece.name}
                    description={Object.entries(piece).map(([key,val])=><p key={val}><b>{`${key}:  `}</b>{val}</p>)}
                />)
                : null}
                
        </Pane> 
    )
}