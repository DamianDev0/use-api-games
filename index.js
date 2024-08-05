const container = document.getElementById('container');

async function getGames() {
    try {
        const response = await fetch('http://localhost:3000/api/games'); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('games:', result);

        const games = result.data;
        container.innerHTML = '';

        games.forEach(game => {
            const gameContainer = document.createElement('DIV');
            gameContainer.innerHTML = /*html*/`
                <div>
                    <h2>${game.title}</h2>
                    <img src="${game.image_url}" alt="${game.title} cover" style="width: 200px; height: auto;"/>
                    <p>Description: ${game.description}</p>
                    <p>Release Date: ${new Date(game.release_date).toDateString()}</p>
                    <p>Genre: ${game.genre}</p>
                </div>
            `;
            
            container.appendChild(gameContainer);
        });

    } catch (error) {
        console.error('Error:', error);
        throw new Error('Cannot get the games: ' + error.message);
    }
}

// getGames();

async function loginUser() {
    container.innerHTML = ''; // Clear the container before adding the form

    const form = document.createElement('form');
    
    form.innerHTML = /*html*/`
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br>
        <input type="submit" value="Submit">
    `;
    
    container.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Login successful:', result);
            // Handle successful login (e.g., redirect or show a message)

        } catch (error) {
            console.error('Error:', error);
            // Handle errors (e.g., show an error message)
        }
    });
}

// Call loginUser() to display the login form when needed
loginUser();
