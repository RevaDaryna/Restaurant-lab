const regForm = document.getElementById("registerForm");

regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(regForm);
  const user = {
    email: data.get("email"),
    password: data.get("password"),
    surname: data.get("surname"),
    name: data.get("name"),
    fathername: data.get("fathername"),
    birthdate: data.get("birthdate"),
    group: data.get("group"),
  };

  // отримуємо масив користувачів з localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // перевірка чи email вже зареєстрований
  if (users.some((u) => u.email === user.email)) {
    alert("Користувач з таким email вже існує!");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Реєстрація успішна!");
  window.location.href = "login.html";
});
