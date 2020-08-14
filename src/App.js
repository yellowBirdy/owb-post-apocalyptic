import React from 'react';
import * as sdk from "@onflow/sdk"
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"

import {NFT, User, Flowscan} from "./components/sections"

import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You wake up on a makeshift bed at the wall of your bunker with an unesy feeling in your gut.
          You know... They are coming.
        </p>
        <p>
          Brace yourself. 
        </p>
      </header>
      <div className="interactions">
        <User />
        <NFT />
        <Flowscan />
      </div>
    </div>
  );
}

export default App;
