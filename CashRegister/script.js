let price = 19.5; // You can change this for testing
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]; // You can change this for testing

const currencyValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");
const priceDisplay = document.getElementById("price-display");

priceDisplay.textContent = price.toFixed(2);

purchaseBtn.addEventListener("click", () => {
    const cash = parseFloat(cashInput.value);

    if (isNaN(cash) || cash < 0) {
        alert("Please enter a valid amount of cash.");
        return;
    }

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    const changeDue = cash - price;

    // Calculate total cash in drawer
    let totalCid = cid.reduce((sum, [, amount]) => sum + amount, 0);
    totalCid = parseFloat(totalCid.toFixed(2)); // Precision

    // Scenario 1: Not enough cash in drawer to cover change due
    if (totalCid < changeDue) {
        changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    // Scenario 2: Exact cash provided by customer
    if (cash === price) {
        changeDueDiv.textContent = "No change due - customer paid with exact cash";
        return;
    }

    // Attempt to calculate change
    const result = getChange(changeDue, cid);

    if (result.status === "INSUFFICIENT_FUNDS") {
        changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
        changeDueDiv.textContent = "Status: CLOSED " + result.change.map(([unit, amount]) => `${unit}: $${amount}`).join(" ");
        // If closed, the drawer becomes empty
        cid = [
            ["PENNY", 0],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0]
        ];
    } else { // Status: OPEN
        changeDueDiv.textContent = "Status: OPEN " + result.change.map(([unit, amount]) => `${unit}: $${amount}`).join(" ");
        // Update the global cid with the remaining cash from the transaction
        cid = result.newCid;
    }

    // Update the displayed price in case price variable is changed for testing
    priceDisplay.textContent = price.toFixed(2);
});


function getChange(changeDue, drawer) {
    let change = [];
    let remainingChange = changeDue;
    // Create a deep copy of the drawer to work with, to avoid modifying the original until successful
    let tempDrawer = JSON.parse(JSON.stringify(drawer));

    // Sort tempDrawer in descending order of currency value
    const sortedTempDrawer = [...tempDrawer].sort((a, b) => currencyValues[b[0]] - currencyValues[a[0]]);

    // Denominations in descending order for easier calculation
    const denominations = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ];

    for (let i = 0; i < denominations.length; i++) {
        const [unitName, unitValue] = denominations[i];
        let amountInDrawerForUnit = tempDrawer.find(item => item[0] === unitName)[1];
        let amountToGive = 0;

        // Give as much of the current denomination as possible
        while (remainingChange >= unitValue && amountInDrawerForUnit > 0) {
            remainingChange = parseFloat((remainingChange - unitValue).toFixed(2));
            amountInDrawerForUnit = parseFloat((amountInDrawerForUnit - unitValue).toFixed(2));
            amountToGive = parseFloat((amountToGive + unitValue).toFixed(2));
        }

        if (amountToGive > 0) {
            change.push([unitName, amountToGive]);
            // Update the temporary drawer's balance for this unit
            const indexInTempDrawer = tempDrawer.findIndex(item => item[0] === unitName);
            if (indexInTempDrawer !== -1) {
                tempDrawer[indexInTempDrawer][1] = amountInDrawerForUnit;
            }
        }
    }

    // If remainingChange is still greater than 0, it means we couldn't give exact change
    if (remainingChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    // Calculate total remaining cash in the drawer *after* attempting to give change
    let remainingTotalCid = tempDrawer.reduce((sum, [, amount]) => sum + amount, 0);
    remainingTotalCid = parseFloat(remainingTotalCid.toFixed(2));

    // If all cash in the drawer was used up for change
    if (remainingTotalCid === 0) {
        return { status: "CLOSED", change: change, newCid: tempDrawer };
    } else {
        return { status: "OPEN", change: change, newCid: tempDrawer };
    }
}