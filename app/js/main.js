document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const loaderOverlay = document.querySelector('.loader-overlay');
    loaderOverlay.style.display = 'none';
  });
});

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function applyThemeToElements(elements, themeClass, checked) {
  elements.forEach((element) => {
    if (checked) {
      element.classList.add(themeClass + "--dark");
    } else {
      element.classList.remove(themeClass + "--dark");
    }
  });
}

const collectionItems = document.querySelectorAll(".collections__item");
const backgroundThemes = document.querySelectorAll(".background-theme");
const titleThemes = document.querySelectorAll(".title-theme");
const textThemes = document.querySelectorAll(".text-theme");
const PrimaryTextThemes = document.querySelectorAll(".primary-text-theme");
const topItemContent = document.querySelectorAll(".top__item");
const listElement = document.querySelector('.content__list');

function handleThemeChange() {
  const checked = themeToggle.checked;
  console.log("Changing theme...");

  if (checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }

  applyThemeToElements(backgroundThemes, "background-theme", checked);
  applyThemeToElements(titleThemes, "title-theme", checked);
  applyThemeToElements(textThemes, "text-theme", checked);
  applyThemeToElements(PrimaryTextThemes, "primary-text-theme", checked);
  applyThemeToElements(topItemContent, "top__item", checked);

  listElement.querySelectorAll(".content__item").forEach((element) => {
    element.querySelector(".title").classList.toggle("title-theme--dark", checked);
    element.querySelector(".number").classList.toggle("primary-text-theme--dark", checked);
  });

  applyThemeToElements(collectionItems, "collections__item", checked);

  localStorage.setItem("theme", checked ? "dark" : "light");
}

themeToggle.addEventListener("change", handleThemeChange);

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    themeToggle.checked = true;
  } else {
    themeToggle.checked = false;
  }

  handleThemeChange();
});

// ====================== content section ==================
function handleBidButtonClick(event) {
  const bitButton = event.target;

  if (bitButton.classList.contains("button") && bitButton.id === "bitButton") {
    const parentElement = bitButton.closest(".content__inner");
    if (!parentElement.classList.contains("clicked")) {
      parentElement.classList.add("clicked");
      const bitWrapper = parentElement.querySelector(".bit-wrapper");
      if (bitWrapper) {
        bitWrapper.classList.add("active");

        const bitValueElement = parentElement.querySelector(".bit");
        bitValueElement.classList.add("active");
        if (bitValueElement) {
          let currentValue = parseFloat(bitValueElement.textContent);
          currentValue += 0.01;
          bitValueElement.textContent = currentValue.toFixed(2) + " ETH";
          const pathElement = parentElement.querySelector("path");

          if (pathElement) {
            pathElement.setAttribute("fill", "#FFFFFF");
          }
        }
      }
    }
  }
}
document.addEventListener("click", handleBidButtonClick);


// ============================ NFTS section======================

function handleNftButtonClick(event) {
  const nftButton = event.target;

  if (nftButton.classList.contains("nft-icon__btn") && nftButton.id === "nftButton") {
    const parentElement = nftButton.closest(".nfts-list__item");

    const bitWrapper = parentElement.querySelector(".nft-icon__price");

    if (bitWrapper) {
      const bitValueElement = bitWrapper.querySelector("span");

      if (bitValueElement) {
        if (!nftButton.classList.contains("processing")) {
          nftButton.classList.add("processing");

          let currentValue = parseFloat(bitValueElement.textContent);

          if (!nftButton.classList.contains("cancel")) {
            nftButton.classList.add("cancel");
            nftButton.textContent = "Cancel";
            currentValue += 0.01;
            bitValueElement.textContent = currentValue.toFixed(2) + " ETH";
          } else {
            nftButton.classList.remove("cancel");
            nftButton.textContent = "Place a bid";
            currentValue -= 0.01;
            bitValueElement.textContent = currentValue.toFixed(2) + " ETH";
            const pathElement = parentElement.querySelector("path");
            if (pathElement) {
              pathElement.setAttribute("fill", "#00AC4F");
            }
          }
          setTimeout(() => {
            nftButton.classList.remove("processing");
          }, 500);
        }
      }
    }
  }
}

