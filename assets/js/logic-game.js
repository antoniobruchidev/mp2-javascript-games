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
    // clearing the blinking button interval and resetting the button style
    clearInterval(blinkingButtonTimerId);
    blinkingButtonTimerId = null;
    $("#newLogic").css("background-color", "darkgreen").css("border-color", "greenyellow").css("color", "greenyellow")
    // resetting the game scores in case the user has already played
    resetScores();
    resetWidget();
    // retrieving a set of randomized squares to set ip position
    let scrambledSquares = scrambleSquares();
    for ( let scrambledSquare of scrambledSquares) {
        // setting the position of each square
        changePosition(scrambledSquare.id,scrambledSquare.inPosition);
    }
    // changing class to game area and the squares
    $("#logic-game-area").removeClass("lga-success").addClass("lga-gameplay");
    $(".square-disabled").removeClass("square-disabled").addClass("square-enabled");
    waitUserMove();
    // setting up a timer for the game state
    userPositions.score.timerId = setInterval(timer, 1000);
    $("#logic-heading").hide();
    $("#logic-score").show();
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
    backlightOn(accepted)
    return accepted;
}

/**
 * Function that turn on the backlight for the relative position
 * @param {array} squareBacklights - array containing the position next to the empty square 
 */
const backlightOn = (squareBacklights) => {
    for (let squareBacklight of squareBacklights) {
        $("#backlight-" + squareBacklight).css("background-color", "#aaaaaa");
    }
}


/**
 * Function that retrieve the square at a given position
 * @param {string} position 
 * @returns string - id
 */
const getSquareAtPosition = (position) => {
    // retrieving the set of squares
    let squares = Object.keys(userPositions);
    let atPosition;
    for (let square of squares) {
        // checking for each square its position
        atPosition = userPositions[square].inPosition;
        if (square !== undefined) {
            // if the position given is the same return the square
            if (position == atPosition) {
                return square;
            }
        }
    }
}

/** Function that retrieve which squares are movable will be ultimately launching the draggable plugin */
const waitUserMove = () => {
    // retrieving the acceptable squares
    let accepted = movableSquareAtPosition();
    // saving them for later
    userPositions.current.oldAcceptables = accepted;
    // array to populate
    let acceptableSquares = [];
    // finding which squares are in an acceptable position
    for (let i = 0; i < accepted.length; i++) {
        let atPosition = getSquareAtPosition(accepted[i]);
        acceptableSquares.push(atPosition);
        // adding the class acceptable
        $("#" + atPosition).addClass("acceptable");
    }
    waitDrag();
    enableDraggables();
}

/** function that launch the jquery ui draggable plugin */
const waitDrag = () => {
    $(".acceptable").draggable({
        // settings for the plugin
        handle: "span",
        revert: "invalid",
        snap: "#empty",
        snapMode: "inner",
        snapTolerance: 20,
        start: function () {
            // launching the droppable plugin
            waitDrop();
            // saving variables in the game state
            let id = this.id;
            console.log(id);
            let squareAt = userPositions[id].inPosition;
            $("#backlight-" + squareAt).css("background-color", "transparent");
            let empty = userPositions.empty.inPosition;
            userPositions.current.square = id;
            userPositions.current.squareAt = squareAt;
            userPositions.current.empty = empty;
        },
        stop: function () {
            let squareAt = userPositions.current.squareAt;
            if (getSquareAtPosition(squareAt) === this.id){
            $("#backlight-" + squareAt).css("background-color", "#cccccc")}
        }
    });
}

 /** Function that starts the droppable plugin */
const waitDrop = () => {
    $("#empty").droppable({
        // plugin settings
        accept: ".acceptable",
        tolerance: "intersect",
        drop: function (event, ui,) {
            // updating moves counter
            userPositions.score.moves++;
            $("#moves").html(userPositions.score.moves);
            // retrieving data saved at the drg start
            let square = userPositions.current.square;
            let oldSquarePosition = userPositions.current.squareAt;
            let oldEmptyPosition = userPositions.current.empty;
            // calling the changePosition function to change the square positions
            $("#backlight-" + oldSquarePosition).css("background-color", "transparent");
            changePosition(square, oldEmptyPosition);
            changePosition("empty", oldSquarePosition);
            resetWidget();
            checkGamePlay();
        }
    });
}

