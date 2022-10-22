

let inputText = "flote";
const correctWord = allWords[10];

console.log(correctWord);

const State = {
  INCORRECT: 0,
  INCLUDED: 1,
  CORRECT: 2
}



/**
 * It takes an array of letters and returns an array of objects, each of which has a letter, a state, and an index
 * @param {string} input - The input string
 * @returns { {letter: string, state: number, index: number }[] } An array of objects.
 */
function inputToObjectArray(input) {
  let ret = [];

  for (let i = 0; i < input.length; ++i) {
    ret.push({
      letter: input[i],
      state: State.INCORRECT,
      index: i
    })
  }

  return ret;
}

/**
 * @param {string} word
 * @returns { {letter: string, removed: boolean, index: number }[] } An array of objects.
 */
function correctWordToObjectArray(word) {
  let ret = [];

  for (let i = 0; i < word.length; ++i) {
    ret.push({
      letter: word[i],
      removed: false,
      index: i
    })
  }

  return ret;
}


/**
 * For each letter in the input, if the letter is the same as the letter in the correct word, set the state of the letter
 * in the input to correct
 * @param {{letter: string, state: number, index: number }[]} input - The array of letters that the user has inputted.
 * @param {{letter: string, removed: boolean, index: number }[]} correctWord - The word that the user is trying to guess.
 */
function findCorrectLetters(input, correctWord) {

  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    const correctLetter = correctWord[i];

    if (letter.letter === correctLetter.letter) {
      input[i].state = State.CORRECT;
      correctWord[i].removed = true;
    }
  }

  console.dir(input);
}

/**
 * @param {{letter: string, state: number, index: number }[]} input
 * @param {{letter: string, removed: boolean, index: number }[]} correctWord
 */
function findIncludedLetters(input, correctWord) {

  for (let i = 0; i < input.length; i++) {
    const letter = input[i];

    if (letter.state === State.CORRECT)
      continue;

    const remainingLetters = correctWord.filter((/** @type {{ removed: any; }} */ entry) => !entry.removed);

    const letterIndex = remainingLetters.findIndex((/** @type {{ letter: any; }} */ entry) => entry.letter === letter.letter);

    if (letterIndex === -1)
      continue;

    input[i].state = State.INCLUDED;

    correctWord[remainingLetters[letterIndex].index].removed = true;
  }

  console.dir(input);

}

let inputArr = inputToObjectArray(inputText);
let correctArr = correctWordToObjectArray(correctWord)

findCorrectLetters(inputArr, correctArr);
findIncludedLetters(inputArr, correctArr);
