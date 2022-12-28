const questionAnswers = [
  {
    question: "Who was the 16th president of the united states?",
    answers: [
      "George Washington", "Abraham Lincoln", "Franklin D. Roosevelt", "John F. Kennedy"
    ],
    correctAnswerIndex: 1
  },
  {
    question: "Which is the largest state in America?",
    answers: [
      "Alaska", "Texas", "California", "Colorado"
      
    ],
    correctAnswerIndex: 0
  },
  {
    question: "How many continents are there?",
    answers: [
      2, 5, 4, 7
    ],
    correctAnswerIndex: 3
  },
    {
      question: "How many stars were there on the original American flag?",
      answers: [
        50, 33, 7, 13
      ],
      correctAnswerIndex: 3
    },
    {
      question: "How many feet arte in 1 meter?",
      answers: [
        1.7, 3.3, 7.5, 5.9
      ],
      correctAnswerIndex: 1
    },
  
]

var penaltySeconds = 3
var currentQuestionIndex = 0
var timeLeft = 60; // 60 seconds
var userScores = JSON.parse(localStorage.getItem('high-scores')) || []

// When the start button is clicked, display question 1 and answers
// add an event listener to the start button that listens for a click
// grab the start button
var startButton = document.querySelector('#start-button')
var questionScreen = document.querySelector("#question-screen")
var startScreen = document.querySelector("#start-screen")
var initialsScreen = document.querySelector("#initials-screen")
var questionEl = document.querySelector('#question')
var answersList = document.querySelector('#answers')
var countDown = document.querySelector('#count-down')
var highScoreScreen = document.querySelector('#high-score-screen')
var highScoresList = document.querySelector('#high-scores')
var viewHighScoreButton = document.querySelector('#view-high-score')
var initialsForm = document.querySelector('#initials-form')
var initialsInput = document.querySelector('#initials')

// add the event listener
startButton.addEventListener('click', startGame)
viewHighScoreButton.addEventListener('click', displayHighScoreScreen)
initialsForm.addEventListener('submit', saveHighScore)

function startGame() {
  // grab a question and it's answers
  var currentQuestionAndAnswers = questionAnswers[currentQuestionIndex]
  // display the answers in multiple choice buttons
  questionScreen.style.display = "block"
  // hide the start button
  startScreen.style.display = "none"
  // start the timer

  var timer = setInterval(() => {
    timeLeft--;
    countDown.textContent = timeLeft;

    // stop the timer
    if (timeLeft <= 0 || currentQuestionIndex === questionAnswers.length) {
      console.log('timer has stopped')
      clearInterval(timer)
    }

    if (timeLeft <= 0) {
      alert('Game Over. Refresh the page to start a new game')
      timeLeft = 0
    }
  }, 1000)

  displayQuestionAndAnswers(currentQuestionIndex)
}

function displayQuestionAndAnswers(currentQuestionIndex) {
  var currentQuestionAndAnswers = questionAnswers[currentQuestionIndex]
  // display the question
  questionEl.textContent = currentQuestionAndAnswers.question
  Array.from(answersList.children).forEach((answer, currentAnswerIndex) => {
    answersList.children[currentAnswerIndex].textContent = currentQuestionAndAnswers.answers[currentAnswerIndex]
    answersList.children[currentAnswerIndex].addEventListener("click", handleAnswerClick)
  })
}

function handleAnswerClick(event) {
  var currentQuestionAndAnswers = questionAnswers[currentQuestionIndex]
  var clickedAnswer = event.target.textContent
  var correctAnswer = currentQuestionAndAnswers.answers[currentQuestionAndAnswers.correctAnswerIndex]
  if (clickedAnswer != correctAnswer) {
    // deduct seconds penalty
    timeLeft -= penaltySeconds
    if (timeLeft < 0) {
      // keep the score from going negative
      timeLeft = 0
    }
    alert('Wrong answer')
  }
  else {
    alert('Correct answer')
    // go to the next question if there are more left
    currentQuestionIndex++
  }
  
  // if there are no more questions
  if (currentQuestionIndex === questionAnswers.length) {    
    // display initials screen
    displayInitialsScreen()
  } else {
    displayQuestionAndAnswers(currentQuestionIndex)
  }

}

function displayHighScoreScreen() {
  highScoreScreen.style.display = 'block'
  questionScreen.style.display = 'none'
  startScreen.style.display = 'none'
  initialsScreen.style.display = 'none'

  // Load all the scores from local storage and display them
  var storedHighScores = JSON.parse(localStorage.getItem('high-scores')) || []

  storedHighScores.forEach(user => {
    // create li element
    const li = document.createElement('li')
    li.textContent = `${user.initials}: ${user.score}`
    // append the element to high scores list
    highScoresList.appendChild(li)
  })
}

function displayInitialsScreen() {
  console.log('displaying the intials screen')
  highScoreScreen.style.display = 'none'
  questionScreen.style.display = 'none'
  startScreen.style.display = 'none'
  initialsScreen.style.display = 'block'
}

function saveHighScore(event) {
  // don't refresh the page
  event.preventDefault()
  
  var initials = initialsInput.value
  var score = timeLeft

  console.log('saving initials with score', initials, score)
  var userScore = {
    score: score,
    initials: initials
  }
  userScores.push(userScore)
  userScores.sort((a, b) => b.score - a.score)
  // Save the score to local storage
  localStorage.setItem('high-scores', JSON.stringify(userScores))
  displayHighScoreScreen()
}
