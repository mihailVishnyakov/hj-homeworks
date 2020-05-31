'use strict';
let regForm = document.getElementsByClassName('sign-up-htm')[0];
let regFormSubmit = regForm.querySelector('[type="submit"]');

function regUser(event) {
	event.preventDefault();	
	let regFormMessege = regForm.querySelector('.error-message');
	let regUser = {
		email:  regForm.querySelector('[name="email"]').value,
		password:  regForm.querySelector('[name="password"]').value,
		passwordcopy: regForm.querySelector('[name="passwordcopy"]').value,
		name:  regForm.querySelector('[name="name"]').value
	}

	let requestRegUserPost = fetch('https://neto-api.herokuapp.com/signup', {
		body: JSON.stringify(regUser),
		credentials:'same-origin',
		method:'POST',
		headers:{'Content-Type':'application/json'}
	}).then(function(response) {
	    // Получаем код ответа сервера.
	    if (!response.ok) {
	        return Promise.reject(new Error(response.statusText));
	    }
	    // Далее будем использовать только JSON из тела ответа.
	    //.json() - метод обработки ответа https://developer.mozilla.org/ru/docs/Web/API/Body/json
	    return response.json();
	}).then(function(requestText) {
		delete requestText.password;
		delete requestText.passwordcopy;
		console.log(requestText);
		if(requestText.error == true) {
			regFormMessege.textContent = requestText.message;
		} else {
			regFormMessege.textContent = `Пользователь ${requestText.name} успешно зарегистрирован`;
		}
	}).catch(function (error) {
	    console.log(error);
	});
}



regFormSubmit.addEventListener('click', regUser);