function handleBidButtonClick(event) {
  const bitButton = event.target;

  if (bitButton.classList.contains("button") && bitButton.id === "bitButton") {
    const parentElement = bitButton.closest(".content__inner");
    if (!parentElement.classList.contains("clicked")) {
      parentElement.classList.add("clicked");
      const bitWrapper = parentElement.querySelector(".bit-wrapper");
      if (bitWrapper) {
        bitWrapper.classList.add("active");

        const bitValueElement = parentElement.querySelector(".bit");
        bitValueElement.classList.add("active");
        if (bitValueElement) {
          let currentValue = parseFloat(bitValueElement.textContent);
          currentValue += 0.01;
          bitValueElement.textContent = currentValue.toFixed(2) + " ETH";
          const pathElement = parentElement.querySelector("path");

          if (pathElement) {
            pathElement.setAttribute("fill", "#FFFFFF");
          }
        }
      }
    }
  }
}
document.addEventListener("click", handleBidButtonClick);
