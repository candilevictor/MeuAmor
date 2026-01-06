// ================= MODAL =================
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ================= CORAÇÕES PRINCIPAL =================
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

// ================= LOGIN =================
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const loginName = document.getElementById("loginName");
const loginPass = document.getElementById("loginPass");
const loginError = document.getElementById("loginError");

// Checar se já está logado
if (localStorage.getItem("isLoggedIn") === "true") {
    loginModal.style.display = "none";
} else {
    loginModal.style.display = "flex";
}

// ================= CORAÇÕES MODAL =================
function createHeartModal() {
    const heart = document.createElement('div');
    heart.classList.add('heart-modal');
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 90 + '%';
    heart.style.fontSize = (12 + Math.random() * 18) + 'px';
    loginModal.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}
const heartInterval = setInterval(createHeartModal, 300);

// ================= BOTÃO LOGIN =================
loginBtn.addEventListener("click", async () => {
    try {
        // Chama a API de login segura no backend
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: loginName.value,
                password: loginPass.value
            })
        });

        const data = await response.json();

        if (data.success) {
            // Animação de fade out
            loginModal.style.animation = "fadeOut 0.8s forwards";
            setTimeout(() => {
                loginModal.style.display = "none";
                localStorage.setItem("isLoggedIn", "true");
                clearInterval(heartInterval); // para os corações
            }, 800);
        } else {
            loginError.textContent = "Ops… só nós dois podemos entrar 💖";
            loginPass.value = "";
        }

    } catch (err) {
        loginError.textContent = "Ops… algo deu errado 💖";
        console.error(err);
    }
});

// ================= ESTILO ANIMAÇÃO FADE OUT =================
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(style);
