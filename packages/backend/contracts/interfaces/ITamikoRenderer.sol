// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

import "../libraries/TamikoLibrary.sol";

interface ITamikoRenderer {
    function tokenURI(
        TamikoLibrary.CuteTamiko memory _tamiko,
        TamikoLibrary.Timings memory _timings,
        TamikoLibrary.Skills memory _skills
    ) external view returns (string memory);
}
