// DARK MODE

const toggleBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
});


// NAVBAR AU SCROLL

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});


// RETOUR EN HAUT

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// FADE IN

const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});

// COMPTEURS ANIMÉS

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const updateCounter = () => {

                const increment = target / 100;

                if (count < target) {

                    count += increment;
                    counter.textContent = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;
                }
            };

            updateCounter();

            counterObserver.unobserve(counter);
        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});
// FILTRAGE DES FREELANCES

const filterButtons = document.querySelectorAll(".filter-btn");
const freelancerCards = document.querySelectorAll(".freelance-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        freelancerCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});
//  VALIDATION FORMULAIRE CONTACT

const form = document.querySelector("form");

if (form) {

    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        let valide = true;

        document.getElementById("nomError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("messageError").textContent = "";

        if (nom.value.trim() === "") {
            document.getElementById("nomError").textContent =
                "Le nom est obligatoire";
            valide = false;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value)) {
            document.getElementById("emailError").textContent =
                "Email invalide";
            valide = false;
        }

        if (message.value.trim().length < 20) {
            document.getElementById("messageError").textContent =
                "Le message doit contenir au moins 20 caractères";
            valide = false;
        }

        if (valide) {
            alert("Message envoyé avec succès !");
            form.reset();
        }

    });

}