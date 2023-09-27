let currentPage = 1;
let itemsPerPage = 8;
let totalPages = 1;
let currentCategory = "All Categories";
let jsonData;

function showPage(page) {
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

function showItemsByCategory(category) {
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

function createPageNumbers(pageNumber, totalPages) {
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

function updatePageNumbers(activePage) {
  const pageNumbers = document.querySelectorAll(".nfts-pagination__numbers span");
  pageNumbers.forEach((pageNumber, index) => {
    pageNumber.className = index + 1 === activePage ? "active" : "";
  });
};

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    createPageNumbers(currentPage, totalPages);
    showItemsByCategory(currentCategory);
  }
};

function nextPage() {
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
  });
});


function calculateItemsPerPage(totalItems) {
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
let currentSortBy = "name"; // По умолчанию сортировка по имени
let currentSortOrder = "ascending"; // По умолчанию сортировка по возрастанию

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


function sortAndDisplayItems(sortBy, sortOrder) {
  // Получите элементы списка и преобразуйте их в массив для сортировки
  const nftItems = Array.from(document.querySelectorAll(".nfts-list__item"));

  // Сортировка элементов в соответствии с выбранной опцией сортировки
  nftItems.sort((a, b) => {
    const aData = a.querySelector(".nft-icon__name").textContent;
    const bData = b.querySelector(".nft-icon__name").textContent;

    if (sortBy === "price") {
      // Если сортировка по цене, извлеките числовое значение цены
      const aPrice = parseFloat(a.querySelector(".nft-icon__price span").textContent);
      const bPrice = parseFloat(b.querySelector(".nft-icon__price span").textContent);

      if (sortOrder === "ascending") {
        return aPrice - bPrice;
      } else {
        return bPrice - aPrice;
      }
    } else {
      // Сортировка по имени (алфавиту)
      if (sortOrder === "ascending") {
        return aData.localeCompare(bData);
      } else {
        return bData.localeCompare(aData);
      }
    }
  });

  // Удалите существующие элементы из родительского контейнера
  const nftsList = document.getElementById("nftsList");
  nftsList.innerHTML = "";

  // Вставьте отсортированные элементы обратно в контейнер
  nftItems.forEach((item) => {
    nftsList.appendChild(item);
  });
}