document.addEventListener("click", handleNftButtonClick);


document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById("theme-toggle"); // Получите themeToggle здесь
  const body = document.body;

  // Определите функцию applyThemeToElements и другие необходимые переменные здесь

  function applyThemeToCollectionItems(checked) {
    const collectionItems = document.querySelectorAll(".collections__item");
    collectionItems.forEach((collectionItem) => {
      const titleElement = collectionItem.querySelector(".collections__subtitle.title-theme");
      const primaryTextElement = collectionItem.querySelector(".collections__inner");

      if (titleElement) {
        titleElement.classList.toggle("title-theme--dark", checked);
      }

      if (primaryTextElement) {
        primaryTextElement.classList.toggle("primary-text-theme--dark", checked);
      }
    });
  }

  function handleThemeChange() {
    console.log("Changing theme...");
    if (themeToggle.checked) {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
    applyThemeToCollectionItems(themeToggle.checked);
  }

  // Добавьте обработчик события на изменение темы
  themeToggle.addEventListener("change", handleThemeChange);

  // Убедитесь, что сохраненная тема загружается при загрузке страницы
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    themeToggle.checked = true;
  } else {
    themeToggle.checked = false;
  }
  applyThemeToCollectionItems(themeToggle.checked);

  fetch('./nft/content.json')
    .then(response => response.json())
    .then(data => {
      const uniqueUsers = [...new Set(data.map(item => item.userName))];

      const randomUsers = getRandomUsers(uniqueUsers, 3);

      const collectionsList = document.querySelector('.collections__list');

      randomUsers.forEach(userName => {
        const liElement = document.createElement('li');
        liElement.classList.add('collections__item');

        const userItems = data.filter(item => item.userName === userName).slice(0, 3);

        const userImageSrc = userItems[0].userImageSrc;

        const userTotalItems = data.filter(item => item.userName === userName).length;
        liElement.innerHTML = `
          <div class="collections__grid">
            <div class="collections-big" id="collections-swiper-big-${userName}">
              <div class="collections-big__wrapper swiper-wrapper">
              </div>
            </div>
            <div thumbsSlider="" class="collections-small" id="collections-swiper-small-${userName}">
              <div class="collections-small__wrapper swiper-wrapper">
              </div>
            </div>
          </div>
          <h4 class="collections__subtitle title-theme">Amazing Collection</h4>
          <div class="collections__inner primary-text-theme">
            <span>
              <img src="${userImageSrc}" alt="" class="collections__user-img">
              <p class="collections__text">
                By&nbsp;
                <span class="collections__name">${userName}</span>
              </p>
            </span>
            <button class="collections__button main-btn main-btn--light">
              Total&nbsp;
              <span class="collections__quantity">${userTotalItems}</span>&nbsp;Items
            </button>
          </div>
        `;

        collectionsList.appendChild(liElement);
        collectionsSwiper(userName, userItems);
      });
    })
    .catch(error => {
      console.error('Error read:', error);
    });

  function getRandomUsers(arr, num) {
    const shuffled = arr.slice();
    let i = arr.length;
    const min = i - num;
    while (i-- > min) {
      const index = Math.floor((i + 1) * Math.random());
      const temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  };
  // =========================================== COLLECTION SLIDER===================================
  function collectionsSwiper(userName, userItems) {


    const collectionsSmall = new Swiper(`#collections-swiper-small-${userName}`, {
      spaceBetween: 16,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      direction: "vertical",
      slidesPerView: 3,
      autoHeight: false,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    });
    const collectionsBig = new Swiper(`#collections-swiper-big-${userName}`, {
      spaceBetween: 0,
      thumbs: {
        swiper: collectionsSmall,
      },
      direction: "vertical",
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      simulateTouch: false,
      touchRatio: 0,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    });

    userItems.forEach(item => {
      const bigImage = document.createElement('div');
      bigImage.classList.add('collections-big__slide', 'swiper-slide');
      bigImage.innerHTML = `
      <picture class="image">
        <source srcset="${item.imageSrcSet[0]}" type="image/avif">
        <source srcset="${item.imageSrcSet[1]}" type="image/webp">
        <img srcset="${item.imageSrcSet[2]}" src="${item.imageSrc}" alt="">
      </picture>
    `;
      const bigImageWrapper = document.querySelector(`#collections-swiper-big-${userName} .swiper-wrapper`);
      bigImageWrapper.appendChild(bigImage);

      const smallImage = document.createElement('div');
      smallImage.classList.add('collections-small__slide', 'swiper-slide');
      smallImage.innerHTML = `
      <picture class="image">
        <source srcset="${item.imageSrcSet[0]}" type="image/avif">
        <source srcset="${item.imageSrcSet[1]}" type="image/webp">
        <img srcset="${item.imageSrcSet[2]}" src="${item.imageSrc}" alt="">
      </picture>
    `;
      const smallImageWrapper = document.querySelector(`#collections-swiper-small-${userName} .swiper-wrapper`);
      smallImageWrapper.appendChild(smallImage);
    });
  };

  // Функция смены темы


  // Добавьте обработчик события на изменение темы
  themeToggle.addEventListener("change", handleThemeChange);

  // Убедитесь, что сохраненная тема загружается при загрузке страницы
  window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      themeToggle.checked = true;
    } else {
      themeToggle.checked = false;
    }
    applyThemeToCollectionItems(themeToggle.checked);
    handleThemeChange();
  });
});

