"use strict";

type Command = {
    name: string;
    x: number;
    y: number;
    direction: string;
  };

const tableWidth = 5;
const tableHeight = 5;
const directions = ["NORTH","EAST","SOUTH","WEST"];

module.exports = function Robot(commandsList: string[]) {
    console.log();
    console.log(commandsList);

    let robotCurrentDirection = 0;

    let positionX: number = 0;
    let positionY: number = 0;
    let isRobotPlaced: boolean = false;
    let commands: Command[] = [];

    for (let i = 0; i < commandsList.length; i++) {
        var placeInstructions = commandsList[i].split(" "); // Initiates primary split
        let command: Command = {
            name: placeInstructions[0],
            x: 0,
            y: 0,
            direction: ''
        };
        if (placeInstructions.length == 2) {
            var position = placeInstructions[1].split(","); // split parameters
            command.x = parseInt(position[0]);
            command.y = parseInt(position[1]);
            command.direction = position[2];
        }
        commands.push(command);
    }

    let isDirection = (str: string) => !!~directions.indexOf(str);

    let checkPlaceParams = (command: Command) => (
        isDirection(command.direction) &&
        command.x >= 0 && 
        command.y >= 0 && 
        command.x < tableWidth && 
        command.y < tableHeight 
    );

    let place = function (command: Command) {
        if (checkPlaceParams(command)) {
            positionX = command.x;
            positionY = command.y;
            robotCurrentDirection = directions.indexOf(command.direction);
            isRobotPlaced = true;
        }
    };

    let rotate = function (turn: string) {
        let newDir = (robotCurrentDirection + ((turn == "LEFT") ? 3 : 1)) % 4;
        robotCurrentDirection = newDir;
    };

    let move = function () {
        switch (robotCurrentDirection) {
            case 0: // North
                if((positionY + 1) < tableHeight) {
                    positionY++;
                }
                else {
                    console.log(">> Robot cannot move, because it will fall");
                }
                break;
            case 1: // East
                if((positionX + 1) < tableWidth) {
                    positionX++;
                }
                else {
                    console.log(">> Robot cannot move, because it will fall");
                }
                break;
            case 2: // South
                if((positionY - 1) >= 0) {
                    positionY--;
                }
                else {
                    console.log(">> Robot cannot move, because it will fall");
                }
                break;
            case 3: // West
                if((positionX - 1) >= 0) {
                    positionX--;
                }
                else {
                    console.log(">> Robot cannot move, because it will fall");
                }
                break;
        }
    };

    let report = function () {
        console.log([positionX, positionY, directions[robotCurrentDirection]].join(","));
    };

    commands.forEach(function (command) {
        switch (command.name) {
            case "PLACE":
                place(command);
                break;
            case "LEFT":
            case "RIGHT":
                isRobotPlaced ? rotate(command.name) : console.log(">> Robot is not placed yet. Command ignored: " + command.name);
                break;
            case "MOVE":
                isRobotPlaced ? move() : console.log(">> Robot is not placed yet. Command ignored: " + command.name);
                break;
            case "REPORT":
                isRobotPlaced ? report() : console.log(">> Robot is not placed yet. Command ignored: " + command.name);
                break;
            default:
                console.log(">> Unrecognised command: " + command.name);
                break;
        }
    });
};
