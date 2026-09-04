/* ============================================
   VIEGEM - Main JavaScript
   Header, smooth scroll, mobile menu, utilities
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSmoothScroll();
    initMobileMenu();
    initScrollReveal();
});

/* ---------- Sticky Header scroll effect ---------- */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ---------- Smooth scroll without # in URL ---------- */
function initSmoothScroll() {
    // Desktop + mobile nav links
    document.querySelectorAll('[data-scroll]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = el.getAttribute('data-scroll');
            const target = document.getElementById(targetId);
            if (target) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                const hamburger = document.querySelector('.hamburger');
                if (mobileMenu) mobileMenu.classList.remove('open');
                if (hamburger) hamburger.classList.remove('active');

                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------- Mobile Hamburger Menu ---------- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
        }
    });
}

/* ---------- Utility: Toast notification ---------- */
function showToast(message, duration = 2000) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Force reflow then show
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 350);
    }, duration);
}

/* ---------- Scroll Reveal (Intersection Observer) ---------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const titles = document.querySelectorAll('.section-title');

    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('visible'));
        titles.forEach(el => el.classList.add('underline-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once revealed, stop observing for performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));

    // Section title underline
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('underline-visible');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    titles.forEach(el => titleObserver.observe(el));
}
