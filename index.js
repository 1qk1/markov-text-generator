/*
  what this should do: 
    1. get the text [x]
    2. split the text on spaces [x]
    3. loop through the words and create an object with the word as key and the next words as values (array) [x]
    4. get starting words (Words that start with an uppercase letter) [x]
    5. make a variable sentenceTarget and add words to text until there are enough sentences formed [x]
    6. take a random starting word and add words until a sentence is formed [x]
*/

// FOR THIS TO WORK YOU SHOULD HAVE A TEXT.TXT FILE IN THE DIRECTORY TO TAKE THE TEXT!!!

const fs = require("fs");
Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)];
};

// read the text.txt file
// convert it to string from byte64
// replace newlines, tabs, and carriage returns with a space
// split the text in words

let words = fs
  .readFileSync("text.txt")
  .toString()
  .replace(/(\n|\t|\r)/gi, " ")
  .split(" ");

// array with words that can be used as starter words (start with a capital letter)
const starterWords = [];

//number of sentences to generate
const sentenceTarget = 4;

const wordMap = words.reduce((map, word, index) => {
  if (word.length === 0) return map;

  if (!map[word]) {
    map[word] = [];
  }

  if (words[index + 1]) {
    map[word].push(words[index + 1]);
  }

  if (/[A-Z]/.test(word[0])) {
    starterWords.push(word);
  }

  return map;
}, {});

let text = [];

for (let i = 0; i < sentenceTarget; i++) {
  // add a starting word in the text array
  let starterWord;
  if (starterWords.length > 0) {
    starterWord = starterWords.randomElement();
  } else {
    starterWord = words.randomElement();
  }
  text.push(starterWord);

  let endedSentence = false;

  while (endedSentence !== true) {
    // get the last word
    // find this word in the wordMap
    // take a random next word
    // if there isn't, take a random word
    // if the word has a dot it means its the end of a sentence,
    // so make endedSentence true
    // continue
    let word;
    const lastWord = text[text.length - 1];
    if (wordMap[lastWord] > 0) {
      word = wordMap[lastWord].randomElement();
    } else {
      word = words.randomElement();
    }
    text.push(word);
    if (word[word.length - 1] === ".") {
      endedSentence = true;
    }
  }
}

console.log(text.join(" "));
