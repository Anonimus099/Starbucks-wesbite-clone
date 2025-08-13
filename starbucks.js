// Адаптивное меню
document.addEventListener("DOMContentLoaded", function () {
  const burgerIcon = document.querySelector(".burger-menu-icon");
  const burgerMenu = document.querySelector(".burger__menu");
  const burgerClose = document.querySelector(".burger-close");
  const body = document.body;

  // Функция открытия меню
  function openMenu() {
    burgerMenu.classList.add("active");
    body.classList.add("menu-open");
    burgerIcon.classList.add("active");
  }

  // Функция закрытия меню
  function closeMenu() {
    burgerMenu.classList.remove("active");
    body.classList.remove("menu-open");
    burgerIcon.classList.remove("active");
  }

  // Открытие меню
  burgerIcon.addEventListener("click", openMenu);

  // Закрытие меню через кнопку X
  burgerClose.addEventListener("click", closeMenu);

  // Закрытие меню при клике вне его
  document.addEventListener("click", function (e) {
    if (!burgerMenu.contains(e.target) && !burgerIcon.contains(e.target)) {
      closeMenu();
    }
  });

  // Закрытие меню при нажатии Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Анимация появления элементов при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Наблюдаем за блоками для анимации
  document
    .querySelectorAll(
      ".green__block, .live__block, .loveit__block, .find__block, .black__block"
    )
    .forEach((block) => {
      observer.observe(block);
    });
});
