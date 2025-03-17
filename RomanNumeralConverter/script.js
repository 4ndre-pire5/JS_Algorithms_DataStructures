const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const conversionTable = [
    {1: "I"}, {2: "II"}, {3: "III"}, {4: "IV"},
    {5: "V"}, {6: "VI"}, {7: "VII"}, {8: "VIII"},
    {9:"IX"}, {10: "X"}, {20: "XX"}, {30: "XXX"},
    {40: "XL"}, {50: "L"}, {60: "LX"}, {70: "LXX"},
    {80: "LXXX"}, {90: "XC"}, {100: "C"}, {200: "CC"},
    {300: "CCC"}, {400: "CD"}, {500: "D"}, {600: "DC"},
    {700: "DCC"}, {800: "DCCC"}, {900: "CM"}, {1000: "M"},
    {2000: "MM"}, {3000: "MMM"}
]

const checkUserInput = () => {
    const inputInt = parseInt(numberInput.value);

    if (inputInt < 0) {
        output.textContent = "Please enter a number greater than or equal to 1";
        numberInput.value = "";
        return;
    } else if (!numberInput.value || isNaN(inputInt)) {
        output.textContent = "Please enter a valid number";
        numberInput.value = "";
        return;
    } else if (inputInt >= 4000){
        output.textContent = "Please enter a number less than or equal to 3999";
        numberInput.value = "";
    } else {
        output.textContent = arabicToRoman(inputInt);
    }
};

const arabicToRoman = (inputInt) => {
    const arrInput = [inputInt];
    const reversedArrInput = arrInput.toString().split('').reverse().map(Number);
    const arrToConvert = reversedArrInput.map((number, index) => number * Math.pow(10, index)).reverse();

    const arrRomans = arrToConvert.map(convertArrToRoman).join('');
    
    return arrRomans;
}

function convertArrToRoman(number) {
    for (const item of conversionTable) {
        if (item.hasOwnProperty(number)) {
            return item[number];
        }
    }
    return null;
}

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        checkUserInput();
    }
});