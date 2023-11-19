document.addEventListener('DOMContentLoaded', () => {
    // Handle Registration Form Submission
    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Registration successful', data);
            // You can redirect or update UI here
        } catch (error) {
            console.error('Registration failed:', error);
        }
    });

    // Handle Login Form Submission
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login successful', data);
            // Store the token and redirect or update UI here
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    });
});
