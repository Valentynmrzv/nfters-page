//  ============================ content =============================================
document.addEventListener('DOMContentLoaded', function () {
  const listElement = document.querySelector('.content__list');
  const selectedContent = document.querySelector('.selected-content');

  fetch('../nft/content.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const listItem = createContentItem(item);

        listElement.appendChild(listItem);
        listItem.addEventListener('mouseover', function () {
          updateSelectedContent(selectedContent, item);
        });
      });
    })
    .catch(error => {
      console.error('Error content.json', error);
    });
});

function createContentItem(item) {
  const listItem = document.createElement('li');
  listItem.className = 'content__item';

  const pictureElement = document.createElement('picture');

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
  titleElement.className = 'title';
  titleElement.textContent = item.userName;

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
  numberElement.className = 'number';
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
  buttonElement.textContent = 'Place a bid';

  innerElement.appendChild(buttonElement);

  listItem.appendChild(pictureElement);
  listItem.appendChild(innerElement);

  return listItem;
};

function updateSelectedContent(selectedContent, item) {
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
  selectedTitle.textContent = item.userName;

  const selectedBid = selectedContent.querySelector('.bid');
  selectedBid.textContent = item.bitValue;
};