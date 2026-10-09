// script.js — Victim (Dare) page logic
(function () {
  const messageArea = document.getElementById('messageArea');
  const emptyState = document.getElementById('emptyState');
  const replyInput = document.getElementById('replyInput');
  const replyBtn = document.getElementById('replyBtn');
  const hellAudio = document.getElementById('hellAudio');

  // --- BroadcastChannel ---
  const channel = new BroadcastChannel('nightmare_room_channel');

  // --- Audio autoplay try ---
  function tryPlayAudio() {
    if (hellAudio && hellAudio.paused) {
      hellAudio.volume = 0.25;
      hellAudio.play().catch(() => {});
    }
  }
  document.body.addEventListener('click', tryPlayAudio, { once: true });
  document.body.addEventListener('touchstart', tryPlayAudio, { once: true });

  // --- Shake screen ---
  function shakeScreen() {
    document.body.classList.add('shake-hard');
    setTimeout(() => document.body.classList.remove('shake-hard'), 450);
  }

  // --- Escape helper ---
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  // --- Create dare message box ---
  // NOTE: "admin" ka koi zikr nahi — sirf monster ka naam dikhta hai
  function createDareMessage(monsterName, text) {
    const box = document.createElement('div');
    box.className = 'message-box';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'monster-name';
    nameDiv.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
      <span>${escapeHtml(monsterName)}</span>
    `;

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;

    const timeDiv = document.createElement('span');
    timeDiv.className = 'message-time';
    const now = new Date();
    timeDiv.textContent = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}] · from the abyss`;

    box.appendChild(nameDiv);
    box.appendChild(textDiv);
    box.appendChild(timeDiv);
    return box;
  }

  // --- Receive messages ---
  channel.onmessage = (event) => {
    const data = event.data;
    if (!data || data.type !== 'monster_message') return;

    const monster = data.monster || 'UNKNOWN ENTITY';
    const message = data.message || '...';

    if (emptyState && emptyState.parentNode) emptyState.remove();

    const msgBox = createDareMessage(monster, message);
    messageArea.appendChild(msgBox);

    messageArea.scrollTo({ top: messageArea.scrollHeight, behavior: 'smooth' });
    shakeScreen();
    tryPlayAudio();

    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
  };

  // --- Reply trap ---
  replyInput.disabled = true;
  replyBtn.disabled = true;

  replyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('There is no escape. The darkness listens but never answers.');
  });
  replyInput.addEventListener('focus', () => replyInput.blur());
  replyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      alert('There is no escape. The darkness listens but never answers.');
    }
  });

  // --- Random shakes ---
  setInterval(() => {
    if (Math.random() > 0.65) shakeScreen();
  }, 15000);

  // --- Block right click ---
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  tryPlayAudio();
})();