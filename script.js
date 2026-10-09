// script.js (For Victim Page)

const bgMusic = new Audio('bg_music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

// 1. Entry Trap
document.body.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {});
    }
    bgMusic.play().catch(e => console.log("Audio wait"));
}, { once: false });

// 2. Exit Button Logic
const exitBtn = document.getElementById('exit-btn');
let exitClickCount = 0;

exitBtn.addEventListener('click', () => {
    exitClickCount++;
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    
    exitBtn.style.position = 'absolute';
    exitBtn.style.left = `${x}px`;
    exitBtn.style.top = `${y}px`;
    
    document.body.classList.add('glitch-active');
    setTimeout(() => document.body.classList.remove('glitch-active'), 300);
    
    // Random scare sound
    if (Math.random() > 0.5) playScareSound();

    if (exitClickCount > 5) {
        alert("YOU CANNOT LEAVE YET.");
        exitBtn.style.display = 'none';
        setTimeout(() => exitBtn.style.display = 'block', 2000);
    }
});

function playScareSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'); // Placeholder
    audio.play().catch(()=>{});
}

// 3. BroadcastChannel: Listen to Admin
const channel = new BroadcastChannel('nightmare_channel');
channel.onmessage = (event) => {
    const data = event.data;
    
    if (data.type === 'message') {
        const area = document.getElementById('admin-message-area');
        const p = document.createElement('div');
        p.innerText = "> ADMIN: " + data.content;
        p.style.animation = "pulse 0.5s";
        area.appendChild(p);
        
        // Scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    if (data.type === 'sound') {
        playScareSound();
    }
};

// 4. Random Glitches
setInterval(() => {
    if (Math.random() > 0.9) {
        document.body.classList.add('glitch-active');
        setTimeout(() => document.body.classList.remove('glitch-active'), 100);
    }
}, 2000);

// 5. Prevent Close
window.onbeforeunload = function() {
    return "Are you sure you want to leave the nightmare?";
};

// 6. Custom Cursor
document.addEventListener('mousemove', (e) => {
    const svg = document.getElementById('cursor-icon');
    svg.style.left = e.pageX + 'px';
    svg.style.top = e.pageY + 'px';
});