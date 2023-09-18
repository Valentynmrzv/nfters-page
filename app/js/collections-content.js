// Создаем функцию для создания элементов swiper-slide
const createSwiperSlide = (imageSrc) => {
  const swiperSlide = document.createElement('div');
  swiperSlide.className = 'swiper-slide';

  const picture = document.createElement('picture');
  const sourceAvif = document.createElement('source');
  sourceAvif.setAttribute('srcset', imageSrc.avif);
  sourceAvif.setAttribute('type', 'image/avif');
  const sourceWebp = document.createElement('source');
  sourceWebp.setAttribute('srcset', imageSrc.webp);
  sourceWebp.setAttribute('type', 'image/webp');
  const img = document.createElement('img');
  img.setAttribute('srcset', imageSrc.jpg);
  img.setAttribute('src', imageSrc.jpg);
  img.setAttribute('alt', '');

  picture.appendChild(sourceAvif);
  picture.appendChild(sourceWebp);
  picture.appendChild(img);
  swiperSlide.appendChild(picture);

  return swiperSlide;
};

// Функция для создания элементов collections__item
const createCollectionsItem = (userName, userImages) => {
  const collectionsItem = document.createElement('li');
  collectionsItem.className = 'collections__item';

  const collectionsGrid = document.createElement('div');
  collectionsGrid.className = 'collections__grid';

  const bigWrapper = document.createElement('div');
  bigWrapper.className = 'collections-card__wrapper big';
  bigWrapper.id = 'collections-swiper';

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  userImages.forEach((imageSrc) => {
    const swiperSlide = createSwiperSlide(imageSrc);
    swiperWrapper.appendChild(swiperSlide);
  });

  bigWrapper.appendChild(swiperWrapper);

  // Создаем остальные элементы collections__item, такие как collections__subtitle, collections__inner и т. д.

  collectionsGrid.appendChild(bigWrapper);
  // Добавьте остальные элементы collections__item здесь

  collectionsItem.appendChild(collectionsGrid);
  // Вставьте collectionsItem в вашу HTML-структуру (например, внутрь ul с классом collections__list)

  return collectionsItem;
};

// Функция для нахождения топ-3 пользователей по именам
const findTopUsers = (data) => {
  const userCounts = {};

  data.forEach((item) => {
    const userName = item.userName;
    if (userName in userCounts) {
      userCounts[userName]++;
    } else {
      userCounts[userName] = 1;
    }
  });

  const sortedUsers = Object.keys(userCounts).sort((a, b) => {
    return userCounts[b] - userCounts[a];
  });

  const topUsers = sortedUsers.slice(0, 3);

  return topUsers;
};

// Получаем данные из content.json с использованием Fetch
fetch('./nft/content.json')
  .then((response) => response.json())
  .then((data) => {
    // Получаем топ-3 пользователей
    const topUsers = findTopUsers(data);

    // Создаем collections__item для каждого пользователя из топ-3
    topUsers.forEach((userName) => {
      // Получаем коллекцию изображений для данного пользователя
      const userImages = data
        .filter((item) => item.userName === userName)
        .map((item) => ({
          avif: item.avif,
          webp: item.webp,
          jpg: item.jpg,
        }));

      // Создаем элемент collections__item и добавляем его в HTML
      const collectionsItem = createCollectionsItem(userName, userImages);
      // Вставьте collectionsItem в вашу HTML-структуру (например, внутрь ul с классом collections__list)
    });
  })
  .catch((error) => {
    console.error('Ошибка при загрузке данных:', error);
  });
