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

document.addEventListener("DOMContentLoaded", () => {
  const delay = 1100;
  setTimeout(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      themeToggle.checked = true;
    } else {
      themeToggle.checked = false;
    }
    handleThemeChange();
  }, delay);
});
// //   =====================================   END ================================
