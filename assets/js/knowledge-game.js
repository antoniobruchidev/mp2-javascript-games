/** Defining the game state */
let hangman = {
    score: 0,
    currentGameMistakes: 0,
    words: [],
    definitions: {},
    i: 0,
};

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
        const response = await fetch(definitionUrl(word), definitionOptions);
        const result = await response.json();
        const { meaning } = result;
        const { noun, verb, adjective, adverb } = meaning
        hangman.definitions[word] = { noun, verb, adjective, adverb };
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
    hangman.i = 0;
    getDefinitions()
}

/**
 * Retrieve 10 random words and call the setter function passing the words as parameter
 */
const getWords = async () => {
    try {
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
    console.log(definitions, word)
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
    for (let character of characters) { 
        wordCharacterFields += `
        <div class="word-character">
            <span>${character}</span>
        </div>
        `
    }
    $("#word-container").append(wordCharacterFields);
    createHint(word);
    hangman.i++;
}

/**
 * click event listener for the new knowledge game button
 */
$("#newKnowledge").on("click",function() {
    hangman.score = 0;
    createWordFields();
})
