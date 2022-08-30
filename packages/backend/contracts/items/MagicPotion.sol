// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

// Name: Magic Potion
// Description: Use it to evolve a Tamiko to level 3
// Twitter: @hellotamiko
// Design: biron.eth
// Build: himlate.eth
// Item Builder: himlate.eth
// Build your own item: https://github.com/untitled-family/tamiko-contract

import "../interfaces/ITamikoItem.sol";
import "../libraries/TamikoLibrary.sol";

contract MagicPotion is ITamikoItem {
    function useItem(
        TamikoLibrary.CuteTamiko memory _tamiko,
        TamikoLibrary.Timings memory _timings,
        TamikoLibrary.Skills memory _skills
    )
        external
        pure
        returns (
            TamikoLibrary.CuteTamiko memory,
            TamikoLibrary.Timings memory,
            TamikoLibrary.Skills memory
        )
    {
        TamikoLibrary.CuteTamiko memory newTamiko = _tamiko;
        TamikoLibrary.Timings memory newTimings = _timings;
        TamikoLibrary.Skills memory newSkills = _skills;
        require(newTamiko.level == 2, "Tamiko needs to be level 2");

        if (newTamiko.level == 2) {
            newTamiko.level += 1;
        }

        return (newTamiko, newTimings, newSkills);
    }
}
