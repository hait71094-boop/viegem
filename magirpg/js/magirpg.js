/* ============================================
   MagiRPG Page – Wiki Markdown + Slider
   Hướng dẫn công khai, admin chỉ cần sửa file .md
   ============================================ */

const GUIDE_FALLBACK = {
  "bang-hoi.md": "# Cách tạo bang hội\n\nBang hội (Guild) giúp bạn cùng bạn bè chinh phục dungeon và boss.\n\n## Yêu cầu tạo bang\n\n- Cấp độ nhân vật ≥ **15**\n- Có **5.000 coins**\n- Sở hữu **Guild Token** (mua tại NPC)\n\n## Lệnh chính\n\n| Lệnh | Mô tả |\n|------|--------|\n| `/guild create [tên]` | Tạo bang |\n| `/guild invite [player]` | Mời thành viên |\n| `/guild home` | Về căn cứ bang |\n| `/guild leave` | Rời bang |\n\n## Quyền lợi\n\n- Kho chung bang hội\n- Buff khi chơi cùng thành viên\n- Chiến trường bang hội (Guild War) cuối tuần\n",
  "bat-dau.md": "# Hướng dẫn bắt đầu\n\nChào mừng bạn đến với **MagiRPG** trên máy chủ VIEGEM!\n\n## 1. Tạo nhân vật\n\nKhi vào server lần đầu, bạn sẽ được đưa đến khu vực chọn class. Hiện có 4 class chính:\n\n- **Pháp sư** — Sử dụng phép thuật nguyên tố\n- **Chiến binh** — Cận chiến mạnh mẽ\n- **Cung thủ** — Tấn công từ xa\n- **Thầy thuốc** — Hỗ trợ và hồi máu\n\n## 2. Nhiệm vụ đầu tiên\n\nNói chuyện với NPC Hướng dẫn viên tại thành phố **Aurelia** để nhận nhiệm vụ tutorial.\n\n## 3. Lệnh hữu ích\n\n| Lệnh | Mô tả |\n|------|--------|\n| `/spawn` | Về thành phố chính |\n| `/skills` | Mở bảng kỹ năng |\n| `/quest` | Xem nhiệm vụ đang làm |\n| `/home` | Về nhà của bạn |\n\n> Mẹo: Đọc kỹ chat khi vào game — hệ thống sẽ hướng dẫn từng bước.\n",
  "boss.md": "# Hướng dẫn đánh Boss\n\nBoss trong MagiRPG có nhiều giai đoạn và cơ chế đặc biệt.\n\n## Boss nổi bật\n\n- **Lich King** — Dungeon Hắc Ám (Level 45+)\n- **Fire Drake** — Núi Lửa (Level 35+)\n- **Ocean Guardian** — Đảo bị lãng quên\n\n## Chuẩn bị\n\n1. Mang đủ potion hồi máu và mana\n2. Team lý tưởng: **4–8 người**\n3. Đọc kỹ cơ chế boss trước khi vào (NPC hoặc wiki)\n4. Phân vai rõ: tank, DPS, support\n\n## Lưu ý\n\nNếu chết nhiều lần liên tiếp, hãy quay lại farm thêm gear rồi thử lại. Đừng vội!\n",
  "cay-cap.md": "# Hướng dẫn cày cấp\n\nCách hiệu quả để lên cấp nhanh trong MagiRPG.\n\n## Khu vực theo level\n\n| Level | Khu vực |\n|-------|---------|\n| 1–10 | Rừng bắt đầu (Aurelia Forest) |\n| 10–25 | Hang động Crystal Cave |\n| 25–40 | Đầm lầy Shadow Swamp |\n| 40+ | Dungeon Hắc Ám |\n\n## Mẹo\n\n- Luôn hoàn thành **daily quest**\n- Tham gia event cuối tuần để nhận **x2 EXP**\n- Chơi theo nhóm sẽ nhanh hơn solo\n- Đừng bỏ qua side quest — chúng cho nhiều EXP\n",
  "phep-thuat.md": "# Hệ thống phép thuật\n\nHệ thống phép thuật của MagiRPG rất sâu và đa dạng.\n\n## Mana & Cooldown\n\nMỗi skill tiêu tốn **mana**. Mana tự hồi theo thời gian hoặc bằng potion.\n\n## Nguyên tố\n\n- **Hỏa** — Sát thương cao, đốt cháy\n- **Băng** — Làm chậm, đóng băng\n- **Lôi** — Tấn công nhanh, gây choáng\n- **Thảo** — Hồi máu, buff\n\n## Combo\n\nKết hợp skill đúng thứ tự sẽ kích hoạt combo mạnh hơn. Xem chi tiết trong game bằng lệnh `/skills`.\n\n## Nâng cấp\n\nMở bảng skill và dùng điểm kỹ năng (Skill Point) nhận được khi lên cấp để nâng cấp từng phép.\n"
};

const GUIDE_BASE = 'guides/';