let jsonModalData; // Глобальная переменная для хранения данных из JSON

document.addEventListener('DOMContentLoaded', () => {
  // Загрузите данные из файла JSON и сохраните их в переменной jsonData
  fetch('./nft/content.json')
    .then(response => response.json())
    .then(data => {
      jsonModalData = data;
      initializeCollections();
    })
    .catch(error => {
      console.error('Error reading JSON:', error);
    });
});
function findUserImages(userName) {
  return jsonModalData.filter(item => item.userName === userName);
}
function initializeCollections() {
  const lightBox = document.querySelector(".collections-lightbox");
  const lightBoxOverlay = document.querySelector(".collections-lightbox__overlay");
  const closeButton = document.querySelector(".collections-lightbox__button");
  const collectionButtons = document.querySelectorAll(".collections__button");
  const lightBoxList = document.querySelector(".collections-lightbox__list");
  const lightboxImages = document.querySelectorAll(".collections-lightbox__item");

  collectionButtons.forEach(button => {
    button.addEventListener("click", () => {
      lightBox.classList.add('is-open');
      const userName = button.closest(".collections__item").querySelector(".collections__name").textContent;
      const userImages = findUserImages(userName);
      displayImagesInLightBox(userImages);
    });
  });

  closeButton.addEventListener("click", () => {
    closeLightBox();
  });
  lightBoxOverlay.addEventListener("click", (event) => {
    if (event.target === lightBoxOverlay) {
      closeLightBox();
    }
  });

  function displayImagesInLightBox(userImages) {
    lightBoxList.innerHTML = '';

    userImages.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('collections-lightbox__item')
      const picture = document.createElement('picture');

      item.imageSrcSet.forEach(srcSet => {
        const source = document.createElement('source');
        source.srcset = srcSet;
        source.type = 'image/avif';
        picture.appendChild(source);
      });

      const img = document.createElement('img');
      img.srcset = item.imageSrcSet[2];
      img.src = item.imageSrc;
      img.alt = '';

      picture.appendChild(img);
      listItem.appendChild(picture);
      lightBoxList.appendChild(listItem);
    });
  }


  function closeLightBox() {
    lightBox.classList.remove('is-open');
    lightBoxList.innerHTML = '';
  }
}

// ================== create collection =====================================
let selectedItemId = null;
const selectedContent = document.querySelector('.selected-content');
document.addEventListener('DOMContentLoaded', function () {
  fetch('./nft/content.json')
    .then(response => response.json())
    .then(data => {
      data.slice(0, 18).forEach(item => { // 1 - 18 id
        const listItem = createContentItem(item);
        const pictureElement = listItem.querySelector('.content__item picture');

        listElement.appendChild(listItem);

        pictureElement.addEventListener('mouseover', function () {
          if (selectedItemId !== item.id) {
            selectedItemId = item.id;
            updateSelectedContent(selectedContent, item);
          }
        });
      });
    })
    .catch(error => {
      console.error('Error content.json', error);
    });
});

