const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const backgroundThemes = document.querySelectorAll(".background-theme");
const titleThemes = document.querySelectorAll(".title-theme");
const textThemes = document.querySelectorAll(".text-theme");
const PrimaryTextThemes = document.querySelectorAll(".primary-text-theme");

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");

    backgroundThemes.forEach((backgroundTheme) => {
      backgroundTheme.classList.add("background-theme--dark");
    });

    titleThemes.forEach((titleTheme) => {
      titleTheme.classList.add("title-theme--dark");
    });

    textThemes.forEach((textTheme) => {
      textTheme.classList.add("text-theme--dark");
    });

    PrimaryTextThemes.forEach((PrimaryTextTheme) => {
      PrimaryTextTheme.classList.add("primary-text-theme--dark");
    });

  } else {
    body.classList.remove("dark-theme");

    backgroundThemes.forEach((backgroundTheme) => {
      backgroundTheme.classList.remove("background-theme--dark");
    });

    titleThemes.forEach((titleTheme) => {
      titleTheme.classList.remove("title-theme--dark");
    });

    textThemes.forEach((textTheme) => {
      textTheme.classList.remove("text-theme--dark");
    });

    PrimaryTextThemes.forEach((PrimaryTextTheme) => {
      PrimaryTextTheme.classList.remove("primary-text-theme--dark");
    });
  }
});

window.addEventListener("load", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
});
