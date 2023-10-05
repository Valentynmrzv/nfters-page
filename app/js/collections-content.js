const applyThemeToCollectionItems = (checked) => {
  const collectionItems = document.querySelectorAll(".collections__item");
  collectionItems.forEach((collectionItem) => {
    const titleElement = collectionItem.querySelector(".collections__subtitle.title-theme");
    const primaryTextElement = collectionItem.querySelector(".collections__inner");
    const button = collectionItem.querySelector(".collections__button.main-btn");
    if (titleElement) {
      titleElement.classList.toggle("title-theme--dark", checked);
    }
    if (primaryTextElement) {
      primaryTextElement.classList.toggle("primary-text-theme--dark", checked);
    }
    if (button) {
      button.classList.toggle("main-btn--dark", checked);
    }
  });
};
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const handleThemeChange = () => {
    if (themeToggle.checked) {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
    applyThemeToCollectionItems(themeToggle.checked);
  }

  themeToggle.addEventListener("change", handleThemeChange);
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
            <button class="collections__button main-btn">
              Total&nbsp;
              <span class="collections__quantity">${userTotalItems}</span>&nbsp;Items
            </button>
          </div>
        `;

        collectionsList.appendChild(liElement);
        collectionsSwiper(userName, userItems);
        applyThemeToCollectionItems(themeToggle.checked);
      });
    })
    .catch(error => {
      console.error('Error read:', error);
    });

  const getRandomUsers = (arr, num) => {
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
  const collectionsSwiper = (userName, userItems) => {
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

  themeToggle.addEventListener("change", handleThemeChange);
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
