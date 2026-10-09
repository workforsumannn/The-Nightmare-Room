// admin-script.js — Admin dashboard logic
(function () {
  const channel = new BroadcastChannel('nightmare_room_channel');
  const monsterInput = document.getElementById('monsterName');
  const messageInput = document.getElementById('monsterMessage');
  const sendBtn = document.getElementById('sendBtn');
  const statusDiv = document.getElementById('adminStatus');

  const monsters = [
    'ZAGROTH', 'MALGROTH', 'VORTHRAX', 'NYXAR', 'KRULTHOS',
    'DRAVENMORE', 'SINTHAR', 'OBLIVIOUS', "XAL'THOR", 'MORDRED'
  ];

  if (monsterInput) {
    monsterInput.placeholder = monsters[Math.floor(Math.random() * monsters.length)];
  }

  function sendMessage() {
    const monster = monsterInput.value.trim() || monsterInput.placeholder || 'UNKNOWN HORROR';
    const message = messageInput.value.trim();

    if (!message) {
      statusDiv.textContent = '>> ERROR: MESSAGE CANNOT BE EMPTY';
      statusDiv.style.color = '#ff4444';
      setTimeout(() => {
        statusDiv.textContent = '>> AWAITING COMMAND';
        statusDiv.style.color = '#8b0000';
      }, 2000);
      return;
    }

    channel.postMessage({
      type: 'monster_message',
      monster: monster,
      message: message
    });

    statusDiv.textContent = `>> TRANSMISSION SENT: ${monster} speaks...`;
    statusDiv.style.color = '#ff0000';

    messageInput.value = '';

    sendBtn.style.transform = 'scale(0.96)';
    setTimeout(() => (sendBtn.style.transform = 'scale(1)'), 150);

    setTimeout(() => {
      statusDiv.textContent = '>> AWAITING COMMAND';
      statusDiv.style.color = '#8b0000';
    }, 3000);
  }

  sendBtn.addEventListener('click', sendMessage);

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  monsterInput.addEventListener('dblclick', () => {
    const idx = monsters.indexOf(monsterInput.value);
    monsterInput.value = monsters[(idx + 1) % monsters.length];
  });

  window.addEventListener('load', () => messageInput.focus());

  statusDiv.textContent = '>> AWAITING COMMAND';
  statusDiv.style.color = '#8b0000';

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target === monsterInput) {
      e.preventDefault();
      messageInput.focus();
    }
  });
})();