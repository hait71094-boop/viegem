/* ============================================
   Copy IP Button Handler - viegem.net
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-ip-btn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        const ip = 'viegem.net';
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(ip);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = ip;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            if (typeof showToast === 'function') {
                showToast('Đã sao chép IP: viegem.net');
            } else {
                const original = copyBtn.innerHTML;
                copyBtn.innerHTML = '✓ Đã copy';
                setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
            }
        } catch (err) {
            console.error('Copy failed:', err);
            if (typeof showToast === 'function') {
                showToast('Không thể sao chép. Hãy copy thủ công!');
            }
        }
    });
});
