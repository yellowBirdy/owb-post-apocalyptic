import React from 'react';
import * as sdk from "@onflow/sdk"
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"

//import './App.css';


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
        <button onClick={fcl.authenticate}>Log in</button>    
        <button onClick={()=>{console.log('logging out'); fcl.unauthenticate()}}>Log out</button>          
      </div>
    </div>
  );
}

export default App;
