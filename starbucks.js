// Функция для проверки авторизации
function checkAuthStatus() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    console.log("Пользователь авторизован:", user.firstName);
    return user;
  }
  return null;
}

// Функция для выхода из системы
function logout() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

// Функция для обновления интерфейса в зависимости от статуса авторизации
function updateAuthUI() {
  const currentUser = checkAuthStatus();
  const signInBtn = document.querySelector('.btn__item[href="signin.html"]');
  const joinBtn = document.querySelector('.btn__item[href="join.html"]');
  const burgerSignInBtn = document.querySelector('.burger-btn[href="signin.html"]');
  const burgerJoinBtn = document.querySelector('.burger-btn[href="join.html"]');

  if (currentUser) {
    // Пользователь авторизован - показываем информацию о пользователе и кнопку выхода
    if (signInBtn && joinBtn) {
      signInBtn.textContent = `Привет, ${currentUser.firstName}!`;
      signInBtn.href = "#";
      signInBtn.onclick = function(e) {
        e.preventDefault();
        showUserMenu();
      };
      
      joinBtn.textContent = "Выйти";
      joinBtn.href = "#";
      joinBtn.onclick = function(e) {
        e.preventDefault();
        logout();
      };
    }

    if (burgerSignInBtn && burgerJoinBtn) {
      burgerSignInBtn.textContent = `Привет, ${currentUser.firstName}!`;
      burgerSignInBtn.href = "#";
      burgerSignInBtn.onclick = function(e) {
        e.preventDefault();
        showUserMenu();
      };
      
      burgerJoinBtn.textContent = "Выйти";
      burgerJoinBtn.href = "#";
      burgerJoinBtn.onclick = function(e) {
        e.preventDefault();
        logout();
      };
    }
  } else {
    // Пользователь не авторизован - показываем стандартные кнопки
    if (signInBtn && joinBtn) {
      signInBtn.textContent = "Sign in";
      signInBtn.href = "signin.html";
      signInBtn.onclick = null;
      
      joinBtn.textContent = "Join now";
      joinBtn.href = "join.html";
      joinBtn.onclick = null;
    }

    if (burgerSignInBtn && burgerJoinBtn) {
      burgerSignInBtn.textContent = "Sign in";
      burgerSignInBtn.href = "signin.html";
      burgerSignInBtn.onclick = null;
      
      burgerJoinBtn.textContent = "Join now";
      burgerJoinBtn.href = "join.html";
      burgerJoinBtn.onclick = null;
    }
  }
}

// Функция для показа меню пользователя
function showUserMenu() {
  const currentUser = checkAuthStatus();
  if (!currentUser) return;

  // Перенаправляем на страницу профиля
  window.location.href = "profile.html";
}

// Обработка бургер-меню
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenuIcon = document.querySelector(".burger-menu-icon");
  const burgerMenu = document.querySelector(".burger__menu");
  const burgerClose = document.querySelector(".burger-close");

  if (burgerMenuIcon) {
    burgerMenuIcon.addEventListener("click", function () {
      burgerMenu.classList.add("active");
    });
  }

  if (burgerClose) {
    burgerClose.addEventListener("click", function () {
      burgerMenu.classList.remove("active");
    });
  }

  // Закрытие бургер-меню при клике вне его
  document.addEventListener("click", function (e) {
    if (!burgerMenu.contains(e.target) && !burgerMenuIcon.contains(e.target)) {
      burgerMenu.classList.remove("active");
    }
  });

  // Обновляем интерфейс авторизации
  updateAuthUI();
});

// Экспортируем функции для использования в других файлах
window.checkAuthStatus = checkAuthStatus;
window.logout = logout;
window.updateAuthUI = updateAuthUI;
window.showUserMenu = showUserMenu;
