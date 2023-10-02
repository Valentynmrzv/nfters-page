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

const backgroundThemes = document.querySelectorAll(".background-theme");
const titleThemes = document.querySelectorAll(".title-theme");
const textThemes = document.querySelectorAll(".text-theme");
const PrimaryTextThemes = document.querySelectorAll(".primary-text-theme");
const topItemContent = document.querySelectorAll(".top__item");
const collectionsTextElements = document.querySelectorAll(".collections__text");

function handleThemeChange() {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");

    applyThemeToElements(backgroundThemes, "background-theme", true);
    applyThemeToElements(titleThemes, "title-theme", true);
    applyThemeToElements(textThemes, "text-theme", true);
    applyThemeToElements(PrimaryTextThemes, "primary-text-theme", true);
    applyThemeToElements(topItemContent, "top__item", true);


    listElement.querySelectorAll(".content__item").forEach((element) => {
      element.querySelector(".title").classList.add("title-theme--dark");
      element.querySelector(".number").classList.add("primary-text-theme--dark");
    });
    applyThemeToElements(collectionsTextElements, "text-theme", themeToggle.checked);

    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");

    applyThemeToElements(backgroundThemes, "background-theme", false);
    applyThemeToElements(titleThemes, "title-theme", false);
    applyThemeToElements(textThemes, "text-theme", false);
    applyThemeToElements(PrimaryTextThemes, "primary-text-theme", false);
    applyThemeToElements(topItemContent, "top__item", false);
    // applyThemeToElements(collectionsSubtitle, "collections__subtitle", false);

    listElement.querySelectorAll(".content__item").forEach((element) => {
      element.querySelector(".title").classList.remove("title-theme--dark");
      element.querySelector(".number").classList.remove("primary-text-theme--dark");
    });

    applyThemeToElements(collectionsTextElements, "text-theme", themeToggle.checked);

    localStorage.setItem("theme", "light");
  }
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
