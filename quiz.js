const questions = [
    {
        question: "Which is the largest animal in the world?",
    answers: [
        {text: "shark", correct: false },
        {text: "Blue Whale", correct: true },
        {text: "Elephant", correct: false },
        {text: "Giraffe", correct: false },   
        ]
    },
    
    {
    question: "What is the capital of France?",
    answers: [
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false },
    ]
    },

    {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
        { text: "William Shakespeare", correct: true },
        { text: "Jane Austen", correct: false },
        { text: "Charles Dickens", correct: false },
        { text: "Mark Twain", correct: false },
    ]
    },

    {
    question: "What is the chemical symbol for water?",
    answers: [
        { text: "O2", correct: false },
        { text: "CO2", correct: false },
        { text: "H2O", correct: true },
        { text: "NaCl", correct: false },
    ]
    },

    {
    question: "Which planet is known as the 'Red Planet'?",
    answers: [
        { text: "Jupiter", correct: false },
        { text: "Mars", correct: true },
        { text: "Venus", correct: false },
        { text: "Saturn", correct: false },
    ]
    },

    {
    question: "Who painted the Mona Lisa?",
    answers: [
        { text: "Pablo Picasso", correct: false },
        { text: "Leonardo da Vinci", correct: true },
        { text: "Vincent van Gogh", correct: false },
        { text: "Michelangelo", correct: false },
    ]
    },

    {
    question: "What is the tallest mountain in the world?",
    answers: [
        { text: "Mount Kilimanjaro", correct: false },
        { text: "Mount Everest", correct: true },
        { text: "Mount Fuji", correct: false },
        { text: "Mount McKinley", correct: false },
    ]
    },

    {
    question: "Who was the first person to step on the moon?",
    answers: [
        { text: "Neil Armstrong", correct: true },
        { text: "Buzz Aldrin", correct: false },
        { text: "Yuri Gagarin", correct: false },
        { text: "John Glenn", correct: false },
    ]
    },

    {
    question: "What is the largest organ in the human body?",
    answers: [
        { text: "Heart", correct: false },
        { text: "Brain", correct: false },
        { text: "Liver", correct: false },
        { text: "Skin", correct: true },
    ]
    },

    {
    question: "Who is known as the 'Father of Computers'?",
    answers: [
        { text: "Bill Gates", correct: false },
        { text: "Alan Turing", correct: true },
        { text: "Steve Jobs", correct: false },
        { text: "Charles Babbage", correct: false },
    ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
    
        if (answer.correct){
            button.dataset.correct =  answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();