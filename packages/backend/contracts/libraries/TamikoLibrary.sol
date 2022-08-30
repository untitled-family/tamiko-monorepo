// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

library TamikoLibrary {
    struct UsedItem {
        uint256 lastUsed;
        uint256 timesUsed;
    }

    struct Timings {
        uint256 lastFed;
        uint256 hatchDate;
    }

    struct Skills {
        uint256 power;
        uint256 speed;
        uint256 defense;
    }

    struct CuteTamiko {
        uint256 seed;
        address breeder;
        address hatcher;
        uint256 element;
        uint256 level;
        bool isAliveForever;
    }

    struct Item {
        uint256 id;
        string name;
        string description;
        string svg;
        uint256 price;
        address payable creator;
    }

    uint256 public constant TIME_TO_HATCH = 1 minutes; // egg to age 0
    uint256 public constant TIME_TO_BREED = 1 minutes; // level 3+ to egg
    uint256 public constant TIME_TO_DIE = 10 minutes;
    uint256 public constant TIME_TO_GROW = 1 minutes; // level 1 to 2
    uint256 public constant TIME_TO_EVOLVE = 1 minutes; // age++

    function hasDatePassed(uint256 _date, uint256 _offset)
        internal
        view
        returns (bool)
    {
        if (_date == 0) {
            return false;
        }

        return (block.timestamp >= (_date + _offset));
    }

    function isTamikoDead(TamikoLibrary.Timings memory _timings)
        internal
        view
        returns (bool)
    {
        if (_timings.lastFed == 0) {
            return false;
        }

        return
            TamikoLibrary.hasDatePassed(
                _timings.lastFed,
                TamikoLibrary.TIME_TO_DIE
            );
    }

    // 0: hatch not started | 1: hatch started | 2: hatch finished
    function getHatchStatus(
        TamikoLibrary.CuteTamiko memory _tamiko,
        TamikoLibrary.Timings memory _timings
    ) internal view returns (uint256) {
        if (_tamiko.hatcher == address(0)) {
            return 0;
        }

        return hasDatePassed(_timings.hatchDate, TIME_TO_HATCH) ? 2 : 1;
    }

    function getLevelStatus(
        TamikoLibrary.CuteTamiko memory _tamiko,
        TamikoLibrary.Timings memory _timings
    ) internal view returns (uint256) {
        if (_tamiko.level == 1) {
            return hasDatePassed(_timings.hatchDate, TIME_TO_HATCH) ? 1 : 0;
        } else if (_tamiko.level == 2) {
            return hasDatePassed(_timings.lastFed, TIME_TO_GROW) ? 2 : 1;
        } else if (_tamiko.level == 3) {
            return hasDatePassed(_timings.lastFed, TIME_TO_EVOLVE) ? 3 : 2;
        }

        return 0;
    }
}
