document.addEventListener('DOMContentLoaded', function () {
    populateProfessors();
    document.getElementById('voteForm').addEventListener('submit', submitVote);
});

function populateProfessors() {
    // Fetch professor list from the server (assuming an API endpoint exists)
    // For demonstration, using static data
    const professors = ['Professor A', 'Professor B', 'Professor C'];
    const favoriteSelect = document.getElementById('favoriteProfessor');
    const leastFavoriteSelect = document.getElementById('leastFavoriteProfessor');

    professors.forEach(prof => {
        const option1 = document.createElement('option');
        option1.value = prof;
        option1.textContent = prof;
        favoriteSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = prof;
        option2.textContent = prof;
        leastFavoriteSelect.appendChild(option2);
    });
}

function submitVote(event) {
    event.preventDefault();

    const favorite = document.getElementById('favoriteProfessor').value;
    const leastFavorite = document.getElementById('leastFavoriteProfessor').value;

    // Post these values to your server
    console.log('Favorite Professor:', favorite);
    console.log('Least Favorite Professor:', leastFavorite);

    // Redirect to the leaderboard page or update the leaderboard section
    updateLeaderboard();
}

function updateLeaderboard() {
    // Fetch updated leaderboard from the server and display it
    // For now, just logging to console
    console.log('Updating leaderboard...');
}
