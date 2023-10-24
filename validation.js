document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const mobileNumber = document.getElementById('mobileNumber');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const termsCheckbox = document.getElementById('terms');
    const passwordStrengthIndicator = document.getElementById('password-strength');

    // Add input event listeners to validate inputs as the user types
    username.addEventListener('input', function() {
        validateInput(username, 'name-error');
    });
    email.addEventListener('input', function() {
        validateInput(email, 'email-error');
    });
    mobileNumber.addEventListener('input', function() {
        validateInput(mobileNumber, 'mobile-error');
    });
    password.addEventListener('input', function() {
        clearError(password, 'password-error');
        validatePassword(password);
    });
    password2.addEventListener('input', function() {
        validateInput(password2, 'password2-error');
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        validateInputs();
    });

    // Add blur event listeners to clear errors when the user clicks away
    username.addEventListener('blur', function() {
        clearError(username, 'name-error');
    });
    email.addEventListener('blur', function() {
        clearError(email, 'email-error');
    });
    mobileNumber.addEventListener('blur', function() {
        clearError(mobileNumber, 'mobile-error');
    });
    password.addEventListener('blur', function() {
        clearError(password, 'password-error');
    });
    password2.addEventListener('blur', function() {
        clearError(password2, 'password2-error');
    });

    function setError(input, message, errorId) {
        const inputControl = input.parentElement;
        const errorDisplay = document.getElementById(errorId);

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    function setSuccess(input, errorId) {
        const inputControl = input.parentElement;
        const errorDisplay = document.getElementById(errorId);

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    function clearError(input, errorId) {
        const inputControl = input.parentElement;
        const errorDisplay = document.getElementById(errorId);

        errorDisplay.innerText = '';
        inputControl.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email.toLowerCase());
    }

    function isValidPhoneNumber(phoneNumber) {
        // Validate phone number using a regular expression
        const phoneRegex = /^(\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4})$/;
        return phoneRegex.test(phoneNumber);
    }

    function validatePassword(password) {
        const passwordValue = password.value.trim();
        const passwordStrength = getPasswordStrength(passwordValue);
        const passwordStrengthColor = getPasswordStrengthColor(passwordStrength);

        if (passwordValue === '') {
            clearError(password, 'password-error');
            passwordStrengthIndicator.innerText = '';
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters', 'password-error');
            passwordStrengthIndicator.innerText = `Password Strength: ${passwordStrength}`;
            passwordStrengthIndicator.style.color = passwordStrengthColor;
        } else {
            clearError(password, 'password-error');
            passwordStrengthIndicator.innerText = `Password Strength: ${passwordStrength}`;
            passwordStrengthIndicator.style.color = passwordStrengthColor;
        }
    }

    function getPasswordStrength(password) {
        if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
            return 'Strong';
        } else if (/[a-z]/.test(password) || /[A-Z]/.test(password) || /\d/.test(password)) {
            return 'Medium';
        } else {
            return 'Poor';
        }
    }

    function getPasswordStrengthColor(strength) {
        if (strength === 'Strong') {
            return 'green';
        } else if (strength === 'Medium') {
            return 'orange';
        } else {
            return 'red';
        }
    }

    function validateInput(input, errorId) {
        const inputValue = input.value.trim();
        const errorDisplay = document.getElementById(errorId);

        if (inputValue === '') {
            setError(input, `${input.placeholder} is required`, errorId);
        } else if (input === email && !isValidEmail(inputValue)) {
            setError(input, 'Provide a valid email address', errorId);
        } else if (input === mobileNumber && !isValidPhoneNumber(inputValue)) {
            setError(input, 'Phone number is invalid', errorId);
        } else {
            clearError(input, errorId);
        }
    }

    function validateInputs() {
        validateInput(username, 'name-error');
        validateInput(email, 'email-error');
        validateInput(mobileNumber, 'mobile-error');
        validatePassword(password);
        validateInput(password2, 'password2-error');

        if (!termsCheckbox.checked) {
            setError(termsCheckbox, 'You must accept the terms and conditions', 'terms-error');
        } else {
            clearError(termsCheckbox, 'terms-error');
        }
    }
});
