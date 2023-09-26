
// Функция для отображения элементов на текущей странице
function showPage(page) {
  const itemsPerPage = 8;
  const nftItems = document.querySelectorAll(".nfts-list__item");
  nftItems.forEach((item, index) => {
    if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Функция для создания числовых ссылок на страницы
function createPageNumbers(totalPages) {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  pageNumbersContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("span");
    pageNumber.innerText = i;
    pageNumber.className = i === 1 ? "active" : "";
    pageNumber.addEventListener("click", () => {
      showPage(i);
      updatePageNumbers(i);
    });
    pageNumbersContainer.appendChild(pageNumber);
  }
}

// Функция для обновления стилей активной страницы
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
      throw new Error('Ошибка загрузки данных');
    }

    const jsonData = await response.json();
    const totalPages = Math.ceil(jsonData.length / 8);

    addNftElementsToPage(jsonData);
    createPageNumbers(totalPages);
    showPage(1);

    document.getElementById("prevPage").addEventListener("click", () => {
      const activePage = document.querySelector(".nfts-pagination__numbers .active");
      if (activePage && activePage.previousElementSibling) {
        const newActivePage = parseInt(activePage.innerText) - 1;
        showPage(newActivePage);
        updatePageNumbers(newActivePage);
      }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
      const activePage = document.querySelector(".nfts-pagination__numbers .active");
      if (activePage && activePage.nextElementSibling) {
        const newActivePage = parseInt(activePage.innerText) + 1;
        showPage(newActivePage);
        updatePageNumbers(newActivePage);
      }
    });
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

loadAndDisplayData();