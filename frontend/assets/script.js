
document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll Animation for Navbar Links
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth",
                });
            }
        });
    });

    // Button Hover Animation
    document.querySelectorAll(".btn-primary").forEach((button) => {
        button.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.1)";
        });
        button.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });

    // Login Page Animation
    if (document.querySelector(".form-container")) {
        document.querySelector(".form-container").style.animation = "fadeInUp 1s ease-in-out";
    }
});
