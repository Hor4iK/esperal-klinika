document.addEventListener('DOMContentLoaded', function () {

  //search function
  const searchArray = document.querySelectorAll('.search');
  if (searchArray) {
    searchArray.forEach(search => {
      const input = search.querySelector('input');
      input.addEventListener('focus', evt => {
        search.classList.add('open');
      })
      input.addEventListener('blur', evt => {
        search.classList.remove('open');
      })
    })
  }

  //Slider INTRO, turns off when resize
  introSwiper = document.querySelector(".intro__swiper");
  if (introSwiper) {
    introSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 650 && !introSwiperCheck) {
          introSwiperCheck = new Swiper(document.querySelector('.intro__swiper'), {
            direction: 'horizontal',
            slidesPerView: 1,
            grabCursor: true,
            spaceBetween: 10,
            navigation: {
              nextEl: document.querySelector('.intro__nav-btn_next'),
              prevEl: document.querySelector('.intro__nav-btn_prev'),
            },
            breakpoints: {
              0: {
                slidesPerView: 1.1,
                spaceBetween: 10
              }
            }
          });
        }
        if (window.innerWidth > 650 && introSwiperCheck) {
          introSwiperCheck.destroy(true, true);
          introSwiperCheck = false
        }
      })
    })
  }

  //Slider METODS, turns on when mobile
  metodsSwiper = document.querySelector(".metods");
  if (metodsSwiper) {
    const metodsList = metodsSwiper.querySelector('.metods__list');
    metodsSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 1300 && !metodsSwiperCheck) {
          metodsList.classList.add('swiper-wrapper');
          metodsSwiperCheck = new Swiper(document.querySelector('.metods__swiper'), {
            direction: 'horizontal',
            slidesPerView: 1,
            grabCursor: true,
            spaceBetween: 10,
            navigation: {
              nextEl: document.querySelector('.metods__nav-btn_next'),
              prevEl: document.querySelector('.metods__nav-btn_prev'),
            },
            breakpoints: {
              0: {
                slidesPerView: 1.1,
                spaceBetween: 10
              },
              650: {
                slidesPerView: 2,
                spaceBetween: 15
              }
            }
          });
        }
        if (window.innerWidth > 1300 && metodsSwiperCheck) {
          metodsList.classList.remove('swiper-wrapper');
          metodsSwiperCheck.destroy(true, true);
          metodsSwiperCheck = false
        }
      })
    })
  }

  //Slider Situations, turns on when mobile
  situationSwiper = document.querySelector(".situation");
  if (situationSwiper) {
    const situationList = situationSwiper.querySelector('.situation__content');
    situationSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 650 && !situationSwiperCheck) {
          situationList.classList.add('swiper-wrapper');
          situationSwiperCheck = new Swiper(document.querySelector('.situation__body'), {
            direction: 'vertical',
            slidesPerView: 5,
            grabCursor: true,
            spaceBetween: 10,
            navigation: {
              nextEl: document.querySelector('.situation__nav-btn_next'),
              prevEl: document.querySelector('.situation__nav-btn_prev'),
            }
          });
        }
        if (window.innerWidth > 650 && situationSwiperCheck) {
          situationList.classList.remove('swiper-wrapper');
          situationSwiperCheck.destroy(true, true);
          situationSwiperCheck = false
        }
      })
    })
  }


  //Slider CENTER, turns on when mobile
  centerSwiper = document.querySelector(".center-lecheniya");
  if (centerSwiper) {
    const centerList = centerSwiper.querySelector('.center-lecheniya__gallery');
    const centerItemArray = centerList.querySelectorAll('.center-lecheniya__gallery__item:not(.center-lecheniya__gallery__item_more)');
    centerSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 800 && !centerSwiperCheck) {
          if (centerItemArray && centerItemArray.length > 0) {
            centerItemArray.forEach(item => {
              item.classList.add('swiper-slide');
            })
          }
          centerList.classList.add('swiper-wrapper');
          centerSwiperCheck = new Swiper(document.querySelector('.center-lecheniya__gallery__wrapper'), {
            direction: 'horizontal',
            slidesPerView: 1.1,
            grabCursor: true,
            spaceBetween: 10,
            navigation: {
              nextEl: document.querySelector('.center-lecheniya__nav-btn_next'),
              prevEl: document.querySelector('.center-lecheniya__nav-btn_prev'),
            }
          });
        }
        if (window.innerWidth > 800 && centerSwiperCheck) {
          const centerItemArray = centerList.querySelectorAll('.swiper-slide');
          centerList.classList.remove('swiper-wrapper');
          if (centerItemArray && centerItemArray.length > 0) {
            centerItemArray.forEach(item => {
              item.classList.remove('swiper-slide');
            })
          }
          centerSwiperCheck.destroy(true, true);
          centerSwiperCheck = false
        }
      })
    })
  }

  //view photos fancybox
  Fancybox.bind("[data-fancybox]");

});


/*

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
*/
//Баян faq

//Services tabs
const serviceTitle = document.querySelectorAll('.services__top-containerr');
const serviceContent = document.querySelectorAll(".services__bottom-container");
if (serviceTitle && serviceContent) {
	for (let i = 0; i < serviceTitle.length; i++) {
		serviceTitle[i].addEventListener("click", () => {
			serviceTitle[i].classList.toggle("active");
			if (serviceContent[i].style.maxHeight) {
				serviceContent[i].removeAttribute("style");
			} else {
				serviceContent[i].style.maxHeight = "1000px";
			}
		})
	};
}
