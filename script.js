document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("surpriseBtn");
    const box = document.getElementById("surpriseBox");

    if (button && box) {
        button.addEventListener("click", () => {
            box.hidden = false;
            button.hidden = true;
            createConfetti(70);
        });
    }

    function createConfetti(amount = 100) {
        const colors = ["#ff6846", "#f3f0e9", "#e8bd57", "#cf5d45"];
        for (let i = 0; i < amount; i += 1) {
            const piece = document.createElement("span");
            piece.className = "confetti";
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.setProperty("--move", `${Math.random() * 220 - 110}px`);
            piece.style.setProperty("--rotate", `${Math.random() * 720}deg`);
            piece.style.animationDuration = `${3 + Math.random() * 3}s`;
            piece.style.animationDelay = `${Math.random() * 0.5}s`;
            document.body.appendChild(piece);
            window.setTimeout(() => piece.remove(), 7000);
        }
    }
});
