// Функция включения валидации на всех формах
const enableValidation = (validationConfig) => {
    const formList = document.querySelectorAll(validationConfig.formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      setEventListeners(
        formElement,
        validationConfig.inputSelector,
        validationConfig.submitButtonSelector,
        validationConfig.inactiveButtonClass,
        validationConfig.inputErrorClass,
        validationConfig.errorClass,
      );
    });
  };

// Скрытие ошибки при корректнои заполнении инпута
const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
    ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// Скрытие ошибки при корректнои заполнении инпута
const hideInputError = (
     formElement,
     inputElement,
     inputErrorClass,
     errorClass
    ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

// Проверка на валидацию инпута 
const checkInputValidity = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
    ) => {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass
    );
    } else {
      hideInputError(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
     );
    }

    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
      inputElement.setCustomValidity("");
    }
};

// Вешаем слушатель событий на каждый элемент
const setEventListeners = (
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
 ) => {
const inputList = formElement.querySelectorAll(inputSelector);
const buttonElement = formElement.querySelector(submitButtonSelector);
toggleButtonState(inputList, buttonElement, inactiveButtonClass);

inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
    );
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
  });
}; 

// Функция для перебора значений массива полей ввода. Если хотя бы одно из полей неккоретно, то some вернет - истину. Иначе - ложь.
const hasInvalidInput = (inputList) => {
    const inputArr = Array.from(inputList);
    return inputArr.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Функция замены класса у кнопки в зависимости от инпута
const toggleButtonState = (
     inputList,
     buttonElement,
     inactiveButtonClass
     ) => {
      
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }; 

// Функция очищает ошибки валидации формы
const clearValidation = (
        formElement,
        validationConfig
    ) => {

    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
    
    inputList.forEach((inputElement) => {
        hideInputError(
            formElement,
            inputElement,
            validationConfig.inputErrorClass,
            validationConfig.errorClass,
          );
          inputElement.setCustomValidity("");
    });
}; 

export { enableValidation, clearValidation }