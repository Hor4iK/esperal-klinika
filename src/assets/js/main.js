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

//Табы для услуг
const serviceTabsBtns = document.querySelectorAll(".our-services__tabs-list li")
const serviceTabContents = document.querySelectorAll(".our-services__tab-content");
if (serviceTabsBtns && serviceTabContents) {
	if (window.innerWidth > 960) {
		serviceTabsBtns[0].classList.add("active");
		serviceTabContents[0].classList.add("active");
	}
	for (let i = 0; i < serviceTabContents.length; i++) {
		serviceTabContents[i].style.order = i * 2 + 1;
		serviceTabsBtns[i].style.order = i * 2;
		serviceTabsBtns[i].addEventListener('click', () => {
			if (window.innerWidth > 960) {
				document.querySelectorAll(".our-services__tabs-list li.active").forEach(activeBtn => {
					activeBtn.classList.remove('active');
				})
				document.querySelectorAll(".our-services__tab-content.active").forEach(activeContent => {
					activeContent.classList.remove('active');
				})
				serviceTabsBtns[i].classList.add('active');
				serviceTabContents[i].classList.add("active");
			}
			else {
				serviceTabsBtns[i].classList.toggle('active');
				serviceTabContents[i].classList.toggle("active");
				if (serviceTabContents[i].style.maxHeight) {
					serviceTabContents[i].style.maxHeight = ""
				} else {
					serviceTabContents[i].style.maxHeight = serviceTabContents[i].scrollHeight + 40 + "px";
				}
			}
		})
	}
}

//Баян faq
const questions = document.querySelectorAll('.faq__question-wrapper');
const answers = document.querySelectorAll(".faq__answer");
if (questions && answers) {
	for (let i = 0; i < questions.length; i++) {
		questions[i].addEventListener("click", () => {
			questions[i].classList.toggle("active");
			if (answers[i].style.maxHeight) {
				answers[i].removeAttribute("style");
			} else {
				answers[i].style.maxHeight = document.querySelector(".faq__answer").scrollHeight + "px";
			}
		})
	};
}

const trustSliderCheck = document.querySelectorAll('.trust');
if (trustSliderCheck.length > 0) {
	trustSliderCheck.forEach((slider) => {
		const trustSlider = new Swiper(slider.querySelector('.trust__video'), {
			direction: 'horizontal',
			slidesPerView: 1.1,
			grabCursor: true,
			spaceBetween: 10,
			navigation: {
				nextEl: slider.querySelector('.trust__nav-btn_next'),
				prevEl: slider.querySelector('.trust__nav-btn_prev'),
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				950: {
					slidesPerView: 3,
					spaceBetween: 20,
				}
			}
		});
	})
}

//Слайдер, который вырубается при ресайзе
advantagesSwiperCheck = document.querySelector(".advantages__swiper");
if (advantagesSwiperCheck) {
	advantagesSwiper = false;
	['resize', 'load'].forEach((event) => {
		window.addEventListener(event, function () {
			if (window.innerWidth < 650 && !advantagesSwiper) {
				advantagesSwiper = new Swiper(document.querySelector('.advantages__swiper'), {
					direction: 'horizontal',
					slidesPerView: 1,
					grabCursor: true,
					spaceBetween: 10,
					navigation: {
						nextEl: document.querySelector('.advantages__nav-btn_next'),
						prevEl: document.querySelector('.advantages__nav-btn_prev'),
					},
				});
			}
			if (window.innerWidth >= 650 && advantagesSwiper){
				advantagesSwiper.destroy(true, true);
				advantagesSwiper = false
			}
		})
	})
}

//Просмотр для фотографий
Fancybox.bind("[data-fancybox]");