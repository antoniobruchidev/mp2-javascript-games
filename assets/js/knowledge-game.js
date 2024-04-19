/** Defining the game state */
let hangman = {
    score: 0,
    currentGameMistakes: 0,
    words: [],
    definitions: {},
    i: 0,
    correctInARow: 0,
};

// defining timers
let startsInTimerId;
let gameTimerId;
let gameTimer = 0;

/** gameTimer */
const oneSecond = () => gameTimer++

/** Timer that shows 10 seconds to the start of a new game */
const startsInTimer = () => {
    $(".rules-heading").show();
    let startsIn = $("#starting-timer").html();
    startsIn--;
    $("#starting-timer").html(startsIn);
    if(startsIn == 0) {
        clearInterval(startsInTimerId);
        $(".loader").hide();
        $("#game-landing").css("z-index", "-2");
        $("#newKnowledge").trigger("click");
        gameTimerId = setInterval(oneSecond, 1000);
    }
}

/** API url to retrieve 10 random words */
const wordsUrl = 'https://a-randomizer-data-api.p.rapidapi.com/api/random/words?count=10';
/** API options to retrieve 10 random words */
const wordsOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4a1345c74amsh683f3f88b8c7adfp16be37jsn9e6b2f2a98af',
        'X-RapidAPI-Host': 'a-randomizer-data-api.p.rapidapi.com'
    }
};
/**
 * API url to retrieve the definition of a given word
 * @param {string} word 
 * @returns string
 */
const definitionUrl = (word) => `https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${word}`;
const definitionOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4a1345c74amsh683f3f88b8c7adfp16be37jsn9e6b2f2a98af',
        'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    }
};

/**
 * Function that iterates through the hangman.words array and call the getDefinition function for every word via a setTimeout so it doesn't make too many calls in a second
 */
const getDefinitions = () => {
    let words = hangman.words;
    for (let i = 0; i < words.length; i++) {
        setTimeout(function (words, i) {
            getDefinition(words[i]);
        }, 1000, words, i);
    }
}

/**
 * Asynchronous function that retrieve the definition of a given word, destructures the response and passes it to hangman.definitions with the word as the key
 * @param {string} word 
 */
const getDefinition = async (word) => {
    try {
        // when trying to fetch the last definition start a timer but only when you enter the game.
        if (hangman.words[hangman.words.length - 1] === word && hangman.i === 0) {
            $("#loader").hide("fade");
            $("#knowledge-landing h2").text("Words and definitions loaded, starts in");
            $("#starting-timer").text("10");
            startsInTimerId = setInterval(startsInTimer, 1000);
        }
        const response = await fetch(definitionUrl(word), definitionOptions);
        const result = await response.json();
        // elaborating data;
        const { meaning } = result;
        const { noun, verb, adjective, adverb } = meaning;
        // setting definitions accordingly
        hangman.definitions[word] = { noun, verb, adjective, adverb };
        // after fetching the last definition but only when playing with the last word in hangamn.words array
        if (hangman.words[hangman.words.length - 1] === word && hangman.i === 10) {
            hangman.i = 0;
        }

    } catch (error) {
        console.error(error);
    }
}

/**
 * Setter function for the array of words in the hangman object.
 * It sets also hangman.definitions to an empty object and resets the index at 0. Finally it calls getDefinitions function
 * @param {Array} words - 10 random words
 */
const setWords = (words) => {
    hangman.words = words;
    hangman.definitions = {};
    getDefinitions()
}

/**
 * Retrieve 10 random words and call the setter function passing the words as parameter
 */
