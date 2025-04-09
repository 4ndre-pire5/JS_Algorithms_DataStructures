let listOfAllDice = document.querySelectorAll(".die");
let scoreInputs = document.querySelectorAll("#score-options input");
let scoreSpans = document.querySelectorAll("#score-options span");
let roundElement = document.getElementById("current-round");
let rollsElement =  document.getElementById("current-round-rolls");
let totalScoreElement = document.getElementById("total-score");
let scoreHistory = document.getElementById("score-history");
let rollDiceBtn = document.getElementById("roll-dice-btn");
let keepScoreBtn = document.getElementById("keep-score-btn");
const rulesBtn = document.getElementById("rules-btn");
let rulesContainer = document.querySelector(".rules-container");

let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

const rollDice = () => {
    diceValuesArr = [];
    for (let i = 0; i < 5; i++){
        const randomDice = Math.floor(Math.random() * 6) + 1;
        diceValuesArr.push(randomDice);
    }
    listOfAllDice.forEach((die, index) => {
        die.textContent = diceValuesArr[index];
    });
}

function updateStats() {
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
}

const updateRadioOption = (index, score) => {
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
    scoreSpans[index].textContent = `, score = ${score}`
}

const updateScore = (value, id) => {
    score += parseInt(value);
    totalScoreElement.textContent = `${score}`;
    scoreHistory.innerHTML += `<li>${id} : ${value}</li>`
}

const getHighestDuplicates = (array) => {
    let nums =  {};

    array.forEach((number) => {
        nums[number] = (nums[number] || 0) + 1;
    });

    let sum = array.reduce((sum, value) => sum + value, 0);

    const maxNumber = Math.max(...Object.values(nums));
    
    if (maxNumber >= 4) {
        updateRadioOption(1, sum);
    } else if (maxNumber >= 3) {
        updateRadioOption(0, sum);
    } else {
        updateRadioOption(5, 0);
    }
}

const detectFullHouse = (array) => {
    const nums = {};

    for (const element of array) {
        nums[element] = (nums[element] || 0) + 1;
    }

    const uniqueValues = Object.keys(nums);

    if (uniqueValues.length === 2) {
        const count1 = nums[uniqueValues[0]];
        const count2 = nums[uniqueValues[1]];

        const fullHouse = ((count1 === 3 && count2 === 2) || (count1 === 2 && count2 === 3));

        if (fullHouse) {
            updateRadioOption(2, 25);
        } else {
            updateRadioOption(5, 0);
        }

    } else {
        updateRadioOption(5, 0);
    }
}

const checkForStraights = (array) => {
    const sortedArray = [...array].sort((a, b) => a - b);
    const uniqueSortedArray = [...new Set(sortedArray)];

    let smallStraight = false;
    let largeStraight = false;

    if (uniqueSortedArray.length === 5) {
        largeStraight = true;
        for (let i = 0; i < 4; i++) {
            if (uniqueSortedArray[i + 1] !== uniqueSortedArray[i] + 1){
                largeStraight = false;
                break;
            }
        }
    }

    if (uniqueSortedArray.length >= 4 && !largeStraight) {
        for (let i = 0; i <= uniqueSortedArray.length - 4; i++) {
            let consecutive = true;
            for (let j = 0; j < 3; j++){
                if (uniqueSortedArray[i + j + 1] !== uniqueSortedArray[i + j] + 1) {
                    consecutive = false;
                    break;
                }
            }
            if (consecutive) {
                smallStraight = true;
                break;
            }
        }
    }

    if (largeStraight) {
        updateRadioOption(4, 40);
        updateRadioOption(3, 30);
    }

    if (smallStraight) {
        updateRadioOption(3, 30);
    }
}

const resetRadioOptions = () => {
    scoreInputs.forEach((e) => {
        e.disabled = true;
        e.checked = false;
    });
    scoreSpans.forEach((e) =>{
        e.textContent = "";
    });
}

const resetGame = () => {
    listOfAllDice.forEach((die) => {
        die.textContent = 0;
    });
    score = 0;
    rolls = 0;
    round = 1;
    totalScoreElement.textContent = score;
    scoreHistory.textContent = "";
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
    resetRadioOptions();
}

rulesBtn.addEventListener("click", () => {
    isModalShowing = !isModalShowing;
    rulesContainer.style.display = isModalShowing ? "block" : "none";
    rulesBtn.textContent = isModalShowing ? "Hide rules" : "Show rules";
});

keepScoreBtn.addEventListener("click", () => {
    let selectedId = null;
    let selectedValue = null;
    let isSelected = false;
        
    scoreInputs.forEach(input => {
        if (input.checked){
              selectedValue = input.value;
              selectedId = input.id;
              isSelected = true;
        }
    });

    if (isSelected) {
        rolls = 0;
        round++;
        updateStats();
        updateScore(selectedValue, selectedId);
        resetRadioOptions();
        if (round > 6) {
            setTimeout(() => {
              alert(`Game Over! Your total score is ${score}`);
              resetGame();
            }, 500);
        } 
    } else {
        alert("Please, select an option or roll the dice");
    } 
});

rollDiceBtn.addEventListener("click", () => {
    if (rolls === 3) {
        alert("You have made three rolls this round. Please select a score.");
    } else {
        rolls++;
        resetRadioOptions();
        rollDice();
        updateStats();
        getHighestDuplicates(diceValuesArr);
        detectFullHouse(diceValuesArr);
        checkForStraights(diceValuesArr);
        updateRadioOption(5, 0);
    }
});



