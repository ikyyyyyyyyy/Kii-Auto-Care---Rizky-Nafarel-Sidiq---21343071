const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOptions = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOptions,
});

ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOptions,
  delay: 500,
});

// service container
ScrollReveal().reveal(".service__card", {
  ...scrollRevealOptions,
  interval: 500,
});

// price container
ScrollReveal().reveal(".price__card", {
  ...scrollRevealOptions,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});

// Feedback Form 
document.getElementById('feedbackForm').addEventListener('submit', function (event, validateTelepon) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const telepon = document.getElementById('telepon').value;
  const feedbackMessage = document.getElementById('feedbackMessage').value;

  function validateTelepon(telepon) {
    // Format telepon yang diizinkan: 08xxxxxxxxxx atau 08xx-xxxx-xxxx atau 08xx.xxx.xxxx
    const teleponRegex = /^08\d{9,}$/;
    return teleponRegex.test(telepon);
  }

  if (!validateTelepon(telepon)) {
    if (confirm('Format telepon tidak valid')) {
      document.getElementById('telepon').focus();
    }
    return;
  }

  if (!feedbackMessage || feedbackMessage.length < 20) {
    if (confirm('Pesan wajib diisi minimal 20 karakter')) {
      document.getElementById('feedbackMessage').focus();
    }
    return;
  }

   // If validation passes, show success message
   alert('Feedback anda berhasil disimpan');
   this.reset();

   // Redirect to the dashboard page (replace 'dashboard.html' with your actual dashboard page)
   window.location.href = 'index.html';
 });
 

  