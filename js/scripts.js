// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic
/////////////////
function wordCounter(text) {// <-- Counts words in a text xD
  if (text.trim().length === 0) {// This trims extra spaces
    return 0;                    // (the 13 spaces example from the lessons)
  }
  let wordCount = 0;// Instantiate the counter outside the loop...
  const wordArray = text.split(" ");// Split the text string into an array...
  wordArray.forEach(function (element) {// Loop through the array (each element is a word)
    if (!Number(element)) {// And as long as the element isn't a number...
      wordCount++;// ...increment the wordCount
    }
  });
  return wordCount;// Send the wordCount to anything that called this function
}

function numberOfOccurrencesInText(word, text) {// <-- Counts how many times
  if (noInputtedWord(word, text)) {//          a "word" is repeated in a "text"
    return 0;// ^ Outsources this "no inputted word" check
  }//  ^ ^ ^ Notice this is |return "";| on line 41, b/c this is a counter (hence "0") while that one is styling!
  const wordArray = text.split(" ");// Split the text string into an array...
  let wordCount = 0;// Instantiate the counter outside the loop...
  wordArray.forEach(function (element) {// Loop through the array (deja who?)
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;// If "element" (a word in the new array) includes the "word"
    }//              we sent to this function (with both in lowercase), then
  });//              increment the counter for the match!
  return wordCount;
}

// UI Logic
///////////
function boldPassage(word, text) {// <-- I guess these are pretty self-explanatory... xD
  if (noInputtedWord(word, text)) {
    return "";// Outsources the "no inputted word" check again -- this shows
  }//         how useful having that "utility function" in our toolbox is!
  let htmlString = "<p>"
  let textArray = text.split(" ");//    v Notice that handy (and optional!) index! 
  textArray.forEach(function (element, index) {// It gets used again on line 51
    if (element.toLowerCase().includes(word.toLowerCase())) {// <-- This is VERY similar to line 30! When we
      htmlString = htmlString.concat("<b>" + element + "</b>");// talk about refactoring code, this is the kinda
    } else {//                                                  statement we might turn into a new utility function!
      htmlString = htmlString.concat(element);// <-- Same as the "if" above, minus the <b> tags
    }//   v Here's our index reference, thanks to line 45 mentioning it!
    if (index !== (textArray.length - 1)) {// "index" here is the array position of the *current word in the loop*
      htmlString = htmlString.concat(" ");// "textArray.length - 1" is *always* the final index in
    }//                                      an array :D   So, this just means:
  });//                                      "if it's *not* the final word, add a space"
  return htmlString + "</p>";
}

$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();// Set variables to the values
    const word = $("#word").val();// For our censorship exercise, we changed these to "let"...
    const wordCount = wordCounter(passage);// ...and before they get thrown into these functions here,
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);// we put them into our censorship function
    $("#total-count").html(wordCount);//                                 (above const wordCount = wordCounter(passage))
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
  });
});

function returnThreeMostWords(passage) {
  //remove data from string and input into an array
  const wordsArray = passage.split(" ")
  // set the counter to 0
  let wordsCount = 0;//    v My thinking here was -- since we're counting words -- why not temporarily give them 1st, 2nd, and 3rd place until a later word with a *higher* count steals its spot?
  let oneMostUsed = [0, "test oneMostUsed"]// Then, when we're done counting words, 1st-3rd should be accurate -- the last words standing!
  let twoMostUsed = [0, "test twoMostUsed"]// These are just dummy values. Every word will get a count placed at [0]
  let threeMostUsed = [0, "test threeMostUsed"]// and the word itself placed at [1]
  let topThree = [oneMostUsed[1], twoMostUsed[1], threeMostUsed[1]]// This was a bad place for this line. It just sets the Top 3 to the dummy values and never updates... :O
  // set up function for conditional and loop
  wordsArray.forEach(function (word) {// <--"For each word in the array..."
    // v v "...if that word *isn't* already in the top 3..." (i.e., "oneMostUsed[1]" is the index of the #1 word as as a string)
    if (word != oneMostUsed[1] && word != twoMostUsed[1] && word != threeMostUsed[1]) {
      wordsCount = numberOfOccurrencesInText(word, passage)// "...please give us its total count"
      if (wordsCount >= threeMostUsed[0]) {// "And if that count is >= the 3rd-place count..." (i.e., "threeMostUsed[0]" is the index of the #3 word's count)
        threeMostUsed = [wordsCount, word];// "...then let's take 3rd place's spot!"
        //   ^ Notice that we start with bumping off 3rd place. It'll be gone forever once
      }//    we replace it, so we have to do that to the "old" 3rd place, or else we'd lose something important!
      if (wordsCount >= twoMostUsed[0]) {// If our current word is ALSO greater than 2nd place:
        threeMostUsed = twoMostUsed;// The OLD 2nd place is now 3rd place
        twoMostUsed = [wordsCount, word];// The NEW 2nd place is our current word & count
      }//   ^ Notice v that we keep adding lines to the "ifs" as we go! This is the daisy-chain of bumping off 1st place, bumping the old 1st into 2nd, etc...
      if (wordsCount >= oneMostUsed[0]) {// And if it's ALSO greater than the current 1st place:
        threeMostUsed = twoMostUsed;// The old 2nd place goes to 3rd...
        twoMostUsed = oneMostUsed;// The old 1st place goes to 2nd...
        oneMostUsed = [wordsCount, word];// Our current word goes to 1st...
      }
    }
  });//  v  v  We should delete line 79 and just use "let" or "const" here...
  topThree = [oneMostUsed, twoMostUsed, threeMostUsed]
  return topThree;// Currently this is only useable for console tests!
}//                  We'd need to add something (preferably stylish!) to
//                   the HTML DOM in UI Logic for the user to see this :)

  // call the word counter function here?


// What do we need to do?
// 1. Write a function that returns the three most used words in a passage of text.
//  1.1 Turn string into array

// 2. Write a function that omits offensive words. (e.g zoinks, muppeteer, biffaroni, and loopdaloop)