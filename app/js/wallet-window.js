const walletBtn = document.querySelector(".wallet-btn");
const walletBtnFirst = document.querySelector(".wallet-btn__first");
const walletBtnSecond = document.querySelector(".wallet-btn__second");
const walletWrapper = document.querySelector(".wallet__wrapper");
const closeBtn = document.querySelector(".wallet__btn-close");

const toggleWallet = () => {
  walletWrapper.classList.toggle("open");
  walletBtn.classList.toggle("active");
  walletBtnFirst.classList.toggle("active");
  walletBtnSecond.classList.toggle("active");
}
const closeWallet = () => {
  walletWrapper.classList.remove("open");
  walletBtn.classList.remove("active");
  walletBtnFirst.classList.remove("active");
  walletBtnSecond.classList.remove("active");
}

walletBtn.addEventListener("click", toggleWallet);
closeBtn.addEventListener("click", toggleWallet);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeWallet();
  }
});