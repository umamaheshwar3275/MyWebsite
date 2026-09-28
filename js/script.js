/*
  Edit this file to personalize the site.

  SITE_NAME          Your name, shown in the header and footer.
  SITE_DESCRIPTION   The summary used for search results and link previews.
  CONTACT_EMAIL      Inbox that receives the on-page contact form.
  PROFILE_IMAGE      Your photo. Example: "images/profile/profile.jpg"
  PROFILE_ALT        Describe the photo for screen readers.
  SOCIAL_LINKS       Paste a full https URL to show a link. Leave "" to hide it.

  Also search index.html for "B Umamaheswara Rao" and "kittu.digital.appswork@gmail.com"
  so the page is correct even before JavaScript runs.
*/

const SITE_NAME = "B Umamaheswara Rao";

const SITE_DESCRIPTION = "B Umamaheswara Rao, Android developer with 14+ years of experience. I build mobile apps and professional websites for businesses, startups, and individuals.";

const CONTACT_EMAIL = "kittu.digital.appswork@gmail.com";

const PROFILE_IMAGE = "images/profile/profile-placeholder.svg";

const PROFILE_ALT = "Portrait placeholder";

const SOCIAL_LINKS = {
  linkedin: "",
  github: "",
  googlePlay: ""
};

/*
  Replace these sample projects with your real apps before you share the site.

  Example:
  {
    name: "My App",
    description: "Short description of what the app does.",
    image: "images/apps/my-app.png",
    imageType: "screenshot",
    technologies: ["Kotlin", "Android"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.example.app",
    detailsUrl: ""
  }

  Leave playStoreUrl or detailsUrl as "" to hide that button.
  imageType is optional: "icon" (default) or "screenshot".
*/

const projects = [
  {
    name: "Field Service Tracker",
    description: "Schedules field visits, updates job status, and keeps a team aligned through the workday.",
    image: "images/apps/field-service.svg",
    technologies: ["Kotlin", "Android"],
    playStoreUrl: "",
    detailsUrl: ""
  },
  {
    name: "Shop Inventory",
    description: "Records stock for a small shop, checks product counts, and highlights items to reorder.",
    image: "images/apps/shop-inventory.svg",
    technologies: ["Java", "Android"],
    playStoreUrl: "",
    detailsUrl: ""
  },
  {
    name: "Clinic Appointments",
    description: "Books clinic appointments, shows the daily schedule, and sends simple visit reminders.",
    image: "images/apps/clinic-appointments.svg",
    technologies: ["Kotlin", "Android", "Jetpack"],
    playStoreUrl: "",
    detailsUrl: ""
  },
  {
    name: "Delivery Updates",
    description: "Shares delivery status with customers and lets a driver mark each stop complete.",
    image: "images/apps/delivery-updates.svg",
    technologies: ["Kotlin", "Java"],
    playStoreUrl: "",
    detailsUrl: ""
  },
  {
    name: "Expense Ledger",
    description: "Records daily expenses, groups them by category, and shows a monthly total.",
    image: "images/apps/expense-ledger.svg",
    technologies: ["Kotlin", "Android"],
    playStoreUrl: "",
    detailsUrl: ""
  },
  {
    name: "Community Board",
    description: "Posts local notices, events, and announcements for a neighborhood group.",
    image: "images/apps/community-board.svg",
    technologies: ["Java", "Android"],
    playStoreUrl: "",
    detailsUrl: ""
  }
];

const desktopQuery = window.matchMedia("(min-width: 48rem)");

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined && text !== null) {
    element.textContent = text;
  }
  return element;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSafeUrl(url) {
  if (typeof url !== "string") {
    return false;
  }

  const value = url.trim();
  if (value === "" || /^(javascript|data):/i.test(value)) {
    return false;
  }

  if (value.startsWith("#") || value.startsWith("/") || value.startsWith("./") || value.startsWith("../")) {
    return true;
  }

  if (/^https?:\/\//i.test(value)) {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  return /^[a-z0-9._~/-]+$/i.test(value);
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url.trim());
}

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return parts.slice(0, 3).map(function (part) {
    return part[0];
  }).join("").toUpperCase();
}

function setMetaContent(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", value);
  }
}

