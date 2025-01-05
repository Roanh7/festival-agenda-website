document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-score-form");
  const scoreboardBody = document.querySelector("#scoreboard tbody");

  // Haal bestaande scores op uit LocalStorage
  const getScores = () => JSON.parse(localStorage.getItem("scores")) || [];

  // Sla scores op in LocalStorage
  const saveScores = (scores) => localStorage.setItem("scores", JSON.stringify(scores));

  // Render de scoreboard
  const renderScoreboard = () => {
      scoreboardBody.innerHTML = ""; // Leeg de tabel
      const scores = getScores();
      scores.forEach((score, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${score.name}</td>
              <td>${score.points}</td>
              <td><button data-index="${index}" class="delete-btn">Verwijderen</button></td>
          `;
          scoreboardBody.appendChild(row);
      });
  };

  // Voeg een nieuwe score toe of werk bestaande punten bij
  form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim(); // Verwijder extra spaties
      const points = parseInt(document.getElementById("points").value, 10);

      const scores = getScores();
      const existingIndex = scores.findIndex((score) => score.name.toLowerCase() === name.toLowerCase()); // Case-insensitive naamvergelijking

      if (existingIndex >= 0) {
          // Voeg punten toe aan een bestaande gebruiker
          scores[existingIndex].points += points;
      } else {
          // Voeg een nieuwe gebruiker toe
          scores.push({ name, points });
      }

      saveScores(scores);
      renderScoreboard();
      form.reset();
  });

  // Verwijder een score
  scoreboardBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
          const index = parseInt(e.target.dataset.index, 10);
          const scores = getScores();
          scores.splice(index, 1); // Verwijder de score
          saveScores(scores);
          renderScoreboard();
      }
  });

  // Render de scoreboard bij laden van de pagina
  renderScoreboard();
});
