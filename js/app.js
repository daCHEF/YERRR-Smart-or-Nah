/*------------ Users Stories -----------
- #### MVP Goals

  - AAU I want to know I'm on the right webpage when it loads.
  - AAU I want to start a new quiz game to test how smart I am.
  - AAU I want to see a title screen when I start the game.
  - AAU I want to choose my answers.
  - AAU I want to see my choice highlighted before I submit it.
  - AAU I want audio/visual feedback on whether my answer was correct.
  - AAU I want to know my updated score after each answer.
  - AAU I want to know when the game/round has ended.

- #### Stretch Goals

  - AAU I want to add a custom Username
  - AAU I want to choose from at least 2 - 3 categories.
  - AAU I want to choose my difficulty
  - AAU I want some background music while I play.
*/


/*-------------- Constants -------------*/
const questions = [
    {
        text: 'When was Brooklyn founded?',
        options: ['1765', '1804', '1636', '1592'],
        answer: 2
    },
    
    {
        text: 'What famous battle of the American Revolution was fought in Brooklyn in 1776?',
        options: ['Battle of Long Island ', 'Battle of Manhattan', 'Battle of New York Harbor', 'Battle of Fort Greene'],
        answer: 0
    },
    
    {
        text: 'What was Brooklyn\'s original Dutch name?',
        options: ['Nieuw Amsterdam', 'Flatbush', 'Williamsburg', 'Breukelen',],
        answer: 3
    },
    
    {
        text: 'Which famous Brooklyn amusement park opened in 1903?',
        options: ['Astroland', 'Luna Park', 'Dreamland', 'Steeplechase Park'],
        answer: 1
    },
    
    {
        text: 'What was Brooklyn\'s first settlement, established in 1636?',
        options: ['Gravesend', 'Williamsburg', 'Brooklyn Heights', 'DUMBO'],
        answer: 0
    },

    {
        text: 'Which famous Brooklyn Navy Yard ship was launched in 1937?',
        options: ['USS Arizona', 'USS New York', 'USS Constitution', 'USS Brooklyn'],
        answer: 0
    },

    {
        text: 'Which famous Brooklyn bridge opened in 1883?',
        options: ['Williamsburg Bridge', 'Verrazano-Narrows Bridge', 'Manhattan Bridge', 'Brooklyn Bridge'],
        answer: 3
    },


    {
        text: 'What famous baseball team called Brooklyn home until 1957?',
        options: ['Brooklyn Giants', 'Brooklyn Yankees', 'Brooklyn Dodgers', 'Brooklyn Mets'],
        answer: 2
    },

    {
        text: 'What historic district in Brooklyn became NYC\'s first suburb?',
        options: ['Carroll Gardens', 'Brooklyn Heights', 'Park Slope', 'Cobble Hill'],
        answer: 1
    },

    {
        text: 'In which year did Brooklyn officially become part of New York City?',
        options: ['1863', '1783', '1801', '1898'],
        answer: 3
    }
]

/*---------- Variables (state) ---------*/
let score = 0;
let currentQuestion = 0;
let username = '';
let userSelected = -1;

/*----- Cached Element References  -----*/
const questionTextEl = document.getElementById('question-text'); //The text in the questions
const optionsEl = [ //Array for the answer choices
    document.getElementById('option0'),
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
];
const playerScoreEl = document.getElementById('player-score'); //The score counter
const questionNumberEl = document.getElementById('question-number'); //The question counter
const popupEl = document.getElementById('popup');
const popupMessageEl = document.getElementById('popup-message');
const closePopupBtn = document.getElementById('close-popup');


/*-------------- Functions -------------*/
function startGame() {
    score = 0; //resets score 
    currentQuestion = 0; //resets question
    username = document.getElementById('username')?.value || 'My Guy'; //username field (My Guy if none)
    showQuestion(); //displays first question on start
    hidePopup();
}

function showQuestion() { 
    clearHighlight();
    const question = questions[currentQuestion]; //pulls from question array
    questionTextEl.innerText = question.text; //puts current question in the DOM
    question.options.forEach((option, index) => { //options loop
        optionsEl[index].innerText = option; //text inside option button
        optionsEl[index].style.backgroundColor = '';
    });
    questionNumberEl.innerText = `Question: ${currentQuestion + 1}`; //updates question counter
    playerScoreEl.innerText = `Score: ${score}`; //updates score count
}

function selectOption(optionId) {
    clearHighlight();
    optionsEl[optionId].classList.add('highlight'); //highlights user's choice
    userSelected = optionId; //stores the index of selected option
}

function checkAnswer() {
    if (userSelected === questions[currentQuestion].answer) {
        score++;
        playerScoreEl.innerText = `Score: ${score}`;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function clearHighlight() {
    optionsEl.forEach((option) => {
        option.classList.remove('highlight');
        option.classList.remove('rightAnswer');
        option.classList.remove('wrongAnswer');
    });
}
function nextQuestion() { 
    if (userSelected < 0) {
        popupMessageEl.innerText = `Ayo ${username}, you gonna pick something?`;
        popupEl.style.display = 'block';
        return;
    }
    clearHighlight();
    if (userSelected == questions[currentQuestion].answer) {
        optionsEl[userSelected].classList.add('rightAnswer');
    } else {
        optionsEl[userSelected].classList.add('wrongAnswer');
    } 
    
    showQuestion();
    checkAnswer();
    userSelected = -1;
}

function endGame() {
    popupMessageEl.innerText = `That\'s a wrap B! ${username}, you got ${score}. NO CAP!`;
    popupEl.style.display = 'block';
}
function hidePopup() {
    popupEl.style.display = 'none';
}

function playAgain() {
    
}


/*----------- Event Listeners ----------*/

