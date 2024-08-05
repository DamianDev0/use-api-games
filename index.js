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

getGames();
