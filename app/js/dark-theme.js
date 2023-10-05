const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const applyThemeToElements = (elements, themeClass, checked) => {
  elements.forEach((element) => {
    if (checked) {
      element.classList.add(themeClass + "--dark");
    } else {
      element.classList.remove(themeClass + "--dark");
    }
  });
}
const checkboxLabel = document.querySelectorAll(".checkbox-label");
const collectionItems = document.querySelectorAll(".collections__item");
const nftItems = document.querySelectorAll(".nfts-list__item");
const backgroundThemes = document.querySelectorAll(".background-theme");
const titleThemes = document.querySelectorAll(".title-theme");
const textThemes = document.querySelectorAll(".text-theme");
const PrimaryTextThemes = document.querySelectorAll(".primary-text-theme");
const iconTheme = document.querySelectorAll(".icon-theme");
const searchIconTheme = document.querySelectorAll(".search-form__icon");
const mainBtns = document.querySelectorAll(".main-btn");
const topItemContent = document.querySelectorAll(".top__item");
const walletBtnTheme = document.querySelectorAll(".wallet-btn");
const accentBtnTheme = document.querySelectorAll(".main-btn-accent");
const listElement = document.querySelector(".content__list");
const listNft = document.querySelector(".nfts-list");

const handleThemeChange = () => {
  const checked = themeToggle.checked;

  if (checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
  applyThemeToElements(checkboxLabel, "checkbox-label", checked);
  applyThemeToElements(backgroundThemes, "background-theme", checked);
  applyThemeToElements(titleThemes, "title-theme", checked);
  applyThemeToElements(textThemes, "text-theme", checked);
  applyThemeToElements(PrimaryTextThemes, "primary-text-theme", checked);
  applyThemeToElements(iconTheme, "icon-theme", checked);
  applyThemeToElements(searchIconTheme, "search-form__icon", checked);
  applyThemeToElements(mainBtns, "main-btn", checked);
  applyThemeToElements(topItemContent, "top__item", checked);
  applyThemeToElements(walletBtnTheme, "wallet-btn", checked);
  applyThemeToElements(accentBtnTheme, "main-btn-accent", checked);
  applyThemeToElements(collectionItems, "collections__item", checked);
  applyThemeToCollectionItems(checked);
  applyThemeToNftItems(checked);

  listElement.querySelectorAll(".content__item").forEach((element) => {
    element.querySelector(".title").classList.toggle("title-theme--dark", checked);
    element.querySelector(".number").classList.toggle("primary-text-theme--dark", checked);
    element.querySelector(".button.main-btn").classList.toggle("main-btn--dark", checked)
  });
  listNft.querySelectorAll(".nfts-list__item").forEach((element) => {
    element.querySelector(".nft-icon__name").classList.toggle("text-theme--dark", checked);
    element.querySelector(".nfts-icon__number").classList.toggle("text-theme--dark", checked);
    element.querySelector(".nft-icon__btn").classList.toggle("main-btn--dark", checked);
  });

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
  themeToggle.checked = true;
});
// ======================================== dark mode button hidden
const darkModeElement = document.querySelector('.dark-mode');
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition === 0 && darkModeElement.classList.contains('hidden')) {
    darkModeElement.classList.remove('hidden');
  } else if (scrollPosition > 0 && !darkModeElement.classList.contains('hidden')) {
    darkModeElement.classList.add('hidden');
  }
});
