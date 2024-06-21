document.addEventListener('DOMContentLoaded', function () { //DOM Content loaded => al cargar la pagina
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    })

    emailInput.addEventListener('blur', function () { //blur = cuando salimos del formulario
        validateEmail();
    });

    emailInput.addEventListener('change', function () { //change = cuando se realiza algun cambio
        clearError(emailError);
    })

    passwordInput.addEventListener('change', function () {
        clearError(passwordError);
    })

    confirmPasswordInput.addEventListener('change', function () {
        clearError(confirmPasswordError);
    })

    showHideButton.addEventListener('click', function () {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }
    })

    function validateForm() {
        const isAValidEmail = validateEmail();
        const isAValidPassoword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isAValidEmail && isAValidPassoword && passwordMatch) { // (isAValidEmail && isAValidPassoword && passwordMatch) = true?
            saveToLocalStorage();
            alert('Has ingresado exitosamente');
        }
    }

    function validateEmail() {
        const emialRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        const emailValue = emailInput.value.trim();//trim elimina espacios vacios al comienzo y al final del input

        if (!emialRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un email válido');
            return false
        } else {
            return true
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 6) {
            showError(passwordError, 'Ingresa una contraseña de al menos 6 caracteres');
            return false
        }
        return true
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas no coinciden');
            return false
        }
        return true
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value,
        }
    }
});