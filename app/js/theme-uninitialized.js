// document.addEventListener("DOMContentLoaded", () => {
//   const delay = 1000;
//   setTimeout(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       themeToggle.checked = true;
//     } else {
//       themeToggle.checked = false;
//     }

//     handleThemeChange();
//     themeToggle.checked = true;

//     applyThemeToElements(checkboxLabel, "checkbox-label", themeToggle.checked);
//     applyThemeToElements(backgroundThemes, "background-theme", themeToggle.checked);
//     applyThemeToElements(titleThemes, "title-theme", themeToggle.checked);
//     applyThemeToElements(textThemes, "text-theme", themeToggle.checked);
//     applyThemeToElements(PrimaryTextThemes, "primary-text-theme", themeToggle.checked);
//     applyThemeToElements(iconTheme, "icon-theme", themeToggle.checked);
//     applyThemeToElements(searchIconTheme, "search-form__icon", themeToggle.checked);
//     applyThemeToElements(mainBtns, "main-btn", themeToggle.checked);
//     applyThemeToElements(topItemContent, "top__item", themeToggle.checked);
//     applyThemeToElements(walletBtnTheme, "wallet-btn", themeToggle.checked);
//     applyThemeToElements(accentBtnTheme, "main-btn-accent", themeToggle.checked);
//     applyThemeToElements(collectionItems, "collections__item", themeToggle.checked);
//     applyThemeToContentItems(themeToggle.checked);
//     applyThemeToCollectionItems(themeToggle.checked);
//     applyThemeToNftItems(themeToggle.checked);

//     listElement.querySelectorAll(".content__item").forEach((element) => {
//       element.querySelector(".title.title-theme").classList.toggle("title-theme--dark", themeToggle.checked);
//       element.querySelector(".number.primary-text-theme").classList.toggle("primary-text-theme--dark", themeToggle.checked);
//       element.querySelector(".button.main-btn").classList.toggle("main-btn--dark", themeToggle.checked)
//     });
//     listNft.querySelectorAll(".nfts-list__item").forEach((element) => {
//       element.querySelector(".nft-icon__name").classList.toggle("text-theme--dark", themeToggle.checked);
//       element.querySelector(".nfts-icon__number").classList.toggle("text-theme--dark", themeToggle.checked);
//       element.querySelector(".nft-icon__btn").classList.toggle("main-btn--dark", themeToggle.checked);
//     });
//     // console.log("DONE")
//   }, delay);
// });

// //   =====================================   END ================================