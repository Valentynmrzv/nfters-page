const modalWrapper = document.querySelector(".modals");
const signUpBtn = document.querySelector(".sign-up-text__button");
const modalSignIn = document.querySelector(".modal__sign-in");
const modalSignUp = document.querySelector(".modal__sign-up");
const modalToggleBtn = document.querySelectorAll(".modal-form__msg-link");
const modalCloseButtons = document.querySelectorAll(".modal__close");

const openModal = () => {
  modalWrapper.classList.add("open");
  modalSignUp.classList.add("active");
}


const closeModal = () => {
  modalWrapper.classList.remove("open");
  modalSignIn.classList.remove("active");
  modalSignUp.classList.remove("active");
}

const toggleModalSign = () => {
  modalSignIn.classList.toggle("active");
  modalSignUp.classList.toggle("active");
}

signUpBtn.addEventListener("click", openModal);
modalToggleBtn.forEach((button) => {
  button.addEventListener("click", toggleModalSign);
});
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});
