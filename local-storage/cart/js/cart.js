'use strict';

let colorsWrapp = document.getElementById('colorSwatch');
let sizesWrapp = document.getElementById('sizeSwatch');



let colorsGetRequest = fetch(
	'https://neto-api.herokuapp.com/cart/colors').then((res) => {
		if(!res.ok) {
			return Promise.reject(new Error(response.statusText));
		}
		return res.json();
	}).then((colorsDate) => {
		console.log(colorsDate);

		colorsDate.forEach((color) => {
			let availableVal = color.isAvailable == true ? 'available' : 'soldout';
			let disabledVal = color.isAvailable == true ? '' : 'disabled';

			let colorItem = `<div data-value="${color.type}" class="swatch-element color ${color.type} ${availableVal}">
			  <div class="tooltip">${color.title}</div>
			  <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${disabledVal}>
			  <label for="swatch-1-${color.type}" style="border-color: red;">
			    <span style="background-color: ${color.code};"></span>
			    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
			  </label>
			</div>`;

			colorSwatch.innerHTML += colorItem;
		});

		let radiosButtons = colorsWrapp.querySelectorAll('input');

		Array.from(radiosButtons).forEach((radio) => {
			radio.addEventListener('input', (e) => {
			  	localStorage.selectedColor = e.target.value;
			});

		});

		Array.from(radiosButtons).forEach((radio) => {
			if(localStorage.selectedColor == radio.value) {
				radio.setAttribute('checked', 'true');
			}
		});

		
		

	}).catch((error) => {
		console.log(error);
});










/*

<div data-value="red" class="swatch-element color red available">
  <div class="tooltip">Красный</div>
  <input quickbeam="color" id="swatch-1-red" type="radio" name="color" value="red" checked>
  <label for="swatch-1-red" style="border-color: red;">
    <span style="background-color: red;"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>

*/	

let sizesGetRequest = fetch(
	'https://neto-api.herokuapp.com/cart/sizes').then((res) => {
		if(!res.ok) {
			return Promise.reject(new Error(response.statusText));
		}
		return res.json();
	}).then((sizesDate) => {
		console.log(sizesDate);

		sizesDate.forEach((size) => {
			let availableVal = size.isAvailable == true ? 'available' : 'soldout';
			let disabledVal = size.isAvailable == true ? '' : 'disabled';

			let sizeItem = `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${availableVal}">
			  <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${disabledVal}>
			  <label for="swatch-0-${size.type}">
			    ${size.title}
			    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
			  </label>
			</div>`;

			sizesWrapp.innerHTML += sizeItem;

			let radiosButtons = sizesWrapp.querySelectorAll('input');

			Array.from(radiosButtons).forEach((radio) => {
				radio.addEventListener('input', (e) => {
				  	localStorage.selectedSize = e.target.value;
				});

			});

			Array.from(radiosButtons).forEach((radio) => {
				if(localStorage.selectedSize == radio.value) {
					radio.setAttribute('checked', 'true');
				}
			});

		});

	}).catch((error) => {
		console.log(error);
});

/*

Обратите внимание на подстановку данных:
 {title: "S", type: "s", isAvailable: false}

Значение размера подставляется в атрибуты data-value и class тега <div>, id и value тега <input>, for тега <label>.
От доступности товара в данном размере зависит наличие класса soldout или available у тега <div>, а также наличие атрибута disabled у тега <input>.
Описание размера подставляется в тело тега <label>.
Если размер выбран по умолчанию, то в тег <input> добавляется атрибут checked.

<div data-value="s" class="swatch-element plain s soldout">
  <input id="swatch-0-s" type="radio" name="size" value="s" disabled>
  <label for="swatch-0-s">
    S
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>

*/




let cartStateGetRequest = fetch(
	'https://neto-api.herokuapp.com/cart').then((res) => {
		if(!res.ok) {
			return Promise.reject(new Error(response.statusText));
		}
		return res.json();
	}).then((date) => {
		console.log(date);
	}).catch((error) => {
		console.log(error);
});