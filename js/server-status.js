/* ============================================
   Server Status Checker - viegem.net
   Uses mcsrvstat.us API
   ============================================ */

const SERVER_IP = 'viegem.net';
const API_URL = `https://api.mcsrvstat.us/3/${SERVER_IP}`;
const REFRESH_INTERVAL = 60000;

document.addEventListener('DOMContentLoaded', () => {
    fetchServerStatus();
    setInterval(fetchServerStatus, REFRESH_INTERVAL);
});

async function fetchServerStatus() {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const playersText = document.getElementById('players-text');
    const versionText = document.getElementById('version-text');
    const serverIcon = document.getElementById('server-icon');
    const motdEl = document.getElementById('server-motd');

    if (!statusDot || !statusText) return;

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('API response not ok');
        const data = await response.json();

        if (serverIcon && data.icon) {
            serverIcon.src = data.icon;
            serverIcon.style.display = 'block';
        }

        if (data.online) {
            statusDot.className = 'status-dot online';
            statusText.textContent = 'Online';
            statusText.style.color = 'var(--success)';

            if (data.players) {
                const online = data.players.online ?? 0;
                const max = data.players.max ?? '?';
                if (playersText) playersText.textContent = `${online}/${max} người chơi`;
            } else if (playersText) {
                playersText.textContent = '—';
            }

            if (versionText) {
                let ver = '—';
                if (data.motd && data.motd.clean) {
                    const joined = data.motd.clean.join(' ');
                    const match = joined.match(/([\d]+\.[\d]+(?:\.[\d]+)?[\+]*)/);
                    if (match) ver = match[1];
                }
                if (ver === '—' && data.version) ver = data.version;
                versionText.textContent = ver;
            }

            if (motdEl && data.motd && data.motd.clean) {
                motdEl.textContent = data.motd.clean.map(l => l.trim()).filter(Boolean).join(' — ');
            }
        } else {
            setOffline(statusDot, statusText, playersText, versionText);
        }
    } catch (err) {
        console.warn('Không thể kiểm tra trạng thái server:', err);
        if (statusDot) statusDot.className = 'status-dot offline';
        if (statusText) {
            statusText.textContent = 'Không thể kiểm tra';
            statusText.style.color = 'var(--gray-text)';
        }
        if (playersText) playersText.textContent = '—';
        if (versionText) versionText.textContent = '—';
    }
}

function setOffline(dot, text, players, version) {
    if (dot) dot.className = 'status-dot offline';
    if (text) {
        text.textContent = 'Offline';
        text.style.color = 'var(--offline)';
    }
    if (players) players.textContent = '0/?';
    if (version) version.textContent = '—';
}
