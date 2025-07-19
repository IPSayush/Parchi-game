document.addEventListener("DOMContentLoaded", () => {
    const divs = document.querySelectorAll(".parchi");
    const btn = document.querySelector(".start-btn");
    const restartBtn = document.querySelector(".restart-btn");
    const rankBtn = document.querySelector(".show-rank");

    // rankBtn.innerText = "Show Rankings";
    // rankBtn.className = "rank-btn";
    // document.querySelector(".btn-div").appendChild(rankBtn); // Add button to UI

    const scores = { 
        "Raja": 1000, 
        "Chor": 0, 
        "Sipahi": 400, 
        "Bajeer": 800 
    };

    const playerScores = [[], [], [], []]; // Score history for players
    const totalScores = [0, 0, 0, 0]; // Total scores

    const scoreElements = [
        document.querySelector(".pl-1-sc li"),
        document.querySelector(".pl-2-sc li"),
        document.querySelector(".pl-3-sc li"),
        document.querySelector(".pl-4-sc li"),
    ];

    const resultDiv = document.querySelector(".result-h2");

    btn.addEventListener("click", startGame);
    // restartBtn.addEventListener("click", resetGame);
    rankBtn.addEventListener("click", showRankings);

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
        document.querySelector(".start-btn").innerHTML = "Fold and Throw again"

    }
    function updateScore(playerIndex, role) {
        const score = scores[role]; // Get score from predefined values
        playerScores[playerIndex].push(score); // Store score history
        totalScores[playerIndex] += score; // Add to total score

        // Update score in UI
        scoreElements[playerIndex].innerHTML = playerScores[playerIndex].join("<br>");
    }

    // function resetGame() {
    //     divs.forEach((div) => {
    //         div.innerHTML = "?"; // Reset parchis
    //         div.style.opacity = "1"; // Show all parchis
            
    //     });
    // }

    function showRankings() {
        const rankings = totalScores.map((score, index) => ({ player: `Player ${index + 1}`, score }))
                                  .sort((a, b) => b.score - a.score); // Sort players by score

        let rankText = "<h3>🏆 Player Rankings 🏆</h3>";
        rankings.forEach((player, index) => {
            const medals = ["🥇", "🥈", "🥉", "🏅"];
            rankText += `<p>${medals[index]} ${player.player}: ${player.score} points</p>`;
        });

        resultDiv.innerHTML = rankText; // Display rankings
    }
    
});