const getWords = async () => {
    try {
        // if hangman.i is 0 show the loader to wait for the game state to be ready
        if (hangman.i == 0) {
            $("#game-landing").css("z-index", "4")
            $("#logic-landing").hide();
            $("#loader").show();
            $("#knowledge-landing").show()
        };
        const response = await fetch(wordsUrl, wordsOptions);
        const result = await response.json();
        setWords(result);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Function that creates a single definition hint for a given word. Needs improvement in case the given word has no meaning as a noun
 * @param {string} word 
 */
const createHint = (word) => {
    let definitions = hangman.definitions;
    if (definitions[word].noun !== "") {
        let definition = definitions[word].noun.slice(5);
        let endDefinition = definition.indexOf("(nou)");
        let hint = definition.slice(0, endDefinition)
        $(".definition")[0].textContent = hint;
    } 
}

/**
 * function that for each character of the word at the current index, creates a div with a span and populate it with the character. 
 * It calls the createHint function and finally change the words index for the next call
 */
const createWordFields = () => {
    let wordCharacterFields = "";
    let word = hangman.words[hangman.i];
    let characters = [...word];
    createHint(word);
    hangman.i++;
    // when it's creating the hint for the last word it'll fetch new words
    if (hangman.i == hangman.words.length) {
        getWords();
    }
    for (let character of characters) { 
        wordCharacterFields += `
        <div class="word-character">
            <span>${character}</span>
        </div>
        `
    }
    $("#word-container").append(wordCharacterFields);
}

/**
 * click event listener for the new knowledge game button
 */
$("#newKnowledge").on("click",function() {
    hangman.score = 0;
    console.log(blinkingButtonTimerId);
    clearInterval(blinkingButtonTimerId);
    resetWordFields();
    createWordFields();
    resetHangman();
    resetKeyboard();
})

/**
 * Check if the spans children of word-container contain the given key, if so it'll push the index in an array and return it.
 * @param {*} key 
 * @returns array of indexes
 */
const checkCharacterInWord = ( key ) => {
    let spans = $(".word-container span");
    let result = [];
    for (let i = 0; i < spans.length; i++ ) {
        // checking the span content
        let character = $(spans[i]).html()
        if (character == key) {
            // if content correct push the index
            result.push(i);
        }
    }
    return result;
}

/**
 * add event listener for a keypress, pass the pressed key to checkCharacterInWord function
 * expect an array of indexes for the first child of every div having word-character class
 * 
 */
$(document).on("keypress", function(e) {
    // check if word-container has children, if it hasn't need to start a new game
    if($("#word-container").children().length === 0) {
        return false;
    }
    // associating the keyboard button id to the physical jeyboard key pressed.
    const button = document.getElementById(e.key);
    // checking if the button has already been given a class 
    if (button.classList.contains("keyboard-button-fail") || button.classList.contains("keyboard-button-success")) {
        return false;
    }
    // retrieve indexes for the correct character if there are
    let results = checkCharacterInWord(e.key);
    if (results.length === 0) {
        // removing neutral class and adding failure one and calling the showHangman function
        $("#" + e.key).removeClass("keyboard-button").addClass("keyboard-button-fail");
        showHangman();
    } else {
        //removing neutral class and adding success one
        $("#" + e.key).removeClass("keyboard-button").addClass("keyboard-button-success");
        let spans = $(".word-container span");
        for (let result of results) {
            // showing the correct characters
            $(spans[result]).addClass("character-correct").show("fade");
        }
        // check if the word has being guessed 
        if(checkIfFinished()) {
            keyboardSuccess();
            blinkingButtonTimerId = setInterval(function() {
                blinkingButton()
            }, 2000)
            hangman.correctInARow++;
        }
    }
});

/** Click event listener that fires the corresponding keypress event */
$(".keyboard-button").on("click", function(e) {
    const id = this.id;
    $(document).trigger(
        jQuery.Event( 'keypress', { key: id } )
    );  
});

/** Function that check and update the current amount of mistakes and shows the relative part of the hanged man
 *  until the seventh mistake at which it calls the keyboardFail function. At the second mistakes it shows the hint */
const showHangman = () => {
    if (hangman.score === 0) {
        $(".hangman-head").show("fade", 500);
    } else if (hangman.score === 1) {
        $(".hangman-body").show("fade", 500);
        $(".hint").show("fade", 500);
    } else if (hangman.score === 2) {
        $(".hangman-right-arm").show("fade", 500);
    } else if (hangman.score === 3) {
        $(".hangman-left-arm").show("fade", 500);
    } else if (hangman.score === 4) {
        $(".hangman-right-leg").show("fade", 500);
    } else if (hangman.score === 5) {
        $(".hangman-left-leg").show("fade", 500);
    } else if (hangman.score === 6) {
        $(".hangman-right-arm").hide("fade", 500);
        $(".hangman-left-arm").hide("fade", 500);
        $(".dead-hangman-right-arm").show("fade", 500);
        $(".dead-hangman-left-arm").show("fade", 500);
        keyboardFail();
        blinkingButton()
        clearInterval(gameTimerId);
        hangman.correctInARow = 0;
        let spans = $(".word-container span");
        for (let span of spans) {
            if (!$(span).hasClass("character-correct")) {
                $(span).addClass("character-correct").show("fade");
            }
        }
    }
    hangman.score++;
}

/** functions that sets each keyboard button background color to red */
const keyboardFail = () => $(".keyboard").removeClass("keyboard-button-success").removeClass("keyboard-button").addClass("keyboard-button-fail");

/** function that sets each keyboard button background color to green */
const keyboardSuccess = () => $(".keyboard").removeClass("keyboard-button-fail").removeClass("keyboard-button").addClass("keyboard-button-success");

/** function that check if every character in the word has the character-correct class
 * @returns bool
 */
const checkIfFinished = () => {
    let spans = $(".word-container span");
    for (let span of spans) {
        if (!$(span).hasClass("character-correct")) {
            return false;
        }
    }
    return true;
}

/** function that resets the displayed keyboard to the original state */
const resetKeyboard = () => $(".keyboard").removeClass("keyboard-button-fail").removeClass("keyboard-button-success").addClass("keyboard-button");

/** function that resets the hanged man to the original state */
const resetHangman = () => $(".hangman").hide();

/** function that resets the word's character fields */
const resetWordFields = () => {
    let spans = $("#word-container span");
    for (let span of spans) {
        $(span).removeClass("character-correct");
    }
    $("#word-container").html("");
}
