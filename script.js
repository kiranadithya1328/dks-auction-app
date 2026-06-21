/* ==========================================================================
   DK'S BADMINTON CLUB - INTERACTIVE JAVASCRIPT
   Developed by VERTEX WEB STUDIO (Kiran Adithya)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Preloader Dismissal
    // ==========================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            // Slight delay to ensure styling is completely painted
            setTimeout(() => {
                preloader.classList.add("fade-out");
            }, 600);
        });
    }

    // ==========================================
    // 2. Sticky Navbar & Back to Top Toggle
    // ==========================================
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar styling change
        if (scrollPos > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Back to top button visibility
        if (scrollPos > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    // Back to top click handler
    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================
    // 3. Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle("menu-open-active");
            navMenu.classList.toggle("open");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove("menu-open-active");
                navMenu.classList.remove("open");
            }
        });

        // Close menu when clicking navigation links
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("menu-open-active");
                navMenu.classList.remove("open");
            });
        });
    }

    // ==========================================
    // 4. Dynamic "Last Updated" Date
    // ==========================================
    const dateContainer = document.getElementById("today-date");
    if (dateContainer) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // Format e.g., "June 21, 2026"
        dateContainer.textContent = today.toLocaleDateString("en-US", options);
    }

    // ==========================================
    // 5. Intersection Observer: Scroll Animations
    // ==========================================
    const animationElements = document.querySelectorAll(
        ".animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right"
    );

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animationElements.forEach(el => animationObserver.observe(el));

    // ==========================================
    // 6. Navigation Link Active Class on Scroll
    // ==========================================
    const sections = document.querySelectorAll("section[id]");
    const navMenuLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                
                navMenuLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: "-80px 0px 0px 0px"
    });

    sections.forEach(sec => sectionObserver.observe(sec));

    // ==========================================
    // 7. Screenshot Section Verification & Loading
    // ==========================================
    const screenshotsSection = document.getElementById("screenshots");
    const testImageSrc = "screenshot1.jpg";

    if (screenshotsSection) {
        const imgTest = new Image();
        imgTest.src = testImageSrc;
        
        imgTest.onerror = () => {
            // Screenshots don't exist, hide the section
            screenshotsSection.style.display = "none";
            // Also hide the screenshots link from navbar
            const screenshotLinks = document.querySelectorAll('.nav-link[href="#screenshots"]');
            screenshotLinks.forEach(link => link.style.display = "none");
            console.warn("Screenshots not found in project root. Hiding gallery section.");
        };

        imgTest.onload = () => {
            // Screenshots exist, initialize Carousel
            initScreenshotCarousel();
        };
    }

    // ==========================================
    // 8. Screenshot Carousel Implementation
    // ==========================================
    function initScreenshotCarousel() {
        const track = document.getElementById("carouselTrack");
        const slides = Array.from(document.querySelectorAll(".carousel-slide"));
        const nextButton = document.getElementById("carouselNext");
        const prevButton = document.getElementById("carouselPrev");
        const indicators = Array.from(document.querySelectorAll(".indicator"));
        
        if (!track || slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;

        const updateCarousel = (index) => {
            // Wrap index
            if (index < 0) {
                currentIndex = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            // Move the track
            track.style.transform = `translateX(-${currentIndex * 20}%)`;

            // Update active states for slides
            slides.forEach((slide, idx) => {
                if (idx === currentIndex) {
                    slide.classList.add("active");
                } else {
                    slide.classList.remove("active");
                }
            });

            // Update active state for indicators
            indicators.forEach((indicator, idx) => {
                if (idx === currentIndex) {
                    indicator.classList.add("active");
                } else {
                    indicator.classList.remove("active");
                }
            });

            // Update Hero Mockup Screen image too! Makes it interactive!
            const mockupScreenImg = document.getElementById("mockupScreenImg");
            if (mockupScreenImg) {
                const activeSlideImg = slides[currentIndex].querySelector("img");
                if (activeSlideImg) {
                    mockupScreenImg.src = activeSlideImg.src;
                }
            }
        };

        // Next Button click listener
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                updateCarousel(currentIndex + 1);
            });
        }

        // Prev Button click listener
        if (prevButton) {
            prevButton.addEventListener("click", () => {
                updateCarousel(currentIndex - 1);
            });
        }

        // Indicators click listener
        indicators.forEach(indicator => {
            indicator.addEventListener("click", (e) => {
                const targetSlide = parseInt(e.target.getAttribute("data-slide"), 10);
                updateCarousel(targetSlide);
            });
        });

        // Swipe Gestures for Mobile
        let startX = 0;
        let endX = 0;

        track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (diffX > 50) {
                // Swipe left -> Next
                updateCarousel(currentIndex + 1);
            } else if (diffX < -50) {
                // Swipe right -> Prev
                updateCarousel(currentIndex - 1);
            }
        }, { passive: true });
    }

    // ==========================================
    // 9. Toast Notification Handler
    // ==========================================
    const toastContainer = document.getElementById("toast-container");

    const showToast = (message, type = "success") => {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        
        const icon = type === "success" 
            ? '<i class="fa-solid fa-circle-check"></i>' 
            : '<i class="fa-solid fa-circle-info"></i>';

        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    };

    // ==========================================
    // 10. Copy Support Email to Clipboard
    // ==========================================
    const btnCopyEmail = document.getElementById("btnCopyEmail");
    const supportEmail = document.getElementById("supportEmail");

    if (btnCopyEmail && supportEmail) {
        btnCopyEmail.addEventListener("click", () => {
            const emailText = supportEmail.textContent;

            // Copy utilizing modern Clipboard API
            navigator.clipboard.writeText(emailText).then(() => {
                btnCopyEmail.classList.add("copied");
                btnCopyEmail.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                showToast("Support email copied to clipboard!", "success");

                // Reset button state after delay
                setTimeout(() => {
                    btnCopyEmail.classList.remove("copied");
                    btnCopyEmail.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
                }, 2000);
            }).catch(err => {
                console.error("Clipboard copy failed: ", err);
                showToast("Could not copy email. Please copy manually.", "info");
            });
        });
    }

    // ==========================================
    // 11. Download APK Button Interaction Track
    // ==========================================
    const downloadBtns = document.querySelectorAll('a[download]');
    downloadBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            showToast("Starting secure APK download... Please check your device notifications.", "success");
        });
    });
});
