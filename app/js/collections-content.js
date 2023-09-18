// fetch('./nft/content.json')
//   .then(response => response.json())
//   .then(data => {
//     // Создаем объект для хранения информации о том, сколько раз каждый пользователь упоминается
//     const userCounts = {};

//     // Проходимся по каждому элементу в массиве данных
//     data.forEach(item => {
//       const userName = item.userName;

//       // Если пользователь уже упоминался, увеличиваем его счетчик на 1, иначе устанавливаем счетчик в 1
//       if (userCounts[userName]) {
//         userCounts[userName]++;
//       } else {
//         userCounts[userName] = 1;
//       }
//     });

//     // Находим пользователя с максимальным счетчиком
//     let mostMentionedUser = null;
//     let maxMentions = 0;

//     for (const userName in userCounts) {
//       if (userCounts[userName] > maxMentions) {
//         maxMentions = userCounts[userName];
//         mostMentionedUser = userName;
//       }
//     }

//     // Теперь у нас есть имя пользователя, который чаще всего упоминается
//     console.log(`Пользователь, который чаще всего упоминается: ${mostMentionedUser}`);

//     // Теперь выбираем все объекты данных пользователя, где этот пользователь упоминается
//     const userMentions = data.filter(item => item.userName === mostMentionedUser);

//     // Выводим объекты данных пользователя
//     console.log('Данные пользователя:', userMentions);

//     // Создаем новый массив с объектами данных пользователя
//     const userArray = userMentions.map(item => ({
//       id: item.id,
//       imageSrc: item.imageSrc,
//       imageSrcSet: item.imageSrcSet,
//       nftName: item.nftName,
//       userImageSrc: item.userImageSrc,
//       bitValue: item.bitValue,
//       stock: item.stock,
//       userName: item.userName
//     }));

//     // Выводим новый массив с данными пользователя
//     console.log('Массив с данными пользователя:', userArray);
//   })
//   .catch(error => {
//     console.error('Ошибка при чтении файла content.json:', error);
//   });


let collectionsBig = new Swiper('#collections-swiper-small', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
let collectionsSmall = new Swiper('#collections-swiper-big', {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: collectionsBig,
  },
});
