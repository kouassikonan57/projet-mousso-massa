// PRELOADER - Gestion de l'écran de chargement
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Délai minimum d'affichage du preloader (2 secondes)
    setTimeout(function() {
        // Ajoute la classe fade-out pour l'animation de disparition
        preloader.classList.add('fade-out');
        
        // Supprime complètement le preloader après l'animation
        setTimeout(function() {
            preloader.style.display = 'none';
            
            // Une fois le preloader caché, initialise les autres fonctionnalités
            initializeSite();
        }, 500); // Correspond à la durée de la transition CSS
    }, 2000); // 2 secondes d'affichage minimum
});

// Fonction pour initialiser le site après le preloader
function initializeSite() {
    console.log("Site chargé et initialisé");
    
    // Mobile menu toggle
    const mobileBtn = document.getElementById("mobileBtn");
    const mobilePanel = document.getElementById("mobilePanel");

    mobileBtn.addEventListener("click", () => {
        mobilePanel.style.display = mobilePanel.style.display === "block" ? "none" : "block";
    });

    // Modal handling
    const openRegister = document.getElementById("openRegister");
    const openRegister1 = document.getElementById("openRegister-1");
    const openRegister2 = document.getElementById("openRegister-2");
    const openRegisterMobile = document.getElementById("openRegisterMobile");
    const ctaRegister = document.getElementById("ctaRegister");
    const registerModal = document.getElementById("registerModal");
    const closeModal = document.getElementById("closeModal");
    const cancelRegister = document.getElementById("cancelRegister");

    const openRegisterBtns = [openRegister, openRegisterMobile, ctaRegister, openRegister1, openRegister2];

    openRegisterBtns.forEach((btn) => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                registerModal.classList.add("show");
                document.body.style.overflow = "hidden";
            });
        }
    });

    [closeModal, cancelRegister].forEach((btn) => {
        if (btn) {
            btn.addEventListener("click", () => {
                registerModal.classList.remove("show");
                document.body.style.overflow = "";
            });
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            
            // Skip for buttons that open modal
            if (href === "#registerModal") return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            mobilePanel.style.display = "none";
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Back to top button
    const toTop = document.getElementById("toTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            toTop.style.display = "flex";
        } else {
            toTop.style.display = "none";
        }
    });

    toTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
    });

    // Escape key to close modal and mobile menu
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            registerModal.classList.remove("show");
            document.body.style.overflow = "";
            mobilePanel.style.display = "none";
        }
    });

    // Click outside modal to close
    registerModal.addEventListener("click", (e) => {
        if (e.target === registerModal || e.target.classList.contains("modal-overlay")) {
            registerModal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    // Info button functionality
    const moreDonInfo = document.getElementById("moreDonInfo");
    if (moreDonInfo) {
        moreDonInfo.addEventListener("click", () => {
            alert("Pour plus d'informations sur le CNTS et les conditions de don, contactez le Centre National de Transfusion Sanguine au +225 XX XX XX XX ou visitez leur site web.");
        });
    }

    // Initialize all sections as not visible on load
    // Check if any sections are already in view
    document.querySelectorAll("section").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            section.classList.add("visible");
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate positions if needed
        }, 250);
    });
}