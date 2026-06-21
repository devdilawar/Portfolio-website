/* ==========================================
   PORTFOLIO JAVASCRIPT
   Muhammad Dilawar Portfolio
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initTheme();
    initTypingEffect();
    initMobileMenu();
    initScrollReveal();
    initProgressBars();
    initActiveNavLinks();
    initBackToTop();
    initContactForm();
    initCurrentYear();

});

/* ==========================================
   LOADER
========================================== */

function initLoader() {

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1200);

    });
}

/* ==========================================
   DARK / LIGHT MODE
========================================== */

function initTheme() {

    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

    }

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("dark-mode");

        const isDark =
            body.classList.contains("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        themeToggle.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

    });

}

/* ==========================================
   TYPING EFFECT
========================================== */

function initTypingEffect() {

    const typingElement =
        document.getElementById("typingText");

    if (!typingElement) return;

    const roles = [
        "Frontend Developer",
        "Web Developer",
        "Software Engineering Student"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const currentRole =
            roles[roleIndex];

        if (!deleting) {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;

            if (charIndex === currentRole.length) {

                deleting = true;

                setTimeout(type, 1800);

                return;
            }

        } else {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {

                    roleIndex = 0;
                }
            }
        }

        setTimeout(
            type,
            deleting ? 50 : 100
        );
    }

    type();
}

/* ==========================================
   MOBILE MENU
========================================== */

function initMobileMenu() {

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

        });

    });
}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                });

            },

            {
                threshold: 0.15
            }
        );

    revealElements.forEach(element => {

        observer.observe(element);

    });
}

/* ==========================================
   SKILL PROGRESS BARS
========================================== */

function initProgressBars() {

    const progressBars =
        document.querySelectorAll(".progress");

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const progress =
                            entry.target;

                        const width =
                            progress.dataset.width;

                        progress.style.width =
                            width + "%";

                        observer.unobserve(
                            progress
                        );
                    }
                });

            },

            {
                threshold: 0.5
            }
        );

    progressBars.forEach(bar => {

        observer.observe(bar);

    });
}

/* ==========================================
   ACTIVE NAV LINKS
========================================== */

function initActiveNavLinks() {

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.clientHeight;

            if (
                pageYOffset >= sectionTop &&
                pageYOffset <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");
            }
        });
    });
}

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {

            button.style.display = "flex";

        } else {

            button.style.display = "none";
        }
    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================
   CONTACT FORM VALIDATION
========================================== */

function initContactForm() {

    const form =
        document.getElementById("contactForm");

    if (!form) return;

    const successMessage =
        document.getElementById(
            "successMessage"
        );

    form.addEventListener("submit", e => {

        e.preventDefault();

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");

        let isValid = true;

        clearErrors();

        if (
            name.value.trim().length < 3
        ) {

            showError(
                name,
                "Name must be at least 3 characters."
            );

            isValid = false;
        }

        if (
            !validateEmail(
                email.value.trim()
            )
        ) {

            showError(
                email,
                "Enter a valid email address."
            );

            isValid = false;
        }

        if (
            subject.value.trim().length < 3
        ) {

            showError(
                subject,
                "Subject is required."
            );

            isValid = false;
        }

        if (
            message.value.trim().length < 10
        ) {

            showError(
                message,
                "Message must be at least 10 characters."
            );

            isValid = false;
        }

        if (isValid) {

            successMessage.textContent =
                "Message submitted successfully! (Frontend demo only)";

            form.reset();

            setTimeout(() => {

                successMessage.textContent = "";

            }, 5000);
        }
    });
}

/* ==========================================
   EMAIL VALIDATION
========================================== */

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}

/* ==========================================
   SHOW ERROR
========================================== */

function showError(input, message) {

    const errorElement =
        input.nextElementSibling;

    if (errorElement) {

        errorElement.textContent = message;
    }

    input.style.borderColor = "red";
}

/* ==========================================
   CLEAR ERRORS
========================================== */

function clearErrors() {

    const errors =
        document.querySelectorAll(".error");

    errors.forEach(error => {

        error.textContent = "";
    });

    document
        .querySelectorAll(
            "input, textarea"
        )
        .forEach(field => {

            field.style.borderColor = "";
        });
}

/* ==========================================
   DYNAMIC YEAR
========================================== */

function initCurrentYear() {

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();
    }
}

/* ==========================================
   SMOOTH SCROLL OFFSET
========================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (e) {

                const target =
                    document.querySelector(
                        this.getAttribute(
                            "href"
                        )
                    );

                if (!target) return;

                e.preventDefault();

                const navbarHeight = 80;

                const targetPosition =
                    target.offsetTop -
                    navbarHeight;

                window.scrollTo({

                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        );
    });

/* ==========================================
   REDUCED MOTION SUPPORT
========================================== */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";
}