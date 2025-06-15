document.addEventListener('DOMContentLoaded', function () {

  /* -- SEARCH  -- */
  const searchBoxArray = document.querySelectorAll('.search__container');
  if (searchBoxArray && searchBoxArray.length > 0) {
    searchBoxArray.forEach(searchBox => {
      const search = searchBox.querySelector('.search');
      const searchBtn = searchBox.querySelector('.search__button');
      const input = search.querySelector('input');

      input.addEventListener('focus', () => {
        search.classList.add('open');
      })

      input.addEventListener('blur', () => {
        search.classList.remove('open');
        search.classList.remove('active');
      })

      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          search.classList.add('active');
        })
      }
    })
  }
  /* -- END SEARCH  -- */




  /* -- AUTOMATIC CONTENT -- */
  const textAreas = document.querySelectorAll('.text');
  if (textAreas && textAreas.length > 0) {
    textAreas.forEach(text => {
      const autocontentSection = text.querySelector('.autocontent');
      const jsScrollBlockList = text.querySelectorAll('h2, h3, h4');

      if (jsScrollBlockList.length > 0 && autocontentSection) {
        const autocontentList = autocontentSection.querySelector('.autocontent__list');

        const elementString =
          `<li class="autocontent__item hide-item">
            <div class="autocontent__item-title hide-item__title"></div>
            <div class="hide-item__height">
              <div class="hide-item__content">
                <div class="autocontent__item-content">

                </div>
              </div>
            </div>
          </li>`;

        const parser = new DOMParser();
        const element = parser.parseFromString(elementString, 'text/html');
        const elementItem = element.body.firstChild;

        var articleNavigationItem = elementItem.cloneNode(true);
        var firstElementCheck = 0;

        for (let i = 0; i < jsScrollBlockList.length; i += 1) {
          const jsScrollBlock = jsScrollBlockList[i];
          const titleBlock = jsScrollBlock.textContent;
          const articleNavigationLink = document.createElement('a');

          if (jsScrollBlock.tagName == 'H2') {
            if (firstElementCheck != 0) {
              autocontentList.append(articleNavigationItem);
              articleNavigationItem = elementItem.cloneNode(true);
            }
            navTitle = articleNavigationItem.querySelector('.autocontent__item-title');

            articleNavigationLink.classList.add('title-h2');
            jsScrollBlock.setAttribute('id', i)
            articleNavigationLink.setAttribute('href', '#' + i);
            articleNavigationLink.textContent = ' ' + titleBlock;
            navTitle.append(articleNavigationLink);
            firstElementCheck++;
          } else {
            navList = articleNavigationItem.querySelector('.autocontent__item-content');

            if (jsScrollBlock.tagName == 'H3') {
              articleNavigationLink.classList.add('title-h3');
            }
            if (jsScrollBlock.tagName == 'H4') {
              articleNavigationLink.classList.add('title-h4');
            }

            jsScrollBlock.setAttribute('id', i)
            articleNavigationLink.setAttribute('href', '#' + i);
            articleNavigationLink.textContent = ' ' + titleBlock;
            navList.append(articleNavigationLink);
          }
        }
        autocontentList.append(articleNavigationItem);
        text.querySelectorAll('a[href^="#"').forEach(link => {

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
        autocontentList.querySelector('a').remove();
      }
    })
  }
  /* -- END AUTOMATIC CONTENT   -- */




  /* -- MENU MOBILE  -- */
  const burgerMenuArr = document.querySelectorAll('.menu_btn');
  if (burgerMenuArr && burgerMenuArr.length > 0) {
    const header = document.querySelector('.header');
    const headerMobile = header.querySelector('.header__row.mobile');

    burgerMenuArr.forEach(burgerMenu => {
      burgerMenu.addEventListener("click", () => {
        if (header.classList.contains('active')) {
          headerMobile.classList.remove("active");
          header.classList.remove("active");
        } else {
          headerMobile.classList.add("active");
          header.classList.add("active");
          let height = header.offsetHeight;
          // headerMobile.style.height = 'calc(100vh - ' + height + 'px)';
        }
        // header.querySelector('.ham').classList.toggle("active");
        document.querySelector('html').classList.toggle('burger-lock');
      });
    })
  }

  const hideItems = document.querySelectorAll('.hide-items');
  if (hideItems.length > 0) {
    hideItems.forEach((elem) => {
      const hideItem = elem.querySelectorAll('.hide-item');
      const hideTitles = elem.querySelectorAll('.hide-item__title');
      const hideContents = elem.querySelectorAll('.hide-item__height');
      hideItem.forEach((item) => {
        let title = item.querySelector('.hide-item__title');
        let content = item.querySelector('.hide-item__height');
        title.addEventListener('click', () => {
          if (title.classList.contains('active')) {
            title.classList.remove('active');
            content.classList.remove('active');
            content.removeAttribute('style');
          }
          else {
            hideTitles.forEach((element) => {
              element.classList.remove('active');
            })
            hideContents.forEach((element) => {
              element.classList.remove('active');
              element.removeAttribute("style");
            })
            let height = content.querySelector('.hide-item__content').offsetHeight;
            title.classList.add('active');
            content.classList.add('active');
            content.style.height = height + 'px';
          }
        })
      })
    })
  }
  /* -- END MENU MOBILE  -- */



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



  /* -- CATEGORIES  -- */
  function categoriesSwitch(mainContainer = document, categoriesArray, categoriesContentArray, itemSelectorActive, contentSelectorActive, pagination = false) {
    if (categoriesArray.length > 0 && categoriesContentArray.length > 0) {
      categoriesArray[0].classList.add("active");
      categoriesContentArray[0].classList.add("active");
      if (pagination) categoriesContentArray[0].querySelector('.pag-list').classList.add('pag-active');
      if (window.innerWidth <= 800) {
        categoriesContentArray[0].style.maxHeight = categoriesContentArray[0].scrollHeight + 40 + "px";
      }
      for (let i = 0; i < categoriesContentArray.length; i++) {
        categoriesContentArray[i].style.order = i * 2 + 1;
        categoriesArray[i].style.order = i * 2;
        categoriesArray[i].addEventListener('click', () => {
          mainContainer.querySelectorAll(itemSelectorActive).forEach(activeBtn => {
            activeBtn.classList.remove('active');
          })
          mainContainer.querySelectorAll(contentSelectorActive).forEach(activeContent => {
            activeContent.classList.remove('active');
            if (pagination) {
              activeContent.classList.remove("pag-active");
              activeContent.querySelector('.pag-list').classList.remove('pag-active');
            }
          })
          categoriesArray[i].classList.add('active');
          categoriesContentArray[i].classList.add("active");
          if (pagination) {
            categoriesContentArray[i].querySelector('.pag-list').classList.add('pag-active');

            tabContents.forEach(content => {
              HiddenElementsInit(content, 8, showMoreBtn);
            })
          }
        })
      }
    }
  }
  /* -- END CATEGORIES  -- */


  /* -- GRAB LIST  -- */
  function grabListListeners(container) {
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
  }
  /* -- END GRAB LIST  -- */


  /* -- TABS  -- */
  function tabs(containerItemSelector, titleArray, contentArray) {
    for (let i = 0; i < titleArray.length; i++) {
      titleArray[i].addEventListener("click", () => {
        const item = titleArray[i].closest(containerItemSelector);
        if (item) item.classList.toggle("active");
        titleArray[i].classList.toggle("active");
        if (contentArray[i].style.maxHeight) {
          contentArray[i].removeAttribute("style");
        } else {
          contentArray[i].style.maxHeight = "1500px";
        }
      })
    };
  }
  /* -- END TABS  -- */



  /* -- SERVICES  -- */
  const service = document.querySelector('.services');

  if (service) {

    //Services tabs
    const serviceTitle = service.querySelectorAll('.services__top-container');
    const serviceContent = service.querySelectorAll(".services__bottom-container");
    if (serviceTitle && serviceContent) {
      tabs('.services__item', serviceTitle, serviceContent);
    }

    //Services category
    const serviceItems = service.querySelectorAll('.services__item');

    serviceItems.forEach(item => {
      const categories = item.querySelectorAll('.services__category__item');
      const categoriesContent = item.querySelectorAll(".services__table");

      categoriesSwitch(service, categories, categoriesContent, ".services__category__item.active", ".services__table.active", true);
    })

    //Swipe lists of category
    const containersArray = document.querySelectorAll('.services__category__list');
    containersArray.forEach(container => {
      grabListListeners(container);
    })

  }
  /* -- END SERVICES  -- */



  /* -- ALLOCATOR  -- */
  const allocator = document.querySelector('.allocator');

  if (allocator) {
    const serviceTitle = allocator.querySelectorAll('.categories__top-container');
    const serviceContent = allocator.querySelectorAll(".categories__bottom-container");

    if (serviceTitle && serviceContent) {
      tabs('.allocator__categories__list', serviceTitle, serviceContent);
    }

    const item = allocator.querySelector('.allocator__categories__list');
    const categories = item.querySelectorAll('.categories__item');
    const listTitle = item.querySelector('.categories__subtitle');
    const categoriesContent = allocator.querySelectorAll(".allocator__block");

    listTitle.textContent = categories[0].textContent;

    categories.forEach(category => {
      category.addEventListener('click', evt => {
        const categoryTitle = evt.target.textContent;
        listTitle.textContent = categoryTitle;
      })
    })
    categoriesSwitch(allocator, categories, categoriesContent, ".categories__item.active", ".allocator__block.active");

  }
  /* -- END ALLOCATOR  -- */



  /* -- VACANCIES  -- */
  const vacancies = document.querySelector('.part-team');
  if (vacancies) {
    const titleArray = vacancies.querySelectorAll('.part-team__top-container');
    const contentArray = vacancies.querySelectorAll('.part-team__bottom-container');

    if (titleArray && contentArray) {
      tabs('.part-team__item', titleArray, contentArray);
    }
  }
  /* -- END VACANCIES  -- */


  /* -- FAQ  -- */
  const faq = document.querySelector('.faq-section');
  if (faq) {
    const titleArray = faq.querySelectorAll('.faq-section__top-container');
    const contentArray = faq.querySelectorAll('.faq-section__bottom-container');

    if (titleArray && contentArray) {
      tabs('.faq-section__item', titleArray, contentArray);
    }
  }
  /* -- END FAQ  -- */



  /* -- LAW-PAGE  -- */
  const law = document.querySelector('.legal-information');
  if (law) {
    const titleArray = law.querySelectorAll('.legal-information__top-container');
    const contentArray = law.querySelectorAll('.legal-information__bottom-container');

    if (titleArray && contentArray) {
      tabs('.legal-information__item', titleArray, contentArray);
    }
  }
  /* -- END LAW-PAGE -- */



  /* -- MYTHS SECTION  -- */
  const myths = document.querySelector('.myths');
  if (myths) {
    const titleArray = myths.querySelectorAll('.myths__top-container');
    const contentArray = myths.querySelectorAll('.myths__bottom-container');

    if (titleArray && contentArray) {
      tabs('.myths__item', titleArray, contentArray);
    }
  }
  /* -- END MYTHS SECTION -- */



  /* -- DOCTOR  -- */
  //Doctor tabs
  const education = document.querySelector('.doctor-page__education');
  if (education) {
    const educationList = education.querySelector('.doctor-page__education-tabs');
    const educationCategories = education.querySelectorAll('.doctor-page__education-tab');
    const educationContent = education.querySelectorAll('.doctor-page__education-items');

    grabListListeners(educationList);
    categoriesSwitch(education, educationCategories, educationContent, ".doctor-page__education-tab.active", ".doctor-page__education-items.active");
  }
  /* -- END DOCTOR  -- */


  /* -- AUTOCONTENT RESIZE  -- */
  const autocontentArray = document.querySelectorAll('.autocontent');
  if (autocontentArray && autocontentArray.length > 0) {
    autocontentArray.forEach(autocontent => {
      const titleArray = autocontent.querySelectorAll('.autocontent__subtitle__wrapper');
      const contentArray = autocontent.querySelectorAll('.autocontent__bottom-container');

      if (titleArray && contentArray) {
        if (window.innerWidth <= 975) {
          tabs('.autocontent', titleArray, contentArray);
        }
      }
    })
  }
  /* -- END AUTOCONTENT RESIZE  -- */


  /* -- SCHEME SECTION  -- */
  const scheme = document.querySelector('.scheme-work');
  if (scheme) {
    const titleArray = scheme.querySelectorAll('.scheme-work__top-container');
    const contentArray = scheme.querySelectorAll('.scheme-work__bottom-container');

    if (titleArray && contentArray) {
      tabs('.scheme-work__item', titleArray, contentArray);
    }
  }
  /* -- END SCHEME SECTION -- */


  /* -- HOW-GOING SECTION  -- */
  const how = document.querySelector('.how-procedure');
  if (how) {
    const titleArray = how.querySelectorAll('.how-procedure__top-container');
    const contentArray = how.querySelectorAll('.how-procedure__bottom-container');

    if (titleArray && contentArray) {

      tabs('.how-procedure__item', titleArray, contentArray);
    }
  }
  /* -- END HOW-GOING SECTION -- */



  /* -- COPY BUTTON -- */
  const copyBtns = document.querySelectorAll('.copylink-btn');
  if (copyBtns && copyBtns.length > 0) {
    copyBtns.forEach(copyBtn => {
      copyBtn.addEventListener('click', () => {
        const textBtn = this.querySelector('.copylink-btn__text');
        const originalText = textBtn.textContent;
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        textBtn.textContent = 'Ссылка скопирована!';
        setTimeout(() => {
          textBtn.textContent = originalText;
        }, 2000);
      })
    })
  }
  /* -- END COPY BUTTON -- */



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

  //Slider KNOWLEDGE, turns on when mobile
  knowledgeSwiper = document.querySelector(".knowledge");
  if (knowledgeSwiper) {
    const knowledgeList = knowledgeSwiper.querySelector('.knowledge__list');
    const knowledgeItemArray = knowledgeList.querySelectorAll('.knowledge__item');
    knowledgeSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 700 && !knowledgeSwiperCheck) {
          if (knowledgeItemArray && knowledgeItemArray.length > 0) {
            knowledgeItemArray.forEach(item => {
              item.classList.add('swiper-slide');
            })
          }
          knowledgeSwiperCheck = new Swiper(knowledgeSwiper.querySelector('.knowledge__swiper'), {
            direction: 'horizontal',
            slidesPerView: 1.1,
            grabCursor: true,
            spaceBetween: 10
          });
        }
        if (window.innerWidth > 700 && knowledgeSwiperCheck) {
          const knowledgeItemArray = knowledgeList.querySelectorAll('.swiper-slide');
          if (knowledgeItemArray && knowledgeItemArray.length > 0) {
            knowledgeItemArray.forEach(item => {
              item.classList.remove('swiper-slide');
            })
          }
          knowledgeSwiperCheck.destroy(true, true);
          knowledgeSwiperCheck = false
        }
      })
    })
  }

  //Slider offers, turns on when mobile
  offersSwiper = document.querySelector(".offers");
  if (offersSwiper) {
    const offersList = offersSwiper.querySelector('.offers__list');
    const offersItemArray = offersList.querySelectorAll('.offers__item');
    offersSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 700 && !offersSwiperCheck) {
          if (offersItemArray && offersItemArray.length > 0) {
            offersItemArray.forEach(item => {
              item.classList.add('swiper-slide');
            })
          }
          offersSwiperCheck = new Swiper(offersSwiper.querySelector('.offers__swiper'), {
            direction: 'horizontal',
            slidesPerView: 1.1,
            grabCursor: true,
            spaceBetween: 10
          });
        }
        if (window.innerWidth > 700 && offersSwiperCheck) {
          const offersItemArray = offersList.querySelectorAll('.swiper-slide');
          if (offersItemArray && offersItemArray.length > 0) {
            offersItemArray.forEach(item => {
              item.classList.remove('swiper-slide');
            })
          }
          offersSwiperCheck.destroy(true, true);
          offersSwiperCheck = false
        }
      })
    })
  }

  //Slider Principles
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

  //Slider Photos on About page
  gallerySwiper = document.querySelector(".intro_about");
  if (gallerySwiper) {
    gallerySwiperCheck = new Swiper(gallerySwiper.querySelector('.gallery__swiper'), {
      direction: 'horizontal',
      slidesPerView: 1.02,
      grabCursor: true,
      spaceBetween: 10,
      breakpoints: {
        1000: {
          direction: 'horizontal',
          slidesPerView: 2.4,
          spaceBetween: 20
        }
      }
    });
  }

  //Slider methods-alko, turns on when mobile
  methodsSwiper = document.querySelector(".methods-alko");
  if (methodsSwiper) {
    const methodsList = methodsSwiper.querySelector('.methods-alko__list');
    const methodsItemArray = methodsList.querySelectorAll('.methods-alko__item');
    methodsSwiperCheck = false;
    ['resize', 'load'].forEach((event) => {
      window.addEventListener(event, function () {
        if (window.innerWidth <= 650 && !methodsSwiperCheck) {
          if (methodsItemArray && methodsItemArray.length > 0) {
            methodsItemArray.forEach(item => {
              item.classList.add('swiper-slide');
            })
          }
          methodsSwiperCheck = new Swiper(methodsSwiper.querySelector('.methods-alko__swiper'), {
            direction: 'horizontal',
            slidesPerView: 1.1,
            grabCursor: true,
            spaceBetween: 10
          });
        }
        if (window.innerWidth > 650 && methodsSwiperCheck) {
          const methodsItemArray = methodsList.querySelectorAll('.swiper-slide');
          if (methodsItemArray && methodsItemArray.length > 0) {
            methodsItemArray.forEach(item => {
              item.classList.remove('swiper-slide');
            })
          }
          methodsSwiperCheck.destroy(true, true);
          methodsSwiperCheck = false
        }
      })
    })
  }

  //Sliders horizontal (3 desktop -> 1 mobile)
  slidersArray = document.querySelectorAll(".slider-hl");
  if (slidersArray) {
    slidersArray.forEach(slider => {
      sliderCheck = new Swiper(slider.querySelector('.slider-hl__swiper'), {
        direction: 'horizontal',
        slidesPerView: 1.1,
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



  //view photos fancybox
  Fancybox.bind("[data-fancybox]");

});

