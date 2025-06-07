const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const quizContainer = document.getElementById("quiz");

let questions = []; 
let currentQuestionIndex = 0; //array ng js is naka base sa 0 index
let userScore = 0;


async function loadQuestions() {
    try {
        const response = await fetch("questions.txt");
        const text = await response.text();
        questions = text.trim().split("\n").map(line => { //*paghahatiin yong line para maging array*//
            const [question, answer] = line.split("|");
            return { question: question.trim(), answer: answer.trim() };
        }); 
    } catch (error) {
        console.error("Error loading questions:", error);
        alert("Failed to load quiz questions.");
    }
}


start_btn.onclick = async () => {
    await loadQuestions();
    if (questions.length > 0) {
        info_box.classList.add("activeInfo"); 
    } else {
        alert("No questions found!");
    }
};

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); 
};


continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuestion(0); 
};

function showQuestion(index) {
    quizContainer.innerHTML = `  
        <p>${questions[index].question}</p> 
        <input type="text" id="userAnswer" autocomplete="off" class="form-control" /> 
        <button onclick="checkAnswer()" class="btn btn-primary mt-2">Submit</button>
    `;
}

function checkAnswer() {
    let userInput = document.getElementById("userAnswer").value.trim(); //* kinukuha yong sagot ng user
    let correctAnswer = questions[currentQuestionIndex].answer;
                        //*Kinukuha ang tamang sagot mula sa questions array gamit ang currentQuestionIndex.*// 
    if (userInput === "") {
        alert("Please enter an answer!");
        return;
    }

    let isCorrect = userInput.toLowerCase() === correctAnswer.toLowerCase();//*case-insensitive*//
    if (isCorrect) userScore++; 

    quizContainer.innerHTML = `
        <p>${questions[currentQuestionIndex].question}</p>
        <p class="${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? "✅ Correct!" : `❌ Incorrect! Correct Answer: <strong>${correctAnswer}</strong>`}
        </p>
        <button onclick="nextQuestion()" class="btn btn-primary mt-2">Next</button>
    `;
}
