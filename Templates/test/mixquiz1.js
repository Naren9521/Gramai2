const quizData = [
    {
        question: "I don't know ……………… to choose for my birthday present.",
        
            a: "what",
            b: "which",
            c: "who",
            d: "whom",
        correct: "b"
    },
    {
        question: "You should see a doctor if you have been feeling unwell ……………… a few days.",
        
            a: "since",
            b: "for",
            c: "in",
            d: "during",
        correct: "b"
    },
    {
        question: "She wishes she ……………… more time to complete the project.",
        
            a: "has",
            b: "have",
            c: "had",
            d: "having",
        correct: "c"
    },
    {
        question: "I've never been to Paris, ……………… I would love to visit someday.",
        
            a: "or",
            b: "nor",
            c: "but",
            d: "and",
        correct: "c"
    },
    {
        question: "The new employee was surprised by ……………… friendly everyone was.",
        
            a: "how",
            b: "what",
            c: "when",
            d: "which",
        correct: "a"
    },
    {
        question: "The book, ……………… is on the shelf, belongs to me.",
        
            a: "whose",
            b: "which",
            c: "whom",
            d: "who",
        correct: "b"
    },
    {
        question: "I'm not interested ……………… playing video games.",
        
            a: "at",
            b: "on",
            c: "in",
            d: "with",
        correct: "c"
    },
    {
        question: "He is one of the students who ……………… always on time.",
        
            a: "is",
            b: "am",
            c: "are",
            d: "be",
        correct: "c"
    },
    {
        question: "This is ……………… movie I have ever seen.",
        
            a: "more interesting",
            b: "interesting",
            c: "the most interesting",
            d: "interestingest",
        correct: "c"
    },
    {
        question: "I am looking forward ……………… from you soon.",
        
            a: "hear",
            b: "to hear",
            c: "hearing",
            d: "heard",
        correct: "b"
    },{
        question: "I don't know ……………… to choose for my birthday present.",
        
            a: "what",
            b: "which",
            c: "who",
            d: "whom",
        correct: "b"
    },
    {
        question: "You should see a doctor if you have been feeling unwell ……………… a few days.",
        
            a: "since",
            b: "for",
            c: "in",
            d: "during",
        correct: "b"
    },
    {
        question: "She wishes she ……………… more time to complete the project.",
        
            a: "has",
            b: "have",
            c: "had",
            d: "having",
        correct: "c"
    },
    {
        question: "I've never been to Paris, ……………… I would love to visit someday.",
        
            a: "or",
            b: "nor",
            c: "but",
            d: "and",
        correct: "c"
    },
    {
        question: "The new employee was surprised by ……………… friendly everyone was.",
        
            a: "how",
            b: "what",
            c: "when",
            d: "which",
        correct: "a"
    },
    {
        question: "The book, ……………… is on the shelf, belongs to me.",
        
            a: "whose",
            b: "which",
            c: "whom",
            d: "who",
        correct: "b"
    },
    {
        question: "I'm not interested ……………… playing video games.",
        
            a: "at",
            b: "on",
            c: "in",
            d: "with",
        correct: "c"
    },
    {
        question: "He is one of the students who ……………… always on time.",
        
            a: "is",
            b: "am",
            c: "are",
            d: "be",
        correct: "c"
    },
    {
        question: "This is ……………… movie I have ever seen.",
        
            a: "more interesting",
            b: "interesting",
            c: "the most interesting",
            d: "interestingest",
        correct: "c"
    },
    {
        question: "I am looking forward ……………… from you soon.",
        
            a: "hear",
            b: "to hear",
            c: "hearing",
            d: "heard",
        correct: "b"
    }
    
];
// timer change 
// Set the timer duration in seconds
const duration = .1 * 60; // 30 minutes

// Get the timer elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

let timeLeft = duration;
let timerInterval; // Declare timerInterval globally

// Function to update the timer display
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;

  if (timeLeft === 0) {
    clearInterval(timerInterval); // Stop the timer
    quizEnd(); // Call the quizEnd function when time is up
  } else {
    timeLeft--;
  }
}

// Function to start the timer
function startTimer() {
  updateTimer();

  // Update the timer every second
  timerInterval = setInterval(() => {
    updateTimer();
  }, 1000);
}

// Start the timer when the page loads
startTimer();
// startTimer();

// Function to stop the timer
// function stopTimer() {
//   clearInterval(timerInterval);
// }

// // Call stopTimer function when the quiz ends
// // For example, when the user submits the quiz
// function quizEnd() {
//   // Call stopTimer function to stop the timer
//   stopTimer();
// }


let index = 0;
let correct = 0,
incorrect = 0,
total = quizData.length;
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']")
const loadQuestion = () => {
if (total === index) {
    // clearInterval(timerInterval); // Clear the timer interval
    minutesDisplay.style.display = 'none';
    secondsDisplay.style.display = 'none';
    
    return quizEnd()
}

reset()
const data = quizData[index]
questionBox.innerHTML = `${index + 1}) ${data.question}`
allInputs[0].nextElementSibling.innerText = data.a
allInputs[1].nextElementSibling.innerText = data.b
allInputs[2].nextElementSibling.innerText = data.c
allInputs[3].nextElementSibling.innerText = data.d
allInputs[4].nextElementSibling.innerText = data.d
allInputs[5].nextElementSibling.innerText = data.d
allInputs[6].nextElementSibling.innerText = data.d
allInputs[7].nextElementSibling.innerText = data.d
allInputs[8].nextElementSibling.innerText = data.d
allInputs[9].nextElementSibling.innerText = data.d
allInputs[10].nextElementSibling.innerText = data.d
allInputs[11].nextElementSibling.innerText = data.d
allInputs[12].nextElementSibling.innerText = data.d
allInputs[13].nextElementSibling.innerText = data.d
allInputs[14].nextElementSibling.innerText = data.d
allInputs[15].nextElementSibling.innerText = data.d
allInputs[16].nextElementSibling.innerText = data.d
allInputs[17].nextElementSibling.innerText = data.d
allInputs[18].nextElementSibling.innerText = data.d
allInputs[19].nextElementSibling.innerText = data.d
};

document.querySelector("#submit").addEventListener(
"click",
function() {
    const data = quizData[index]
    const ans = getAnswer()
    if (ans === data.correct) {
        correct++;
    } else {
        incorrect++;
    }
    index++;
    loadQuestion()
}
)

const getAnswer = () => {
let ans;
allInputs.forEach(
    (inputEl) => {
        if (inputEl.checked) {
            ans = inputEl.value;
        }
    }
)
return ans;
}

const reset = () => {
allInputs.forEach(
    (inputEl) => {
        inputEl.checked = false;
    }
)
}

const quizEnd = () => {
// console.log(document.getElementsByClassName("container"));

document.getElementsByClassName("container")[0].innerHTML = `
    <div class="col">
        <h3 class="w-100"> Hii, you've scored ${correct} / ${total} </h3>
    </div>
    <a href="ans1.html" style= padding:20px > Answers </a>
    <div>
`
}
loadQuestion(index);