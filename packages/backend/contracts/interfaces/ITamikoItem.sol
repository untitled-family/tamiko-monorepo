// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

import "../libraries/TamikoLibrary.sol";

interface ITamikoItem {
    function useItem(
        TamikoLibrary.CuteTamiko memory _tamiko,
        TamikoLibrary.Timings memory _timings,
        TamikoLibrary.Skills memory _skills
    )
        external
        view
        returns (
            TamikoLibrary.CuteTamiko memory,
            TamikoLibrary.Timings memory,
            TamikoLibrary.Skills memory
        );
}
