// ====================== content section ==================
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


// ============================ NFTS section======================

function handleNftButtonClick(event) {
  const nftButton = event.target;

  if (nftButton.classList.contains("nft-icon__btn") && nftButton.id === "nftButton") {
    const parentElement = nftButton.closest(".nfts-list__item");

    const bitWrapper = parentElement.querySelector(".nft-icon__price");

    if (bitWrapper) {
      const bitValueElement = bitWrapper.querySelector("span");

      if (bitValueElement) {
        if (!nftButton.classList.contains("processing")) {
          nftButton.classList.add("processing");

          let currentValue = parseFloat(bitValueElement.textContent);

          if (!nftButton.classList.contains("cancel")) {
            nftButton.classList.add("cancel");
            nftButton.textContent = "Cancel";
            currentValue += 0.01;
            bitValueElement.textContent = currentValue.toFixed(2) + " ETH";
          } else {
            nftButton.classList.remove("cancel");
            nftButton.textContent = "Place a bid";
            currentValue -= 0.01;
            bitValueElement.textContent = currentValue.toFixed(2) + " ETH";
            const pathElement = parentElement.querySelector("path");
            if (pathElement) {
              pathElement.setAttribute("fill", "#00AC4F");
            }
          }
          setTimeout(() => {
            nftButton.classList.remove("processing");
          }, 500);
        }
      }
    }
  }
}

document.addEventListener("click", handleNftButtonClick);