/** Function that turn off the backlight */
const backlightOff = () => {
    let squareBacklights = userPositions.current.oldAcceptables;
    for (let squareBacklight of squareBacklights) {
        $("#backlight-" + squareBacklight).css("background-color", "transparent");
    }
}

/** Function that check if the game is finished */
const checkGamePlay = () => {
    // if positions from three until empty are all correct it's a win
    if ((userPositions.three.inPosition === "three") &&
        (userPositions.four.inPosition === "four") &&
        (userPositions.five.inPosition === "five") &&
        (userPositions.six.inPosition === "six") &&
        (userPositions.seven.inPosition === "seven") &&
        (userPositions.eight.inPosition === "eight") &&
        (userPositions.nine.inPosition === "nine") &&
        (userPositions.ten.inPosition === "ten") &&
        (userPositions.eleven.inPosition === "eleven") &&
        (userPositions.twelve.inPosition === "twelve") &&
        (userPositions.thirteen.inPosition === "thirteen") &&
        (userPositions.fourteen.inPosition === "fourteen") &&
        (userPositions.fifteen.inPosition === "fifteen") &&
        (userPositions.empty.inPosition === "empty")
    ) { // styling the game-area to provide the user a nice response
        $("#logic-game-area").removeClass("lga-gameplay").addClass("lga-success");
        $(".square").removeClass("square-enabled").addClass("square-disabled");
        userPositions.finished = true;
        blinkingButtonTimerId = setInterval(() => {
            blinkingButton();
        }, 1500);
    } else { // else wait for a new move
        waitUserMove();
    }
}


/** Function that displays the user's score at the end of the game in format x minute/minutes and y second/seconds */
const displayScore = () => {
    let minutes = Math.floor(userPositions.score.timer / 60);
    let minuteMinutes = minutes === 1 ? "minute" : "minutes";
    let seconds = userPositions.score.timer % 60;
    let secondSeconds = seconds === 1 ? "second" : "seconds";
    let time = `${minutes} ${minuteMinutes} and ${seconds} ${secondSeconds}`
    let paragraph = `Congratulations, it took you <span id="moves">${userPositions.score.moves}</span> moves in ${time}!`;
    $(".moves-counter").html(paragraph);
    $(".timer").hide();
}

/** Function that displays the ongoing timer */
const timer = () => {
    // retrieving the timerId to clear the interval when the game is finished
    let timerId = userPositions.score.timerId;
    userPositions.score.timer++;
    $("#timer").html(userPositions.score.timer);
    if (userPositions.finished) {
        // stopping the timer, displaying the score and resetting the widget
        clearInterval(timerId);
        displayScore();
        resetWidget();
    }
}
/** function that resets the scores */
const resetScores = () => {
    $(".timer").show();
    $("#timer").html("0");
    $(".moves-counter").html('Your moves: <span id="moves">0</span>');
    userPositions.score.timer = 0;
    userPositions.score.moves = 0;
    userPositions.finished = false;
    // resetting the timer if not null the first time
    if(userPositions.score.timerId !== null) {
        clearInterval(userPositions.score.timerId);
    }
}

/** function that resets the widget */
const resetWidget = () => {
    resetDraggables();
    $(".acceptable").removeClass("acceptable");
    $(".square-backlight").css("background-color", "transparent");
}

/** Function that disable the draggables */
const resetDraggables = () => {
    $(".acceptable").draggable("disable");    
}

/** function that enable the draggables */
const enableDraggables = () => $(".acceptable").draggable("enable");

// click event listener that call for a new game
$("#newLogic").on("click", function () {
    newGame();
});

/** reset the puzzle */
const resetPuzzle = () => {
    let keys = Object.keys(positions);
    for (let key of keys) {
        if(key !== undefined){
        changePosition(key,key);
        userPositions[key].inPosition = key;
        }
    }
   // clearInterval(userPositions.score.timerId);
    userPositions.finished = true;
    resetWidget();

}