function applySiteDetails() {
  const name = SITE_NAME.trim();
  const description = SITE_DESCRIPTION.trim();
  const pageTitle = name + " | App Developer & Business Website Developer";

  if (name) {
    document.querySelectorAll(".js-site-name").forEach(function (element) {
      element.textContent = name;
    });
    setMetaContent('meta[name="author"]', name);
  }

  if (description) {
    setMetaContent("#site-description", description);
    setMetaContent("#og-description", description);
  }

  document.title = pageTitle;
  setMetaContent("#og-title", pageTitle);

  const profileImage = document.querySelector("#profile-image");
  if (profileImage) {
    const altText = PROFILE_ALT.trim() || "Profile photo";
    profileImage.alt = altText;

    function showProfileFallback() {
      if (!profileImage.isConnected) {
        return;
      }
      const fallback = createElement("div", "profile-photo__fallback", initialsFromName(name || "Profile"));
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", altText);
      profileImage.replaceWith(fallback);
    }

    profileImage.addEventListener("error", showProfileFallback);
    const nextPhoto = PROFILE_IMAGE.trim();
    if (nextPhoto && profileImage.getAttribute("src") !== nextPhoto) {
      profileImage.src = nextPhoto;
    } else if (profileImage.complete && profileImage.naturalWidth === 0) {
      showProfileFallback();
    }
  }

  const logoMark = document.querySelector(".logo__mark");
  if (logoMark) {
    logoMark.addEventListener("error", function () {
      logoMark.hidden = true;
    });
    if (logoMark.complete && logoMark.naturalWidth === 0) {
      logoMark.hidden = true;
    }
  }
}

function setFooterYear() {
  const yearElement = document.querySelector("#year");
  if (!yearElement) {
    return;
  }
  const year = String(new Date().getFullYear());
  yearElement.textContent = year;
  yearElement.setAttribute("datetime", year);
}

function setupContact() {
  const email = CONTACT_EMAIL.trim();
  const form = document.querySelector("#contact-form");
  const socialContainer = document.querySelector("#social-links");

  if (form) {
    form.action = "https://formsubmit.co/" + email;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sendContactForm(form, email);
    });
  }

  if (!socialContainer) {
    return;
  }

  const items = [
    { label: "LinkedIn", url: SOCIAL_LINKS.linkedin },
    { label: "GitHub", url: SOCIAL_LINKS.github },
    { label: "Google Play", url: SOCIAL_LINKS.googlePlay }
  ];

  items.forEach(function (item) {
    const url = typeof item.url === "string" ? item.url.trim() : "";
    if (!isSafeUrl(url) || !isExternalUrl(url)) {
      return;
    }

    const link = createElement("a", "", item.label);
    link.href = url;
    if (isExternalUrl(url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.append(createElement("span", "visually-hidden", " (opens in a new tab)"));
    }
    socialContainer.append(link);
  });

  if (socialContainer.childElementCount > 0) {
    socialContainer.hidden = false;
  }
}

function sendContactForm(form, email) {
  const status = document.querySelector("#form-status");
  const submitButton = form.querySelector("button[type='submit']");
  const honey = form.querySelector("input[name='_honey']");

  if (honey && honey.value.trim() !== "") {
    return;
  }

  if (!isValidEmail(email)) {
    setFormStatus(status, "Add your email address in js/script.js.", "error");
    return;
  }

  if (!form.reportValidity()) {
    return;
  }

  const payload = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    service: form.elements.service.value,
    message: form.elements.message.value.trim(),
    _subject: "New project inquiry from the website",
    _template: "table",
    _captcha: "false"
  };

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  setFormStatus(status, "", "");

  fetch("https://formsubmit.co/ajax/" + email, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then(function (data) {
      var accepted = data && (data.success === true || data.success === "true");
      if (!accepted) {
        var detail = data && data.message ? String(data.message) : "";
        if (/activat/i.test(detail)) {
          throw new Error("activation");
        }
        throw new Error("Request failed");
      }
      form.reset();
      setFormStatus(status, "Your message has been sent. I will reply by email.", "success");
    })
    .catch(function (error) {
      if (error && error.message === "activation") {
        setFormStatus(status, "The inbox needs a one-time confirmation before messages can arrive. Please try again after that email is confirmed.", "error");
        return;
      }
      setFormStatus(status, "The message could not be sent. Please try again in a moment.", "error");
    })
    .finally(function () {
      submitButton.disabled = false;
      submitButton.textContent = "Send message";
    });
}

function setFormStatus(status, message, type) {
  if (!status) {
    return;
  }
  status.textContent = message;
  status.classList.remove("is-success", "is-error");
  if (type === "success") {
    status.classList.add("is-success");
  }
  if (type === "error") {
    status.classList.add("is-error");
  }
}

function createProjectImage(project) {
  const name = project.name;
  if (typeof project.image !== "string" || project.image.trim() === "") {
    return createProjectFallback(name);
  }

  const image = document.createElement("img");
  const isScreenshot = project.imageType === "screenshot";
  image.className = isScreenshot ? "is-screenshot" : "";
  image.alt = name + (isScreenshot ? " screenshot" : " icon");
  image.decoding = "async";
  image.loading = "lazy";
  image.addEventListener("error", function () {
    image.replaceWith(createProjectFallback(name));
  });
  image.src = project.image.trim();
  return image;
}

function createProjectFallback(name) {
  const fallback = createElement("div", "project-card__fallback", name.trim().charAt(0).toUpperCase() || "?");
  fallback.setAttribute("role", "img");
  fallback.setAttribute("aria-label", name + " icon");
  return fallback;
}

