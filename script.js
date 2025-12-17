// PRELOADER - Gestion de l'écran de chargement
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  // Délai minimum d'affichage du preloader (2 secondes)
  setTimeout(function () {
    // Ajoute la classe fade-out pour l'animation de disparition
    preloader.classList.add("fade-out");

    // Supprime complètement le preloader après l'animation
    setTimeout(function () {
      preloader.style.display = "none";

      // Une fois le preloader caché, initialise les autres fonctionnalités
      initializeSite();
    }, 500); // Correspond à la durée de la transition CSS
  }, 2000); // 2 secondes d'affichage minimum
});

// Fonction pour initialiser le site après le preloader
function initializeSite() {
  console.log("Site chargé et initialisé");

  // Initialiser la galerie d'images
  initializeGallery();

  // Initialiser les nouvelles sections
  initializeNewSections();

  // Initialiser le slider hero
  initializeHeroSlider();

  // Initialiser la galerie du forum avec pagination
  initializeForumGallery();

  // Mobile menu toggle
  const mobileBtn = document.getElementById("mobileBtn");
  const mobilePanel = document.getElementById("mobilePanel");

  mobileBtn.addEventListener("click", () => {
    mobilePanel.style.display =
      mobilePanel.style.display === "block" ? "none" : "block";
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

  const openRegisterBtns = [
    openRegister,
    openRegisterMobile,
    ctaRegister,
    openRegister1,
    openRegister2,
  ];

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
      if (href === "#registerModal" || href === "#") return;

      e.preventDefault();

      // Close mobile menu if open
      mobilePanel.style.display = "none";

      const target = document.querySelector(href);
      if (target) {
        // Calculez la hauteur exacte du header
        const header = document.querySelector(".header");
        const headerHeight = header ? header.offsetHeight : 80;

        // Position avec offset pour la navbar fixe
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Mettre à jour l'URL sans déclencher un nouveau scroll
        history.pushState(null, null, href);
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
      behavior: "smooth",
    });
  });

  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -50px 0px",
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

      // Fermer aussi la galerie si ouverte
      const imageModal = document.querySelector(".image-modal.active");
      if (imageModal) {
        imageModal.classList.remove("active");
        document.body.style.overflow = "auto";
      }

      // Fermer aussi les modaux Lakota et Invitée si ouverts
      const lakotaModal = document.querySelector(".lakota-modal");
      if (lakotaModal) {
        lakotaModal.classList.remove("show");
        setTimeout(() => {
          if (lakotaModal.parentNode) {
            lakotaModal.remove();
          }
          document.body.style.overflow = "";
        }, 300);
      }

      const guestModal = document.querySelector(".guest-modal");
      if (guestModal) {
        guestModal.classList.remove("show");
        setTimeout(() => {
          if (guestModal.parentNode) {
            guestModal.remove();
          }
          document.body.style.overflow = "";
        }, 300);
      }
    }
  });

  // Click outside modal to close
  registerModal.addEventListener("click", (e) => {
    if (
      e.target === registerModal ||
      e.target.classList.contains("modal-overlay")
    ) {
      registerModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  // Info button functionality - MODIFIÉ POUR LES VIDÉOS
  const moreDonInfo = document.getElementById("moreDonInfo");
  if (moreDonInfo) {
    moreDonInfo.addEventListener("click", () => {
      // Rediriger vers la section galerie
      const galerieSection = document.getElementById("galerie");
      if (galerieSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = galerieSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
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

  // Ajouter la fonction updateFormType au formulaire principal
  const roleSelect = document.querySelector('select[name="role"]');
  if (roleSelect) {
    roleSelect.addEventListener("change", function () {
      updateFormType(this);
    });
  }
}

// FONCTION POUR LA GALERIE D'IMAGES - VERSION CORRIGÉE POUR QUALITÉ
function initializeGallery() {
  // Créer le modal pour images agrandies
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-image" src="" alt="" loading="lazy">
        <div class="modal-caption"></div>
    `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector(".modal-image");
  const modalCaption = modal.querySelector(".modal-caption");
  const closeModalBtn = modal.querySelector(".close-modal");

  // Fonction améliorée pour ouvrir l'image au clic
  function openImageWithQuality(src, alt, caption) {
    // Afficher un indicateur de chargement
    modalImg.style.opacity = "0.5";

    // Précharger l'image pour éviter le flou
    const preloadImg = new Image();
    preloadImg.onload = function () {
      // Une fois chargée, afficher l'image avec transition
      modalImg.src = src;
      modalImg.alt = alt;
      modalCaption.textContent = caption || alt;

      // Animation d'apparition
      setTimeout(() => {
        modalImg.style.opacity = "1";
      }, 50);
    };

    preloadImg.onerror = function () {
      // Fallback si l'image ne se charge pas
      modalImg.src = src;
      modalImg.alt = alt;
      modalCaption.textContent = caption || alt;
      modalImg.style.opacity = "1";
    };

    preloadImg.src = src;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Ouvrir l'image au clic - TOUTES les images
  document
    .querySelectorAll(
      "img.media-img, img.portrait-img, img.feature-img, img.cnts-img, img.thumbnail-img"
    )
    .forEach((img) => {
      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Empêcher le comportement par défaut si c'est un lien
        if (this.parentElement.tagName === "A") {
          e.preventDefault();
        }

        openImageWithQuality(this.src, this.alt, this.dataset.caption || "");
      });
    });

  // Également pour les images de la galerie forum
  document.addEventListener("click", function (e) {
    const img = e.target;
    if (
      img.classList &&
      img.classList.contains("media-img") &&
      !img.closest(".image-modal")
    ) {
      e.preventDefault();
      e.stopPropagation();
      openImageWithQuality(img.src, img.alt, img.dataset.caption || "");
    }
  });

  // Fermer le modal
  closeModalBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      e.preventDefault();
      e.stopPropagation();
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Fermer avec la touche Échap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      e.preventDefault();
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Gestion des vidéos
  const videos = document.querySelectorAll(".media-video");
  videos.forEach((video) => {
    const container = video.parentElement;
    const playIcon = container.querySelector(".video-icon");

    container.addEventListener("click", function (e) {
      e.preventDefault();
      video.play();
      video.controls = true;
      playIcon.style.display = "none";
    });

    video.addEventListener("pause", function () {
      if (!video.ended) {
        video.controls = false;
        playIcon.style.display = "flex";
      }
    });

    video.addEventListener("ended", function () {
      video.controls = false;
      playIcon.style.display = "flex";
    });
  });
}

// Fonction pour ouvrir vidéo YouTube
function openYouTubeVideo(videoId) {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
}

// FONCTIONS POUR LA GALERIE VIDÉO

// Initialiser la galerie après le chargement
document.addEventListener("DOMContentLoaded", function () {
  initializeVideoGallery();
});

function initializeVideoGallery() {
  // Gestion des vidéos locales
  const videoItems = document.querySelectorAll(".media-video");

  videoItems.forEach((video) => {
    const container = video.parentElement;
    const playIcon = container.querySelector(".video-icon");

    if (playIcon) {
      // Clic sur l'icône pour jouer la vidéo
      playIcon.addEventListener("click", function (e) {
        e.stopPropagation();

        if (video.paused) {
          video.play();
          video.controls = true;
          playIcon.style.display = "none";
        }
      });

      // Vidéo terminée
      video.addEventListener("ended", function () {
        video.controls = false;
        playIcon.style.display = "flex";
      });

      // Vidéo en pause
      video.addEventListener("pause", function () {
        if (!video.ended) {
          video.controls = false;
          playIcon.style.display = "flex";
        }
      });

      // Clic sur la vidéo elle-même
      video.addEventListener("click", function (e) {
        e.stopPropagation();
        if (video.paused) {
          video.play();
          video.controls = true;
          playIcon.style.display = "none";
        }
      });
    }
  });

  // Bouton de notification Lakota
  const notifyBtn = document.getElementById("lakotaNotifyBtn");
  if (notifyBtn) {
    notifyBtn.addEventListener("click", function () {
      // Créer un formulaire modal au lieu d'utiliser prompt()
      createLakotaFormModal();
    });
  }

  // Gestion du bouton "Proposer une invitée"
  const proposeGuestBtn = document.querySelector("button.btn-outline.small"); // Le 2ème bouton dans la section émission
  if (proposeGuestBtn && proposeGuestBtn.textContent.includes("PROPOSER")) {
    proposeGuestBtn.addEventListener("click", function () {
      createGuestProposalModal();
    });
  }

  // Ajout d'étoiles dynamiquement (optionnel)
  const lakotaEvent = document.querySelector(".lakota-event");
  if (lakotaEvent && !lakotaEvent.querySelector(".star")) {
    for (let i = 0; i < 5; i++) {
      const star = document.createElement("div");
      star.className = "star";
      lakotaEvent.appendChild(star);
    }
  }
}

// Fonction pour créer le formulaire modal Lakota
function createLakotaFormModal() {
  // Créer le modal
  const modal = document.createElement("div");
  modal.className = "modal lakota-modal";
  modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3 class="modal-title">Être notifié de l'événement à Lakota</h3>
                <button class="modal-close lakota-close" aria-label="Fermer">✕</button>
            </div>
            <form action="submit.php" method="POST" class="modal-form" id="lakotaForm">
                <input type="hidden" name="type" value="lakota_notification">
                
                <div class="form-group">
                    <label class="form-label">Nom complet *</label>
                    <input type="text" name="name" class="form-input" placeholder="Votre nom" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Téléphone *</label>
                    <input type="tel" name="phone" class="form-input" placeholder="+225 ..." required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-input" placeholder="email@exemple.com">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Ville</label>
                    <input type="text" name="city" class="form-input" placeholder="Votre ville">
                </div>
                
                <div class="form-check">
                    <input id="lakota-consent" name="consent" type="checkbox" checked class="checkbox" required>
                    <label for="lakota-consent" class="checkbox-label">Je souhaite recevoir les informations sur l'événement Lakota</label>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-outline lakota-cancel">Annuler</button>
                    <button type="submit" class="btn-primary">M'inscrire</button>
                </div>
            </form>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Afficher le modal
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  // Fermer le modal
  const closeBtn = modal.querySelector(".lakota-close");
  const cancelBtn = modal.querySelector(".lakota-cancel");
  const overlay = modal.querySelector(".modal-overlay");

  const closeModal = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
      document.body.style.overflow = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Click outside to close
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Soumission du formulaire
  const form = document.getElementById("lakotaForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Animation du bouton
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;

    // Envoyer les données via Fetch API
    fetch("submit.php", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.redirected) {
          // Si redirection, suivre la redirection
          window.location.href = response.url;
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (data) {
          try {
            const result = JSON.parse(data);
            if (result.success) {
              // Rediriger vers la page de remerciement Lakota
              window.location.href = "merci-lakota.html";
            } else {
              alert("Une erreur est survenue. Veuillez réessayer.");
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }
          } catch (e) {
            // Si ce n'est pas du JSON, c'est probablement une redirection HTML
            // Le formulaire standard POST redirigera normalement
            form.submit();
          }
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        // Fallback: soumission normale du formulaire
        form.submit();
      });
  });
}

function createGuestProposalModal() {
  const modal = document.createElement("div");
  modal.className = "modal guest-modal";
  modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 600px; max-height: 85vh; display: flex; flex-direction: column;">
            <div class="modal-header" style="flex-shrink: 0;">
                <h3 class="modal-title">Proposer une invitée pour l'émission "Mousso Massa"</h3>
                <button class="modal-close guest-close" aria-label="Fermer">✕</button>
            </div>
            <div class="modal-form-container" style="flex: 1; overflow-y: auto; padding: 0 20px;">
                <form action="submit.php" method="POST" class="modal-form" id="guestForm" style="padding: 10px 0;">
                    <input type="hidden" name="type" value="guest_proposal">
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Votre nom *</label>
                            <input type="text" name="sender_name" class="form-input" placeholder="Votre nom" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Votre téléphone *</label>
                            <input type="tel" name="sender_phone" class="form-input" placeholder="+225 ..." required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Votre email</label>
                            <input type="email" name="sender_email" class="form-input" placeholder="votre@email.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Votre relation avec l'invitée</label>
                            <select name="relationship" class="form-select">
                                <option value="">Sélectionner...</option>
                                <option value="amie">Amie</option>
                                <option value="collègue">Collègue</option>
                                <option value="famille">Famille</option>
                                <option value="admiratrice">Admiratrice</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Nom de l'invitée proposée *</label>
                        <input type="text" name="guest_name" class="form-input" placeholder="Nom complet de la personne" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Contact de l'invitée (si disponible)</label>
                        <input type="text" name="guest_contact" class="form-input" placeholder="Téléphone ou email">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Pourquoi proposer cette personne ? *</label>
                        <textarea name="reason" class="form-input" rows="3" placeholder="Décrivez son parcours, ses réalisations, pourquoi elle serait une bonne invitée..." required style="min-height: 80px; resize: vertical;"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Sujet/thème suggéré</label>
                        <input type="text" name="topic" class="form-input" placeholder="Ex: Leadership féminin, Entrepreneuriat, etc.">
                    </div>
                    
                    <div class="form-check">
                        <input id="guest-consent" name="consent" type="checkbox" class="checkbox" required>
                        <label for="guest-consent" class="checkbox-label">Je certifie que les informations fournies sont exactes</label>
                    </div>
                    
                    <div class="form-actions" style="margin-top: 20px; padding: 15px 0; border-top: 1px solid #eee; flex-shrink: 0;">
                        <button type="button" class="btn-outline guest-cancel">Annuler</button>
                        <button type="submit" class="btn-primary">Envoyer la proposition</button>
                    </div>
                </form>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  // Gestion de la fermeture
  const closeBtn = modal.querySelector(".guest-close");
  const cancelBtn = modal.querySelector(".guest-cancel");
  const overlay = modal.querySelector(".modal-overlay");

  const closeModal = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
      document.body.style.overflow = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Click outside to close
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Soumission
  const form = document.getElementById("guestForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Animation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;

    // Envoyer les données
    fetch("submit.php", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (data) {
          try {
            const result = JSON.parse(data);
            if (result.success) {
              window.location.href = "merci-invitee.html";
            } else {
              alert("Une erreur est survenue. Veuillez réessayer.");
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }
          } catch (e) {
            form.submit();
          }
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        form.submit();
      });
  });
}

// Fonction pour mettre à jour le type de formulaire
function updateFormType(select) {
  const formTypeInput = document.getElementById("formType");
  if (formTypeInput) {
    formTypeInput.value = select.value;
  }
}

// GALERIE AVEC PAGINATION POUR 106 IMAGES (SANS COMPTEUR) - VERSION CORRIGÉE
function initializeForumGallery() {
  const galleryContainer = document.getElementById("forumGallery");
  if (!galleryContainer) return;

  // Configuration
  const IMAGES_PER_PAGE = 10;
  const TOTAL_IMAGES = 114; // Total de 114 images (106 + 8 nouvelles de convention)
  const IMAGES_BASE_PATH = "assets/images/forum-sanpedro/";

  let currentPage = 1;
  const totalPages = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE);

  // Éléments DOM
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const currentPageSpan = document.getElementById("currentPage");
  const totalPagesSpan = document.getElementById("totalPages");
  const pageNumbersContainer = document.getElementById("pageNumbers");

  // Captions pour vos images (étendu pour 114 images - 106 + 8 nouvelles de convention)
  const imageCaptions = [
    // Premières 43 images (existantes)
    "Soirée Gala",
    "Couronne d'honneur",
    "Session de travail",
    "Participants",
    "Moments d'animation",
    "Discours d'ouverture",
    "Panel d'experts",
    "Réseautage entre participantes",
    "Atelier pratique",
    "Présentations",
    "Échanges informels",
    "Cérémonie de remise",
    "Motivation et leadership",
    "Témoignages inspirants",
    "Workshop interactif",
    "Photos de groupe",
    "Moments de détente",
    "Présentatrices",
    "Organisatrices",
    "Bénévoles",
    "Partenaires stratégiques",
    "Sponsors",
    "Moment culturel",
    "Animation",
    "Déjeuner networking",
    "Pause café",
    "Échanges chaleureux",
    "Success stories",
    "Mentorat",
    "Coaching individuel",
    "Brainstorming",
    "Planning stratégique",
    "Future collaborations",
    "Remerciements",
    "Clôture officielle",
    "Photo souvenir",
    "Ambiance festive",
    "Leadership féminin",
    "Émotion et partage",
    "Innovation",
    "Entrepreneuriat",
    "Empowerment",
    "Solidarité féminine",

    // Nouvelles 63 images (ajouts précédents)
    "Inauguration officielle",
    "Allocution principale",
    "Table ronde 1",
    "Table ronde 2",
    "Questions du public",
    "Remise des prix",
    "Trophées d'excellence",
    "Stand d'exposition",
    "Rencontres B2B",
    "Signature de partenariats",
    "Médiation culturelle",
    "Performance artistique",
    "Démonstration produits",
    "Témoignage entreprise",
    "Cas pratiques",
    "Étude de cas",
    "Présentation résultats",
    "Analyse de marché",
    "Tendances 2025",
    "Perspectives futures",
    "Atelier créativité",
    "Exercice team-building",
    "Jeux de rôle",
    "Simulation d'entretien",
    "Préparation pitch",
    "Feedback personnalisé",
    "Évaluation compétences",
    "Certification participants",
    "Photo officielle",
    "Cocktail d'accueil",
    "Buffet gourmand",
    "Dégustation produits locaux",
    "Animation musicale",
    "Danse traditionnelle",
    "Spectacle vivant",
    "Remise des attestations",
    "Mots de clôture",
    "Applaudissements finaux",
    "Selfies souvenirs",
    "Échanges de contacts",
    "Promesses de suivi",
    "Planning futur",
    "Évaluation satisfaction",
    "Questionnaire participants",
    "Collecte feedback",
    "Derniers conseils",
    "Encouragements mutuels",
    "Souvenirs partagés",
    "Ambiance conviviale",
    "Décorations festives",
    "Support technique",
    "Équipe logistique",
    "Photographe officiel",
    "Service traiteur",
    "Sécurité évènement",
    "Accueil participants",
    "Enregistrement arrivées",
    "Kit participant",
    "Documentation remise",
    "Badges d'identification",
    "Signalétique salle",
    "Écran géant",
    "Sonorisation professionnelle",
    "Éclairage scénique",
    "Décoration scène",
    "Fleurissement salle",

    // 8 NOUVELLES IMAGES DE CONVENTION CNTS (107 à 114)
    "Signature Convention CNTS - Séance officielle",
    "Signature Convention CNTS - Échange de signatures",
    "Signature Convention CNTS - Poignée de main",
    "Signature Convention CNTS - Présentation des partenaires",
    "Signature Convention CNTS - Photo officielle",
    "Signature Convention CNTS - Équipes réunies",
    "Signature Convention CNTS - Documents signés",
    "Signature Convention CNTS - Clôture de cérémonie",
  ];

  // Mettre à jour les indicateurs
  if (totalPagesSpan) totalPagesSpan.textContent = totalPages;

  // Générer les données d'images
  function generateImageData() {
    const images = [];

    for (let i = 1; i <= TOTAL_IMAGES; i++) {
      // Déterminer le nom de fichier
      let filename;
      if (i === 1) filename = "soiree-gala-1.jpg";
      else if (i === 2) filename = "couronne.jpg";
      else if (i <= 106) {
        // Images 3 à 106 : forum-1.jpg à forum-104.jpg
        filename = `forum-${i - 2}.jpg`;
      } else {
        // Nouvelles images 107 à 114 : convention-1.jpg à convention-8.jpg
        filename = `convention-${i - 106}.jpg`;
      }

      images.push({
        src: `${IMAGES_BASE_PATH}${filename}`,
        alt: `Forum San Pedro 2025 - Photo ${i}`,
        caption: imageCaptions[i - 1] || `Photo ${i}`,
        index: i,
      });
    }

    return images;
  }

  const allImages = generateImageData();

  // Initialiser la pagination
  function initPagination() {
    updatePageIndicators();
    renderCurrentPage();
    renderPageNumbers();
    setupEventListeners();
  }

  // Afficher les images de la page courante
  function renderCurrentPage() {
    // Afficher l'état de chargement
    galleryContainer.innerHTML = `
            <div class="gallery-loading">
                <div class="loading-spinner"></div>
                <p>Chargement des images...</p>
            </div>
        `;

    setTimeout(() => {
      galleryContainer.innerHTML = "";

      const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
      const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, TOTAL_IMAGES);
      const pageImages = allImages.slice(startIndex, endIndex);

      // Créer les éléments d'image
      pageImages.forEach((image) => {
        const mediaItem = document.createElement("div");
        mediaItem.className = "media-item";
        mediaItem.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" class="media-img" 
                         loading="lazy"
                         data-caption="${image.caption}"
                         data-index="${image.index}"
                         onerror="this.onerror=null; this.src='assets/images/placeholder.jpg'; this.alt='Image non disponible'">
                    <div class="media-caption">${image.caption}</div>
                `;

        // Ajouter le clic pour agrandir - VERSION CORRIGÉE POUR QUALITÉ
        const imgElement = mediaItem.querySelector(".media-img");

        // Détecter si l'image est verticale ou horizontale
        const preloadImg = new Image();
        preloadImg.onload = function () {
          const naturalWidth = this.width;
          const naturalHeight = this.height;
          const ratio = naturalHeight / naturalWidth;

          if (ratio > 1.5) {
            imgElement.classList.add("portrait");
          } else if (ratio < 0.7) {
            imgElement.classList.add("landscape");
          } else {
            imgElement.classList.add("square");
          }
        };
        preloadImg.src = image.src;

        imgElement.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          // Fonction pour ouvrir l'image en grand avec haute qualité
          openImageModal(this.src, this.alt, this.dataset.caption);
        });

        galleryContainer.appendChild(mediaItem);
      });
    }, 300);
  }

  // Fonction pour ouvrir l'image en grand avec haute qualité
  function openImageModal(src, alt, caption) {
    // Créer ou réutiliser le modal d'image
    let modal = document.querySelector(".image-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "image-modal";
      modal.innerHTML = `
                <span class="close-modal">&times;</span>
                <img class="modal-image" src="" alt="" loading="eager">
                <div class="modal-caption"></div>
            `;
      document.body.appendChild(modal);

      // Fermer le modal
      const closeBtn = modal.querySelector(".close-modal");
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          e.preventDefault();
          e.stopPropagation();
          modal.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });

      // Navigation au clavier
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          e.preventDefault();
          modal.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    }

    // Afficher l'image avec préchargement pour éviter le flou
    const modalImg = modal.querySelector(".modal-image");
    const modalCaption = modal.querySelector(".modal-caption");

    // Afficher d'abord une version floue puis la charger en haute qualité
    modalImg.style.opacity = "0.3";
    modalImg.style.filter = "blur(5px)";

    // Précharger l'image
    const preloadImg = new Image();
    preloadImg.onload = function () {
      modalImg.src = src;
      modalImg.alt = alt;
      modalCaption.textContent = caption || alt;

      // Animation pour une transition fluide
      setTimeout(() => {
        modalImg.style.opacity = "1";
        modalImg.style.filter = "blur(0)";
        modalImg.style.transition = "opacity 0.5s ease, filter 0.5s ease";
      }, 50);
    };

    preloadImg.onerror = function () {
      modalImg.src = src;
      modalImg.alt = alt;
      modalCaption.textContent = caption || alt;
      modalImg.style.opacity = "1";
      modalImg.style.filter = "blur(0)";
    };

    preloadImg.src = src;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Mettre à jour les indicateurs de page
  function updatePageIndicators() {
    if (currentPageSpan) currentPageSpan.textContent = currentPage;

    // Activer/désactiver les boutons
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  }

  // Générer les numéros de page
  function renderPageNumbers() {
    if (!pageNumbersContainer) return;

    pageNumbersContainer.innerHTML = "";

    // Toujours afficher la première page
    addPageNumber(1);

    // Calculer les pages à afficher
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Ajouter des points de suspension si nécessaire
    if (startPage > 2) {
      addDots();
    }

    // Ajouter les pages autour de la page courante
    for (let i = startPage; i <= endPage; i++) {
      addPageNumber(i);
    }

    // Ajouter des points de suspension si nécessaire
    if (endPage < totalPages - 1) {
      addDots();
    }

    // Toujours afficher la dernière page si elle n'est pas déjà affichée
    if (totalPages > 1 && endPage < totalPages) {
      addPageNumber(totalPages);
    }

    function addPageNumber(page) {
      const pageNumber = document.createElement("div");
      pageNumber.className = `page-number ${
        page === currentPage ? "active" : ""
      }`;
      pageNumber.textContent = page;
      pageNumber.dataset.page = page;

      pageNumber.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (page !== currentPage) {
          goToPage(page);
        }
      });

      pageNumbersContainer.appendChild(pageNumber);
    }

    function addDots() {
      const dots = document.createElement("div");
      dots.className = "page-number dots";
      dots.textContent = "...";
      pageNumbersContainer.appendChild(dots);
    }
  }

  // Aller à une page spécifique
  function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;

    currentPage = page;

    // Animation de transition
    galleryContainer.style.opacity = "0.5";
    galleryContainer.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
      renderCurrentPage();
      updatePageIndicators();
      renderPageNumbers();

      galleryContainer.style.opacity = "1";
    }, 300);
  }

  // Événements
  function setupEventListeners() {
    // Bouton précédent
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentPage > 1) {
          goToPage(currentPage - 1);
        }
      });
    }

    // Bouton suivant
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentPage < totalPages) {
          goToPage(currentPage + 1);
        }
      });
    }

    // Navigation au clavier
    document.addEventListener("keydown", (e) => {
      const gallerySection = document.querySelector(".forum-gallery-section");
      if (gallerySection && isElementInViewport(gallerySection)) {
        if (e.key === "ArrowLeft" && currentPage > 1) {
          e.preventDefault();
          goToPage(currentPage - 1);
        } else if (e.key === "ArrowRight" && currentPage < totalPages) {
          e.preventDefault();
          goToPage(currentPage + 1);
        }
      }
    });

    // Empêcher le comportement par défaut sur tous les boutons de pagination
    document.querySelectorAll(".pagination-controls button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }

  // Vérifier si un élément est visible
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Initialiser
  initPagination();
}

