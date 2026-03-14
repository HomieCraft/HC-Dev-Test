document.addEventListener("DOMContentLoaded", function () {

/* ------------------------------ */
/* BURGER MENU */
/* ------------------------------ */
window.toggleMenu = function () {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar) sidebar.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
};

/* ------------------------------ */
/* COPY SERVER IP */
/* ------------------------------ */
window.copyIP = function () {
    navigator.clipboard.writeText("homiecraft-smp.aternos.me");
    const btn = document.querySelector(".btn-primary");
    if (btn) {
        btn.innerText = "✔ Kopiert";
        setTimeout(() => btn.innerText = "IP kopieren", 2000);
    }
};

/* ------------------------------ */
/* SCROLL TO TOP BUTTON */
/* ------------------------------ */
const scrollBtn = document.getElementById("scrollTop");
window.onscroll = function () {
    if (scrollBtn) {
        scrollBtn.style.display = document.documentElement.scrollTop > 400 ? "block" : "none";
    }
    fadeInSections();
};

window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ------------------------------ */
/* ACCORDION FUNCTIONALITY */
/* ------------------------------ */
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    });
});

/* ------------------------------ */
/* SERVER STATUS API */
/* ------------------------------ */
function loadServerStatus() {
    fetch("https://api.mcsrvstat.us/2/homiecraft-smp.aternos.me")
    .then(res => res.json())
    .then(data => {
        const statusEl = document.getElementById("server-status");
        const statusCard = document.getElementById("status-card");
        const playersCard = document.getElementById("players-card");
        const statusDot = document.getElementById("status-dot");
        const playerCount = document.getElementById("player-count");

        if (!data) return;

        if (data.online) {
            const online = data.players?.online ?? 0;
            const max = data.players?.max ?? 30;

            if (statusEl) statusEl.innerHTML = "Online";
            if (statusDot) { statusDot.style.background = "#22c55e"; statusDot.style.boxShadow = "0 0 10px #22c55e"; }
            if (statusCard) statusCard.innerHTML = "Status: 🟢 Online";
            if (playersCard) playersCard.innerHTML = `Spieler: ${online}/${max}`;
            if (playerCount) animateCounter(playerCount, online);
        } else {
            if (statusEl) statusEl.innerHTML = "Offline";
            if (statusDot) { statusDot.style.background = "#ef4444"; statusDot.style.boxShadow = "0 0 10px #ef4444"; }
            if (statusCard) statusCard.innerHTML = "Status: 🔴 Offline";
            if (playersCard) playersCard.innerHTML = "Spieler: 0/30";
            if (playerCount) animateCounter(playerCount, 0);
        }
    })
    .catch(() => {
        const statusEl = document.getElementById("server-status");
        if (statusEl) statusEl.innerHTML = "⚠ API Fehler";
    });
}
loadServerStatus();
setInterval(loadServerStatus, 60000);

/* ------------------------------ */
/* PLAYER COUNTER ANIMATION */
/* ------------------------------ */
function animateCounter(el, target) {
    let current = 0;
    const step = () => {
        current += Math.ceil(target / 20);
        if (current >= target) current = target;
        el.textContent = current;
        if (current < target) requestAnimationFrame(step);
    };
    step();
}

/* ------------------------------ */
/* TEAM SYSTEM */
/* ------------------------------ */
const teamMembers = [
    { name: "LucaMaximal", rank: "owner" },
    { name: "Eierfratze0815", rank: "owner" },
    { name: "LucaMaximal", rank: "developer" },
    { name: "? Unbekannt", rank: "mod" },
    { name: "? Unbekannt", rank: "support" },
    { name: "? GESUCHT! GESUCHT!", rank: "builder" },
    { name: "? GESUCHT! GESUCHT!", rank: "creator" },
    { name: "? Unbekannt", rank: "homie" }
];

const teamContainer = document.getElementById("team-container");
if (teamContainer) {
    teamMembers.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="https://mc-heads.net/avatar/${member.name}" style="width:80px;border-radius:8px;margin-bottom:10px;">
            <h3>${member.name}</h3>
            <p class="rank-${member.rank}">${member.rank.toUpperCase()}</p>
        `;
        card.addEventListener("mouseover", () => {
            card.style.transform = "translateY(-7px)";
            card.style.boxShadow = `0 0 15px var(--${member.rank})`;
        });
        card.addEventListener("mouseout", () => {
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "";
        });
        teamContainer.appendChild(card);
    });
}

/* ------------------------------ */
/* FADE IN SECTIONS ON SCROLL */
/* ------------------------------ */
function fadeInSections() {
    document.querySelectorAll(".section,.hero").forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
}

/* ------------------------------ */
/* PARTICLES BACKGROUND */
/* ------------------------------ */
const canvas = document.getElementById("particles");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    for (let i = 0; i < 90; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            color: Math.random() > 0.5 ? "#00e5ff" : "#a855f7"
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ------------------------------ */
/* SIDEBAR LINKS CLOSE ON CLICK */
/* ------------------------------ */
document.querySelectorAll("#sidebar a").forEach(link => {
    link.addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");
        if (sidebar) sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
    });
});

/* ------------------------------ */
/* SCREENSHOT LIGHTBOX */
/* ------------------------------ */
document.querySelectorAll(".screenshots img").forEach(img => {
    img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.classList.add("image-lightbox");
        const big = document.createElement("img");
        big.src = img.src;
        overlay.appendChild(big);
        overlay.addEventListener("click", () => overlay.remove());
        document.body.appendChild(overlay);
    });
});

/* ------------------------------ */
/* HERO LOAD ANIMATION + IP TYPE */
/* ------------------------------ */
window.addEventListener("load", () => {
    document.querySelectorAll(".hero-title,.subtitle,.hero-buttons").forEach(el => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
    });

    // Typing Animation für IP
    const el = document.querySelector(".server-ip");
    if (el) {
        const text = "homiecraft-smp.aternos.me";
        let i = 0;
        el.textContent = "";
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40);
            }
        }
        type();
    }
});
