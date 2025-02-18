const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');


function checkBtn() {
    if (formEmpty()) {
        return;
    } else {
        const stringInput = document.forms["form"]["text-form"].value;

        const lowerStringInput = stringInput.toLowerCase();

        const newStringInput = cleanInputString(lowerStringInput);

        const reverseStringInput = newStringInput.split('').reverse().join('').toLowerCase();

        const compareResult = newStringInput.localeCompare(reverseStringInput)
        
        result.innerHTML = `
        <span>${stringInput} ${(compareResult === 0 ? " is a palindrome" :  " is not a palindrome")}</span>
        `;

        document.forms["form"]["text-form"].value = "";
    }
}

function formEmpty() {
    if (document.forms["form"]["text-form"].value === ""){
        alert("Please input a value");
        return true;
    }
    return false;
}

function cleanInputString(str) {
    const regex = /[_,.():\/-\s]/g;
    return str.replace(regex, "");
}

checkButton.addEventListener('click', checkBtn);
