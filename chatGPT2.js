document.addEventListener("DOMContentLoaded", () => {
    const divs = document.querySelectorAll(".parchi");
    const btn = document.querySelector(".start-btn");
    const rankBtn = document.querySelector(".show-rank");

    const scores = { 
        "Raja": 1000, 
        "Chor": 0, 
        "Sipahi": 400, 
        "Bajeer": 800 
    };

    const playerScores = [[], [], [], []]; // खिलाड़ियों के स्कोर इतिहास
    const totalScores = [0, 0, 0, 0]; // कुल स्कोर

    const scoreElements = [
        document.querySelector(".pl-1-sc li"),
        document.querySelector(".pl-2-sc li"),
        document.querySelector(".pl-3-sc li"),
        document.querySelector(".pl-4-sc li"),
    ];

    const resultDiv = document.querySelector(".result-h2");

    btn.addEventListener("click", startGame);
    rankBtn.addEventListener("click", showRankings);

    function startGame() {
        const arr = ["Raja", "Chor", "Sipahi", "Bajeer"];

        // Fisher-Yates एल्गोरिदम का उपयोग करके ऐरे को शफल करें
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        divs.forEach((div, index) => {
            div.innerHTML = arr[index];
            div.style.opacity = "1"; // सभी पर्चियों को दिखाएं
        });

        // प्रारंभ में "Chor" और "Sipahi" पर्चियों को छिपाएं
        divs.forEach((div, index) => {
            if (div.innerHTML === "Chor" || div.innerHTML === "Sipahi") {
                div.style.opacity = "0"; // पर्ची को छिपाएं
                div.onclick = function () {
                    div.style.opacity = "1"; // क्लिक पर प्रकट करें
                    updateScore(index, div.innerHTML);
                    if (div.innerHTML === "Sipahi") {
                        adjustScoresForSipahiClick();
                    }
                };
            } else {
                updateScore(index, div.innerHTML);
            }
        });
        document.querySelector(".start-btn").innerHTML = "Fold and Throw again";
    }

    function updateScore(playerIndex, role) {
        const score = scores[role]; // पूर्वनिर्धारित मानों से स्कोर प्राप्त करें
        playerScores[playerIndex].push(score); // स्कोर इतिहास में संग्रहीत करें
        totalScores[playerIndex] += score; // कुल स्कोर में जोड़ें

        // UI में स्कोर अपडेट करें
        scoreElements[playerIndex].innerHTML = playerScores[playerIndex].join("<br>");
    }

    function adjustScoresForSipahiClick() {
        let bajeerIndex, chorIndex;

        // 'Bajeer' और 'Chor' वाले खिलाड़ियों के इंडेक्स पहचानें
        divs.forEach((div, index) => {
            if (div.innerHTML === "Bajeer") {
                bajeerIndex = index;
            } else if (div.innerHTML === "Chor") {
                chorIndex = index;
            }
        });

        // 'Bajeer' वाले खिलाड़ी का स्कोर 0 करें
        totalScores[bajeerIndex] -= scores["Bajeer"];
        playerScores[bajeerIndex].pop();
        updateScore(bajeerIndex, "Chor"); // 'Chor' का स्कोर 0 है

        // 'Chor' वाले खिलाड़ी का स्कोर 800 करें
        totalScores[chorIndex] -= scores["Chor"];
        playerScores[chorIndex].pop();
        updateScore(chorIndex, "Bajeer"); // 'Bajeer' का स्कोर 800 है
    }

    function showRankings() {
        const rankings = totalScores.map((score, index) => ({ player: `Player ${index + 1}`, score }))
                                  .sort((a, b) => b.score - a.score); // खिलाड़ियों को स्कोर के अनुसार क्रमबद्ध करें

        let rankText = "<h3>🏆 Player Rankings 🏆</h3>";
        rankings.forEach((player, index) => {
            const medals = ["🥇", "🥈", "🥉", "🏅"];
            rankText += `<p>${medals[index]} ${player.player}: ${player.score} points</p>`;
        });

        resultDiv.innerHTML = rankText; // रैंकिंग्स प्रदर्शित करें
    }
});
