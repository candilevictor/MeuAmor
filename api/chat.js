const chatBox = document.getElementById("chat");
const input = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");

const user = localStorage.getItem("user") || prompt("Seu nome 💖");
localStorage.setItem("user", user);

// Carregar mensagens
async function loadMessages() {
    const res = await fetch("/api/chat");
    const data = await res.json();

    chatBox.innerHTML = "";

    data.messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = `message ${msg.user === user ? "me" : "other"}`;
        div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enviar mensagem
sendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    const res = await fetch("/api/chat");
    const data = await res.json();

    data.messages.push({
        user,
        text,
        time: Date.now()
    });

    await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    input.value = "";
    loadMessages();
});

// Limpar chat
clearBtn.addEventListener("click", async () => {
    if (!confirm("Tem certeza que deseja apagar o chat? 💔")) return;

    await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [] })
    });

    loadMessages();
});

// Atualização automática
setInterval(loadMessages, 3000);
loadMessages();
