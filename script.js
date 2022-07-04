const input = document.querySelector('#text');
let val = 0;
let last = 0;
let operator = '';
let evaluate = false;

let buttons = document.querySelectorAll('.Button');
const btn = Array.from(buttons);
btn.map((button) => {
    button.addEventListener('click', () => {
        if (!isNaN(button.id)) {
            //Numbers
            if (val === 0 || isNaN(val)) val = button.id;
            else val = val + button.id;
        }
        else {
            //Clear
            if (button.id === 'Clear') val = 0;
            else {
                //Equals
                if (button.id === '=' && evaluate) {
                    val = operate(last, val, operator);
                    last = 0;
                    operator = '';
                }
                //Operator
                else {
                    if (evaluate) {
                        val = operate(last, val, operator);
                        evaluate = false;
                        operator = button.id;
                    }
                    else {
                        operator = button.id;
                        evaluate = true;
                        last = val;
                        val = operator;
                    }
                }
            }
        }
        console.log('val : ' + val +
                    '\nlast : ' + last +
                    '\noperator : ' + operator);
        if (val > 9999999999999999) val = 9999999999999999;
        input.textContent = val;
    });
});

function operate(a, b, op) {
    a = parseInt(a); 
    b = parseInt(b);
    if (isNaN(a) || isNaN(b)) return b;
    evaluate = false;
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'X':
            return a * b;
        case '/':
            if (b == 0) return 'Nah you cant do that bruh';
            return a / b;
        default:
            error();
            return 0;
    }
}

function error() {
    console.log('ERROR');
    val = 0;
    last = 0;
    operator = '';
}
