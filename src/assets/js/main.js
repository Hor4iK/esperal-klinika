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
  const tabContents = document.querySelectorAll(".pag-list");
    if (tabContents && tabContents.length > 0) {
      tabContents.forEach(content => {
        HiddenElementsInit(content, 8, showMoreBtn);
      })
    }
  /* -- END PAGINATION  -- */



  /* -- SERVICES  -- */
  const service = document.querySelector('.services');

  if (service) {

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
            serviceContent[i].style.maxHeight = "1500px";
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

  //Slider CARDS, turns on when mobile
  cardsSwipers = document.querySelectorAll(".cards");
  if (cardsSwipers && cardsSwipers.length > 0) {
    swiperCheck = new Array();
    for (let i = 0; i < cardsSwipers.length; i++) {
      const cardsList = cardsSwipers[i].querySelector('.cards__list');
      swiperCheck[i] = false;
      ['resize', 'load'].forEach((event) => {
        window.addEventListener(event, function () {
          if (window.innerWidth <= 1300 && !swiperCheck[i]) {
            cardsList.classList.add('swiper-wrapper');
            swiperCheck[i] = new Swiper(cardsSwipers[i].querySelector('.cards__swiper'), {
              direction: 'horizontal',
              slidesPerView: 1,
              grabCursor: true,
              spaceBetween: 10,
              breakpoints: {
                0: {
                  slidesPerView: 1.1,
                  spaceBetween: 10
                },
                750: {
                  slidesPerView: 2,
                  spaceBetween: 15
                }
              }
            });
          }
          if (window.innerWidth > 1300 && swiperCheck[i]) {
            cardsList.classList.remove('swiper-wrapper');
            swiperCheck[i].destroy(true, true);
            swiperCheck[i] = false
          }
        })
      });
    }
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
      direction: 'horizontal',
      slidesPerView: 1.2,
      grabCursor: true,
      spaceBetween: 10,
      breakpoints: {
        1000: {
          direction: 'vertical',
          slidesPerView: 1.2,
          spaceBetween: 20
        }
      }
    });
  }

  //Sliders horizontal (3 desktop -> 1 mobile)
  slidersArray = document.querySelectorAll(".slider-hl");
  if (slidersArray) {
    slidersArray.forEach(slider => {
      sliderCheck = new Swiper(slider.querySelector('.slider-hl__swiper'), {
        direction: 'horizontal',
        slidesPerView: 1.2,
        grabCursor: true,
        spaceBetween: 10,
        navigation: {
          nextEl: slider.querySelector('.swiper-btn_right'),
          prevEl: slider.querySelector('.swiper-btn_left'),
        },
        breakpoints: {
          600: {
            direction: 'horizontal',
            slidesPerView: 2.2,
            spaceBetween: 15
          },
          1100: {
            direction: 'horizontal',
            slidesPerView: 3.2,
            spaceBetween: 20
          }
        }
      });
    })
  }


  /* -- END SLIDERS  -- */



  /* -- POPUPS  -- */
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
  /* -- END POPUPS  -- */


  /* -- Automatic content  -- */
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

  /* -- END Automatic content   -- */

  //view photos fancybox
  Fancybox.bind("[data-fancybox]");

});