const WIKI_ITEMS = [
    { id: 'bat-dau', file: 'bat-dau.md', icon: '📜', title: 'Hướng dẫn bắt đầu', summary: 'Chọn class, nhiệm vụ đầu tiên và lệnh cơ bản.' },
    { id: 'phep-thuat', file: 'phep-thuat.md', icon: '🧙', title: 'Hệ thống phép thuật', summary: 'Mana, nguyên tố, skill, combo và nâng cấp.' },
    { id: 'bang-hoi', file: 'bang-hoi.md', icon: '🏰', title: 'Cách tạo bang hội', summary: 'Yêu cầu, lệnh và quyền lợi Guild.' },
    { id: 'cay-cap', file: 'cay-cap.md', icon: '⚔️', title: 'Hướng dẫn cày cấp', summary: 'Khu vực theo level, daily quest và mẹo EXP.' },
    { id: 'boss', file: 'boss.md', icon: '🐉', title: 'Hướng dẫn đánh Boss', summary: 'Cơ chế, team và chiến thuật boss lớn.' }
];

document.addEventListener('DOMContentLoaded', () => {
    renderWikiList();
    initWikiModal();
    initSlider();
});

function renderWikiList() {
    const list = document.querySelector('.wiki-list');
    if (!list) return;
    list.innerHTML = WIKI_ITEMS.map((item, i) => `
        <div class="wiki-item reveal reveal-delay-${i + 1}" data-file="${item.file}" data-title="${item.title}">
            <div class="wiki-icon">${item.icon}</div>
            <div class="wiki-info">
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            </div>
            <span class="wiki-arrow">→</span>
        </div>
    `).join('');

    // reveal
    const reveals = list.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => obs.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('visible'));
    }
}

/* Simple Markdown → HTML (headings, lists, bold, italic, code, tables, quotes) */
function mdToHtml(md) {
    let html = md
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // code blocks
    html = html.replace(/```[\s\S]*?```/g, (block) => {
        const code = block.slice(3, -3).replace(/^\w*\n/, '');
        return '<pre><code>' + code.trim() + '</code></pre>';
    });

    // tables
    html = html.replace(/(?:^\|.+\|[ \t]*\n){2,}/gm, (table) => {
        const rows = table.trim().split('\n').filter(r => r.trim());
        if (rows.length < 2) return table;
        const parseRow = (row) => row.split('|').slice(1, -1).map(c => c.trim());
        const isSep = (row) => /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(row);
        let out = '<table class="md-table"><thead><tr>';
        const headers = parseRow(rows[0]);
        headers.forEach(h => { out += '<th>' + inlineMd(h) + '</th>'; });
        out += '</tr></thead><tbody>';
        rows.slice(1).forEach(row => {
            if (isSep(row)) return;
            out += '<tr>';
            parseRow(row).forEach(c => { out += '<td>' + inlineMd(c) + '</td>'; });
            out += '</tr>';
        });
        out += '</tbody></table>';
        return out;
    });

    // headings
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');

    // blockquote
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

    // ul
    html = html.replace(/((?:^[\-\*] .+(?:\n|$))+)/gm, (block) => {
        const items = block.trim().split('\n').map(l => '<li>' + inlineMd(l.replace(/^[\-\*] /, '')) + '</li>').join('');
        return '<ul>' + items + '</ul>';
    });

    // paragraphs
    html = html.split(/\n{2,}/).map(block => {
        block = block.trim();
        if (!block) return '';
        if (/^<(h[2-4]|ul|ol|pre|table|blockquote)/.test(block)) return block;
        return '<p>' + inlineMd(block.replace(/\n/g, '<br>')) + '</p>';
    }).join('\n');

    return html;
}

function inlineMd(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>');
}

function initWikiModal() {
    const contentModal = document.getElementById('content-modal');
    if (!contentModal) return;

    document.querySelector('.wiki-list')?.addEventListener('click', async (e) => {
        const item = e.target.closest('.wiki-item');
        if (!item) return;
        const file = item.dataset.file;
        const title = item.dataset.title;
        const bodyEl = document.getElementById('content-body');
        const titleEl = document.getElementById('content-title');
        titleEl.textContent = title;
        bodyEl.innerHTML = '<p style="color:var(--gray-text)">Đang tải...</p>';
        contentModal.classList.add('active');

        try {
            let md = '';
            try {
                const res = await fetch(GUIDE_BASE + file);
                if (res.ok) md = await res.text();
            } catch (_) {}
            if (!md && typeof GUIDE_FALLBACK !== 'undefined' && GUIDE_FALLBACK[file]) {
                md = GUIDE_FALLBACK[file];
            }
            if (!md) throw new Error('Not found');
            bodyEl.innerHTML = mdToHtml(md);
        } catch (err) {
            bodyEl.innerHTML = '<p style="color:var(--offline)">Không tải được hướng dẫn. Kiểm tra file <code>guides/' + file + '</code>.</p>';
        }
    });

    contentModal.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => contentModal.classList.remove('active'));
    });
    contentModal.addEventListener('click', (e) => {
        if (e.target === contentModal) contentModal.classList.remove('active');
    });
}

/* Image Slider */
function initSlider() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;
    let autoplayTimer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Ảnh ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        resetAutoplay();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(next, 4000);
    }
    resetAutoplay();

    const container = document.querySelector('.slider-container');
    container.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    container.addEventListener('mouseleave', resetAutoplay);
}
