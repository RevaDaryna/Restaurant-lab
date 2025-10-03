const ADMIN_PASSWORD = "superADMIN123"; // адмін пароль

const form = document.getElementById("loginForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const email = data.get("email").trim();
  const password = data.get("password").trim();
  const adminPass = data.get("adminPass").trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // шукаємо користувача
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Користувач не знайдений або невірний пароль!");
    return;
  }

  let role = "user";

  // якщо введено правильний адмін-пароль
  if (adminPass === ADMIN_PASSWORD) {
    role = "admin";
  }

  // зберігаємо авторизацію
  localStorage.setItem("auth_email", email);
  localStorage.setItem("auth_role", role);

  if (role === "admin") {
    localStorage.setItem("auth_message", "Вітаю, ви зайшли як адміністратор!");
  } else {
    localStorage.setItem("auth_message", "Вітаю, ви зайшли в акаунт!");
  }
  window.location.href = "index.html";
});
