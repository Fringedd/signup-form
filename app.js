const usernameEl = document.querySelector('#username');
const lastnameEl = document.querySelector('#username2')
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

const form = document.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        var error_image = document.getElementById('error-img0');
        error_image.style.display = 'inline';
        showError(usernameEl, 'First Name cannot be empty.');
    } else if (!isBetween(username.length, min, max)) {
        var error_image = document.getElementById('error-img0');
        error_image.style.display = 'inline';
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checklastname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const usernamer = lastnameEl.value.trim();

    if (!isRequired(usernamer)) {
        var error_image = document.getElementById('error-img1');
        error_image.style.display = 'inline';
        showError(lastnameEl, 'Last Name cannot be empty.');
    } else if (!isBetween(usernamer.length, min, max)) {
        var error_image = document.getElementById('error-img1');
        error_image.style.display = 'inline';
        showError(lastnameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastnameEl);
        valid = true;
    }
    return valid;
};



const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        var error_image = document.getElementById('error-img2');
        error_image.style.display = 'inline';
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        var error_image = document.getElementById('error-img2');
        error_image.style.display = 'inline';
        showError(emailEl, 'Please provide a valid email.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        var error_image = document.getElementById('error-img3');
        error_image.style.display = 'inline';
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        var error_image = document.getElementById('error-img3');
        error_image.style.display = 'inline';
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;




const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
    var error_image = document.getElementById('error-img0');
    error_image.style.display = 'none';
    var error_image = document.getElementById('error-img1');
    error_image.style.display = 'none';
    var error_image = document.getElementById('error-img2');
    error_image.style.display = 'none';
    var error_image = document.getElementById('error-img3');
    error_image.style.display = 'none';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();


    // validate forms
    let isUsernameValid = checkUsername(),
        isLastnameValid = checklastname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isUsernameValid &&
        isLastnameValid&&
        isEmailValid &&
        isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
// 
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'username2':
            checklastname();    
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));