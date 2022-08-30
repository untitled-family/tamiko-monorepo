// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

// Name: Tamiko
// Description: Generate metadata based on Tamiko struct
// Twitter: @hellotamiko
// Design: biron.eth
// Build: himlate.eth

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./utils/Helpers.sol";
import "./utils/Base64.sol";
import "./utils/SVG.sol";
import "./interfaces/ITamikoRenderer.sol";
import "./libraries/TamikoLibrary.sol";

contract TamikoRenderer is ITamikoRenderer {
    string[9] public BASE_COLORS = [
        "#FFFFFF",
        "#458FFF",
        "#F55800",
        "#7FC83B",
        "#97EBFF",
        "#FFF7AC",
        "#485160",
        "#FFE600",
        "#A943E8"
    ];

    string public egg =
        '<rect width="64" height="64" fill="#B6BDC8"/><path d="M41 46H23V49H24V50H25V51H27V52H37V51H39V50H40V49H41V46Z" fill="#5C5E6D"/><path d="M36 30H28V31H27V32H26V33H25V35H24V46H25V47H26V48H27V49H37V48H38V47H39V46H40V35H39V33H38V32H37V31H36V30Z" fill="white"/><path d="M30 30H31V31H30V30Z" fill="#B6BDC8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M39 44H38V45H31V44H30V43H29V41H28V34H29V32H30V31H28V32H27V33H26V39H25V40H24V44H25V45H24V46H26V47H27V48H29V49H35V48H37V47H38V46H40V45H39V44ZM27 47V46H29V47H27Z" fill="#B6BDC8"/><path d="M39 44V43H40V44H39Z" fill="#B6BDC8"/><path d="M36 32H37V33H38V35H37V34H36V32Z" fill="#5C5E6D"/><path d="M33 35H34V36H35V37H36V38H35V39H34V40H33V39H32V38H31V37H32V36H33V35Z" fill="#5C5E6D"/><path d="M36 43H37V44H36V43Z" fill="#5C5E6D"/><path d="M36 44V45H35V44H36Z" fill="#5C5E6D"/><path d="M37 44H38V45H37V44Z" fill="#5C5E6D"/><path d="M29 45H27V44H26V46H27V47H30V46H29V45Z" fill="#5C5E6D"/><path d="M24 37H25V35H26V39H25V40H24V37Z" fill="#5C5E6D"/><path d="M34 29V30H30V29H34Z" fill="#14181F"/><path d="M28 31V30H30V31H28Z" fill="#14181F"/><path d="M27 32V31H28V32H27Z" fill="#14181F"/><path d="M26 33V32H27V33H26Z" fill="#14181F"/><path d="M25 35V33H26V35H25Z" fill="#14181F"/><path d="M24 37V35H25V37H24Z" fill="#14181F"/><path d="M24 44H23V37H24V44Z" fill="#14181F"/><path d="M25 46H24V44H25V46Z" fill="#14181F"/><path d="M26 47H25V46H26V47Z" fill="#14181F"/><path d="M27 48H26V47H27V48Z" fill="#14181F"/><path d="M29 49H27V48H29V49Z" fill="#14181F"/><path d="M35 49V50H29V49H35Z" fill="#14181F"/><path d="M35 48V49H37V48H38V47H39V46H40V44H41V37H40V35H39V33H38V32H37V31H36V30H34V31H36V32H37V33H38V35H39V37H40V44H39V46H38V47H37V48H35Z" fill="#14181F"/>';
    string public level1 =
        '<rect width="64" height="64" fill="#CDD024"/><path d="M40 54H18V56H19V57H39V56H40V54Z" fill="#608D00"/><path d="M29 43H37V44H38V45H39V53H29V52H28V51H27V45H28V44H29V43Z" fill="#FFF9D8"/><path d="M23 52V53H25V52H23Z" fill="#FFF9D8"/><path d="M31 42H36V43H37V44H30V45H29V47H28V50H29V52H30V53H39V54H21V53H25V45H26V44H27V43H31V42Z" fill="#CDD024"/><path d="M32 51H34V52H32V51Z" fill="#CDD024"/><path d="M35 52V51H37V52H35Z" fill="#CDD024"/><path d="M34 47V51H32V47H34Z" fill="#141B00"/><path d="M37 51V47H35V51H37Z" fill="#141B00"/><path fill-rule="evenodd" clip-rule="evenodd" d="M31 40V41H30V42H27V43H26V44H25V45H24V51H20V52H19V54H20V55H39V54H40V45H39V44H38V43H37V41H36V40H34V41H33V40H31ZM33 41V43H34V41H36V43H37V44H38V45H39V54H20V52H25V45H26V44H27V43H31V41H33Z" fill="#141B00"/><path d="M31 41V43H32V42H33V41H31Z" fill="#608D00"/><path d="M28 43H27V44H26V45H25V52H20V53H25V52H26V45H27V44H28V43Z" fill="#608D00"/><path d="M34 43H35V42H36V41H34V43Z" fill="#608D00"/><path d="M31 41H32V42H31V41Z" fill="#B40B00"/><path d="M27 44H26V45H27V44Z" fill="#B40B00"/><path d="M25 46H26V47H25V46Z" fill="#B40B00"/><path d="M26 48H25V49H26V48Z" fill="#B40B00"/><path d="M25 50H26V51H25V50Z" fill="#B40B00"/><path d="M20 52H21V53H20V52Z" fill="#B40B00"/><path d="M22 52H23V53H22V52Z" fill="#B40B00"/><path d="M25 52H24V53H25V52Z" fill="#B40B00"/><path d="M35 41H34V42H35V41Z" fill="#B40B00"/><path d="M27 46H26V47H27V46Z" fill="#FF382C"/><path d="M26 48H27V49H26V48Z" fill="#FF382C"/><path d="M26 50H27V51H26V50Z" fill="#FF382C"/><path d="M26 52H27V53H26V52Z" fill="#FF382C"/><path d="M25 53H24V54H25V53Z" fill="#FF382C"/><path d="M22 53H23V54H22V53Z" fill="#FF382C"/><path d="M21 53H20V54H21V53Z" fill="#FF382C"/>';
    string public level2 =
        '<rect width="64" height="64" fill="#5297FF"/><path d="M40 54H18V56H19V57H39V56H40V54Z" fill="#0354F1"/><path d="M29 43H37V44H38V45H39V53H29V52H28V51H27V45H28V44H29V43Z" fill="#DBEEFF"/><path d="M23 52V53H25V52H23Z" fill="#DBEEFF"/><path d="M31 42H36V43H37V44H30V45H29V47H28V50H29V52H30V53H39V54H21V53H25V45H26V44H27V43H31V42Z" fill="#5297FF"/><path d="M32 51H34V52H32V51Z" fill="#5297FF"/><path d="M35 52V51H37V52H35Z" fill="#5297FF"/><path d="M34 47V51H32V47H34Z" fill="#01002D"/><path d="M37 51V47H35V51H37Z" fill="#01002D"/><path fill-rule="evenodd" clip-rule="evenodd" d="M31 40V41H30V42H27V43H26V44H25V45H24V51H20V52H19V54H20V55H39V54H40V45H39V44H38V43H37V41H36V40H34V41H33V40H31ZM33 41V43H34V41H36V43H37V44H38V45H39V54H20V52H25V45H26V44H27V43H31V41H33Z" fill="#01002D"/><path d="M31 41V43H32V42H33V41H31Z" fill="#0354F1"/><path d="M28 43H27V44H26V45H25V52H20V53H25V52H26V45H27V44H28V43Z" fill="#0354F1"/><path d="M34 43H35V42H36V41H34V43Z" fill="#0354F1"/><path d="M31 41H32V42H31V41Z" fill="#CF1886"/><path d="M27 44H26V45H27V44Z" fill="#CF1886"/><path d="M25 46H26V47H25V46Z" fill="#CF1886"/><path d="M26 48H25V49H26V48Z" fill="#CF1886"/><path d="M25 50H26V51H25V50Z" fill="#CF1886"/><path d="M20 52H21V53H20V52Z" fill="#CF1886"/><path d="M22 52H23V53H22V52Z" fill="#CF1886"/><path d="M25 52H24V53H25V52Z" fill="#CF1886"/><path d="M35 41H34V42H35V41Z" fill="#CF1886"/><path d="M27 46H26V47H27V46Z" fill="#FF78E1"/><path d="M26 48H27V49H26V48Z" fill="#FF78E1"/><path d="M26 50H27V51H26V50Z" fill="#FF78E1"/><path d="M26 52H27V53H26V52Z" fill="#FF78E1"/><path d="M25 53H24V54H25V53Z" fill="#FF78E1"/><path d="M22 53H23V54H22V53Z" fill="#FF78E1"/><path d="M21 53H20V54H21V53Z" fill="#FF78E1"/>';

    function tokenURI(
        TamikoLibrary.CuteTamiko memory _tamiko,
        TamikoLibrary.Timings memory _timings,
        TamikoLibrary.Skills memory _skills
    ) external view returns (string memory) {
        uint256 hatchStatus = TamikoLibrary.getHatchStatus(_tamiko, _timings);
        uint256 level = TamikoLibrary.getLevelStatus(_tamiko, _timings);
        string memory img;

        if (level == 0) {
            img = egg;
        } else if (level == 1) {
            img = level1;
        } else {
            img = level2;
        }

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                "{",
                                '"name": "Tamiko",',
                                '"attributes":[',
                                helpers.attribute(
                                    "breeder",
                                    Strings.toHexString(
                                        uint256(uint160(_tamiko.breeder)),
                                        20
                                    ),
                                    false
                                ),
                                helpers.attribute(
                                    "level",
                                    helpers.uint2str(_tamiko.level),
                                    true
                                ),
                                helpers.attribute(
                                    "alive",
                                    TamikoLibrary.isTamikoDead(_timings)
                                        ? "false"
                                        : "true",
                                    true
                                ),
                                helpers.attribute(
                                    "power",
                                    helpers.uint2str(_skills.power),
                                    true
                                ),
                                helpers.attribute(
                                    "speed",
                                    helpers.uint2str(_skills.speed),
                                    true
                                ),
                                helpers.attribute(
                                    "defense",
                                    helpers.uint2str(_skills.defense),
                                    true
                                ),
                                "],",
                                '"image": "',
                                string(
                                    abi.encodePacked(
                                        "data:image/svg+xml;base64,",
                                        Base64.encode(
                                            bytes(
                                                string.concat(
                                                    '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">',
                                                    img,
                                                    "</svg>"
                                                )
                                            )
                                        )
                                    )
                                ),
                                '"'
                                "}"
                            )
                        )
                    )
                )
            );
    }
}
