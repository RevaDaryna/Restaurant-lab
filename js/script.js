// ===== Перемикання слайдів =====
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");
  let currentIndex = 0;

  function updateSlide() {
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(${-currentIndex * width}px)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length; // цикл вперед
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // цикл назад
    updateSlide();
  });

  window.addEventListener("resize", updateSlide);
  updateSlide();
});

// ===== МОДАЛЬНЕ ВІКНО ДЛЯ ПОВІДОМЛЕНЬ =====
function showModal(message) {
  const modal = document.getElementById("notifyModal");
  const text = document.getElementById("notifyText");
  if (!modal || !text) return;

  text.textContent = message;
  modal.classList.add("show");

  setTimeout(() => {
    modal.classList.remove("show");
  }, 2000);
}

// ===== АВТЕНТИФІКАЦІЯ (роль і стан користувача) =====
const role = localStorage.getItem("auth_role");
const email = localStorage.getItem("auth_email");

const navLinks = document.querySelector(".nav-links");
const navActions = document.querySelector(".nav-actions");
const menuToggle = document.querySelector(".menu-toggle");

// --- Додавання пункту меню "Admin Panel", якщо роль адмін
if (role === "admin" && navLinks && !navLinks.querySelector("#admin-link")) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "admin.html"; // або якір
  a.textContent = "Admin Panel";
  a.id = "admin-link";
  li.appendChild(a);
  navLinks.appendChild(li);
}

// --- Заміна Login/Register на кнопку "Вийти", якщо користувач увійшов
if (email && navActions) {
  navActions.innerHTML = `<button id="logoutBtn" class="btn">Вийти</button>`;
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("auth_email");
    localStorage.removeItem("auth_role");
    localStorage.setItem("auth_message", "Ви вийшли з акаунту");
    window.location.href = "index.html";
  });
}

// --- Відображення одноразового повідомлення після входу/виходу
const msg = localStorage.getItem("auth_message");
if (msg) {
  showModal(msg);
  localStorage.removeItem("auth_message");
}

// ===== МОБІЛЬНЕ МЕНЮ  =====
function closeMobileMenu() {
  navLinks?.classList.remove("open");
  navActions?.classList.remove("open");
  menuToggle?.classList.remove("is-open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  navLinks?.classList.toggle("open");
  navActions?.classList.toggle("open");
  menuToggle?.classList.toggle("is-open");
  if (menuToggle) {
    const expanded = menuToggle.classList.contains("is-open");
    menuToggle.setAttribute("aria-expanded", String(expanded));
  }
}

// --- Меню-іконка
if (menuToggle) {
  menuToggle.setAttribute("aria-label", "Toggle navigation");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("role", "button");
  menuToggle.addEventListener("click", toggleMobileMenu);
}

// --- Закриття мобільного меню при кліку по лінку
navLinks?.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.tagName === "A") {
    closeMobileMenu();
  }
});

// --- Закриття мобільного меню по ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});

// --- Скидання стану меню при ресайзі більше 780px
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMobileMenu();
});
