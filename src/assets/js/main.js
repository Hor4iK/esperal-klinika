//Открывашка аккордеонов в шапке мобильной версии
const menuAccordionButtons = document.querySelectorAll('.menu__sub-open');
if (menuAccordionButtons) {
	menuAccordionButtons.forEach(accordionButton => {
		accordionButton.addEventListener("click", () => {
			accordionButton.classList.toggle("active");
			const menuElement = accordionButton.closest("li");
			if (menuElement) {
				menuElement.classList.toggle("active");
			}
		})
	})
}

//Открывашка бургера в мобильной версии
const burger = document.querySelector(".ham")
if (burger) {
	burger.addEventListener("click", () => {
		const header = document.querySelector(".header");
		if (header) {
			header.classList.toggle("active");
		}
	})
}

//Плашка снизу сайта
let converseCardWrapper = document.querySelector(".converse__card-wrapper");
if (converseCardWrapper) {
	let converseClose = document.querySelector(".converse__close");
	//let getUpButton = document.querySelector("#toTop");
	//getUpButton.style.bottom = "160px";
	//getUpButton.style.transition = "0.3s";
	converseClose.addEventListener("click", () => {
		// if (getUpButton.style.bottom == "160px") {
		// 	getUpButton.style.bottom = "45px";
		// } else {
		// 	getUpButton.style.bottom = "160px";
		// }
		converseClose.classList.toggle("converse__close_hidden");
		converseCardWrapper.classList.toggle("converse__card-wrapper_hidden");
	})
}