function createContentItem(item) {
  const listItem = document.createElement('li');
  listItem.className = 'content__item swiper-slide';


  const listDiv = document.createElement('div');
  listDiv.className = 'content__wrapper';
  const lazyDiv = document.createElement('div');
  lazyDiv.className = 'swiper-lazy-preloader';

  const pictureElement = document.createElement('picture');
  pictureElement.setAttribute('loading', 'lazy');
  item.imageSrcSet.forEach(srcSet => {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('srcset', srcSet);
    sourceElement.setAttribute('type', 'image/avif');
    pictureElement.appendChild(sourceElement);
  });

  const imgElement = document.createElement('img');
  imgElement.setAttribute('srcset', item.imageSrcSet[2]);
  imgElement.setAttribute('src', item.imageSrc);
  imgElement.setAttribute('alt', '');
  pictureElement.appendChild(imgElement);


  const innerElement = document.createElement('div');
  innerElement.className = 'content__inner';


  const titleElement = document.createElement('h4');
  titleElement.className = 'title title-theme';
  titleElement.textContent = item.nftName;

  const spanElement = document.createElement('span');

  const userImageElement = document.createElement('img');
  userImageElement.className = 'image';
  userImageElement.setAttribute('src', item.userImageSrc);

  const bitWrapperElement = document.createElement('span');
  bitWrapperElement.className = 'bit-wrapper';

  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('width', '9');
  svgElement.setAttribute('height', '14');
  svgElement.setAttribute('viewBox', '0 0 9 14');
  svgElement.setAttribute('fill', 'none');
  svgElement.classList.add('icon');

  const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  gElement.setAttribute('clip-path', 'url(#clip0_0_252)');

  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathElement.setAttribute('d', 'M8.31533 7.13126L4.26566 9.66876L0.213318 7.13126L4.26566 0L8.31533 7.13126ZM4.26566 10.4836L0.213318 7.9461L4.26566 14L8.318 7.9461L4.26566 10.4836Z');
  pathElement.setAttribute('fill', '#00AC4F');

  gElement.appendChild(pathElement);

  svgElement.appendChild(gElement);

  const bitElement = document.createElement('p');
  bitElement.className = 'bit';
  bitElement.textContent = item.bitValue;

  const numberElement = document.createElement('p');
  numberElement.className = 'number primary-text-theme';
  numberElement.textContent = item.stock;

  bitWrapperElement.appendChild(svgElement);
  bitWrapperElement.appendChild(bitElement);

  spanElement.appendChild(userImageElement);
  spanElement.appendChild(bitWrapperElement);
  spanElement.appendChild(numberElement);

  innerElement.appendChild(titleElement);
  innerElement.appendChild(spanElement);

  const buttonElement = document.createElement('button');
  buttonElement.className = 'button main-btn main-btn--light';
  buttonElement.id = 'bitButton';
  buttonElement.textContent = 'Place a bid';

  innerElement.appendChild(buttonElement);


  listDiv.appendChild(pictureElement);
  listDiv.appendChild(lazyDiv);
  listDiv.appendChild(innerElement);

  listItem.appendChild(listDiv);

  pictureElement.addEventListener('mouseover', function () {
    if (selectedItemId !== item.id) {
      selectedItemId = item.id;
      updateSelectedContent(selectedContent, item);
    }
  });
  listItem.classList.add('content__item');
  return listItem;
};
// ================== select collection =====================================
function updateSelectedContent(selectedContent, item) {

  if (selectedContent.classList.contains('fade-out')) {
    return;
  }

  selectedContent.classList.add('fade-out');

  setTimeout(function () {
    const selectedImg = selectedContent.querySelector('.image img');
    const selectedSources = selectedContent.querySelectorAll('.image source');

    selectedImg.setAttribute('srcset', item.imageSrcSet[2]);
    selectedImg.setAttribute('src', item.imageSrc);

    selectedSources.forEach((source, index) => {
      source.setAttribute('srcset', item.imageSrcSet[index]);
    });

    const selectedUserImage = selectedContent.querySelector('.info__name .image');
    selectedUserImage.setAttribute('srcset', `${item.userImageSrc} 1x`);
    selectedUserImage.setAttribute('src', item.userImageSrc);

    const selectedTitle = selectedContent.querySelector('.title');
    selectedTitle.textContent = item.nftName;

    const selectedBid = selectedContent.querySelector('.bid');
    selectedBid.textContent = item.bitValue;

    selectedContent.classList.remove('fade-out');
  }, 400);
}
// ===================== content slider ===================================


