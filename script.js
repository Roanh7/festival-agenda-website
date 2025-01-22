
    // Festivaldata (gebruik jouw festivals)
    const festivals = [
        { name: "Wavy", date: "2024-12-21" },
        { name: "DGTL", date: "2025-04-18" },
        { name: "Free your mind Kingsday", date: "2025-04-26" },
        { name: "Loveland Kingsday", date: "2025-04-26" },
        // Voeg hier andere festivals toe
    ];

    function updateCountdown() {
        const now = new Date();
        let nextFestival = null;

        // Zoek het eerstvolgende festival
        for (const festival of festivals) {
            const festivalDate = new Date(festival.date);
            if (festivalDate > now) {
                nextFestival = festival;
                break;
            }
        }

        // Als er geen toekomstige festivals zijn, toon een bericht
        if (!nextFestival) {
            document.getElementById("festival-name").textContent = "Geen aankomende festivals";
            document.getElementById("countdown").textContent = "";
            return;
        }

        // Update de festivalnaam
        document.getElementById("festival-name").textContent = nextFestival.name;

        // Bereken de afteltijd
        const festivalDate = new Date(nextFestival.date);
        const diff = festivalDate - now;

        if (diff <= 0) {
            // Festival is nu bezig of net afgelopen, herhaal updateCountdown
            setTimeout(updateCountdown, 1000);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update de aftelklok
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }

    // Update de klok elke seconde
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Direct uitvoeren bij laden

    document.addEventListener("DOMContentLoaded", () => {
        const playerStats = {
            "Roan": { position: "Keeper", age: 23, rating: "Rating: 82", skills: ["Vibes brengen", "Communicatie", "Voorraad regelen"] },
            "Muc": { position: "Verdediger", age: 32, rating: "Rating: 90", skills: ["TikTok famous", "Capsuleren", "Overzicht", "Is een arts (alleen na 23:00)"] },
            "Rick": { position: "Verdediger", age: 26, rating: "Rating: 79", skills: ["1-op-1 verdedigen", "Vibes brengen", "Jokes maken","Houd van grote billen"] },
            "Chip": { position: "Middenvelder", age: 31, rating: "Rating: 88", skills: [ "Uithoudingsvermogen", "Teamleider", "Driver"] },
            "Jef": { position: "Aanvaller", age: 29, rating: "Rating:???", skills: ["CHEATCODE ACTIVATED", "glow in the dark ogen"] },
        };
    
        const showPopup = (playerName) => {
            const stats = playerStats[playerName];
    
            if (stats) {
                document.getElementById("player-name").textContent = playerName;
                document.getElementById("player-age").textContent = stats.age;
                document.querySelector(".rating-label").textContent = stats.rating;
    
                const skillsList = document.getElementById("player-skills");
                skillsList.innerHTML = ""; // Reset de skills
                stats.skills.forEach(skill => {
                    const li = document.createElement("li");
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
    
                document.getElementById("player-stats-popup").classList.remove("hidden");
            }
        };
    
        document.querySelectorAll(".player").forEach(player => {
            player.addEventListener("click", () => {
                const playerName = player.nextElementSibling?.textContent.trim();
                if (playerName) {
                    showPopup(playerName);
                }
            });
        });
    
        document.querySelectorAll(".player-name").forEach(name => {
            name.addEventListener("click", () => {
                const playerName = name.textContent.trim();
                showPopup(playerName);
            });
        });
    
        document.getElementById("close-popup").addEventListener("click", () => {
            document.getElementById("player-stats-popup").classList.add("hidden");
        });
    });

    // Selecteer alle <tr> elementen in de tabel (behalve de <thead>)
const festivalRows = document.querySelectorAll('table tbody tr');

// Loop door elke rij en luister naar 'click' events
festivalRows.forEach((row) => {
  row.addEventListener('click', () => {
    // Toggle de geselecteerde klasse
    row.classList.toggle('selected-festival');
  });
});