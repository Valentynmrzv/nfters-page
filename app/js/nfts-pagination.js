let currentPage = 1;
const itemsPerPage = 8;
let totalPages = 1;

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
}

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
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageNumberElement = document.createElement("span");
    pageNumberElement.innerText = i;
    pageNumberElement.className = i === pageNumber ? "active" : "";
    pageNumberElement.addEventListener("click", (event) => {
      const newPage = parseInt(event.target.innerText);
      currentPage = newPage;
      showPage(currentPage);
      createPageNumbers(newPage, totalPages);
      loadAndDisplayData();
    });
    pageNumbersContainer.appendChild(pageNumberElement);
  }
}

function updatePageNumbers(activePage) {
  const pageNumbers = document.querySelectorAll(".nfts-pagination__numbers span");
  pageNumbers.forEach((pageNumber, index) => {
    pageNumber.className = index + 1 === activePage ? "active" : "";
  });
}

async function loadAndDisplayData() {
  try {
    const response = await fetch('./nft/content.json');
    if (!response.ok) {
      throw new Error('Error content.json');
    }

    const jsonData = await response.json();
    totalPages = Math.ceil(jsonData.length / itemsPerPage);

    addNftElementsToPage(jsonData);
    createPageNumbers(currentPage, totalPages);
    showPage(currentPage);
  } catch (error) {
    console.error('Error: content.json', error);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    createPageNumbers(currentPage, totalPages);
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
    createPageNumbers(currentPage, totalPages);
  }
}

document.getElementById("prevPage").addEventListener("click", () => {
  prevPage();
});

document.getElementById("nextPage").addEventListener("click", () => {
  nextPage();
});

loadAndDisplayData();
