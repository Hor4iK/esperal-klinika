//Открывашка аккордеонов в шапке мобильной версии
const menuAccordionButtons = document.querySelectorAll('.menu__sub-open');
menuAccordionButtons.forEach(accordionButton => {
	accordionButton.addEventListener("click", () => {
		accordionButton.classList.toggle("active");
		const menuElement = accordionButton.closest("li");
		menuElement.classList.toggle("active");
	})
});