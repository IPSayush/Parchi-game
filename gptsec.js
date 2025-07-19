
document.addEventListener("DOMContentLoaded", () => {
    const divs = document.querySelectorAll(".parchi");
    const btn = document.querySelector(".start-btn");
    const restartBtn = document.querySelector(".restart-btn");

    const scores = { 
        "Raja": 1000, 
        "Chor": 0, 
        "Sipahi": 400, 
        "Bajeer": 800 
    };

    const playerScores = [[], [], [], []]; // Score history for players

    const scoreElements = [
        document.querySelector(".pl-1-sc li"),
        document.querySelector(".pl-2-sc li"),
        document.querySelector(".pl-3-sc li"),
        document.querySelector(".pl-4-sc li"),
    ];

    btn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", resetGame);

    function startGame() {
        const arr = ["Raja", "Chor", "Sipahi", "Bajeer"];

        // Shuffle array using Fisher-Yates algorithm
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        divs.forEach((div, index) => {
            div.innerHTML = arr[index];
            div.style.opacity = "1"; // Make all parchis visible
        });

        // Hide "Chor" and "Sipahi" parchis initially
        divs.forEach((div, index) => {
            if (div.innerHTML === "Chor" || div.innerHTML === "Sipahi") {
                div.style.opacity = "0"; // Hide the parchi
                div.onclick = function () {
                    div.style.opacity = "1"; // Reveal on click
                    updateScore(index, div.innerHTML);
                };
            } else {
                updateScore(index, div.innerHTML);
            }
        });
    }

    function updateScore(playerIndex, role) {
        const score = scores[role]; // Get score from predefined values
        playerScores[playerIndex].push(score); // Store score history

        // Update score in UI
        scoreElements[playerIndex].innerHTML = playerScores[playerIndex].join("<br>");
    }

    function resetGame() {
        divs.forEach((div) => {
            div.innerHTML = "?"; // Reset parchis
            div.style.opacity = "1"; // Show all parchis
        });
    }
});