let myContentSlider = new Swiper('.content', {
  direction: "vertical",
  simulateTouch: true,
  slideToClickedSlide: true,
  slidesPerView: 3,
  slidesPerGroup: 3,
  mousewheel: {
    sensitivity: 1,
    eventsTarget: ".content"
  },
  lazy: true,
  loop: false,
  nested: true,
  spaceBetween: 0,
});


// ===========================================TOP================
document.addEventListener('DOMContentLoaded', function () {
  const listItems = document.querySelectorAll('.top__item');

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, options);

  listItems.forEach(item => {
    item.classList.remove('show');
  });

  listItems.forEach(item => {
    intersectionObserver.observe(item);
  });
});

function updateTimer(targetId, targetTime) {
  const now = new Date();
  const timeDiff = targetTime - now;

  if (timeDiff <= 0) {
    return;
  }

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const hoursElement = document.getElementById(targetId + '_hours');
  const minutesElement = document.getElementById(targetId + '_minutes');
  const secondsElement = document.getElementById(targetId + '_seconds');

  hoursElement.textContent = String(hours).padStart(2, '0') + 'h';
  minutesElement.textContent = String(minutes).padStart(2, '0') + 'm';
  secondsElement.textContent = String(seconds).padStart(2, '0') + 's';
}

const targetTime1 = new Date();
targetTime1.setHours(24, 0, 0, 0); // 00:00:00

const targetTime2 = new Date();
targetTime2.setHours(22, 30, 0, 0); // 22:30:00

const targetTime3 = new Date();
targetTime3.setHours(21, 0, 0, 0); // 21:00:00

setInterval(() => updateTimer('timer1', targetTime1), 1000);
setInterval(() => updateTimer('timer2', targetTime2), 1000);
setInterval(() => updateTimer('timer3', targetTime3), 1000);

updateTimer('timer1', targetTime1);
updateTimer('timer2', targetTime2);
updateTimer('timer3', targetTime3);

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 250;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-targetValue');
    const increment = target / speed;

    let currentValue = 1;

    const updateCounter = () => {
      if (currentValue < target) {
        counter.innerText = currentValue.toFixed(0) + 'K+';
        currentValue += increment;
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target + 'K+';
      }
    };

    updateCounter();
  });
}

const countersData = [
  98, // Artwork
  12, // Auction
  15, // Artist
];

document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.counter');

  counters.forEach((counter, index) => {
    counter.setAttribute('data-targetValue', countersData[index]);
  });

  const elementToObserve = document.querySelector('.your-target-element');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  });

  observer.observe(elementToObserve);
});
function handleIntersection(entries, observer) {
  const isAnyElementVisible = entries.some((entry) => entry.isIntersecting);

  if (isAnyElementVisible) {
    items.forEach((item) => {
      item.classList.add('active');
    });
  } else {
    items.forEach((item) => {
      item.classList.remove('active');
    });
  }
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '400px',
  threshold: 0.5,
});

const items = document.querySelectorAll('.example__item');

items.forEach((item) => {
  observer.observe(item);
});

const title = document.querySelector(".hero-advantage__inner-title")
  , options = {
    root: null,
    rootMargin: "200px",
    threshold: .5
  }
  , intersectionObserver = new IntersectionObserver((e => {
    e.forEach((e => {
      e.isIntersecting ? (title.style.opacity = "1",
        title.style.transform = "translateX(0)") : (title.style.opacity = "0",
          title.style.transform = "translateX(-30%)",
          document.body.style.overflowX = "auto")
    }
    ))
  }
  ), options);
