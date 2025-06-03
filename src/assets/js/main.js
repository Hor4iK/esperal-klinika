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



  /* -- PAGINATION  -- */
  function hiddenItems(tabContent) {
    elements = Array.from(tabContent.children);
    hiddenElements = elements.filter(element => {
      return element.classList.contains("hide");
    })
    return hiddenElements;
  }

  function HiddenElementsInit(tabContent, paginationNumber, btnMore) {
    elements = tabContent.children;
    if (elements.length > paginationNumber) {
      for (let i = elements.length - 1; i >= paginationNumber; i--) {
        elements[i].classList.add("hide");
      }
      btnMore.classList.add("active");
    }
  }

  function tabsShowMore(paginationNumber, btnMore) {
    tabContent = document.querySelector(".pag-list.pag-active");
    hiddenElements = hiddenItems(tabContent);
    for (let i = 0; i < hiddenElements.length; i++) {
      hiddenElements[i].classList.remove("hide");
    }
    btnMore.classList.remove("active");
  }

  const showMoreBtn = document.querySelector(".btn_more");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", (evt) => {
      tabsShowMore(8, showMoreBtn);
    })
  }
  /* -- END PAGINATION  -- */



  /* -- SERVICES  -- */
  const service = document.querySelector('.services');

  if (service) {

    const tabContents = service.querySelectorAll(".pag-list");
    if (tabContents.length > 0) {
      tabContents.forEach(content => {
        HiddenElementsInit(content, 8, showMoreBtn);
      })
    }

    //Services tabs
    const serviceTitle = service.querySelectorAll('.services__top-container');
    const serviceContent = service.querySelectorAll(".services__bottom-container");
    if (serviceTitle && serviceContent) {
      for (let i = 0; i < serviceTitle.length; i++) {
        serviceTitle[i].addEventListener("click", () => {
          const item = serviceTitle[i].closest('.services__item');
          if (item) item.classList.toggle("active");
          serviceTitle[i].classList.toggle("active");
          if (serviceContent[i].style.maxHeight) {
            serviceContent[i].removeAttribute("style");
          } else {
            serviceContent[i].style.maxHeight = "1000px";
          }
        })
      };
    }

    //Services category
    const serviceItems = service.querySelectorAll('.services__item');

    function categoriesSwitch(categoriesArray, categoriesContentArray) {
      if (categoriesArray.length > 0 && categoriesContentArray.length > 0) {
        categoriesArray[0].classList.add("active");
        categoriesContentArray[0].classList.add("active");
        categoriesContentArray[0].querySelector('.pag-list').classList.add('pag-active');
        if (window.innerWidth <= 800) {
          categoriesContentArray[0].style.maxHeight = categoriesContentArray[0].scrollHeight + 40 + "px";
        }
        for (let i = 0; i < categoriesContentArray.length; i++) {
          categoriesContentArray[i].style.order = i * 2 + 1;
          categoriesArray[i].style.order = i * 2;
          categoriesArray[i].addEventListener('click', () => {
            service.querySelectorAll(".services__category__item.active").forEach(activeBtn => {
              activeBtn.classList.remove('active');
            })
            service.querySelectorAll(".services__table.active").forEach(activeContent => {
              activeContent.classList.remove('active', "pag-active");
              activeContent.querySelector('.pag-list').classList.remove('pag-active');
            })
            categoriesArray[i].classList.add('active');
            categoriesContentArray[i].classList.add("active");
            categoriesContentArray[i].querySelector('.pag-list').classList.add('pag-active');
            tabContents.forEach(content => {
              HiddenElementsInit(content, 8, showMoreBtn);
            })
          })
        }
      }
    }

    serviceItems.forEach(item => {
      const categories = item.querySelectorAll('.services__category__item');
      const categoriesContent = item.querySelectorAll(".services__table");

      categoriesSwitch(categories, categoriesContent);
    })

    //Swipe lists of category
    const containersArray = document.querySelectorAll('.services__category__list');
    containersArray.forEach(container => {
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.1;
        container.scrollLeft = scrollLeft - walk;
      });

      container.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('touchend', () => {
        isDown = false;
      });

      container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
      });
    })

  }
  /* -- END SERVICES  -- */



  /* -- SLIDERS  -- */

  //Slider INTRO, turns off when resize
  introSwiper = document.querySelector(".intro");
  if (introSwiper) {
    introSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 650 && !introSwiperCheck) {
          introSwiperCheck = new Swiper(introSwiper.querySelector('.intro__swiper'), {
            direction: 'horizontal',
            slidesPerView: 1.1,
            grabCursor: true,
            spaceBetween: 10
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
          metodsSwiperCheck = new Swiper(metodsSwiper.querySelector('.metods__swiper'), {
            direction: 'horizontal',
            slidesPerView: 1,
            grabCursor: true,
            spaceBetween: 10,
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
          situationSwiperCheck = new Swiper(situationSwiper.querySelector('.situation__body'), {
            direction: 'vertical',
            slidesPerView: 5,
            grabCursor: true,
            spaceBetween: 10,
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
          centerSwiperCheck = new Swiper(centerSwiper.querySelector('.center-lecheniya__gallery__wrapper'), {
            direction: 'horizontal',
            slidesPerView: 1.1,
            grabCursor: true,
            spaceBetween: 10
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

  //Slider Principles, turns off when resize
  principlesSwiper = document.querySelector(".principles");
  if (principlesSwiper) {
    principlesSwiperCheck = new Swiper(principlesSwiper.querySelector('.principles__swiper'), {
      direction: 'vertical',
      slidesPerView: 1.2,
      grabCursor: true,
      spaceBetween: 20,
      breakpoints: {
        0: {
          direction: 'horizontal',
          slidesPerView: 1.2,
          spaceBetween: 10
        },
        1000: {
          direction: 'vertical',
          slidesPerView: 1.2,
          spaceBetween: 20
        }
      }
    });
  }


  /* -- END SLIDERS  -- */



  //view photos fancybox
  Fancybox.bind("[data-fancybox]");

});

