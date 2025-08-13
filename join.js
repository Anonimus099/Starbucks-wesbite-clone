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

// Функция валидации пароля
function validatePassword(password) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Обновляем визуальные индикаторы
  document.getElementById("length-check").className = checks.length
    ? "valid"
    : "invalid";
  document.getElementById("uppercase-check").className = checks.uppercase
    ? "valid"
    : "invalid";
  document.getElementById("lowercase-check").className = checks.lowercase
    ? "valid"
    : "invalid";
  document.getElementById("number-check").className = checks.number
    ? "valid"
    : "invalid";
  document.getElementById("special-check").className = checks.special
    ? "valid"
    : "invalid";

  return Object.values(checks).every((check) => check);
}

// Функция валидации email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

// Обработка отправки формы регистрации
document.addEventListener("DOMContentLoaded", function () {
  console.log("Join.js загружен");

  // Проверяем, не авторизован ли уже пользователь
  const currentUser = checkAuthStatus();
  if (currentUser) {
    alert(`Вы уже авторизованы как ${currentUser.firstName} ${currentUser.lastName}`);
    window.location.href = "index.html";
    return;
  }

  const form = document.querySelector(".form-container");
  const joinBtn = document.getElementById("join-btn");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");

  console.log("Кнопка Join найдена:", joinBtn);

  // Валидация пароля в реальном времени
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      validatePassword(this.value);
    });
  }

  // Валидация email в реальном времени
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = "#d62b1f";
        this.setCustomValidity("Пожалуйста, введите корректный email адрес");
      } else {
        this.style.borderColor = "#e9ecef";
        this.setCustomValidity("");
      }
    });
  }

  if (joinBtn) {
    joinBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const terms = document.getElementById("terms").checked;
      const marketing = document.getElementById("marketing").checked;

      // Валидация всех полей
      let isValid = true;
      let errorMessage = "";

      if (!firstName) {
        errorMessage += "• Имя обязательно для заполнения\n";
        isValid = false;
      } else if (firstName.length < 2) {
        errorMessage += "• Имя должно содержать минимум 2 символа\n";
        isValid = false;
      }

      if (!lastName) {
        errorMessage += "• Фамилия обязательна для заполнения\n";
        isValid = false;
      } else if (lastName.length < 2) {
        errorMessage += "• Фамилия должна содержать минимум 2 символа\n";
        isValid = false;
      }

      if (!email) {
        errorMessage += "• Email обязателен для заполнения\n";
        isValid = false;
      } else if (!validateEmail(email)) {
        errorMessage += "• Пожалуйста, введите корректный email адрес\n";
        isValid = false;
      }

      if (!password) {
        errorMessage += "• Пароль обязателен для заполнения\n";
        isValid = false;
      } else if (!validatePassword(password)) {
        errorMessage += "• Пароль не соответствует требованиям безопасности\n";
        isValid = false;
      }

      if (!terms) {
        errorMessage += "• Необходимо согласиться с условиями использования\n";
        isValid = false;
      }

      if (!isValid) {
        alert("Пожалуйста, исправьте следующие ошибки:\n\n" + errorMessage);
        return;
      }

      // Проверяем, не существует ли уже пользователь с таким email
      const existingUsers = JSON.parse(
        localStorage.getItem("starbucksUsers") || "[]"
      );
      const userExists = existingUsers.find((user) => user.email === email);

      if (userExists) {
        alert(
          "Пользователь с таким email уже существует! Пожалуйста, используйте другой email или войдите в систему."
        );
        return;
      }

      // Сохраняем данные пользователя в localStorage
      const newUser = {
        firstName,
        lastName,
        email,
        password, // В реальном проекте пароль должен быть зашифрован
        terms,
        marketing,
        createdAt: new Date().toISOString(),
      };

      existingUsers.push(newUser);
      localStorage.setItem("starbucksUsers", JSON.stringify(existingUsers));

      console.log("Пользователь зарегистрирован:", {
        firstName,
        lastName,
        email,
        password: "***",
        terms,
        marketing,
      });

      // Автоматически авторизуем пользователя после регистрации
      const userData = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        loginTime: new Date().toISOString(),
        keepSignedIn: true
      };
      
      localStorage.setItem("currentUser", JSON.stringify(userData));

      // Имитация успешной регистрации
      alert("Аккаунт успешно создан! Добро пожаловать в Starbucks Rewards!");

      // Перенаправление на главную страницу
      window.location.href = "index.html";
    });
  }

  // Обработка Enter в полях ввода
  const inputs = document.querySelectorAll(
    '.form-container input[type="text"], .form-container input[type="email"], .form-container input[type="password"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (joinBtn) {
          joinBtn.click();
        }
      }
    });
  });

  // Обработка чекбоксов
  const checkboxes = document.querySelectorAll(
    '.form-container input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.id === "terms" && !this.checked) {
        this.setCustomValidity(
          "Необходимо согласиться с условиями использования"
        );
      } else {
        this.setCustomValidity("");
      }
    });
  });

  // Обработка ссылки "Sign in"
  const signinLink = document.querySelector(".signin-link");
  if (signinLink) {
    signinLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "signin.html";
    });
  }
});