intersectionObserver.observe(title);
let myImageSlider = new Swiper('.live', {
  effect: "cards",
  simulateTouch: true,
  slideToClickedSlide: true,
  slidesPerView: 'auto',
  loopedSlides: 1,
  mousewheel: {
    sensitivity: 1,
    eventsTarget: ".live"
  },
  loop: false,
  initialSlide: 0,
  centeredSlides: true,
  slidesPerView: 1,
  cardsEffect: {
    perSlideRotate: 0,
    perSlideOffset: 15,
  },
  nested: true,
});
const modalWrapper = document.querySelector(".modals");
const signUpBtn = document.querySelector(".sign-up-text__button");
const modalSignIn = document.querySelector(".modal__sign-in");
const modalSignUp = document.querySelector(".modal__sign-up");
const modalToggleBtn = document.querySelectorAll(".modal-form__msg-link");
const modalCloseButtons = document.querySelectorAll(".modal__close");

const openModal = () => {
  modalWrapper.classList.add("open");
  modalSignUp.classList.add("active");
}


const closeModal = () => {
  modalWrapper.classList.remove("open");
  modalSignIn.classList.remove("active");
  modalSignUp.classList.remove("active");
}

const toggleModalSign = () => {
  modalSignIn.classList.toggle("active");
  modalSignUp.classList.toggle("active");
}

signUpBtn.addEventListener("click", openModal);
modalToggleBtn.forEach((button) => {
  button.addEventListener("click", toggleModalSign);
});
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

// ===================HTML - JSON=========================
function createNftElement(nftData) {
  const nftItem = document.createElement("li");
  nftItem.className = "nfts-list__item";
  nftItem.setAttribute("data-category", nftData.tag);

  const nftIcon = document.createElement("div");
  nftIcon.className = "nft-icon";

  const picture = document.createElement("picture");
  picture.className = "nft-icon__image";

  const imageSrcSet = document.createElement("source");
  imageSrcSet.srcset = nftData.imageSrcSet[0];
  imageSrcSet.type = "image/avif";
  picture.appendChild(imageSrcSet);

  const imageSrcSet2x = document.createElement("source");
  imageSrcSet2x.srcset = nftData.imageSrcSet[1];
  imageSrcSet2x.type = "image/webp";
  picture.appendChild(imageSrcSet2x);

  const image = document.createElement("img");
  image.srcset = nftData.imageSrcSet[2];
  image.src = nftData.imageSrc;
  image.alt = "";
  picture.appendChild(image);

  const nftInner = document.createElement("div");
  nftInner.className = "nft-icon__inner";

  const nftTitle = document.createElement("span");
  nftTitle.className = "nft-icon__title-wrapper";

  const nftName = document.createElement("h5");
  nftName.className = "nft-icon__name";
  nftName.textContent = nftData.nftName;

  const userImage = document.createElement('img');
  userImage.className = 'nft-icon__user-image';
  userImage.src = nftData.userImageSrc;

  const nftText = document.createElement("span");
  nftText.className = "nft-icon__text";

  const nftPrice = document.createElement("p");
  nftPrice.className = "nft-icon__price";

  const priceSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  priceSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  priceSvg.setAttribute('width', '9');
  priceSvg.setAttribute('height', '14');
  priceSvg.setAttribute('viewBox', '0 0 9 14');
  priceSvg.setAttribute('fill', 'none');
  priceSvg.classList.add('icon');

  const pricePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pricePath.setAttribute('d', 'M8.31533 7.13126L4.26566 9.66876L0.213318 7.13126L4.26566 0L8.31533 7.13126ZM4.26566 10.4836L0.213318 7.9461L4.26566 14L8.318 7.9461L4.26566 10.4836Z');
  pricePath.setAttribute('fill', '#00AC4F');

  priceSvg.appendChild(pricePath);

  const priceValue = document.createElement("span");
  priceValue.textContent = nftData.bitValue;

  const nftNumber = document.createElement("p");
  nftNumber.className = "nfts-icon__number";
  nftNumber.textContent = nftData.stock;

  const placeBidButton = document.createElement("button");
  placeBidButton.className = "nft-icon__btn main-btn main-btn--light";
  placeBidButton.id = 'nftButton';
  placeBidButton.textContent = "Place a bid";

  nftItem.appendChild(nftIcon);

  nftIcon.appendChild(picture);
  nftIcon.appendChild(nftInner);

  nftInner.appendChild(nftTitle);

  nftTitle.appendChild(nftName);
  nftTitle.appendChild(userImage);

  nftInner.appendChild(nftText);

  nftText.appendChild(nftPrice);
  nftText.appendChild(nftNumber);

  nftPrice.appendChild(priceSvg);
  nftPrice.appendChild(priceValue);

  nftIcon.appendChild(placeBidButton);

  return nftItem;
}


