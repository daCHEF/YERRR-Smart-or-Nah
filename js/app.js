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
        text: 'Do you see the issue?',
        options: ['this', 'is', 'an', 'issue'],
        answer: 2
    },
    
    {
        text: 'When was Brooklyn founded?',
        options: ['1765', '1804', '1636', '1592'],
        answer: 2
    },
    
    {
        text: 'When was Brooklyn founded?',
        options: ['1765', '1804', '1636', '1592'],
        answer: 2
    },
    
    {
        text: 'When was Brooklyn founded?',
        options: ['1765', '1804', '1636', '1592'],
        answer: 2
    },
]

/*---------- Variables (state) ---------*/
let score = 0;
let currentQuestion = 0;
let username = '';
let userSelected = -1;

/*----- Cached Element References  -----*/
const questionTextEl = document.getElementById('question-text');
const optionsEl = [
    document.getElementById('option0'),
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
];
const playerScoreEl = ('player-score')
const questionNumberEl = ('question-number') 

/*-------------- Functions -------------*/
function startGame() {
    score = 0;
    currentQuestion = 0;
    username = document.getElementById('username')?.value || 'My Guy';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionTextEl.innerText = question.text;
    question.options.forEach((option, index) => {
        optionsEl[index].innerText = option;
        optionsEl[index].style.backgroundColor = '';
    });
    questionNumberEl.innerText = currentQuestion + 1;
    playerScoreEl.innerText = score;
}

function selectOption(optionId) {
    clearHighlight();
    optionsEl[optionId].classList.add('highlight');
    userSelected = optionId;
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
//todo send user message
        return;
    }
    clearHighlight();
    if (userSelected == questions[currentQuestion].answer) {
        optionsEl[userSelected].classList.add('rightAnswer');
    } else {
        optionsEl[userSelected].classList.add('wrongAnswer');
    } 
    userSelected = -1;
    currentQuestion += 1;
    showQuestion();
}



/*----------- Event Listeners ----------*/

