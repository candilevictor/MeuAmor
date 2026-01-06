// LOGIN
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const loginName = document.getElementById("loginName");
const loginPass = document.getElementById("loginPass");
const loginError = document.getElementById("loginError");

// Usuários válidos
const users = [
    { name: "Giovanna", pass: "AmorDoVictor" },
    { name: "Victor", pass: "AmorDaGiovanna" }
];

// Checar se já está logado
if (localStorage.getItem("isLoggedIn") === "true") {
    loginModal.style.display = "none";
} else {
    loginModal.style.display = "flex";
}

// Função para criar corações no modal
function createHeartModal() {
    const heart = document.createElement('div');
    heart.classList.add('heart-modal');
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 90 + '%';
    heart.style.fontSize = (12 + Math.random() * 18) + 'px';
    loginModal.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}

// Criar corações aleatórios a cada 300ms
const heartInterval = setInterval(createHeartModal, 300);

loginBtn.addEventListener("click", () => {
    const user = users.find(u => u.name === loginName.value && u.pass === loginPass.value);

    if (user) {
        loginModal.style.animation = "fadeOut 0.8s forwards"; // animação de saída
        setTimeout(() => {
            loginModal.style.display = "none";
            localStorage.setItem("isLoggedIn", "true");
            clearInterval(heartInterval); // parar corações
        }, 800);
    } else {
        loginError.textContent = "Ops… só nós dois podemos entrar 💖";
        loginPass.value = "";
    }
});

// Animação de fadeOut para modal
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(style);

// TELA DE CARREGAMENTO
const loadingScreen = document.getElementById("loadingScreen");

// Esconde a tela de carregamento quando o site termina de carregar
window.addEventListener("load", () => {
    setTimeout(() => {
        loadingScreen.classList.add("hidden");
    }, 1000); // 1 segundo de delay para mostrar o efeito
});

const menuItems = document.querySelectorAll('.desktop-menu .menu-item');
const sections = document.querySelectorAll('header, section');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.dataset.target;
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ATIVA MENU CONFORME SCROLL */
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === current) {
            item.classList.add('active');
        }
    });
});
