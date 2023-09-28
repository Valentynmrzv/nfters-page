const walletBtn = document.querySelector(".wallet-btn");
const walletBtnFirst = document.querySelector(".wallet-btn__first");
const walletBtnSecond = document.querySelector(".wallet-btn__second");
const walletWrapper = document.querySelector(".wallet__wrapper");
const closeBtn = document.querySelector(".wallet__btn-close");


function toggleWallet() {
  walletWrapper.classList.toggle("open");
  walletBtn.classList.toggle("active");
  walletBtnFirst.classList.toggle("active");
  walletBtnSecond.classList.toggle("active");
}

walletBtn.addEventListener("click", toggleWallet);

closeBtn.addEventListener("click", toggleWallet);
