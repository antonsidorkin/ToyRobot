// To run it, type: ts-node .

"use strict";

const Robot = require('./Robot.ts');


// Original tests
Robot(["PLACE 0,0,NORTH","MOVE","REPORT"]); // 0,1,NORTH
Robot(["PLACE 0,0,NORTH","LEFT","REPORT"]); // 0,0,WEST

// Additional tests
Robot(["PLACE 1,2,NORTH", "MOVE", "LEFT", "MOVE", "REPORT"]); // Result: 0,3,WEST
Robot(["PLACE 1,2,EAST","MOVE","MOVE","MOVE","LEFT","MOVE","REPORT"]); // Result: 4,3,NORTH
Robot(["PLACE 3,1,EAST","MOVE","MOVE","LEFT","MOVE","REPORT"]); // One MOVE is ignored to prevent falling. Result: 4,2,NORTH
Robot(["PLACE 4,3,NORTH","MOVE","RIGHT","MOVE","MOVE","REPORT"]); // Two MOVEs are ignored to prevent falling. Result: 4,4,EAST
