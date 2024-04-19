const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check email is valid
function checkEmail(input){
    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid')
    }
}

// check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === ''){
            showError(input, ` ${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// check password match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Password do not match')
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 20);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
})