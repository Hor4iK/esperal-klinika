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

//Slider, turns off when resize
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

//view photos fancybox
Fancybox.bind("[data-fancybox]");