// ===========================================
// FONCTIONS POUR LA SECTION CARAVANE
// ===========================================
function openCaravaneRegistration() {
  const modal = document.createElement("div");
  modal.className = "modal caravane-modal";
  modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 500px; max-height: 85vh; display: flex; flex-direction: column;">
            <div class="modal-header" style="flex-shrink: 0;">
                <h3 class="modal-title">Participer à la Caravane</h3>
                <button class="modal-close caravane-close" aria-label="Fermer">✕</button>
            </div>
            <div class="modal-form-container" style="flex: 1; overflow-y: auto; padding: 0 20px;">
                <form action="submit.php" method="POST" class="modal-form" id="caravaneForm" style="padding: 10px 0;">
                    <input type="hidden" name="type" value="caravane_participation">
                    <input type="hidden" name="activity" value="caravane_collecte">
                    
                    <div class="form-group">
                        <label class="form-label">Nom complet *</label>
                        <input type="text" name="name" class="form-input" placeholder="Votre nom complet" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Téléphone *</label>
                            <input type="tel" name="phone" class="form-input" placeholder="+225 ..." required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-input" placeholder="email@exemple.com">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Ville *</label>
                        <input type="text" name="city" class="form-input" placeholder="Votre ville de résidence" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Je souhaite participer en tant que : *</label>
                        <select name="role" class="form-select" required>
                            <option value="">Sélectionner...</option>
                            <option value="donneur">Donneur de sang</option>
                            <option value="benevole">Bénévole</option>
                            <option value="sensibilisateur">Sensibilisateur</option>
                            <option value="organisateur">Organisateur local</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Disponibilités</label>
                        <div class="availability-checkboxes">
                            <label class="checkbox-label">
                                <input type="checkbox" name="weekends" checked>
                                Week-ends
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="weekdays">
                                Semaine
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="evenings">
                                Soirées
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-check">
                        <input id="caravane-consent" name="consent" type="checkbox" class="checkbox" required>
                        <label for="caravane-consent" class="checkbox-label">
                            J'accepte de participer aux activités de la Caravane Moussos Massa et je m'engage à respecter les consignes de sécurité
                        </label>
                    </div>
                    
                    <div class="form-actions" style="margin-top: 20px; padding: 15px 0; border-top: 1px solid #eee; flex-shrink: 0;">
                        <button type="button" class="btn-outline caravane-cancel">Annuler</button>
                        <button type="submit" class="btn-primary">M'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  // Gestion de la fermeture
  const closeBtn = modal.querySelector(".caravane-close");
  const cancelBtn = modal.querySelector(".caravane-cancel");
  const overlay = modal.querySelector(".modal-overlay");

  const closeModal = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
      document.body.style.overflow = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Click outside to close
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Soumission du formulaire
  const form = document.getElementById("caravaneForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Animation du bouton
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Inscription en cours...";
    submitBtn.disabled = true;

    // Envoyer les données
    fetch("submit.php", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (data) {
          try {
            const result = JSON.parse(data);
            if (result.success) {
              window.location.href = "merci-caravane.html";
            } else {
              alert("Une erreur est survenue. Veuillez réessayer.");
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }
          } catch (e) {
            form.submit();
          }
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        form.submit();
      });
  });
}

