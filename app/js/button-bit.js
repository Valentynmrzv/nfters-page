// Обработчик события клика на кнопке "Place a bid"
function handleBidButtonClick(event) {
  const bitButton = event.target;

  // Проверяем, является ли элемент кнопкой с классом "button" и атрибутом id "bitButton"
  if (bitButton.classList.contains("button") && bitButton.id === "bitButton") {
    // Получаем родительский элемент кнопки
    const parentElement = bitButton.closest(".content__inner");

    // Проверяем, не было ли уже клика на этом элементе
    if (!parentElement.classList.contains("clicked")) {
      // Добавляем класс "clicked" к родительскому элементу
      parentElement.classList.add("clicked");

      // Найти элемент <span class="bit-wrapper"> внутри родительского элемента
      const bitWrapper = parentElement.querySelector(".bit-wrapper");

      if (bitWrapper) {
        // Добавляем класс "active" к элементу <span class="bit-wrapper">
        bitWrapper.classList.add("active");

        // Найти элемент <p class="bit"> внутри родительского элемента
        const bitValueElement = parentElement.querySelector(".bit");
        bitValueElement.classList.add("active");
        if (bitValueElement) {
          // Получить текущее значение ETH в виде текста и преобразовать его в число
          let currentValue = parseFloat(bitValueElement.textContent);

          // Увеличить значение на 0.01 ETH
          currentValue += 0.01;

          // Обновить текстовое содержимое элемента <p class="bit">
          bitValueElement.textContent = currentValue.toFixed(2) + " ETH";

          // Найти элемент <path> внутри родительского элемента
          const pathElement = parentElement.querySelector("path");

          if (pathElement) {
            // Изменить атрибут fill на "#FFFFFF"
            pathElement.setAttribute("fill", "#FFFFFF");
          }
        }
      }
    }
  }
}

// Добавить обработчик события клика на всем документе
document.addEventListener("click", handleBidButtonClick);