function addNftElementsToPage(dataArray) {
  const nftsList = document.getElementById("nftsList");
  dataArray.forEach((nftData) => {
    const nftElement = createNftElement(nftData);
    nftsList.appendChild(nftElement);
  });
}


async function loadAndDisplayData(category) {
  try {
    const response = await fetch('./nft/content.json');
    if (!response.ok) {
      throw new Error('Error content.json');
    }
    jsonData = await response.json();

    const filteredData = category === "All Categories"
      ? jsonData
      : jsonData.filter(item => item.tag === category);

    itemsPerPage = calculateItemsPerPage(filteredData.length);
    totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const nftsList = document.getElementById("nftsList");
    nftsList.innerHTML = "";

    addNftElementsToPage(filteredData);
    createPageNumbers(currentPage, totalPages);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    sortAndDisplayItems(currentSortBy, currentSortOrder);
    showPage(currentPage);

  } catch (error) {
    console.error('Error: content.json', error);
  }
};

let currentPage = 1;
let itemsPerPage = 8;
let totalPages = 1;
let currentCategory = "All Categories";
let jsonData;

function showPage(page) {
  const nftItems = document.querySelectorAll(".nfts-list__item");
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  nftItems.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

function showItemsByCategory(category) {
  const nftItems = document.querySelectorAll(".nfts-list__item");
  nftItems.forEach((item, index) => {
    const itemCategory = item.getAttribute("data-category");
    const isItemInCategory = category === "All Categories" || itemCategory === category;
    const isItemOnCurrentPage = index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage;

    if (isItemInCategory && isItemOnCurrentPage) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

function createPageNumbers(pageNumber, totalPages) {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  pageNumbersContainer.innerHTML = "";

  const maxPageNumbersToShow = 5;

  let startPage;
  let endPage;

  if (totalPages <= maxPageNumbersToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const middlePage = Math.ceil(maxPageNumbersToShow / 2);

    if (pageNumber <= middlePage) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (pageNumber + middlePage > totalPages) {
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = pageNumber - middlePage + 1;
      endPage = pageNumber + middlePage - 1;
    }
  };

  for (let i = startPage; i <= endPage; i++) {
    const pageNumberElement = document.createElement("span");
    pageNumberElement.innerText = i;
    pageNumberElement.className = i === pageNumber ? "active" : "";
    pageNumberElement.addEventListener("click", (event) => {
      const newPage = parseInt(event.target.innerText);
      currentPage = newPage;
      showPage(currentPage);
      createPageNumbers(newPage, totalPages);
      showItemsByCategory(currentCategory);
    });
    pageNumbersContainer.appendChild(pageNumberElement);
  }
};

function updatePageNumbers(activePage) {
  const pageNumbers = document.querySelectorAll(".nfts-pagination__numbers span");
  pageNumbers.forEach((pageNumber, index) => {
    pageNumber.className = index + 1 === activePage ? "active" : "";
  });
};

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    createPageNumbers(currentPage, totalPages);
    showItemsByCategory(currentCategory);
  }
};

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
    createPageNumbers(currentPage, totalPages);
    showItemsByCategory(currentCategory);
  }
};

const categoryButtons = document.querySelectorAll(".nfts-tag__btn");
categoryButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    currentPage = 1;
    await loadAndDisplayData(category);
  });
});


function calculateItemsPerPage(totalItems) {
  return Math.min(totalItems, 8);
};

document.getElementById("prevPage").addEventListener("click", () => {
  prevPage();
});

document.getElementById("nextPage").addEventListener("click", () => {
  nextPage();
});

loadAndDisplayData("All Categories");


// ========================================
let currentSortBy = "name";
let currentSortOrder = "ascending";

