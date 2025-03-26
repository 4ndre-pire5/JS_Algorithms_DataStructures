const userInput = document.getElementById("number");
const output = document.getElementById("results-div");

const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");

function checkBtn() {
    if (formEmpty()) {
        return;
    } else {
        const stringInput = document.forms["form"]["number-input"].value;
        testInfo(stringInput);
    }
}

function testInfo(userInput) {
    const regex = /^1?\s?((\(\d{3}\))|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

    const ok = regex.test(userInput);

    output.innerHTML = ok 
    ? `<span> Valid US number: ${userInput} </span>`
    : `<span> Invalid US number: ${userInput} </span>`;

    document.forms["form"]["number-input"].value = "";
}

function clearBtn() {
    output.textContent = "";
}

function formEmpty() {
    if (document.forms["form"]["number-input"].value === ""){
        alert("Please provide a phone number");
        return true;
    }
    return false;
}

checkButton.addEventListener("click", checkBtn);
clearButton.addEventListener("click", clearBtn);


