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
    if (window.innerWidth <= 450) {
      $("header").hide( "show", 250);
    }
    if ($("#logicGamePage").css("display") == "none") {
      $("#knowledgeGamePage").hide( "fade", 250 );
    } else {
      $("#logicGamePage").hide( "fade", 250 );
    }
    $("#homePage").show( "fade", 250 );
}

/** Toggles the rules page back in the stack */
const toggleRules = () => $("#game-landing").css("z-index", "-2");

/** Toggles the knowledge rules page at the top of the stack */
const toggleKnowledgeRules = () => {
    $("#game-landing").css("z-index", "4");
    $("#logic-landing").hide();
    $("#knowledge-landing").show();
    $("#loader").hide();
}

/** Toggles the logic rules page at the top of the stack */
const toggleLogicRules = () => {
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

const mouseOverLogicChoice = () => {
    $("#logicGameChoice").css("box-shadow", "0 0 10px 10px greenyellow").css("background-color", "black");
    $("#knowledgeGameChoice").css("box-shadow", "none").css("background-color", "rgba(0, 0, 0, 0.7");
}

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