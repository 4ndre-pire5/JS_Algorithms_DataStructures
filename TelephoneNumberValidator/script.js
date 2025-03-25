const userInput = document.getElementById("number");
const output = document.getElementById("results-div");

const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");

function checkBtn() {
    if (formEmpty()) {
        return;
    } else {
        const stringInput = document.forms["form"]["number input"].value;

                output.innerHTML = `
            <span> TO DO: </br> ${stringInput} </span>
        `


        document.forms["form"]["number input"].value = "";
    }
}

function clearBtn() {
    output.textContent = "";
}

function formEmpty() {
    if (document.forms["form"]["number input"].value === ""){
        alert("Please provide a phone number");
        return true;
    }
    return false;
}


checkButton.addEventListener("click", checkBtn);
clearButton.addEventListener("click", clearBtn);