// ===========================================
// ANIMATION DES STATISTIQUES
// ===========================================
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.dataset.count);
        animateCounter(stat, target);
        observer.unobserve(stat);
      }
    });
  }, observerOptions);

  stats.forEach((stat) => {
    observer.observe(stat);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 1500;
  const interval = duration / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      element.textContent = target;
    } else {
      element.textContent = Math.floor(current);
    }
  }, interval);
}

// ===========================================
// INITIALISATION DES NOUVELLES SECTIONS
// ===========================================
function initializeNewSections() {
  // Animer les statistiques
  animateStats();

  // Initialiser la galerie de la caravane
  initializeCaravaneGallery();

  // Gestion des thumbnails
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      const mainImg = document.querySelector(".main-caravane-img img");
      const newSrc = this.querySelector("img").src;
      const oldSrc = mainImg.src;

      // Animation de transition
      mainImg.style.opacity = "0";
      setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.style.opacity = "1";
      }, 300);

      // Mettre à jour la miniature active
      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// Initialiser la galerie caravane
function initializeCaravaneGallery() {
  const gallery = document.querySelector(".caravane-gallery");
  if (!gallery) return;

  // Créer le modal pour les images agrandies
  const modal = document.createElement("div");
  modal.className = "image-modal caravane-image-modal";
  modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-image" src="" alt="" loading="eager">
    `;
  document.body.appendChild(modal);

  // Gestion des clics sur les images
  gallery.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", function () {
      const modalImg = modal.querySelector(".modal-image");

      // Précharger pour éviter le flou
      const preloadImg = new Image();
      preloadImg.onload = function () {
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      };
      preloadImg.src = this.src;
    });
  });

  // Fermer le modal
  const closeBtn = modal.querySelector(".close-modal");
  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// ===========================================
// FONCTION POUR "VENIR AU PROCHAIN DON"
// ===========================================
function openNextDonRegistration() {
  const modal = document.createElement("div");
  modal.className = "modal nextdon-modal";
  modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 500px; max-height: 85vh; display: flex; flex-direction: column;">
            <div class="modal-header" style="flex-shrink: 0;">
                <h3 class="modal-title">Venir au prochain don de sang</h3>
                <button class="modal-close nextdon-close" aria-label="Fermer">✕</button>
            </div>
            <div class="modal-form-container" style="flex: 1; overflow-y: auto; padding: 0 20px;">
                <form action="submit.php" method="POST" class="modal-form" id="nextDonForm" style="padding: 10px 0;">
                    <input type="hidden" name="type" value="next_don_participation">
                    <input type="hidden" name="activity" value="don_sang">
                    
                    <div class="form-group">
                        <label class="form-label">Nom complet *</label>
                        <input type="text" name="name" class="form-input" placeholder="Votre nom complet" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Téléphone *</label>
                            <input type="tel" name="phone" class="form-input" placeholder="+225 ..." required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-input" placeholder="email@exemple.com">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Ville *</label>
                        <input type="text" name="city" class="form-input" placeholder="Votre ville de résidence" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Type de participation *</label>
                        <select name="participation_type" class="form-select" required>
                            <option value="">Sélectionner...</option>
                            <option value="premier_don">Premier don</option>
                            <option value="donneur_regulier">Donneur régulier</option>
                            <option value="accompagnateur">Accompagner quelqu'un</option>
                            <option value="curieux">Me renseigner d'abord</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Groupe sanguin (si connu)</label>
                        <select name="blood_group" class="form-select">
                            <option value="">Je ne connais pas</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Préférence de date</label>
                        <div class="availability-checkboxes">
                            <label class="checkbox-label">
                                <input type="checkbox" name="weekend" checked>
                                Week-end (Samedi)
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="weekday">
                                Semaine
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="morning">
                                Matin
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="afternoon">
                                Après-midi
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-check">
                        <input id="nextdon-consent" name="consent" type="checkbox" class="checkbox" required>
                        <label for="nextdon-consent" class="checkbox-label">
                            Je souhaite être informé du prochain don de sang organisé par Moussos Massa
                        </label>
                    </div>
                    
                    <div class="form-check">
                        <input id="newsletter" name="newsletter" type="checkbox" class="checkbox" checked>
                        <label for="newsletter" class="checkbox-label">
                            Je souhaite recevoir la newsletter sur les actions de don de sang
                        </label>
                    </div>
                    
                    <div class="form-actions" style="margin-top: 20px; padding: 15px 0; border-top: 1px solid #eee; flex-shrink: 0;">
                        <button type="button" class="btn-outline nextdon-cancel">Annuler</button>
                        <button type="submit" class="btn-primary">M'inscrire pour le prochain don</button>
                    </div>
                </form>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  // Gestion de la fermeture
  const closeBtn = modal.querySelector(".nextdon-close");
  const cancelBtn = modal.querySelector(".nextdon-cancel");
  const overlay = modal.querySelector(".modal-overlay");

  const closeModal = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
      document.body.style.overflow = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Click outside to close
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Soumission du formulaire
  const form = document.getElementById("nextDonForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Animation du bouton
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Inscription en cours...";
    submitBtn.disabled = true;

    // Envoyer les données
    fetch("submit.php", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (data) {
          try {
            const result = JSON.parse(data);
            if (result.success) {
              window.location.href = "merci-don.html";
            } else {
              alert("Une erreur est survenue. Veuillez réessayer.");
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }
          } catch (e) {
            form.submit();
          }
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        form.submit();
      });
  });
}

// ===========================================
// HERO SLIDER AUTOMATIQUE - VERSION CORRIGÉE
// ===========================================
function initializeHeroSlider() {
  const heroSlider = document.querySelector(".hero-slider");
  if (!heroSlider) return;

  const slides = heroSlider.querySelectorAll(".hero-slide");
  const dots = heroSlider.querySelectorAll(".dot");
  const prevArrow = heroSlider.querySelector(".prev-arrow");
  const nextArrow = heroSlider.querySelector(".next-arrow");

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;
  const slideDuration = 5000; // 5 secondes par image

  // Initialiser le slider
  function initSlider() {
    if (totalSlides > 0) {
      showSlide(0);
      startAutoSlide();

      // Ajouter les événements
      if (prevArrow) prevArrow.addEventListener("click", prevSlide);
      if (nextArrow) nextArrow.addEventListener("click", nextSlide);

      // Gestion des points
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
      });

      // Pause au survol
      heroSlider.addEventListener("mouseenter", pauseSlider);
      heroSlider.addEventListener("mouseleave", startAutoSlide);

      // Animation des éléments avec délai
      animateHeroElements();
    }
  }

  // Afficher une slide spécifique
  function showSlide(index) {
    // Retirer la classe active de toutes les slides et dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Ajouter la classe active à la slide et dot courante
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
  }

  // Slide suivante
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= totalSlides) next = 0;
    showSlide(next);
    resetAutoSlide();
  }

  // Slide précédente
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = totalSlides - 1;
    showSlide(prev);
    resetAutoSlide();
  }

  // Aller à une slide spécifique
  function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
  }

  // Démarrer le défilement automatique
  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Pause le défilement
  function pauseSlider() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Réinitialiser le timer
  function resetAutoSlide() {
    pauseSlider();
    startAutoSlide();
  }

  // Animation des éléments du hero
  function animateHeroElements() {
    const animatedElements = heroSlider.querySelectorAll(".animate-fade-in-up");

    animatedElements.forEach((element, index) => {
      const delay = element.dataset.delay || "0s";
      element.style.animationDelay = delay;
    });
  }

  // Initialiser
  initSlider();
}
