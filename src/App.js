import React from 'react';
import * as sdk from "@onflow/sdk"
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"

import {Login, Logout, DeployStandard, DeployNFT, Mint, Install} from "./components/buttons"
import {ShowCollection} from  "./components/buttons/script"
//import './App.css';

window.fcl = fcl
window.sdk = sdk
window.types = types

fcl.config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate")
  .put("accessNode", "http://localhost:8080")

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
        <div className="auth">  
          <p>Auth</p>
          <Login /> 
          <Logout />
        </div>
        <div className="contracts">
          <p>Contracts</p>
          <DeployStandard />
          <DeployNFT />
        </div>
        <div className="transactions">
          <p>Trans</p>
          <Install />
          <Mint />
        </div>
        <div className="scripts">
          <p>Scripts</p>
          <ShowCollection />
        </div>
      </div>
    </div>
  );
}

export default App;
