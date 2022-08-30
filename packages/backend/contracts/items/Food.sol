// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

// Name: Food
// Description: Use it to feed Tamiko - Can be used to evolve Tamiko to level 2
// Twitter: @hellotamiko
// Design: biron.eth
// Build: himlate.eth
// Item Builder: himlate.eth
// Build your own item: https://github.com/untitled-family/tamiko-contract

import "../interfaces/ITamikoItem.sol";
import "../libraries/TamikoLibrary.sol";

contract Food is ITamikoItem {
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
        )
    {
        TamikoLibrary.CuteTamiko memory newTamiko = _tamiko;
        TamikoLibrary.Timings memory newTimings = _timings;
        TamikoLibrary.Skills memory newSkills = _skills;

        if (newTamiko.level == 1 && _timings.hatchDate > 0) {
            newTamiko.level += 1;
        }

        newSkills.power++;
        newSkills.speed += 2;

        newTimings.lastFed = block.timestamp;

        return (newTamiko, newTimings, newSkills);
    }
}
