import React from "react"
import { Grid, Tab, Table } from "semantic-ui-react"

const {Pane} = Tab
const providerPanes = [
    { menuItem: "Scavenge", render: () => 
        <Pane>
            Go scavenge, chose a sector around you and sand you men.
            At first scan the area adjacent to the Bunker In case anything interesting can be found there.

            Jungle whereabouts


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
        </Pane> },
    { menuItem: "Craft", render: () => <Pane>Crafting</Pane> },
  ]
const constructorPanes = [
    { menuItem: "The Bunker", render: () => <Pane>Bunking</Pane> },
    { menuItem: "The Base", render: () => <Pane>Basing</Pane> },
  
]
  

export default () => {
    return (
        <Grid columns={2}>
            <Grid.Column>
                <Tab panes={providerPanes} />    
            </Grid.Column> 
            <Grid.Column>
                <Tab panes={constructorPanes} />
            </Grid.Column>    
        </Grid> 
    )
}