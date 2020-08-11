import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";
import * as types from "@onflow/types";
import loadCode from "../utils/prepare_cadence_code";

export default async (url, match) => {
  const user = fcl.currentUser();
  const { authorization } = user;
  const code = await loadCode(url, match);

  return fcl.send(
    [
      sdk.transaction`${code}`,
      fcl.args([
        fcl.arg(2, types.UInt32),
        fcl.arg("0x01cf0e2f2f715450", types.Address),
      ]),
      fcl.proposer(authorization),
      fcl.payer(authorization),
      fcl.authorizations([authorization]),
      fcl.limit(100)
    ],
    {
      node: "http://localhost:8080"
    }
  );
};