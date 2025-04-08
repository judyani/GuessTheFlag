// Define an array of flag objects
const flags = [
    {
        flagPath: 'images/afghanistan.png', // the path to the flag image
        capital: 'Kabul', // the capital of the country
        continent: 'Asia', // the continent of the country
        correctAnswer: 'Afghanistan', // the correct answer
        wrongAnswer: ['Serbia', 'Albania'], // an array of wrong answers
    },
    {
        flagPath: 'images/albania.png', // the path to the flag image
        capital: 'Tirana', // the capital of the country
        continent: 'Europe', // the continent of the country
        correctAnswer: 'Albania', // the correct answer
        wrongAnswer: ['Croatia', 'Italy'], // an array of wrong answers
    },
    {
        flagPath: 'images/algeria.png', // the path to the flag image
        capital: 'Algiers', // the capital of the country
        continent: 'Africa', // the continent of the country
        correctAnswer: 'Algeria', // the correct answer
        wrongAnswer: ['Morocco', 'Tunisia'], // an array of wrong answers
    },
    {
        flagPath: 'images/belgium.png', // the path to the flag image
        capital: 'Brussels', // the capital of the country
        continent: 'Europe', // the continent of the country
        correctAnswer: 'Belgium', // the correct answer
        wrongAnswer: ['Netherlands', 'France'], // an array of wrong answers
    },
    {
        flagPath: 'images/andorra.png', // the path to the flag image
        capital: 'Andorra la Vella', // the capital of the country
        continent: 'Europe', // the continent of the country
        correctAnswer: 'Andorra', // the correct answer
        wrongAnswer: ['Zambia', 'Romania'], // an array of wrong answers
    },
    {
        flagPath: 'images/angola.png', // the path to the flag image
        capital: 'Luanda', // the capital of the country
        continent: 'Africa', // the continent of the country
        correctAnswer: 'Angola', // the correct answer
        wrongAnswer: ['Namibia', 'Chile'], // an array of wrong answers
    },
    // add more flag data as needed
];

// Variables for tracking game progress
let currentFlagIndex = 0;
let score = 0;
let shuffledFlags = [...flags]; // Create a shuffled copy of the flag arrays to randomize flag order

// Function to shuffle the elements of an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to shuffle the 'shuffledFlags' array
function shuffleFlags() {
    shuffledFlags = [...flags];
    shuffleArray(shuffledFlags);
}

// Function to update the displayed total flag count
function updateTotalFlags() {
    const totalFlags = flags.length;
    document.getElementById('total-flags').textContent = `Flag: ${currentFlagIndex + 1} / ${totalFlags}`;
}

// Function to load and display a flag
function loadFlag() {
    if (currentFlagIndex < shuffledFlags.length) {
        const flag = shuffledFlags[currentFlagIndex];
        document.getElementById('flag').src = flag.flagPath;
        
        document.getElementById('hint').innerHTML = `<strong>Capital:</strong> ${flag.capital}, <strong>Continent:</strong> ${flag.continent}`;
        
        // Prepare options (correct answer + wrong answers)
        // Make sure we only take the number of wrong answers we need (maximum 2)
        const wrongAnswers = flag.wrongAnswer.slice(0, 2);
        const options = shuffleArray([flag.correctAnswer, ...wrongAnswers]);
        
        // Update the button texts
        const optionButtons = document.getElementsByClassName('option');
        options.forEach((option, index) => {
            if (index < optionButtons.length) {
                optionButtons[index].textContent = option;
            }
        });
            
        updateTotalFlags();
    } else {
        endGame();
    }
}

// Function to check if the selected answer is correct
function checkAnswer(button) {
    const selectedAnswer = button.textContent;
    const flag = shuffledFlags[currentFlagIndex];
    const hintElement = document.getElementById('hint');

    if (selectedAnswer === flag.correctAnswer) {
        score++;
        hintElement.textContent = 'Correct!';
        hintElement.style.color = 'green';
    } else {
        hintElement.textContent = `Wrong! The correct answer is: ${flag.correctAnswer}`;
        hintElement.style.color = 'red';
    }

    currentFlagIndex++;

    const totalFlags = flags.length;
    document.getElementById('score').textContent = `Score: ${score} / ${totalFlags}`;

    setTimeout(() => {
        hintElement.style.color = '';
        if (currentFlagIndex < shuffledFlags.length) {
            loadFlag();
        } else {
            endGame();
        }
    }, 1600);
}

// Function to start a new game
function startGame() {
    currentFlagIndex = 0;
    score = 0;
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('hint').textContent = '';
    document.getElementById('flag').style.display = 'block';
    document.getElementById('options').style.display = 'block';
    document.getElementById('play-again').style.display = 'none';

    shuffleFlags();
    loadFlag();
}

// Function to end the game and display the final score
function endGame() {
    const totalFlags = flags.length;
    const scoreText = `Final Score: ${score} / ${totalFlags}`;
    document.getElementById('hint').textContent = 'Game Over!';
    document.getElementById('score').textContent = scoreText;
    document.getElementById('flag').style.display = 'none'; // Hide the flag
    document.getElementById('options').style.display = 'none'; // Hide options
    document.getElementById('play-again').style.display = 'block'; // Show the play again button
}

// Function to restart the game
function playAgain() {
    startGame();
}

// Initialize the game on window load
window.onload = function() {
    startGame();
};
