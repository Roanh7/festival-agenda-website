
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
