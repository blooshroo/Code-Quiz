//take string val from input box after quiz and add to li item in ol
//save to local storage

var highScoreList = document.getElementById("highscores");
var clearButton = document.getElementById("clear");

 var clearHighScores = function(){
    localStorage.clear();
    highScoreList.innerHTML = "";
 };

 clearButton.addEventListener("click", (event) => {
    event.preventDefault;
    clearHighScores();
 });

    var markup = Object.keys(localStorage).map(function(key){
    //iterates through unique date keys and outputs corresponding value which is
    // in the format of initials:score. Use split(":") to separate values by delimiter.
    var [user, userScore] = localStorage.getItem(key).split(":");
    return `<li>${user.trim()} - ${userScore.trim()} points </li>`
 }).join("");

  // returns an array of two element arrays
    var playerScoreArray = Object.keys(localStorage).map(function(key){
    var [user , userScore] = localStorage.getItem(key).split(":");
    //trim whitespace, if any
    return [user.trim() , Number(userScore.trim())]
 });

 //compareFn to use in sort method. Sorts in descending order.
 //compare scores between array elements in playerScoreArray (which are at index 1)
 function compareByScore(a, b) {
    return b[1] - a[1];
  };

// sort in order of score
playerScoreArray.sort(compareByScore);

var orderedMarkup = playerScoreArray.map((item) => {
    var [user, userScore] = item;
    return `<li>${user} - ${userScore} points </li>`
}).join("");

highScoreList.insertAdjacentHTML("afterbegin", orderedMarkup);