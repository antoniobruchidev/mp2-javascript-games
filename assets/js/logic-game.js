// Defining the css positions of the droppable backlight squares and
const positions = {
    one: { top: 2, left: 2 },
    two: { top: 2, left: 92 },
    three: { top: 2, left: 182 },
    four: { top: 2, left: 272, },
    five: { top: 92, left: 2 },
    six: { top: 92, left: 92 },
    seven: { top: 92, left: 182 },
    eight: { top: 92, left: 272 },
    nine: { top: 182, left: 2 },
    ten: { top: 182, left: 92 },
    eleven: { top: 182, left: 182 },
    twelve: { top: 182, left: 272 },
    thirteen: { top: 272, left: 2 },
    fourteen: { top: 272, left: 92 },
    fifteen: { top: 272, left: 182, },
    empty: { top: 272, left: 272 },
}

// Defining the css position of droppable backlight squares on very small devices
const verySmallDevicePositions = {
    one: { top: 2, left: 2 },
    two: { top: 2, left: 77 },
    three: { top: 2, left: 152 },
    four: { top: 2, left: 227, },
    five: { top: 77, left: 2 },
    six: { top: 77, left: 77 },
    seven: { top: 77, left: 152 },
    eight: { top: 77, left: 227 },
    nine: { top: 152, left: 2 },
    ten: { top: 152, left: 77 },
    eleven: { top: 152, left: 152 },
    twelve: { top: 152, left: 227 },
    thirteen: { top: 227, left: 2 },
    fourteen: { top: 227, left: 77 },
    fifteen: { top: 227, left: 152, },
    empty: { top: 227, left: 227 },
}

// Defining the in game positions of the draggable squares
const userPositions = {
    one: { top: 2, left: 2, inPosition: "one" },
    two: { top: 2, left: 92, inPosition: "two" },
    three: { top: 2, left: 182, inPosition: "three" },
    four: { top: 2, left: 272, inPosition: "four" },
    five: { top: 92, left: 2, inPosition: "five" },
    six: { top: 92, left: 92, inPosition: "six" },
    seven: { top: 92, left: 182, inPosition: "seven" },
    eight: { top: 92, left: 272, inPosition: "eight" },
    nine: { top: 182, left: 2, inPosition: "nine" },
    ten: { top: 182, left: 92, inPosition: "ten" },
    eleven: { top: 182, left: 182, inPosition: "eleven" },
    twelve: { top: 182, left: 272, inPosition: "twelve" },
    thirteen: { top: 272, left: 2, inPosition: "thirteen" },
    fourteen: { top: 272, left: 92, inPosition: "fourteen" },
    fifteen: { top: 272, left: 182, inPosition: "fifteen" },
    empty: { top: 272, left: 272, inPosition: "empty", acceptableSquares: [] },
    current: { square: null, squareAt: null, empty: null, oldAcceptables: [] },
    score: { moves: 0, timer: 0, timerId: null },
    finished: false,
}

/**
 * Function that shows the square in the position the user moved it
 * @param {string} square - the id of a square 
 */
const setSquare = (square) => {
    $("#" + square).css("top", userPositions[square].top).css("left", userPositions[square].left);
}

/**
 * Function that save in the game state the position in which the user wants to move the square and call the function that sets it.
 * @param {string} square - the id of the square
 * @param {string} inPosition - the backlight square as in "backlight-{inPosition} which in which it will be dropped
 */
const changePosition = (square, inPosition) => {
    userPositions[square].inPosition = inPosition;
    if (window.innerWidth > 360){
        userPositions[square].top = positions[inPosition].top;
        userPositions[square].left = positions[inPosition].left;
    } else {
        userPositions[square].top = verySmallDevicePositions[inPosition].top;
        userPositions[square].left = verySmallDevicePositions[inPosition].left;
    }
    setSquare(square);
}

/**
 * 
 * @returns array of objects containing the id of a square and its position
 */
const scrambleSquares = () => {
    // defining two array with the keys of position. one will represent a square and the other the position it will be placed
    let squareToScramble = Object.keys(positions);
    let keys = Object.keys(positions);
    // array to be populated
    let scrambledSquares = [];
    // while loop to be executed until the array is fully populated
    while (scrambledSquares.length < 16) {
        // creating a random number relative to the lenght of the array representing the squares
        let scrambledSquare = Math.floor(Math.random() * (squareToScramble.length - 1));
        // creating an object with the randomized id of the square and the position contained in the array starting at index 0 of the not yet populated array at the first cycle
        let squareIdPosition = { id: squareToScramble[scrambledSquare], inPosition: keys[scrambledSquares.length]}
        // populating the array
        scrambledSquares.push(squareIdPosition);
        // deleting the square from the array of squares
        squareToScramble = squareToScramble.filter(function (square) {
            return square !== squareToScramble[scrambledSquare];
        });
    }
    return scrambledSquares;
}

/** Function that starts a new game */
const newGame = () => {
    // retrieving a set of randomized squares to set ip position
    let scrambledSquares = scrambleSquares();
    for ( let scrambledSquare of scrambledSquares) {
        // setting the position of each square
        changePosition(scrambledSquare.id,scrambledSquare.inPosition);
    }
    // changing class to game area and the squares
    $("#logic-game-area").removeClass("lga-success").addClass("lga-gameplay");
    $(".square-disabled").removeClass("square-disabled").addClass("square-enabled");
}

/**
 * 
 * @returns array containing the positions acceptable by the empty square
 */
const movableSquareAtPosition = () => {
    let emptyPosition = userPositions.empty.inPosition;
    switch (emptyPosition) {
        case "one":
            accepted = ["two", "five"];
            break;
        case "two":
            accepted = ["one", "three", "six"];
            break;
        case "three":
            accepted = ["two", "four", "seven"];
            break;
        case "four":
            accepted = ["three", "eight"];
            break;
        case "five":
            accepted = ["one", "six", "nine"];
            break;
        case "six":
            accepted = ["two", "seven", "five", "ten"];
            break;
        case "seven":
            accepted = ["three", "eight", "six", "eleven"];
            break;
        case "eight":
            accepted = ["four", "seven", "twelve"];
            break;
        case "nine":
            accepted = ["five", "ten", "thirteen"];
            break;
        case "ten":
            accepted = ["six", "eleven", "nine", "fourteen"];
            break;
        case "eleven":
            accepted = ["seven", "twelve", "ten", "fifteen"];
            break;
        case "twelve":
            accepted = ["eight", "eleven", "empty"];
            break;
        case "thirteen":
            accepted = ["nine", "fourteen"];
            break;
        case "fourteen":
            accepted = ["ten", "thirteen", "fifteen"];
            break;
        case "fifteen":
            accepted = ["eleven", "fourteen", "empty"];
            break;
        case "empty":
            accepted = ["twelve", "fifteen"];
            break;

    }
    return accepted;
}

// click event listener that call for a new game
$("#newLogic").on("click", newGame);