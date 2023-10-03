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
const collectionItem = document.querySelectorAll(".collections__item");
console.log(collectionItem);


function handleThemeChange() {
  console.log("Changing theme...");
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

    collectionItem.forEach((item) => {
      const titleElement = item.querySelector(".collections__subtitle");
      const textElement = item.querySelector(".collections__text");
      if (textElement) {
        titleElement.classList.add("title-theme--dark");
        textElement.classList.add("text-theme--dark");
      }
    });


    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");

    applyThemeToElements(backgroundThemes, "background-theme", false);
    applyThemeToElements(titleThemes, "title-theme", false);
    applyThemeToElements(textThemes, "text-theme", false);
    applyThemeToElements(PrimaryTextThemes, "primary-text-theme", false);
    applyThemeToElements(topItemContent, "top__item", false);

    listElement.querySelectorAll(".content__item").forEach((element) => {
      element.querySelector(".title").classList.remove("title-theme--dark");
      element.querySelector(".number").classList.remove("primary-text-theme--dark");
    });

    collectionItem.forEach((item) => {
      const titleElement = item.querySelector(".collections__subtitle");
      const textElement = item.querySelector(".collections__text");
      if (textElement) {
        titleElement.classList.remove("title-theme--dark");
        textElement.classList.remove("text-theme--dark");
      }
    });

    localStorage.setItem("theme", "light");
  }
};

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
