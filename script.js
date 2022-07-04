const MAX_INPUT = 9999999999999999;
const input = document.querySelector('#text');
window.addEventListener('keydown', keyInput)
let display = '0';
let equation = {
    a: null,
    b: null,
    operator: null
};

//Updates equation and display
function updateContent(text) {
    if (isNaN(text)) input.textContent = text;
    else {
        if (!isNaN(display) && display != 0) text = display + text;
        addNum(text);
        if (text < MAX_INPUT || isNaN(text)) input.textContent = text;
        else input.textContent = MAX_INPUT;
        display = text;
    }
}

//Handles #button inputs
let nums = document.querySelectorAll('#num');
const num = Array.from(nums);
num.map((button) => {
    button.addEventListener('click', () => { 
        updateContent(button.textContent);
    });
});

//Handles operation inputs
function handleOp(o) {
    if (o === '*') o = 'X';
    if (equation.operator) solve(), equation.operator = o;
    else {
        equation.operator = o;
        display = equation.op;
        updateContent(equation.operator);
    }
}
let operation_btns = document.querySelectorAll('#Operation');
const ops = Array.from(operation_btns);
ops.map((button) => {
    button.addEventListener('click', () => {
        handleOp(button.textContent);
    });
});

//Handles clearing content
function clearContent() {
    display = 0;
    clean(equation);
    updateContent(display);
}
const clear = document.querySelector('#Clear');
clear.addEventListener('click', clearContent);

//Handles solving equation
function solve() {
    if (full(equation)) {
        let num = operate(equation);
        clean(equation);
        equation.a = num;
        display = 0;
        input.textContent = num;
    }
}
const equal = document.querySelector('#Equal');
equal.addEventListener('click', solve);

//Functions for maintaing equation object
function clean(eq) {
    for (key in eq) {
        eq[key] = null;
    }
}
function full(eq) {
    for (key in eq) {
        if (eq[key] == null) return false;
    }
    return true;
}
function addNum(num) {
    if (equation.operator) equation.b = num;
    else equation.a = num;
}
function operate(eq) {
    a = parseInt(eq.a); 
    b = parseInt(eq.b);
    if (isNaN(a) || isNaN(b)) return 0;
    switch (eq.operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'X':
            return a * b;
        case '/': 
            if (b == 0) return 'Nah you cant do that';
            return a / b;
        default:
            clean(eq)
            return 0;
    }
}

//Handles keyinput
function keyInput(e) {
    if (!isNaN(e.key)) updateContent(e.key);
    if (e.key === 'c') clearContent();
    if (e.key === '=' || e.key === 'Enter') solve();
    let ops = ['+', '-', '*', '/'];
    if (ops.includes(e.key)) handleOp(e.key);
}
