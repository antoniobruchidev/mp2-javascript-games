window.onload = function () {
    Particles.init({
        // normal options
        selector: '.background',
        maxParticles: 250,
        color: '#ADFF2F',
        connectParticles: true,
        // options for breakpoints
        responsive: [
            {
                breakpoint: 1280,
                options: {
                    maxParticles: 200,
                }
            },
            {
                breakpoint: 768,
                options: {
                    maxParticles: 150,
                }
            },
            {
                breakpoint: 450,
                options: {
                    maxParticles: 65,
                }
            },
            {
                breakpoint: 360,
                options: {
                    maxParticles: 40,
                }
            }
        ]
    });
}

/** Shows the knowledge game page */
const showKnowledge = () => {
    if (window.innerWidth <= 450) {
        $("header").hide( "fade", 250);
    }
    $("#homePage").hide( "fade", 250 );
    $("#knowledgeGamePage").show( "fade", 250 );
    $("#game-landing").css("z-index", 4);
    $("#logic-landing").hide();
    $("#knowledge-landing").show();
    $(".loader").show();
    $(".rules-heading h4").hide();
    $(".loader h2").html("Loading words");
    $(".loader p").html("please wait...");
    getWords();
}

/** Show the logic game page */
const showLogic = () => {
    if (window.innerWidth <= 450) {
        $("header").hide( "fade", 250);
    }
    $("#homePage").hide( "fade", 250 );
    $("#logicGamePage").show( "fade", 250 );
    $("#game-landing").css("z-index", 4);
    $("#knowledge-landing").hide();
    $("#logic-landing").show();
    resetPuzzle();
}

/** Shows the home page */
const showHome = () => {
    clearInterval(blinkingButtonTimerId);
    blinkingButtonTimerId = null;
    clearInterval(userPositions.score.timerId);
    userPositions.score.timerId = null;
    if (window.innerWidth <= 450) {
        $("header").hide( "show", 250);
    }
    if ($("#logicGamePage").css("display") == "none") {
        $("#knowledgeGamePage").hide( "fade", 250 );
    } else {
        $("#logic-game-area").removeClass("lga-gameplay").addClass("lga-success");
        $(".square").removeClass("square-enabled").addClass("square-disabled");
        $("#logicGamePage").hide( "fade", 250 );
        resetScores();
    }
    $("#homePage").show( "fade", 250 );
    hangman.i = 0;
}

/** Toggles the rules page back in the stack */
const toggleRules = () => {
    if ($("#loader").css("display") === "none") {
        if (blinkingButtonTimerId === null && checkIfFinished()) {
            blinkingButtonTimerId = setInterval(function(){
                blinkingButton();
            }, 1500);
        }
        $("#game-landing").css("z-index", "-2");
        $("#knowledge-landing h2").text("Back to play");
        setTimeout(function(){
            $("#starting-timer").text("Back to play");
        }, 1000);
    }
    if ($("#logicGamePage").css("display") === "block") {
        $("#game-landing").css("z-index", "-2");
        if(userPositions.score.timerId === null && blinkingButtonTimerId === null) {
            console.log("trigger")
            blinkingButtonTimerId = setInterval(function(){
                blinkingButton();
            }, 2000);
        }
    }
}

/** Toggles the knowledge rules page at the top of the stack */
const toggleKnowledgeRules = () => {
    $(".rules-landing").show()
    $("#game-landing").css("z-index", "4");
    $("#logic-landing").hide();
    $("#knowledge-landing").show();
    $("#loader").hide();
}

/** Toggles the logic rules page at the top of the stack */
const toggleLogicRules = () => {
    $(".rules-landing").show()
    $("#game-landing").css("z-index", "4");
    $("#knowledge-landing").hide();
    $("#logic-landing").show();
}

/** Click event listener for the Knowledge Game Rules Button */
$("#knowledgeRules").on("click", toggleKnowledgeRules);

/** Click event listener for the Logic Game Rules Button */
$("#logicRules").on("click", toggleLogicRules);

/** Click event listener for the Logic Game Card */
$("#logicGameChoice").on("click", showLogic);

/** Click event listener for the Knowledge Game Card */
$("#knowledgeGameChoice").on("click", showKnowledge);

/** Click event listener for the Logic Game Section Home Button */
$("#homeLogic").on("click", showHome);

/** Click event listener for the Knowledge Game Section Home Button */
$("#homeKnowledge").on("click", showHome);

/** Click event listener for the Rules Section */
$("#game-landing").on("click", toggleRules);

/** function that changes the styling to the logic game choice */
const mouseOverLogicChoice = () => {
    $("#logicGameChoice").css("box-shadow", "0 0 10px 10px greenyellow").css("background-color", "black");
    $("#knowledgeGameChoice").css("box-shadow", "none").css("background-color", "rgba(0, 0, 0, 0.7");
}

/**function that changes styling to the knowledge game choice */
const mouseOverKnowledgeChoice = () => {
    $("#knowledgeGameChoice").css("box-shadow", "0 0 10px 10px greenyellow").css("background-color", "black");
    $("#logicGameChoice").css("box-shadow", "none").css("background-color", "rgba(0, 0, 0, 0.7");
}

$("#logicGameChoice").on("mouseenter", function() {
    clearInterval(switchLightsTimerId);
    mouseOverLogicChoice();
});

$("#knowledgeGameChoice").on("mouseenter", function() {
    clearInterval(switchLightsTimerId);
    mouseOverKnowledgeChoice();
});

/** function that calls changes the styling of game choice depending on the actual styling */
const choicesBacklightsSwitch = () => {
    let logicBoxShadow = $("#logicGameChoice").css("box-shadow");
    logicBoxShadow === "none" ? mouseOverLogicChoice() : mouseOverKnowledgeChoice();
}

$("#logicGameChoice").css("box-shadow", "0 0 10px 10px greenyellow");

let switchLightsTimerId = setInterval(function() {
    choicesBacklightsSwitch();
}, 1200);

$(".game-choice").on("mouseleave", function() {
    choicesBacklightsSwitch();
    switchLightsTimerId = setInterval(function() {
        choicesBacklightsSwitch();
}, 1200)
});

$(".new-game-button").on("mouseenter", function(e) {
    clearInterval(blinkingButtonTimerId);
    blinkingButtonTimerId = null;
    backlightButton(e.target);
})

$(".new-game-button").on("mouseleave", function(e) {
    backlightButtonOff(e.target);
    setTimeout(() => {
        if ((userPositions.score.timerId === null && $("#logicGamePage").css("display") !== "none")  || (checkIfFinished() && $("#knowledgeGamePage").css("display") !== "none")) {
            blinkingButtonTimerId = setInterval(() => {
                blinkingButton();
            }, 1500)
        }        
    }, 750);

})

$(".game-button").on("mouseenter", function(e) {
    backlightButton(e.target)
})


$(".game-button").on("mouseleave", function(e) {
    backlightButtonOff(e.target)
})


let blinkingButtonTimerId = null;

/** function for a blinking button */
const blinkingButton = () => {
    let button = $("#logicGamePage").css("display") === "block" ? "#newLogic" : "#newKnowledge";
    backlightButton(button)
    setTimeout(function(button) {
        backlightButtonOff(button)
    }, 750, button);
}

const backlightButton = (button) => $(button).css("background-color", "yellow").css("border-color", "#004800").css("color", "#004800");

const backlightButtonOff = (button) => $(button).css("background-color", "#004800").css("border-color", "yellow").css("color", "yellow");