document.addEventListener('DOMContentLoaded', function() {
    fetchProfessors();
});

async function fetchProfessors() {
    try {
        const response = await fetch('/api/professors');
        if (!response.ok) throw new Error('Network response was not ok');
        const professors = await response.json();

        const favoriteSelect = document.getElementById('favoriteProfessor');
        const leastFavoriteSelect = document.getElementById('leastFavoriteProfessor');

        professors.forEach(prof => {
            const option = document.createElement('option');
            option.value = prof.id;
            option.textContent = prof.name;
            favoriteSelect.appendChild(option.cloneNode(true)); // Clone for the second dropdown
            leastFavoriteSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Fetch error:', error);
        // Update UI to show error message
    }
}

async function submitVote(voteData) {
    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voteData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        // Handle response, update UI accordingly
    } catch (error) {
        console.error('Vote submission error:', error);
        // Update UI to show error message
    }
}

async function updateLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) throw new Error('Network response was not ok');
        const leaderboardData = await response.json();
        // Code to update the leaderboard UI
    } catch (error) {
        console.error('Leaderboard update error:', error);
        // Update UI to show error message
    }
}

// Attach event listener to the voting form
document.getElementById('voteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    submitVote({
        favoriteProfessor: formData.get('favoriteProfessor'),
        leastFavoriteProfessor: formData.get('leastFavoriteProfessor')
    });
});
