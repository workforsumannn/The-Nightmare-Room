// admin-script.js

const logDisplay = document.getElementById('log-display');
const adminInput = document.getElementById('admin-input');
const sendBtn = document.getElementById('send-btn');

// Channel Setup
const channel = new BroadcastChannel('nightmare_channel');

// Log Function
function addLog(msg) {
    const div = document.createElement('div');
    div.innerText = `> ${msg}`;
    logDisplay.appendChild(div);
    logDisplay.scrollTop = logDisplay.scrollHeight;
}

// Send Message
sendBtn.addEventListener('click', () => {
    const msg = adminInput.value;
    if (msg.trim() !== "") {
        channel.postMessage({ type: 'message', content: msg });
        addLog(`Sent: "${msg}"`);
        adminInput.value = "";
    }
});

// Trigger Sound on Victim Side
function triggerSound() {
    channel.postMessage({ type: 'sound' });
    addLog("Triggered Scare Sound");
}

// Force Glitch on Victim Side
function triggerGlitch() {
    channel.postMessage({ type: 'glitch' });
    addLog("Forced Glitch on Victim Screen");
}

// Listen for Victim Actions (Optional: If victim clicks something, admin can know)
channel.onmessage = (event) => {
    const data = event.data;
    if (data.type === 'connected') {
        addLog("Victim Connected!");
    }
};

// Notify Admin that this tab is open and ready
addLog("Admin Panel Ready. Send Ctrl+A or click buttons.");