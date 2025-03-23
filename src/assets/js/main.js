//Фиксирование шапки сверху при скролле
const header = document.querySelector(".header")
const main = document.querySelector("main")
if (header) {
	window.onscroll = function () {
		if (window.scrollY >= header.offsetTop + header.scrollHeight) {
			header.classList.add("header_fixed")
			main.style.marginTop = header.scrollHeight + "px"
		} else {
			header.classList.remove("header_fixed")
			main.removeAttribute("style")
		}
	}
}

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
	let getUpButton = document.querySelector("#myBtn");
	converseClose.addEventListener("click", () => {
		if (getUpButton.style.bottom == "40px") {
			getUpButton.removeAttribute("style");
		} else {
			getUpButton.style.bottom = "40px";
		}
		converseClose.classList.toggle("converse__close_hidden");
		converseCardWrapper.classList.toggle("converse__card-wrapper_hidden");
	})
}

//Табы для услуг
const serviceTabsBtns = document.querySelectorAll(".our-services__tabs-list li")
const serviceTabContents = document.querySelectorAll(".our-services__tab-content");
if (serviceTabsBtns.length > 0 && serviceTabContents.length > 0) {
	serviceTabsBtns[0].classList.add("active");
	serviceTabContents[0].classList.add("active");
	if (window.innerWidth < 960) {
		serviceTabContents[0].style.maxHeight = serviceTabContents[0].scrollHeight + 40 + "px";
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
				answers[i].style.maxHeight = "1000px";
			}
		})
	};
}

//Слайдер блока доверия
// const trustSliderCheck = document.querySelectorAll('.trust');
// if (trustSliderCheck.length > 0) {
// 	trustSliderCheck.forEach((slider) => {
// 		const trustSlider = new Swiper(slider.querySelector('.trust__video'), {
// 			direction: 'horizontal',
// 			slidesPerView: 1.1,
// 			grabCursor: true,
// 			spaceBetween: 10,
// 			navigation: {
// 				nextEl: slider.querySelector('.trust__nav-btn_next'),
// 				prevEl: slider.querySelector('.trust__nav-btn_prev'),
// 			},
// 			breakpoints: {
// 				0: {
// 					slidesPerView: 1,
// 					spaceBetween: 20,
// 				},
// 				950: {
// 					slidesPerView: 3,
// 					spaceBetween: 20,
// 				}
// 			}
// 		});
// 	})
// }

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
			if (window.innerWidth >= 650 && advantagesSwiper) {
				advantagesSwiper.destroy(true, true);
				advantagesSwiper = false
			}
		})
	})
}

//Слайдер врачей
const doctorsSliderCheck = document.querySelectorAll('.doctors');
if (doctorsSliderCheck.length > 0) {
	doctorsSliderCheck.forEach((slider) => {
		const doctorsSlider = new Swiper(slider.querySelector('.doctors__slider'), {
			direction: 'horizontal',
			slidesPerView: 1.1,
			grabCursor: true,
			spaceBetween: 10,
			navigation: {
				nextEl: slider.querySelector('.nav-btn_next'),
				prevEl: slider.querySelector('.nav-btn_prev'),
			},
			breakpoints: {
				360: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				680: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				950: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				1160: {
					slidesPerView: 4,
					spaceBetween: 35,
				}
			}
		});
	})
}

