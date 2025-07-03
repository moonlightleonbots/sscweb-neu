// Mobile Menu Management
class MobileMenu {
  constructor() {
    this.isOpen = false
    this.init()
  }

  init() {
    const toggle = document.getElementById("mobile-menu-toggle")
    const menu = document.getElementById("mobile-menu")

    if (toggle && menu) {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation()
        this.toggle()
      })

      document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          this.close()
        }
      })

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.close()
        }
      })
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    const menu = document.getElementById("mobile-menu")
    if (menu) {
      menu.classList.remove("hidden")
      menu.classList.add("show")
      this.isOpen = true
    }
  }

  close() {
    const menu = document.getElementById("mobile-menu")
    if (menu) {
      menu.classList.add("hidden")
      menu.classList.remove("show")
      this.isOpen = false
    }
  }
}

// Animation Observer
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })
    this.init()
  }

  init() {
    this.observeElements()
  }

  observeElements() {
    const elements = document.querySelectorAll(".gaming-card, .feature-card, .hero-section, .section")
    elements.forEach((el) => this.observer.observe(el))
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "slide-up 0.8s ease forwards"
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// Smooth Scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Form Validation
class FormValidator {
  static validate(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "var(--neon-red)"
        input.style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.5)"
        isValid = false
      } else {
        input.style.borderColor = "var(--border-color)"
        input.style.boxShadow = "none"
      }
    })

    return isValid
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-${type === "success" ? "check" : type === "error" ? "times" : "info"}-circle"></i>
      <span>${message}</span>
    </div>
  `

  document.body.appendChild(notification)

  setTimeout(() => notification.classList.add("show"), 100)
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Gaming effects
function addGamingEffects() {
  const cards = document.querySelectorAll(".gaming-card, .feature-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
    card.addEventListener("mouseenter", () => {
      card.style.animation = "float 2s ease-in-out infinite"
    })
    card.addEventListener("mouseleave", () => {
      card.style.animation = "none"
    })
  })

  const buttons = document.querySelectorAll(".neon-btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.animation = "glow-pulse 1s ease-in-out infinite"
    })
    button.addEventListener("mouseleave", () => {
      button.style.animation = "none"
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.mobileMenu = new MobileMenu()
  window.animationObserver = new AnimationObserver()

  setupSmoothScrolling()

  // Contact form handler
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      if (FormValidator.validate(this)) {
        showNotification("Nachricht wurde gesendet! Wir melden uns bald bei dir.", "success")
        this.reset()
      } else {
        showNotification("Bitte fülle alle Pflichtfelder aus.", "error")
      }
    })
  }

  document.body.classList.add("loaded")
  addGamingEffects()
})
