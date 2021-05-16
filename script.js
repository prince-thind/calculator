const displayDiv = document.querySelector('.display');
const tempArr = document.querySelectorAll('.key');
const keyDivs = [...tempArr];

let keyPressed = null;
let displayNumber = 0;
let currentOperator = null;
let operatorFlag = false;
let lastNum = null;

for (let k of keyDivs)
{
    k.addEventListener('click', () => { main(k); })
}

function main(k)
{
    keyPressed = k.textContent;
    let type = findType(keyPressed);
    if (type == 'num')
    {
        if (operatorFlag)
        {
            lastNum = displayNumber;
            displayNumber = keyPressed;
            operatorFlag = false;
        }
        else if (displayNumber != 0)
        {
            displayNumber = displayNumber + '' + keyPressed;
        }
        else
        {
            displayNumber = keyPressed;
        }

    }
    if (type == 'op')
    {
        currentOperator = keyPressed;
        operatorFlag = true;
    }

    if (type == 'solve')
    {
        displayNumber = operate(currentOperator, lastNum, displayNumber);
    }

    if (type == 'clear')
    {
        keyPressed = null;
        displayNumber = 0;
        currentOperator = null;
        operatorFlag = false;
        lastNum = null;
    }
    display(displayNumber);
}

function findType(key)
{
    let res = null;
    switch (key)
    {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            res = 'num';
            break;
        case 'enter':
            res = 'solve';
            break;
        case 'AC':
            res = 'clear';
            break;
        default:
            res = 'op';

    }
    return res;
}
function operate(op, num1, num2)
{
    let res = null;
    num1 = +num1;
    num2 = +num2;
    switch (op)
    {
        case '+':
            res = num1 + num2;
            break;
        case '-':
            res = num1 - num2;
            break;
        case '*':
            res = num1 * num2;
            break;
        case '/':
            res = num1 / num2;
            break;
    }
    return res;
}

function display(displayNumber)
{
    displayNumber += '';

    let index = displayNumber.indexOf('.');
    let length = displayNumber.length - index;

    console.log(length);
    if (length > 4)
    {
        displayNumber = +displayNumber;
        displayNumber = displayNumber.toFixed(4);
    }
    displayDiv.textContent = displayNumber;
}

