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
}

/** Shows the home page */
const showHome = () => {
    clearInterval(blinkingButtonTimerId);
    if (window.innerWidth <= 450) {
      $("header").hide( "show", 250);
    }
    if ($("#logicGamePage").css("display") == "none") {
      $("#knowledgeGamePage").hide( "fade", 250 );
    } else {
      $("#logicGamePage").hide( "fade", 250 );
    }
    $("#homePage").show( "fade", 250 );
    hangman.i = 0;
}

/** Toggles the rules page back in the stack */
const toggleRules = () => {
    if ($("#loader").css("display") === "none" && $("#knowledgeGamePage").css("display") === "block") {
        // preventing the interval to start a new game
        clearInterval(startsInTimerId);
        blinkingButtonTimerId = setInterval(function(){
            blinkingButton();
        }, 2000);
        $("#game-landing").css("z-index", "-2");
        $("#knowledge-landing h2").text("Back to play");
        setTimeout(function(){
            $("#starting-timer").text("Back to play");
        }, 1000);
    }
    if ($("#logicGamePage").css("display") === "block") {
        $("#game-landing").css("z-index", "-2");
        if(userPositions.score.timerId === null) {
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

/** Click event listener for the Logic Game Image */
$("#logicGame").on("click", showLogic);
/** Click event listener for the Logic Game Button */
$("#logicGameButton").on("click", showLogic);

/** Click event listener for the Knowledge Game Image */
$("#knowledgeGame").on("click", showKnowledge);
/** Click event listener for the Knowledge Game Button */
$("#knowledgeGameButton").on("click", showKnowledge);

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

$(".game-button").on("mouseenter", function() {
    $(this).css("background-color", "greenyellow").css("border-color", "darkgreen").css("color", "darkgreen");
    clearInterval(blinkingButtonTimerId);
})

$(".game-button").on("mouseleave", function() {
    $(this).css("background-color", "darkgreen").css("border-color", "greenyellow").css("color", "greenyellow");
    blinkingButtonTimerId = setInterval(function() {
        blinkingButton();
    }, 1500)
})

let blinkingButtonTimerId;

/** function for a blinking button */
const blinkingButton = () => {
    let button = $("#logicGamePage").css("display") === "block" ? "#newLogic" : "#newKnowledge";
    $(button).trigger("mouseenter");
    setTimeout(function(button) {
        $(button).trigger("mouseleave");
    }, 750, button);
}