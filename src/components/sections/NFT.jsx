import React from 'react';

import {DeployStandard, DeployNFT, Mint, Install} from "../buttons/transaction"
import {ShowCollection} from  "../buttons/script"

export default () => <div className="NFT">
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