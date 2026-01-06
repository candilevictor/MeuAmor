function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 5) + 's';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 300);

// ================== CHAT ==================
async function loadMessages() {
    const res = await fetch("/api/chat");
    const data = await res.json();

    const chat = document.getElementById("chat");
    chat.innerHTML = "";

    data.messages.forEach(m => {
        const div = document.createElement("div");
        div.className = "message";
        div.innerHTML = `<strong>${m.user}:</strong> ${m.text}`;
        chat.appendChild(div);
    });

    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("msgInput");
    if (!input.value.trim()) return;

    const res = await fetch("/api/chat");
    const data = await res.json();

    data.messages.push({
        user: localStorage.getItem("user"),
        text: input.value
    });

    await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    input.value = "";
    loadMessages();
}

// Define nome uma única vez
if (!localStorage.getItem("user")) {
    localStorage.setItem("user", prompt("Digite seu nome 💖"));
}

loadMessages();
