import * as fcl from "@onflow/fcl"
import * as sdk from "@onflow/sdk"
import * as types from "@onflow/types"

window.fcl = fcl
window.sdk = sdk
window.types = types

fcl.config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate")
  .put("accessNode", "http://localhost:8080")