//Слайдер лицензий
const licenseSliderCheck = document.querySelectorAll('.license');
if (licenseSliderCheck.length > 0) {
	licenseSliderCheck.forEach((slider) => {
		const licenseSlider = new Swiper(slider.querySelector('.license__inner'), {
			direction: 'horizontal',
			slidesPerView: 1.1,
			grabCursor: true,
			spaceBetween: 10,
			navigation: {
				nextEl: slider.querySelector('.nav-btn_next'),
				prevEl: slider.querySelector('.nav-btn_prev'),
			},
			breakpoints: {
				360: {
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

//Слайдер фотографий
const photosSliderCheck = document.querySelectorAll('.photos');
if (photosSliderCheck.length > 0) {
	photosSliderCheck.forEach((slider) => {
		const photosSlider = new Swiper(slider.querySelector('.photos__inner'), {
			direction: 'horizontal',
			slidesPerView: 1.1,
			grabCursor: true,
			spaceBetween: 10,
			navigation: {
				nextEl: slider.querySelector('.nav-btn_next'),
				prevEl: slider.querySelector('.nav-btn_prev'),
			},
			breakpoints: {
				360: {
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

const documentsSliderCheck = document.querySelectorAll('.doctors-docs__inner.swiper');
if (documentsSliderCheck.length > 0) {
	documentsSliderCheck.forEach((slider) => {
		const documentSlider = new Swiper(slider, {
			direction: 'horizontal',
			slidesPerView: 1,
			grabCursor: true,
			spaceBetween: 10,
			navigation: {
				nextEl: slider.querySelector('.nav-btn_next'),
				prevEl: slider.querySelector('.nav-btn_prev'),
			},
			breakpoints: {
				600: {
					slidesPerView: 2,
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

//Слайдер отзывов
const reviewsSliderCheck = document.querySelectorAll('.reviews__inner.swiper');
if (reviewsSliderCheck.length > 0) {
	reviewsSliderCheck.forEach((slider) => {
		const reviewsSwiper = new Swiper(slider, {
			direction: 'horizontal',
			slidesPerView: 1,
			grabCursor: true,
			spaceBetween: 10,
			navigation: {
				nextEl: slider.querySelector('.nav-btn_next'),
				prevEl: slider.querySelector('.nav-btn_prev'),
			},
			breakpoints: {
				500: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				950: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1150: {
					slidesPerView: 4,
					spaceBetween: 20,
				}
			}
		});
	})
}

//Добавляем звёзды в отзывы
const marks = document.querySelectorAll(".reviews__mark");
if (marks.length > 0) {
	marks.forEach(mark => {
		stars = mark.querySelectorAll("span")
		if (stars.length < 5) {
			for (i = 0; i < 5 - stars.length; i++) {
				star = document.createElement('span');
				star.classList.add("dis")
				mark.append(star)
			}
		}
	});
}

//Попапы
document.addEventListener("DOMContentLoaded", function () {
	function popupClose(popupActive) {
		popupActive.classList.remove('open');
		setTimeout(() => {
			popupActive.classList.contains("open") || popupActive.classList.remove("active");
		}, 400);
		document.body.classList.remove('lock');
		document.querySelector('html').style.paddingRight = 0;
		document.querySelector('html').classList.remove('lock');
		document.querySelector('header').removeAttribute('style');
	}
	const popupOpenBtns = document.querySelectorAll('.popup-btn');
	const popups = document.querySelectorAll('.popup');
	const closePopupBtns = document.querySelectorAll('.close-popup');
	closePopupBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			popupClose(e.target.closest('.popup'));
		});
	});
	if (popups.length > 0) {
		popups.forEach(function (popup) {
			popupClose(popup);
			popup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {

					popupClose(e.target.closest('.popup'));
				}
			});
		});
	}
	popupOpenBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			const path = e.currentTarget.dataset.path;
			const currentPopup = document.querySelector(`[data-target="${path}"]`);
			if (currentPopup) {
				currentPopup.classList.add('active');
				setTimeout(() => {
					currentPopup.classList.add("open");
				}, 10);
				if (currentPopup.getAttribute("data-target") == 'popup-change') {
					let currentItem = el.closest('.change-item');
					let originalTop = currentPopup.querySelector('.original-title');
					let title = currentItem.querySelector('.change-title');
					let subtitle = currentItem.querySelector('.change-subtitle');
					if (title && subtitle) {
						var newTitle = title.innerHTML + ' ' + subtitle.innerHTML;
					} else if (title) {
						var newTitle = title.innerHTML;
					} else {
						var newTitle = subtitle.innerHTML;
					}
					if (el.classList.contains('change-doctor')) {
						newTitle = 'Записаться на приём к врачу: ' + newTitle;
					}
					originalTop.innerHTML = newTitle;
				};
				// scrollWidthFunc();
				document.querySelector('html').classList.add('lock');
			}
		});
	});
});

//Динамическое формирование содержания
const articleNavigation = document.querySelector('.content-table__navigation');
if (articleNavigation) {

	const jsScrollBlockList = document.querySelectorAll('.text-block h1, .text-block h2');

	if (jsScrollBlockList.length > 0) {
		for (let i = 0; i < jsScrollBlockList.length; i += 1) {
			const jsScrollBlock = jsScrollBlockList[i];
			const titleBlock = jsScrollBlock.textContent;
			const articleNavigationList = document.querySelector('.content-table__navigation');
			const articleNavigationItem = document.createElement('li');
			const articleNavigationLink = document.createElement('a');
			articleNavigationItem.classList.add('navigation__list-item');
			if (jsScrollBlock.tagName == 'H1') {
				articleNavigationItem.classList.add('title-h1');
			}
			if (jsScrollBlock.tagName == 'H2') {
				articleNavigationItem.classList.add('title-h2');
			}
			articleNavigationLink.classList.add('navigation__link');
			jsScrollBlock.setAttribute('id', i)
			articleNavigationLink.setAttribute('href', '#' + i);
			articleNavigationLink.textContent = ' ' + titleBlock;
			articleNavigationItem.append(articleNavigationLink);
			articleNavigationList.append(articleNavigationItem);
		}
		document.querySelectorAll('a[href^="#"').forEach(link => {

			link.addEventListener('click', function (e) {
				e.preventDefault();

				let href = this.getAttribute('href').substring(1);
				const scrollTarget = document.getElementById(href);
				const topOffset = 180;
				const elementPosition = scrollTarget.getBoundingClientRect().top;
				const offsetPosition = elementPosition - topOffset;

				window.scrollBy({
					top: offsetPosition,
					behavior: 'smooth'
				});
			});
		});
	} else {
		articleNavigation.querySelector('.navigation__item').remove();
	}
}

//Табы для faq и отзывов
//Сколько элементов внутри контента таба показать
const paginationNumber = 5

function countHiddenItems(tabContent) {
	elements = Array.from(tabContent.children)
	hiddenElements = elements.filter(element => {
		return !element.classList.contains("show")
	})
	return hiddenElements.length
}

function HiddenElementsInit(tabContent, paginationNumber) {
	if (countHiddenItems(tabContent) > paginationNumber) {
		elements = tabContent.children
		for (let i = 0; i < paginationNumber; i++) {
			elements[i].classList.add("show")
		}
		document.querySelector(".tab__show-more-btn").classList.add("active");
	} else {
		elements.forEach(element => {
			element.classList.add('show');
		});
		document.querySelector(".tab__show-more-btn").classList.remove("active");
	}
}

function tabsShowMore(paginationNumber) {
	tabContent = document.querySelector(".tab-content.active")
	elements = Array.from(tabContent.children)
	hiddenElements = elements.filter(element => {
		return !element.classList.contains("show")
	})
	if (hiddenElements.length > paginationNumber) {
		for (let i = 0; i < paginationNumber; i++) {
			hiddenElements[i].classList.add("show")
		}
	} else {
		hiddenElements.forEach(element => {
			element.classList.add("show")
		});
		document.querySelector(".tab__show-more-btn").classList.remove("active");
	}
}

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content")
if (tabBtns.length > 0 && tabContents.length > 0) {
	tabBtns[0].classList.add("active")
	tabContents[0].classList.add("active")
	HiddenElementsInit(tabContents[0], paginationNumber)
	for (let i = 0; i < tabBtns.length; i++) {
		tabBtns[i].addEventListener("click", (e) => {
			if (e.currentTarget.classList.contains("active")) {
				e.currentTarget.closest(".tab-btns-wrapper").classList.toggle("active")
			} else {
				e.currentTarget.closest(".tab-btns-wrapper").classList.remove("active")
				document.querySelectorAll(".tab-btn.active").forEach(el => {
					el.classList.remove("active")
				});
				document.querySelectorAll(".tab-content.active").forEach(el => {
					Array.from(el.children).forEach(el => {
						el.classList.remove('show')
					})
					el.classList.remove("active")
				});
				e.currentTarget.classList.add("active")
				tabContents[i].classList.add("active")
				HiddenElementsInit(tabContents[i], paginationNumber)
			}
		})
	}
}

showMoreBtn = document.querySelector(".tab__show-more-btn")
if (showMoreBtn) {
	showMoreBtn.addEventListener("click", () => {
		tabsShowMore(paginationNumber)
	})
}

//Табы для статей
articles = document.querySelectorAll(".articles__card")
articlesInner = document.querySelector(".articles__inner")
articlesTabs = document.querySelector(".articles__tabs")

if (articles.length > 0 && articlesInner && articlesTabs) {
	tagsNames = new Array;
	articles.forEach(article => {
		article.querySelectorAll(".articles__categories span").forEach(tag => {
			if (tagsNames.indexOf(tag.innerHTML.trim()) == -1) {
				tagsNames.push(tag.innerHTML.trim())
				newTab = document.createElement('div')
				newTab.innerHTML = tag.innerHTML.trim()
				newTab.classList.add("articles__tab")
				articlesTabs.appendChild(newTab)
			}
		})
	});

	articlesTabs = document.querySelectorAll(".articles__tab")

	articlesTabs.forEach(tab => {
		if (tab.classList.contains("articles__tab_all")) {
			tab.classList.add("active")
			articles.forEach(article => {
				article.classList.add("active")
			})
			tab.addEventListener("click", (e) => {
				document.querySelectorAll(".articles__tab.active").forEach(tab => {
					tab.classList.remove("active")
				})
				e.currentTarget.classList.add("active")
				articlesInner.style.minHeight = "100vh";
				articles.forEach(article => {
					article.classList.remove("active")
					setTimeout(() => {
						article.classList.add("active")
						articlesInner.removeAttribute("style")
					});
				})
			})
		} else {
			tab.addEventListener("click", (e) => {
				document.querySelectorAll(".articles__tab.active").forEach(tab => {
					tab.classList.remove("active")
				})
				e.currentTarget.classList.add("active")
				articlesInner.style.minHeight = "100vh";
				articles.forEach(article => {
					article.classList.remove("active")
				})
				articles.forEach(article => {
					article.querySelectorAll(".articles__categories span").forEach(tag => {
						if (tag.innerHTML.trim() == e.currentTarget.innerHTML.trim()) {
							setTimeout(() => {
								article.classList.add("active")
							});
						}
					})
				});
				setTimeout(() => {
					articlesInner.removeAttribute("style")
				});
			})
		}
	});
}

//Просмотр для фотографий
Fancybox.bind("[data-fancybox]");