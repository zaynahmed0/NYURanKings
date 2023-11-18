document.addEventListener('DOMContentLoaded', function () {
    populateProfessors();
    document.getElementById('voteForm').addEventListener('submit', submitVote);
});

function populateProfessors() {
    // Fetch professor list from the server
    fetch('/api/professors')
        .then(response => response.json())
        .then(professors => {
            const favoriteSelect = document.getElementById('favoriteProfessor');
            const leastFavoriteSelect = document.getElementById('leastFavoriteProfessor');

            professors.forEach(prof => {
                const option1 = document.createElement('option');
                option1.value = prof.id; // Assuming each professor has a unique id
                option1.textContent = prof.name;
                favoriteSelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = prof.id;
                option2.textContent = prof.name;
                leastFavoriteSelect.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching professors:', error));
}

function submitVote(event) {
    event.preventDefault();

    const favorite = document.getElementById('favoriteProfessor').value;
    const leastFavorite = document.getElementById('leastFavoriteProfessor').value;

    // Post these values to your server
    fetch('/api/submitVote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite, leastFavorite }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Vote submitted:', data);
            updateLeaderboard();
        })
        .catch(error => console.error('Error submitting vote:', error));
}

function updateLeaderboard() {
    // Fetch updated leaderboard from the server and display it
    fetch('/api/leaderboard')
        .then(response => response.json())
        .then(leaderboard => {
            console.log('Leaderboard updated:', leaderboard);
            // Update the leaderboard display logic here
        })
        .catch(error => console.error('Error updating leaderboard:', error));
}

async function fetchProfessors() {
    try {
        const response = await fetch('/api/professors');
        if (!response.ok) throw new Error('Network response was not ok');
        const professors = await response.json();
        // Code to update the UI with this data
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

window.onload = fetchProfessors; // Call this when the page loads

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
    }
}

// Attach this function to your voting form's onsubmit event
async function updateLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) throw new Error('Network response was not ok');
        const leaderboardData = await response.json();
        // Code to update the leaderboard UI
    } catch (error) {
        console.error('Leaderboard update error:', error);
    }
}
