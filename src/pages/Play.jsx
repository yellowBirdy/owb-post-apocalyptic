import React from "react"
import { Grid, Tab, Table, Button } from "semantic-ui-react"

import {Scavenge} from "./components/sections"

const {Pane} = Tab
const providerPanes = [
    { menuItem: "Scavenge", render: () => <Scavenge></Scavenge>},
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