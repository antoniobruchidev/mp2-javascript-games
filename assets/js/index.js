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
