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
    heart.style.fontSize = (15 + Math.random() * 15) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 5) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}

const menuToggle = document.getElementById("menuToggle");
const menuLinks = document.getElementById("menuLinks");

menuToggle.addEventListener("click", () => {
    menuLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
});

document.querySelectorAll(".menu-links a").forEach(link => {
    link.addEventListener("click", () => {
        menuLinks.classList.remove("active");
        menuToggle.classList.remove("open");
    });
});


setInterval(createHeart, 300);