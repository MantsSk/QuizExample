let currentQuestion = 0;
let score = 0;
let selectedOption;
let questions;

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const imageElement = document.getElementById('image');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreSpan = document.getElementById('score');
const totalSpan = document.getElementById('total');

// Load questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        loadQuestion(questions[currentQuestion]);
    });

function loadQuestion(question) {
    questionElement.textContent = question.text;
    imageElement.src = question.image;

    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `option${index}`;
        input.name = 'answer';
        input.value = option.text;
        
        input.addEventListener('change', () => selectOption(option));
        
        const label = document.createElement('label');
        label.setAttribute('for', `option${index}`);
        label.textContent = option.text;
        
        optionElement.appendChild(input);
        optionElement.appendChild(label);
        
        optionsContainer.appendChild(optionElement);
    });

    nextButton.disabled = true;
}

function selectOption(option) {
    selectedOption = option;
    nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
    if (!selectedOption) return;

    const selectedInput = document.querySelector('input[name="answer"]:checked');

    if (selectedInput.value === selectedOption.text) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion(questions[currentQuestion]);
        selectedOption = null;
    } else {
        showResult();
    }
});

function showResult() {
    console.log("score" + score)
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreSpan.textContent = score;
    totalSpan.textContent = questions.length;

    document.getElementById('try-again-btn').addEventListener('click', resetQuiz);
}

function resetQuiz() {
    console.log("reset")
    

    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    loadQuestion(questions[currentQuestion]);

    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
}