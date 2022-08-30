// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

// Name: Revive
// Description: Use it to revive a dead Tamiko
// Twitter: @hellotamiko
// Design: biron.eth
// Build: himlate.eth
// Item Builder: himlate.eth
// Build your own item: https://github.com/untitled-family/tamiko-contract

import "../interfaces/ITamikoItem.sol";
import "../libraries/TamikoLibrary.sol";

contract Revive is ITamikoItem {
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

        if (!TamikoLibrary.isTamikoDead(_timings)) {
            revert("Tamiko is not dead");
        }

        newTimings.lastFed = block.timestamp;
        newSkills.speed = _skills.speed == 0 ? 0 : _skills.speed - 1;

        return (newTamiko, newTimings, newSkills);
    }
}
