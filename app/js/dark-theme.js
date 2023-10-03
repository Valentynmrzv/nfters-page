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

const collectionItems = document.querySelectorAll(".collections__item");
const backgroundThemes = document.querySelectorAll(".background-theme");
const titleThemes = document.querySelectorAll(".title-theme");
const textThemes = document.querySelectorAll(".text-theme");
const PrimaryTextThemes = document.querySelectorAll(".primary-text-theme");
const topItemContent = document.querySelectorAll(".top__item");
const listElement = document.querySelector('.content__list');

function handleThemeChange() {
  const checked = themeToggle.checked;
  console.log("Changing theme...");

  if (checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }

  applyThemeToElements(backgroundThemes, "background-theme", checked);
  applyThemeToElements(titleThemes, "title-theme", checked);
  applyThemeToElements(textThemes, "text-theme", checked);
  applyThemeToElements(PrimaryTextThemes, "primary-text-theme", checked);
  applyThemeToElements(topItemContent, "top__item", checked);

  listElement.querySelectorAll(".content__item").forEach((element) => {
    element.querySelector(".title").classList.toggle("title-theme--dark", checked);
    element.querySelector(".number").classList.toggle("primary-text-theme--dark", checked);
  });

  applyThemeToElements(collectionItems, "collections__item", checked);

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
});
