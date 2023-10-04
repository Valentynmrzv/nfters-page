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
  nftName.className = "nft-icon__name text-theme";
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
  nftNumber.className = "nfts-icon__number text-theme";
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