function createProjectLink(label, url) {
  const link = createElement("a", "btn btn--small btn--secondary", label);
  link.href = url;
  if (isExternalUrl(url)) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(createElement("span", "visually-hidden", " (opens in a new tab)"));
  }
  return link;
}

function renderProjects() {
  const projectList = document.querySelector("#project-list");
  if (!projectList) {
    return;
  }

  projectList.replaceChildren();

  if (!Array.isArray(projects) || projects.length === 0) {
    projectList.append(createElement("p", "empty-note", "Add your apps in the projects list inside js/script.js."));
    return;
  }

  projects.forEach(function (project) {
    const name = typeof project.name === "string" && project.name.trim() ? project.name.trim() : "Untitled project";
    const description = typeof project.description === "string" ? project.description.trim() : "";
    const card = createElement("article", "card project-card");
    const media = createElement("div", "project-card__media");
    const body = createElement("div", "project-card__body");

    media.append(createProjectImage(Object.assign({}, project, { name: name })));
    body.append(createElement("h3", "", name));

    if (description) {
      body.append(createElement("p", "", description));
    }

    if (Array.isArray(project.technologies) && project.technologies.length > 0) {
      const techList = createElement("ul", "tech-list");
      techList.setAttribute("aria-label", "Technologies");
      project.technologies.forEach(function (technology) {
        if (typeof technology === "string" && technology.trim()) {
          techList.append(createElement("li", "", technology.trim()));
        }
      });
      if (techList.childElementCount > 0) {
        body.append(techList);
      }
    }

    const actions = createElement("div", "project-card__actions");
    const playStoreUrl = typeof project.playStoreUrl === "string" ? project.playStoreUrl.trim() : "";
    const detailsUrl = typeof project.detailsUrl === "string" ? project.detailsUrl.trim() : "";

    if (isSafeUrl(playStoreUrl) && isExternalUrl(playStoreUrl)) {
      const playLink = createProjectLink("Google Play", playStoreUrl);
      playLink.classList.remove("btn--secondary");
      playLink.classList.add("btn--primary");
      actions.append(playLink);
    }

    if (isSafeUrl(detailsUrl)) {
      actions.append(createProjectLink("Details", detailsUrl));
    }

    if (actions.childElementCount > 0) {
      body.append(actions);
    }

    card.append(media, body);
    projectList.append(card);
  });
}

function setupNavigation() {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector("#site-nav");

  if (!header || !navToggle || !siteNav) {
    return;
  }

  function closeMenu() {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
    if (desktopQuery.matches) {
      siteNav.removeAttribute("aria-hidden");
    } else {
      siteNav.setAttribute("aria-hidden", "true");
    }
  }

  function openMenu() {
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    siteNav.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  }

  navToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    if (siteNav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  siteNav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  header.addEventListener("click", function (event) {
    if (event.target.closest(".logo")) {
      closeMenu();
    }
  });

  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeMenu();
      navToggle.focus();
    }
  });

  function syncNavForViewport() {
    closeMenu();
  }

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", syncNavForViewport);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(syncNavForViewport);
  }

  syncNavForViewport();
}

function setCurrentLink(id) {
  document.querySelectorAll(".site-nav a, .footer-nav a").forEach(function (link) {
    if (link.getAttribute("href") === "#" + id) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateCurrentSection() {
  const header = document.querySelector(".site-header");
  const marker = (header ? header.offsetHeight : 0) + 40;
  const navIds = ["home", "about", "projects", "services", "contact"];
  const page = document.documentElement;
  const canScroll = page.scrollHeight > window.innerHeight + 8;
  const nearBottom = canScroll && window.innerHeight + window.scrollY >= page.scrollHeight - 4;

  if (nearBottom) {
    setCurrentLink("contact");
    return;
  }

  let currentId = "home";
  document.querySelectorAll("main section[id]").forEach(function (section) {
    if (navIds.indexOf(section.id) !== -1 && section.getBoundingClientRect().top <= marker) {
      currentId = section.id;
    }
  });

  setCurrentLink(currentId);
}

function setupScrollEffects() {
  const header = document.querySelector(".site-header");
  let waiting = false;

  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    updateCurrentSection();
    waiting = false;
  }

  window.addEventListener("scroll", function () {
    if (waiting) {
      return;
    }
    waiting = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });

  window.addEventListener("hashchange", onScroll);
  window.addEventListener("load", onScroll);
  onScroll();
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(item) {
    item.classList.add("is-visible");
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(show);
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      show(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(function (item) {
    const rect = item.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (inView) {
      show(item);
    } else {
      observer.observe(item);
    }
  });

  document.addEventListener("focusin", function (event) {
    const section = event.target.closest(".reveal");
    if (section) {
      show(section);
    }
  });

  document.documentElement.classList.add("reveal-ready");
}

function init() {
  applySiteDetails();
  setFooterYear();
  setupContact();
  renderProjects();
  setupNavigation();
  setupScrollEffects();
  setupReveal();
}

init();
