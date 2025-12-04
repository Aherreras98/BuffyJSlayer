const REGEX = {
    nickname: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,20}$/

};

const ERROR_MESSAGES = {
    nickname: "Solo puedes utilizar letras y espacios, máximo 20 caracteres",
};

export const validationState = {
    username: false,
};

const registerBtn = document.getElementById('btn-next');

const checkFormValidity = () => {
    const allValid = Object.values(validationState).every(Boolean);
    registerBtn.disabled = !allValid;
};

const validateField = (input, fieldName) => {
    const errorElement = document.getElementById(`error-${fieldName}`);
    const regex = REGEX[fieldName];
    
    if (regex.test(input.value)) {
        validationState[fieldName] = true;
        errorElement.textContent = "";
    } else {
        validationState[fieldName] = false;
        errorElement.textContent = ERROR_MESSAGES[fieldName];
    }
    
    checkFormValidity();
};

export const initRegisterValidation = () => {
    document.getElementById('nickname').addEventListener('blur', (e) => validateField(e.target, 'nickname'));

};

export const resetValidationState = () => {
    validationState.nickname = false;
    checkFormValidity();
};