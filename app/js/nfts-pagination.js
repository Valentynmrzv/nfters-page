let currentPage = 1;
let itemsPerPage = 8;
let totalPages = 1;
let currentCategory = "All Categories";
let jsonData;

const showPage = (page) => {
  const nftItems = document.querySelectorAll(".nfts-list__item");
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  nftItems.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};
const showItemsByCategory = (category) => {
  const nftItems = document.querySelectorAll(".nfts-list__item");
  nftItems.forEach((item, index) => {
    const itemCategory = item.getAttribute("data-category");
    const isItemInCategory = category === "All Categories" || itemCategory === category;
    const isItemOnCurrentPage = index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage;

    if (isItemInCategory && isItemOnCurrentPage) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

const createPageNumbers = (pageNumber, totalPages) => {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  pageNumbersContainer.innerHTML = "";
  const maxPageNumbersToShow = 5;
  let startPage;
  let endPage;

  if (totalPages <= maxPageNumbersToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const middlePage = Math.ceil(maxPageNumbersToShow / 2);

    if (pageNumber <= middlePage) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (pageNumber + middlePage > totalPages) {
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = pageNumber - middlePage + 1;
      endPage = pageNumber + middlePage - 1;
    }
  };

  for (let i = startPage; i <= endPage; i++) {
    const pageNumberElement = document.createElement("span");
    pageNumberElement.innerText = i;
    pageNumberElement.className = i === pageNumber ? "active" : "";
    pageNumberElement.addEventListener("click", (event) => {
      const newPage = parseInt(event.target.innerText);
      currentPage = newPage;
      showPage(currentPage);
      createPageNumbers(newPage, totalPages);
      showItemsByCategory(currentCategory);
    });
    pageNumbersContainer.appendChild(pageNumberElement);
  }
};

const updatePageNumbers = (activePage) => {
  const pageNumbers = document.querySelectorAll(".nfts-pagination__numbers span");
  pageNumbers.forEach((pageNumber, index) => {
    pageNumber.className = index + 1 === activePage ? "active" : "";
  });
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    createPageNumbers(currentPage, totalPages);
    showItemsByCategory(currentCategory);
  }
};

const nextPage = () => {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
    createPageNumbers(currentPage, totalPages);
    showItemsByCategory(currentCategory);
  }
};

const categoryButtons = document.querySelectorAll(".nfts-tag__btn");
categoryButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    currentPage = 1;

    await loadAndDisplayData(category);
    handleThemeChange();
  });
});

const calculateItemsPerPage = (totalItems) => {
  return Math.min(totalItems, 8);
};

document.getElementById("prevPage").addEventListener("click", () => {
  prevPage();
});

document.getElementById("nextPage").addEventListener("click", () => {
  nextPage();
});

loadAndDisplayData("All Categories");


// ========================================
let currentSortBy = "name";
let currentSortOrder = "ascending";

document.getElementById("sortSelect").addEventListener("change", () => {
  const selectedOption = document.getElementById("sortSelect").value;
  switch (selectedOption) {
    case "nameAscending":
      currentSortBy = "name";
      currentSortOrder = "ascending";
      break;
    case "nameDescending":
      currentSortBy = "name";
      currentSortOrder = "descending";
      break;
    case "priceAscending":
      currentSortBy = "price";
      currentSortOrder = "ascending";
      break;
    case "priceDescending":
      currentSortBy = "price";
      currentSortOrder = "descending";
      break;
  }
  sortAndDisplayItems(currentSortBy, currentSortOrder);
});

const sortAndDisplayItems = (sortBy, sortOrder) => {
  const nftItems = Array.from(document.querySelectorAll(".nfts-list__item"));
  nftItems.forEach((item) => {
    item.style.display = "none";
  });

  nftItems.sort((a, b) => {
    const aData = a.querySelector(".nft-icon__name").textContent;
    const bData = b.querySelector(".nft-icon__name").textContent;

    if (sortBy === "price") {
      const aPrice = parseFloat(a.querySelector(".nft-icon__price span").textContent);
      const bPrice = parseFloat(b.querySelector(".nft-icon__price span").textContent);

      if (sortOrder === "ascending") {
        return aPrice - bPrice;
      } else {
        return bPrice - aPrice;
      }
    } else {
      if (sortOrder === "ascending") {
        return aData.localeCompare(bData);
      } else {
        return bData.localeCompare(aData);
      }
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  nftItems.slice(startIndex, endIndex).forEach((item) => {
    item.style.display = "block";
  });

  const nftsList = document.getElementById("nftsList");
  nftsList.innerHTML = "";

  nftItems.forEach((item) => {
    nftsList.appendChild(item);
  });
  createPageNumbers(currentPage, totalPages);
};