document.getElementById("sortSelect").addEventListener("change", () => {
  const selectedOption = document.getElementById("sortSelect").value;
  switch (selectedOption) {
    case "nameAscending":
      currentSortBy = "name";
      currentSortOrder = "ascending";
      break;
    case "nameDescending":
      currentSortBy = "name";
      currentSortOrder = "descending";
      break;
    case "priceAscending":
      currentSortBy = "price";
      currentSortOrder = "ascending";
      break;
    case "priceDescending":
      currentSortBy = "price";
      currentSortOrder = "descending";
      break;
  }
  sortAndDisplayItems(currentSortBy, currentSortOrder);
});


function sortAndDisplayItems(sortBy, sortOrder) {
  const nftItems = Array.from(document.querySelectorAll(".nfts-list__item"));

  nftItems.sort((a, b) => {
    const aData = a.querySelector(".nft-icon__name").textContent;
    const bData = b.querySelector(".nft-icon__name").textContent;

    if (sortBy === "price") {
      const aPrice = parseFloat(a.querySelector(".nft-icon__price span").textContent);
      const bPrice = parseFloat(b.querySelector(".nft-icon__price span").textContent);

      if (sortOrder === "ascending") {
        return aPrice - bPrice;
      } else {
        return bPrice - aPrice;
      }
    } else {
      if (sortOrder === "ascending") {
        return aData.localeCompare(bData);
      } else {
        return bData.localeCompare(aData);
      }
    }
  });

  const nftsList = document.getElementById("nftsList");
  nftsList.innerHTML = "";

  nftItems.forEach((item) => {
    nftsList.appendChild(item);
  });
}

const angle = 20;
const rotateCard = window;

const lerp = (start, end, amount) => {
  return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
  const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(newValue, -newMax), newMax);
};

window.addEventListener("DOMContentLoaded", (event) => {
  const cards = document.querySelectorAll("#rotate-card");
  cards.forEach((e) => {
    e.addEventListener("mousemove", (event) => {
      const rect = e.getBoundingClientRect();
      const posX = event.clientX - rect.left - rect.width / 2;
      const posY = event.clientY - rect.top - rect.height / 2;
      const x = remap(posX, rect.width / 2, angle);
      const y = remap(posY, rect.height / 2, angle);
      e.dataset.rotateX = x;
      e.dataset.rotateY = -y;
    });
    e.addEventListener("mouseout", (event) => {
      e.dataset.rotateX = 0;
      e.dataset.rotateY = 0;
    });
  });

  const update = () => {
    cards.forEach((e) => {
      let currentX = parseFloat(e.style.getPropertyValue('--rotateY').slice(0, -1));
      let currentY = parseFloat(e.style.getPropertyValue('--rotateX').slice(0, -1));
      if (isNaN(currentX)) currentX = 0;
      if (isNaN(currentY)) currentY = 0;
      const x = lerp(currentX, e.dataset.rotateX, 0.05);
      const y = lerp(currentY, e.dataset.rotateY, 0.05);
      e.style.setProperty("--rotateY", x + "deg");
      e.style.setProperty("--rotateX", y + "deg");
    })
  }
  setInterval(update, 1000 / 60)
});
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');

searchForm.addEventListener('click', () => {
  searchForm.classList.add('active');
  searchInput.focus();
});

document.addEventListener('click', (event) => {
  if (!searchForm.contains(event.target)) {
    searchForm.classList.remove('active');
  }
});

searchForm.addEventListener('click', (event) => {
  event.stopPropagation();
});

searchInput.addEventListener('blur', () => {
  searchForm.classList.remove('active');
});



document.querySelector('.footer-subscribe__submit-email').addEventListener('mousedown', (e) => {
  e.preventDefault();
  document.querySelector('.footer-subscribe__subscription').classList.add('done');
});
const walletBtn = document.querySelector(".wallet-btn");
const walletBtnFirst = document.querySelector(".wallet-btn__first");
const walletBtnSecond = document.querySelector(".wallet-btn__second");
const walletWrapper = document.querySelector(".wallet__wrapper");
const closeBtn = document.querySelector(".wallet__btn-close");


const toggleWallet = () => {
  walletWrapper.classList.toggle("open");
  walletBtn.classList.toggle("active");
  walletBtnFirst.classList.toggle("active");
  walletBtnSecond.classList.toggle("active");
}

walletBtn.addEventListener("click", toggleWallet);

closeBtn.addEventListener("click", toggleWallet);
