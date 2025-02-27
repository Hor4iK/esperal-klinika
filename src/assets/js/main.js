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
if(burger){
	burger.addEventListener("click", ()=>{
		const header = document.querySelector(".header");
		if(header){
			header.classList.toggle("active");
		}
	})
}
