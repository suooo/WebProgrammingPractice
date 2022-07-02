/*2019314704 Park Suyeon*/

function delete_Cover(){
  var cover = document.getElementById('coverID');
  cover.remove();

  var progr = document.getElementById('progressID');
  progr.style.display = "inline";
  var main = document.getElementById('questionID');
  main.style.display = "inline";
}

//the lists of Problems, Multiple choices and Answers
let listP = [
  'Purpose of designing the Javascript',
  'Why so JavaScript and Java have similar name?',
  'Original Name of Javascript is',
  'Which type of language is Javascript',
  'Which is not valid data type in Javascript'];

let listQ1 = [
  'To Perform Server Side Scripting Operation',
  'To add interactivity to HTML Pages',
  'To Style HTML Pages',
  'All of the above'];

let listQ2 = [
  'They both originated on the island of Java',
  'JavaScript\'s syntax is loosely based on Java\'s',
  'Both A and B',
  'None of the above'];

let listQ3 = ['Mocha', 'LiveScript', 'Escript', 'Javascript'];
let listQ4 = ['Programming', 'Scripting', 'Markup', 'None of the above'];
let listQ5 = ['Undefinded', 'Boolean', 'Float', 'Number'];

let listQs = [listQ1, listQ2, listQ3, listQ4, listQ5]; //list of multiple choices list

let listAns = [2, 2, 1, 2, 3]; //the answers - B, B, A, B, C

//the number of question to solve
let numQ;

//make number randomly from 0 to 4
function random_Num(){
  numQ = Math.floor(Math.random()*10) % 5;
}

//count the number of questions
let count = 1;
//count the number of correct answers
let correctNum = 0;

//fill the progress bar
function fill_Bar(){
    let barlist = '.barT td:nth-child(' + count + ')';
  var bar = document.querySelector(barlist);
  bar.style.backgroundColor = "#57a6eb";

  var barText = document.getElementById("bar_n");
  barText.innerHTML = 'Question ' + count +'/4';
}

//update the score of correct answers
function update_Score(){
  var score = document.getElementById("s_num");
  score.innerHTML = correctNum;
}

//show the Problem and Multiple choices
function show_Quiz(){
  var problem = document.getElementById("problem");
  problem.innerHTML = listP[numQ]; //problem

  for (var i = 0; i < 4; i++){
    var quiz = document.getElementsByClassName("check");
    quiz[i].innerHTML = listQs[numQ][i]; //multiple choices
  }
}

//hide the question and show the result
function show_Result(){
  var progr = document.getElementById('progressID');
  progr.style.display = "none";
  var main = document.getElementById('questionID');
  main.style.display = "none";
  var rslt = document.getElementById('resultID');
  rslt.style.display = "inline";
  var score = document.getElementById("score");
  score.innerHTML = "Total score: " + correctNum;
}

//check the answer and continue solving the questions
function check_Ans(check){
  var colorBar = document.getElementsByClassName("td2");
  //highlight the answer that user clicks with green for correct or red for wrong

  if (check == listAns[numQ]){
    correctNum++;
    colorBar[check-1].style.backgroundColor = 'green';
    update_Score();
  }
  else{
    colorBar[check-1].style.backgroundColor = 'red';
  }

  //give some time to check the answer is right or wrong
  setTimeout(function(){
    count++;
    if(count == 5){ //after finish solving four problems, show the result
      show_Result();
      return;
    }
    random_Num();
    fill_Bar();
    show_Quiz();
    colorBar[check-1].style.backgroundColor = 'white';}
    , 1000);
}

//initialize the condition
function set_Up(){
   count = 1;
   correctNum = 0;
   for (let i = 0 ; i < 4; i++){ //make progress bar white again
     let barlist = '.barT td:nth-child(' + (i+1) + ')';
     var bar = document.querySelector(barlist);
     bar.style.backgroundColor = "white";
   }
   var colorBar = document.getElementsByClassName("td2"); //make answers bar white again
   for (let j = 0; j < 4; j++){
     colorBar[j].style.backgroundColor = 'white';
   }
   var barText = document.getElementById("bar_n"); //make the question number 1
   barText.innerHTML = 'Question ' + count + '/4';
   var score = document.getElementById("s_num"); //make the score 0
   score.innerHTML = 0;
   var progr = document.getElementById('progressID'); //show the question again
   progr.style.display = "inline";
   var main = document.getElementById('questionID');
   main.style.display = "inline";
   var rslt = document.getElementById('resultID'); //hide the result
   rslt.style.display = "none";
}

//when click 'play agian'
function play_Again(){
  set_Up();
  random_Num(); fill_Bar(); show_Quiz();

  function Ans1(){ check_Ans(1);}
  function Ans2(){ check_Ans(2);}
  function Ans3(){ check_Ans(3);}
  function Ans4(){ check_Ans(4);}
}

//'play'
random_Num(); fill_Bar(); show_Quiz();

function Ans1(){ check_Ans(1);}
function Ans2(){ check_Ans(2);}
function Ans3(){ check_Ans(3);}
function Ans4(){ check_Ans(4);}
