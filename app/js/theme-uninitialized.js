document.addEventListener("DOMContentLoaded", () => {
  const delay = 1000;
  setTimeout(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      themeToggle.checked = true;
    } else {
      themeToggle.checked = false;
    }

    handleThemeChange();
    themeToggle.checked = true;

    //     // applyThemeToContentItems(themeToggle.checked);

    //     // listElement.querySelectorAll(".content__item").forEach((element) => {
    //     //   element.querySelector(".title.title-theme").classList.toggle("title-theme--dark", themeToggle.checked);
    //     //   element.querySelector(".number.primary-text-theme").classList.toggle("primary-text-theme--dark", themeToggle.checked);
    //     //   element.querySelector(".button.main-btn").classList.toggle("main-btn--dark", themeToggle.checked)
    // });
    console.log("DONE")
  }, delay);
});

// //   =====================================   END ================================
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