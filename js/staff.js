/* ============================================
   Staff roster – tùy chỉnh avatar nội bộ
   Thay ảnh trong images/staff/ và chỉnh danh sách dưới đây
   ============================================ */

const STAFF_LIST = [
    {
        name: 'CoreAdmin',
        discord: 'core_admin',
        role: 'Quản trị viên',
        avatar: 'images/staff/coreadmin.webp' // đổi file ảnh tại đây
    },
    {
        name: 'ViegemOwner',
        discord: 'viegem_owner',
        role: 'Chủ sở hữu',
        avatar: 'images/staff/viegemowner.webp'
    },
    {
        name: 'MagicMod',
        discord: 'magic_mod',
        role: 'Điều hành viên',
        avatar: 'images/staff/magicmod.webp'
    },
    {
        name: 'SupportHelper',
        discord: 'support_helper',
        role: 'Hỗ trợ viên',
        avatar: 'images/staff/supporthelper.webp'
    },
    {
        name: 'RPGGuide',
        discord: 'rpg_guide',
        role: 'Hướng dẫn viên',
        avatar: 'images/staff/rpgguide.webp'
    },
    {
        name: 'BuilderArt',
        discord: 'builder_art',
        role: 'Builder',
        avatar: 'images/staff/builderart.webp'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('staff-grid');
    if (!grid) return;

    grid.innerHTML = STAFF_LIST.map((s, i) => {
        const delay = `reveal-delay-${(i % 6) + 1}`;
        return `
        <div class="staff-card reveal ${delay}">
            <img class="staff-avatar" src="${s.avatar}" alt="${s.name}"
                 loading="lazy"
                 onerror="this.src='images/logo.webp'">
            <div class="staff-name">${s.name}</div>
            <div class="staff-discord"><span>💬</span> ${s.discord}</div>
            <span class="staff-role">${s.role}</span>
        </div>`;
    }).join('');

    // Re-bind scroll reveal for dynamically added cards
    if (typeof initScrollReveal === 'function') {
        // Already ran; observe new elements
        const reveals = grid.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            reveals.forEach(el => observer.observe(el));
        } else {
            reveals.forEach(el => el.classList.add('visible'));
        }
    }
});
