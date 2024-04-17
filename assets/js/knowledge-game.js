/** Defining the game state */
let hangman = {
    score: 0,
    currentGameMistakes: 0,
    words: [],
    definitions: { },
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
 * Setter function for the array of words in the hangman object.
 * It sets also hangman.definitions to an empty object and resets the index at 0
 * @param {Array} words - 10 random words
 */
const setWords = (words) => {
    hangman.words = words;
    hangman.definitions = { };
    hangman.i = 0;
}

/**
 * @returns {array} 10 random words
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