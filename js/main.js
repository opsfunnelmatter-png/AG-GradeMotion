// Global FAQ Accordion Toggle
function toggleFaq(triggerElement) {
    const currentItem = triggerElement.parentElement;
    const contentElement = currentItem.querySelector('.faq-content');
    const iconElement = currentItem.querySelector('.faq-toggle-icon');
    const isActive = currentItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-content').style.maxHeight = null;
        item.querySelector('.faq-toggle-icon').textContent = '+';
    });

    if (!isActive) {
        currentItem.classList.add('active');
        contentElement.style.maxHeight = contentElement.scrollHeight + "px";
        iconElement.textContent = '−'; 
    }
}

// Global Video Switcher (Framework Section)
function switchVideo(videoSrc, activeTabId, posterSrc) {
    const player = document.getElementById('carouselPlayer');
    const source = document.getElementById('videoSource');
    
    if (player && source) {
        if (posterSrc) {
            player.poster = posterSrc;
        }
        source.src = videoSrc;
        player.load();
        
        // Auto play newly selected video immediately
        player.muted = true;
        player.playsInline = true;
        const playPromise = player.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }
    }
    
    document.querySelectorAll('.video-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeTab = document.getElementById(activeTabId);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Global function to attach navigation smooth scrolling
function initNavigationScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Calculate position with fixed header offset (nav ~74px + ticker ~38px + breathing room)
                    const headerOffset = 125;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state in nav if it's a nav link
                    if (link.closest('nav')) {
                        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        }
    });
}

// Global function to initialize IntersectionObserver scroll reveals
function initScrollReveals() {
    // Select headers, hero text, pricing blocks, FAQ headers
    const fadeIns = document.querySelectorAll(
        '.hero-left h1, .hero-left .description, .hero-left .actions-wrapper, .hero-left .stats-grid, ' +
        '.vsl-header h2, .vsl-header p, .vsl-video-wrapper, .btn-youtube-center, ' +
        '.improvements-container h2, .values-split-row, .metrics-summary-row, ' +
        '.workflow-container h2, .btn-the-method-redirect, ' +
        '.subjects-top h2, .subjects-top p, .btn-compare-link, ' +
        '.testimonials-container h2, .btn-case-studies, ' +
        '.whothisfor-container h2, .whothisfor-card, ' +
        '.faq-header-center h2, .faq-header-center p, ' +
        '.method-hero-container .hero-left, .hero-right-card, ' +
        '.framework-header h2, .framework-header p, .carousel-wrapper-card, .explore-link-container, ' +
        '.details-header h2, .details-header p, ' +
        '.pedagogy-header h2, .pedagogy-header p, ' +
        '.pricing-section-title h2, .pricing-section-title p'
    );

    // Select grid blocks to animate in stagged columns
    const staggers = document.querySelectorAll(
        '.stats-grid, .workflow-grid, .boards-row-top, .boards-row-bottom, ' +
        '.testimonials-grid, .faq-stack, .matrix-grid-3col, .steps-stack, ' +
        '.details-grid, .pedagogy-grid-3col, .pricing-cards-grid'
    );

    // Apply reveal styling classes
    fadeIns.forEach(el => el.classList.add('reveal-fade-in'));
    staggers.forEach(el => el.classList.add('reveal-stagger'));

    // Setup the observer options (trigger when 10% of element is in view)
    const options = {
        root: null,
        rootMargin: '0px -10% -10% 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                obs.unobserve(entry.target); // Trigger once
            }
        });
    }, options);

    // Start observing elements
    fadeIns.forEach(el => observer.observe(el));
    staggers.forEach(el => observer.observe(el));
}

// Header scroll shadow toggle
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-outer');
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
});

// Active Navigation highlighting on Scroll
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('main[id], section[id]');
    const navLinks = document.querySelectorAll('nav a');
    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else if (href !== '#cta') {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));
}

