const defaultResult = 0;
let currentReseult = defaultResult;
let logEntries = [];

// random comment

function getUserNumberinput() {
    return parseInt(userInput.value);
}

function createAndWriteOuput(operator, resultBeforeCalculation, calcNumber) {
    const calcDescriotion = `${resultBeforeCalculation} ${operator} ${calcNumber}`
    outputResult(currentReseult, calcDescriotion)
}

function add() {
    const enterNumber = getUserNumberinput();
    const initialResult = currentReseult;
    currentReseult = currentReseult + enterNumber;
    createAndWriteOuput('+', initialResult, enterNumber)
    logEntries.push(enterNumber);

}

function subtract() {
    const enterNumber = getUserNumberinput();
    const initialResult = currentReseult;
    currentReseult = currentReseult - enterNumber;
    createAndWriteOuput('-', initialResult, enterNumber)
};

function multiply() {
    const enterNumber = getUserNumberinput();
    const initialResult = currentReseult;
    currentReseult = currentReseult * enterNumber;
    createAndWriteOuput('*', initialResult, enterNumber)
};

function divide() {
    const enterNumber = getUserNumberinput();
    const initialResult = currentReseult;
    currentReseult = currentReseult / enterNumber;
    createAndWriteOuput('/', initialResult, enterNumber)
};

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);