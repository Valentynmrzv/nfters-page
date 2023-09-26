// document.addEventListener("DOMContentLoaded", () => {
//   // Функция для создания HTML-элемента для каждого элемента данных JSON
//   function createNftElement(nftData) {
//     const nftItem = document.createElement("li");
//     nftItem.className = "nfts__item";

//     const nftIcon = document.createElement("div");
//     nftIcon.className = "nft-icon";

//     const picture = document.createElement("picture");
//     picture.className = "nft-icon__image";

//     // Добавление источника изображения (первый источник)
//     const imageSrcSet = document.createElement("source");
//     imageSrcSet.srcset = nftData.imageSrcSet[0]; // Здесь берем первый источник
//     imageSrcSet.type = "image/avif"; // Тип изображения
//     picture.appendChild(imageSrcSet);

//     // Добавление источника изображения (второй источник)
//     const imageSrcSet2x = document.createElement("source");
//     imageSrcSet2x.srcset = nftData.imageSrcSet[1]; // Здесь берем второй источник
//     imageSrcSet2x.type = "image/webp"; // Тип изображения
//     picture.appendChild(imageSrcSet2x);

//     // Добавление <img> элемента
//     const image = document.createElement("img");
//     image.srcset = nftData.imageSrcSet[2]; // Здесь берем третий источник
//     image.src = nftData.imageSrc;
//     image.alt = ""; // Здесь можно указать альтернативный текст для изображения
//     picture.appendChild(image);

//     // Добавление элементов внутри "nft-icon__inner" блока
//     const nftInner = document.createElement("div");
//     nftInner.className = "nft-icon__inner";

//     const nftName = document.createElement("h5");
//     nftName.className = "nft-icon__name";
//     nftName.textContent = nftData.nftName;

//     const nftText = document.createElement("span");
//     nftText.className = "nft-icon__text";

//     const nftPrice = document.createElement("p");
//     nftPrice.className = "nft-icon__price";

//     // const priceSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     // priceSvg.setAttribute("width", "9");
//     // priceSvg.setAttribute("height", "14");
//     // priceSvg.setAttribute("viewBox", "0 0 9 14");
//     // priceSvg.setAttribute("fill", "none");
//     // priceSvg.className = "icon";

//     // Добавление элементов внутри <svg> элемента для иконки цены
//     // const pricePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     // pricePath.setAttribute("d", "M8.31533 7.13126L4.26566 9.66876L0.213318 7.13126L4.26566 0L8.31533 7.13126ZM4.26566 10.4836L0.213318 7.9461L4.26566 14L8.3180.213318 7.9461L4.26566 10.4836Z");
//     // pricePath.setAttribute("fill", "#00AC4F");

//     // priceSvg.appendChild(pricePath);

//     const priceValue = document.createElement("span");
//     priceValue.textContent = nftData.bitValue;

//     const nftNumber = document.createElement("p");
//     nftNumber.className = "nfts-icon__number";
//     nftNumber.textContent = nftData.stock;

//     const placeBidButton = document.createElement("button");
//     placeBidButton.className = "nft-icon__btn main-btn main-btn--light";
//     placeBidButton.textContent = "Place a bid";

//     // Добавление элементов в DOM
//     nftItem.appendChild(nftIcon);
//     nftIcon.appendChild(picture);
//     nftIcon.appendChild(nftInner);
//     nftInner.appendChild(nftName);
//     nftInner.appendChild(nftText);
//     nftText.appendChild(nftPrice);
//     // nftPrice.appendChild(priceSvg);
//     nftPrice.appendChild(priceValue);
//     nftText.appendChild(nftNumber);
//     nftText.appendChild(placeBidButton);

//     return nftItem;
//   }

//   // Функция для добавления элементов в список
//   function addNftElementsToPage(dataArray) {
//     const nftsList = document.getElementById("nftsList");
//     dataArray.forEach((nftData) => {
//       const nftElement = createNftElement(nftData);
//       nftsList.appendChild(nftElement);
//     });
//   }

//   // Функция для загрузки данных из JSON-файла и отображения их на странице
//   async function loadAndDisplayData() {
//     try {
//       const response = await fetch('./nft/content.json');
//       if (!response.ok) {
//         throw new Error('Ошибка загрузки данных');
//       }

//       const jsonData = await response.json();
//       addNftElementsToPage(jsonData);
//     } catch (error) {
//       console.error('Произошла ошибка:', error);
//     }
//   }

//   // Вызываем функцию для загрузки и отображения данных
//   loadAndDisplayData();
// });




// Функция для создания HTML-элемента для каждого элемента данных JSON
function createNftElement(nftData) {
  const nftItem = document.createElement("li");
  nftItem.className = "nfts-list__item";

  const nftIcon = document.createElement("div");
  nftIcon.className = "nft-icon";

  const picture = document.createElement("picture");
  picture.className = "nft-icon__image";

  // Добавление источника изображения (первый источник)
  const imageSrcSet = document.createElement("source");
  imageSrcSet.srcset = nftData.imageSrcSet[0];
  imageSrcSet.type = "image/avif";
  picture.appendChild(imageSrcSet);

  // Добавление источника изображения (второй источник)
  const imageSrcSet2x = document.createElement("source");
  imageSrcSet2x.srcset = nftData.imageSrcSet[1];
  imageSrcSet2x.type = "image/webp";
  picture.appendChild(imageSrcSet2x);

  // Добавление <img> элемента
  const image = document.createElement("img");
  image.srcset = nftData.imageSrcSet[2];
  image.src = nftData.imageSrc;
  image.alt = "";
  picture.appendChild(image);

  // Добавление элементов внутри "nft-icon__inner" блока
  const nftInner = document.createElement("div");
  nftInner.className = "nft-icon__inner";

  const nftName = document.createElement("h5");
  nftName.className = "nft-icon__name";
  nftName.textContent = nftData.nftName;

  const nftText = document.createElement("span");
  nftText.className = "nft-icon__text";

  const nftPrice = document.createElement("p");
  nftPrice.className = "nft-icon__price";

  const priceValue = document.createElement("span");
  priceValue.textContent = nftData.bitValue;

  const nftNumber = document.createElement("p");
  nftNumber.className = "nfts-icon__number";
  nftNumber.textContent = nftData.stock;

  const placeBidButton = document.createElement("button");
  placeBidButton.className = "nft-icon__btn main-btn main-btn--light";
  placeBidButton.textContent = "Place a bid";

  // Добавление элементов в DOM
  nftItem.appendChild(nftIcon);
  nftIcon.appendChild(picture);
  nftIcon.appendChild(nftInner);
  nftInner.appendChild(nftName);
  nftInner.appendChild(nftText);
  nftText.appendChild(nftPrice);
  nftPrice.appendChild(priceValue);
  nftText.appendChild(nftNumber);
  nftIcon.appendChild(placeBidButton);

  return nftItem;
}

// Функция для добавления элементов в список
function addNftElementsToPage(dataArray) {
  const nftsList = document.getElementById("nftsList");
  dataArray.forEach((nftData) => {
    const nftElement = createNftElement(nftData);
    nftsList.appendChild(nftElement);
  });
}


