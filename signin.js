// Функция для переключения видимости пароля
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleButton = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "👁";
  }
}

// Функция для проверки авторизации
function checkAuthStatus() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    console.log("Пользователь уже авторизован:", user.firstName);
    return user;
  }
  return null;
}

// Функция для выхода из системы
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "signin.html";
}

// Обработка отправки формы
document.addEventListener("DOMContentLoaded", function () {
  // Проверяем, не авторизован ли уже пользователь
  const currentUser = checkAuthStatus();
  if (currentUser) {
    alert(
      `Вы уже авторизованы как ${currentUser.firstName} ${currentUser.lastName}`
    );
    window.location.href = "index.html";
    return;
  }

  const form = document.querySelector(".form-container");
  const signInBtn = document.querySelector(".btn");

  signInBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const keepSignedIn = document.getElementById("keep-signed-in").checked;

    // Простая валидация
    if (!email || !password) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Проверяем формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Пожалуйста, введите корректный email адрес");
      return;
    }

    // Проверяем данные пользователя в localStorage
    const existingUsers = JSON.parse(
      localStorage.getItem("starbucksUsers") || "[]"
    );
    const user = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Сохраняем информацию о текущем пользователе
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        loginTime: new Date().toISOString(),
        keepSignedIn: keepSignedIn,
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));

      console.log("Успешный вход:", {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        keepSignedIn: keepSignedIn,
      });

      alert(`Добро пожаловать, ${user.firstName} ${user.lastName}!`);

      // Перенаправление на главную страницу
      window.location.href = "index.html";
    } else {
      // Проверяем, существует ли пользователь с таким email
      const userExists = existingUsers.find((user) => user.email === email);
      if (userExists) {
        alert("Неверный пароль. Пожалуйста, проверьте введенный пароль.");
      } else {
        alert(
          "Пользователь с таким email не найден. Пожалуйста, зарегистрируйтесь."
        );
      }
    }
  });

  // Обработка кнопки "Join now"
  const joinBtn = document.querySelector(".join-btn");
  if (joinBtn) {
    joinBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "join.html";
    });
  }

  // Обработка Enter в полях ввода
  const inputs = document.querySelectorAll(
    'input[type="email"], input[type="password"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        signInBtn.click();
      }
    });
  });

  // Обработка ссылок "Forgot password" и "Forgot username"
  const forgotLinks = document.querySelectorAll(".links a");
  forgotLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Функция восстановления пароля будет доступна в ближайшее время!");
    });
  });
});
