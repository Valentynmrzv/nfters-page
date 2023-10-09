let jsonModalData;

document.addEventListener('DOMContentLoaded', () => {
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
const findUserImages = (userName) => {
  return jsonModalData.filter(item => item.userName === userName);
}
const initializeCollections = () => {
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
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightBox();
    }
  });
  const displayImagesInLightBox = (userImages) => {
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
  const closeLightBox = () => {
    lightBox.classList.remove('is-open');
    lightBoxList.innerHTML = '';
  }
};
