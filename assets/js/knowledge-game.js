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
 * @returns {array} result - 10 random words
 */
const getWords = async () => {
    try {
        const response = await fetch(wordsUrl, wordsOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }   
}