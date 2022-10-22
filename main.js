// CARDHOLDER NAME
let nameCard = document.querySelector('.card__details-name');
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error');


// CARD NUMBER
let numberCard = document.querySelector('.card__number');
let numberInput = document.querySelector('#cardNumber');
let numberErrorDiv = document.querySelector('.form__cardNumber--error');

// MM
let monthCard = document.querySelector('.card__month');
let monthInput = document.querySelector('#cardMonth');
let monthErrorDiv = document.querySelector('.form__input--mm--error');


// YY
let yearCard = document.querySelector('.card_year');
let yearInput = document.querySelector('#cardYears');
let yearErrorDiv = document.querySelector('.form__input--yy--error');

// cvc
let cvcCard  = document.querySelector('.card-back__cvc');
let cvcInput  = document.querySelector('#cardCvc');
let cvcErrorDiv = document.querySelector('.form__input--cvc--error')


// Ingreso dinamico del nombre
nameInput.addEventListener('input', ()=>{
    if(nameInput.value == ''){
        nameCard.innerText = 'JANE APPLESEED'
    } else {
    nameCard.innerText = nameInput.value;
    }
});

//Ingreso dinamico del numero

numberInput.addEventListener('input', event=>{
    numberCard.innerText = numberInput.value;

    let inputValue = event.target.value;

    //Validando que haya una letra 
    let regExp = /[A-z]/g;
    if(regExp.test(numberInput.value)){
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only');
    } else {
        //agregando espacios cada 4 digitos, borrando espacios ingresador por el usuario y final
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
       showError(numberInput, numberErrorDiv, '', false);
    }

    //Mostrando los 0s por defecto cuando no se ha ingresado nada
    if(numberInput.value == ''){
        numberCard.innerText = '0000 0000 0000 0000'
    }
});
// Ingreso dinamico del mes
monthInput.addEventListener('input',()=>{
   monthCard.innerText = monthInput.value;
   validateLetters(monthInput, monthErrorDiv);
});

// Ingreso dinamico del año
yearInput.addEventListener('input',()=>{
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
 });

// Ingreso dinamico de cvc 

cvcInput.addEventListener('input',()=>{
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
 });


//Boton confirm

let confirmBtn = document.querySelector('.form__submit');

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Secciones Formulario y Thanks

let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmBtn.addEventListener('click', event=>{
    event.preventDefault();

// Validar name
if(verifyIsFilled(nameInput, nameErrorDiv)){
    nameValidation = true;
}else{
    nameValidation = false
}

//Validar Numero
if(verifyIsFilled(numberInput, numberErrorDiv) == true){
   if(numberInput.value.length == 19){
    showError(numberInput, numberErrorDiv, '', false);
    numberValidation = true;
   }else{
    showError(numberInput, numberErrorDiv, 'Wrong Number');
   numberValidation = false;
   }
}


//Validar mes
if(verifyIsFilled(monthInput, monthErrorDiv)){
    if(parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12){
    showError(monthInput, monthErrorDiv, '', false)
    monthValidation = true;
}else {
    showError(monthInput, monthErrorDiv, 'Wrong Month');
    monthValidation = false;
  } 
}

// Validar año
if(verifyIsFilled(yearInput, yearErrorDiv)){
    if(parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27){
        showError(yearInput, yearErrorDiv, '', false);
        yearValidation = true;
    } else {
        showError(yearInput, yearErrorDiv, 'Wrong Year');
        yearValidation = false;
    }
};

// Validar cvc
    if(verifyIsFilled(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length === 3){
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        }else{
            showError(cvcInput, cvcErrorDiv, 'Wrong CVC');
            cvcValidation = false;
        }
    }

    if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true){
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }
});


// Funciones

function showError(divInput, divError, msgError, show = true){
    if(show){
        divError.innerText = msgError;
        divInput.style.borderColor = '#FF0000'; 
    }else{
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError){
     if(divInput.value.length > 0){
          showError(divInput, divError, "", false);
          return true;
     } else {
           showError(divInput, divError, "Can't be blank");
           return false;
     }
}

function validateLetters(input, divError){
     //Validando que haya una letra 
     let regExp = /[A-z]/g;
     if(regExp.test(input.value)){
         showError(input, divError, 'Wrong format, numbers only');
     } else {
        showError(input, divError, '', false);
     }
}
