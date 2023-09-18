document.addEventListener('DOMContentLoaded', function () {
  fetch('./nft/content.json')
    .then(response => response.json())
    .then(data => {
      const userCounts = {};

      data.forEach(item => {
        const userName = item.userName;
        if (userName in userCounts) {
          userCounts[userName]++;
        } else {
          userCounts[userName] = 1;
        }
      });

      const topUsers = Object.entries(userCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      const collectionsList = document.querySelector('.collections__list');

      topUsers.forEach(([userName, count]) => {
        const liElement = document.createElement('li');
        liElement.classList.add('collections__item');

        const userItems = data.filter(item => item.userName === userName).slice(0, 3);

        const userImageSrc = userItems[0].userImageSrc;

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
        <h4 class="collections__subtitle">Amazing Collection</h4>
        <div class="collections__inner">
          <span>
            <img src="${userImageSrc}" alt="" class="collections__user-img">
            <p class="collections__text">
              By&nbsp;
              <span class="collections__name">${userName}</span>
            </p>
          </span>
          <button class="collections__button main-btn main-btn--light">
            Total&nbsp;
            <span class="collections__quantity">${count}</span>&nbsp;Items
          </button>
        </div>
      `;

        collectionsList.appendChild(liElement);

        collectionsSwiper(userName, userItems);
      });
    })
    .catch(error => {
      console.error('Произошла ошибка при загрузке данных:', error);
    });

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
  }
});
