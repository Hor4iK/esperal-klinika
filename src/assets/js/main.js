const menuAccordionButtons = document.querySelectorAll('.menu__sub-open');
menuAccordionButtons.forEach(accordionButton => {
	accordionButton.addEventListener("click", () => {
		accordionButton.classList.toggle("active");
	})
});