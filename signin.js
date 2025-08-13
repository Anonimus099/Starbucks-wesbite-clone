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

// Обработка отправки формы
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-container");
  const signInBtn = document.querySelector(".btn");

  signInBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const username = document.querySelector('input[type="text"]').value;
    const password = document.getElementById("password").value;

    // Простая валидация
    if (!username || !password) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Здесь можно добавить логику отправки данных на сервер
    console.log("Попытка входа:", { username, password });

    // Имитация успешного входа
    alert("Добро пожаловать!");

    // Перенаправление на главную страницу
    window.location.href = "index.html";
  });

  // Обработка кнопки "Join now"
  const joinBtn = document.querySelector(".join-btn");
  joinBtn.addEventListener("click", function () {
    // Здесь можно добавить логику для регистрации
    alert("Функция регистрации будет доступна в ближайшее время!");
  });

  // Обработка Enter в полях ввода
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        signInBtn.click();
      }
    });
  });
});
