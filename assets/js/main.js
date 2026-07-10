const scrollHeader = () => {
  const header = document.getElementById("header");
  window.scrollY >= 50 ? header.classList.add("scroll-header") : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalClose = document.querySelectorAll(".services__modal-close");

modalViews.forEach((modal) => document.body.appendChild(modal));

const closeServicesModals = () => {
  modalViews.forEach((modal) => modal.classList.remove("active-modal"));
  document.body.classList.remove("modal-open");
};

modalBtns.forEach((button, index) => {
  button.addEventListener("click", () => {
    closeServicesModals();
    modalViews[index].classList.add("active-modal");
    document.body.classList.add("modal-open");
  });
});

modalClose.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    closeServicesModals();
  });
});

modalViews.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeServicesModals();
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeServicesModals();
});

if (window.mixitup) {
  mixitup(".work__container", {
    selectors: { target: ".work__card" },
    animation: { duration: 300 }
  });
}

const linkWork = document.querySelectorAll(".work__item");
function activeWork() {
  linkWork.forEach((item) => item.classList.remove("active-work"));
  this.classList.add("active-work");
}
linkWork.forEach((item) => item.addEventListener("click", activeWork));

const sections = document.querySelectorAll("section[id]");
const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (!navLink) return;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](lightTheme);
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 1500,
    delay: 250
  });

  sr.reveal(".home__data");
  sr.reveal(".home__handle", { delay: 500 });
  sr.reveal(".home__social, .home__scroll", { delay: 700, origin: "bottom" });
  sr.reveal(".about__img, .skills__content, .services__card, .work__card, .contact__card", { interval: 100 });
}

const subtitle = document.querySelector(".home__education");
const title = document.querySelector(".home__name");
const background = document.querySelector(".home__background");
const words = [
  "AI Engineer",
  "Generative AI Engineer",
  "ML Engineer",
  "AI Solutions Engineer",
  "Applied AI Engineer"
];
let index = 0;

function changeSubtitle() {
  subtitle.textContent = words[index];
  index += 1;

  if (index === words.length) {
    setTimeout(() => {
      title.classList.remove("grow");
      subtitle.classList.remove("grow");
      background.classList.remove("blur");
    }, 800);
  }


}

background.classList.add("blur");
setTimeout(() => {
  title.classList.add("grow");
  subtitle.classList.add("grow");
}, 700);
const interval = setInterval(changeSubtitle, 1000);
