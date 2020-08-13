import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";
import * as types from "@onflow/types";
import loadCode from "../utils/prepare_cadence_code";

export default async (url, match, passCurrentAddressAsArg = false) => {
  const userData = await fcl.currentUser().snapshot();
  const currentAddress = `0x${userData.addr}`;
  const code = await loadCode(url, match);

  return function (args = []) {
    if (passCurrentAddressAsArg) args.unshift(fcl.arg(currentAddress, types.Address))
    return fcl.send(
      [
        sdk.script`${code}`,
        //fcl.args(args),      
      ],
      {
        node: "http://localhost:8080"
      }
    );
  };
};