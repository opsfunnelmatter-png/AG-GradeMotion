document.addEventListener("DOMContentLoaded", () => {
    // Initialize interactive elements and links since sections are statically compiled
    if (typeof initNavigationScroll === "function") {
        initNavigationScroll();
    }
    if (typeof initScrollReveals === "function") {
        initScrollReveals();
    }
    if (typeof initActiveNavOnScroll === "function") {
        initActiveNavOnScroll();
    }
    if (typeof countUpAnimations === "function") {
        countUpAnimations();
    }
});