// Stats Animated Counters
function countUpAnimations() {
    const counters = document.querySelectorAll('.stat-val');
    if (!counters.length) return;

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-target'));
                if (isNaN(value)) return;
                
                let count = 0;
                const duration = 2800; // 2.8 seconds animation
                const steps = 80;
                const stepTime = duration / steps;
                const increment = value / steps;
                
                const updateCount = () => {
                    count += increment;
                    if (count < value) {
                        if (value >= 1000) {
                            target.innerText = Math.floor(count).toLocaleString() + "+";
                        } else if (value === 2) {
                            target.innerText = "+" + Math.floor(count);
                        } else {
                            target.innerText = Math.floor(count) + "+";
                        }
                        setTimeout(updateCount, stepTime);
                    } else {
                        if (value >= 1000) {
                            target.innerText = value.toLocaleString() + "+";
                        } else if (value === 2) {
                            target.innerText = "+" + value;
                        } else {
                            target.innerText = value + "+";
                        }
                    }
                };
                
                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => {
        countObserver.observe(counter);
    });
}

// --- MODAL LOGIC (BOOKING & CONTACT) ---
document.addEventListener("DOMContentLoaded", () => {
    // --- BOOKING MODAL ELEMENTS ---
    const modal = document.getElementById("booking-modal");
    const closeBtn = document.getElementById("close-modal-btn");
    const form = document.getElementById("diagnostic-form");
    const successMsg = document.getElementById("form-success-msg");

    // --- CONTACT MODAL ELEMENTS ---
    const contactModal = document.getElementById("contact-modal");
    const closeContactBtn = document.getElementById("close-contact-btn");
    const contactForm = document.getElementById("contact-form");
    const contactSuccessMsg = document.getElementById("contact-success-msg");
    const openContactBtn = document.getElementById("open-contact-btn");

    // --- BOOKING MODAL HELPER FUNCTIONS ---
    function openModal(packageType = "diagnostic") {
        if (!modal) return;
        modal.style.display = "flex";
        modal.offsetHeight; // Force browser reflow to apply transition
        modal.classList.add("active");

        // Customize text based on package
        const titleEl = modal.querySelector(".modal-header h2");
        const submitBtnEl = modal.querySelector(".btn-submit-booking");
        const subjectEl = modal.querySelector('input[name="subject"]');

        if (packageType === "standard") {
            if (titleEl) titleEl.innerText = "Apply for the Standard Plan";
            if (submitBtnEl) submitBtnEl.innerHTML = "Apply for Standard Plan ($640) &rarr;";
            if (subjectEl) subjectEl.value = "New Further Math Standard Plan Application";
        } else if (packageType === "intensive") {
            if (titleEl) titleEl.innerText = "Apply for the Intensive Plan";
            if (submitBtnEl) submitBtnEl.innerHTML = "Apply for Intensive Plan ($1,120) &rarr;";
            if (subjectEl) subjectEl.value = "New Further Math Intensive Plan Application";
        } else if (packageType === "retainer") {
            if (titleEl) titleEl.innerText = "Apply for the Full Term Retainer";
            if (submitBtnEl) submitBtnEl.innerHTML = "Secure Your Slot ($2,600) &rarr;";
            if (subjectEl) subjectEl.value = "New Further Math Full Term Retainer Application";
        } else {
            // Default to diagnostic
            if (titleEl) titleEl.innerText = "Book Your Free Diagnostic Session";
            if (submitBtnEl) submitBtnEl.innerHTML = "Book My Free Diagnostic Session &rarr;";
            if (subjectEl) subjectEl.value = "New Further Math Diagnostic Booking";
        }

        // Reset success state if reopening
        if (form && successMsg) {
            form.style.display = "block";
            successMsg.style.display = "none";
            form.reset();
        }
        // Scroll back to top of form
        const modalBody = modal.querySelector(".modal-body");
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        setTimeout(() => {
            if (!modal.classList.contains("active")) {
                modal.style.display = "none";
            }
        }, 300); // matches CSS transition time
    }

    // --- CONTACT MODAL HELPER FUNCTIONS ---
    function openContactModal() {
        if (!contactModal) return;
        contactModal.style.display = "flex";
        contactModal.offsetHeight; // Force browser reflow to apply transition
        contactModal.classList.add("active");

        // Reset success state if reopening
        if (contactForm && contactSuccessMsg) {
            contactForm.style.display = "block";
            contactSuccessMsg.style.display = "none";
            contactForm.reset();
        }
        // Scroll back to top of form
        const modalBody = contactModal.querySelector(".modal-body");
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
    }

    function closeContactModal() {
        if (!contactModal) return;
        contactModal.classList.remove("active");
        setTimeout(() => {
            if (!contactModal.classList.contains("active")) {
                contactModal.style.display = "none";
            }
        }, 300); // matches CSS transition time
    }

    // --- BOOKING EVENT LISTENERS ---
    // Intercept clicks on ONLY pricing/bottom CTA buttons or forms.gle links to open modal
    document.body.addEventListener("click", (e) => {
        const target = e.target.closest(
            'a[href*="forms.gle"], .btn-cta-action'
        );

        if (target && modal) {
            e.preventDefault();
            const packageType = target.getAttribute("data-package") || "diagnostic";
            openModal(packageType);
        }
    });

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Click outside modal container to close
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // --- CONTACT EVENT LISTENERS ---
    // Open contact modal on button click
    if (openContactBtn) {
        openContactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openContactModal();
        });
    }

    // Close button click
    if (closeContactBtn) {
        closeContactBtn.addEventListener("click", closeContactModal);
    }

    // Click outside modal container to close
    if (contactModal) {
        contactModal.addEventListener("click", (e) => {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });
    }

    // --- GLOBAL MODAL EVENT LISTENERS ---
    // Escape key press to close either modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (modal && modal.classList.contains("active")) {
                closeModal();
            }
            if (contactModal && contactModal.classList.contains("active")) {
                closeContactModal();
            }
        }
    });

    // Check URL query parameter to open contact modal automatically
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("contact") === "true") {
        openContactModal();
        // Clean up the URL so refreshing doesn't keep opening it
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: newUrl }, "", newUrl);
    }

    // --- FORM SUBMISSIONS ---
    
    // Booking Form Submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Submit button loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending Application...";

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            
            // Format phone with country code for delivery clarity
            const fullPhone = `${object.country_code} ${object.phone}`;

            // Prepare payload for Google Apps Script
            const payload = {
                name: object.name,
                email: object.email,
                phone: fullPhone,
                country: object.country,
                exam_board: object.exam_board,
                paper_session: object.paper_session,
                current_grade: object.current_grade,
                target_grade: object.target_grade,
                start_time: object.start_time,
                preferred_contact: object.comm_method,
                challenges: object.challenges
            };

            const googleAppScriptUrl = "https://script.google.com/macros/s/AKfycbyJ-telwndzLS7fgeodjWtovELGcIlDipV6mCXFnSlsEmwR0kGsWBQgkWHOsw4Fa8kj/exec";

            // Send via AJAX to Google Apps Script
            fetch(googleAppScriptUrl, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                // Redirect to thank-you.html immediately
                window.location.href = "thank-you.html";
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                // Fallback redirect so conversion is tracked even on network failure
                window.location.href = "thank-you.html";
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Submit button loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending Message...";

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            
            // Format phone with country code for delivery clarity
            const fullPhone = `${object.country_code} ${object.phone}`;

            // Prepare payload for Google Apps Script
            const payload = {
                name: object.name,
                email: object.email,
                phone: fullPhone,
                country: "",
                exam_board: "",
                paper_session: "",
                current_grade: "",
                target_grade: "",
                start_time: "Contact Form",
                preferred_contact: "Email/Phone",
                challenges: object.message
            };

            const googleAppScriptUrl = "https://script.google.com/macros/s/AKfycbyJ-telwndzLS7fgeodjWtovELGcIlDipV6mCXFnSlsEmwR0kGsWBQgkWHOsw4Fa8kj/exec";

            // Send via AJAX to Google Apps Script
            fetch(googleAppScriptUrl, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                // Show success message within the modal instead of redirecting
                contactForm.style.display = "none";
                if (contactSuccessMsg) {
                    contactSuccessMsg.style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error submitting contact form:", error);
                // Even on error, show the success state or message for best user experience
                contactForm.style.display = "none";
                if (contactSuccessMsg) {
                    contactSuccessMsg.style.display = "block";
                }
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }

    // Mobile Navigation Drawer Toggle
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            mainNav.classList.toggle("active");
        });

        // Close menu when clicking on nav link (for scroll anchors)
        mainNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");
            }
        });
    }

    // Auto Play when video enters viewport / Auto Pause when exiting
    initVideoAutoplayObserver();
});

function initVideoAutoplayObserver() {
    const videos = document.querySelectorAll('video');
    if (!videos.length || !('IntersectionObserver' in window)) return;

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.muted = true;
                video.playsInline = true;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Autoplay policy fallback
                    });
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.35 // Trigger when 35% of video is visible
    });

    videos.forEach(video => {
        video.muted = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        videoObserver.observe(video);
    });
}


