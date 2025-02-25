document.addEventListener('DOMContentLoaded', () => {
    const commands = [
        { id: 1, category: 'containers', command: 'docker run -it ubuntu', description: 'Run a container interactively.' },
        { id: 2, category: 'images', command: 'docker pull nginx', description: 'Pull an image from Docker Hub.' },
        { id: 3, category: 'volumes', command: 'docker volume create my_volume', description: 'Create a new volume.' },
        { id: 4, category: 'networks', command: 'docker network ls', description: 'List all networks.' },
    ];

    const commandsSection = document.getElementById('commands');
    const favoritesSection = document.getElementById('favoritesSection');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('categoryFilter');
    const darkModeToggle = document.getElementById('darkModeToggle');

    let favorites = [];

    // Load commands dynamically
    function loadCommands() {
        commandsSection.innerHTML = '';
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        commands
            .filter(command => 
                (category === 'all' || command.category === category) &&
                (command.command.toLowerCase().includes(searchTerm) || command.description.toLowerCase().includes(searchTerm))
            )
            .forEach(command => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-3';
                card.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${command.command}</h5>
                            <p class="card-text">${command.description}</p>
                            <button class="btn btn-primary btn-sm copy-btn" data-command="${command.command}">
                                <i class="fa fa-copy"></i> Copy
                            </button>
                            <button class="btn btn-warning btn-sm favorite-btn" data-id="${command.id}">
                                <i class="fa fa-star"></i> Add to Favorites
                            </button>
                        </div>
                    </div>
                `;
                commandsSection.appendChild(card);
            });
    }

    // Add command to favorites
    function addToFavorites(commandId) {
        const favorite = commands.find(cmd => cmd.id === parseInt(commandId));
        if (!favorites.some(fav => fav.id === favorite.id)) {
            favorites.push(favorite);
            loadFavorites();
        }
    }

    // Load favorites dynamically
    function loadFavorites() {
        favoritesSection.innerHTML = '';
        favorites.forEach(command => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-3';
            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${command.command}</h5>
                        <p class="card-text">${command.description}</p>
                    </div>
                </div>
            `;
            favoritesSection.appendChild(card);
        });
    }

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('bg-dark');
        document.body.classList.toggle('text-white');
    });

    // Event listeners
    searchInput.addEventListener('input', loadCommands);
    categoryFilter.addEventListener('change', loadCommands);
    commandsSection.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite-btn')) {
            addToFavorites(e.target.getAttribute('data-id'));
        }
    });

    // Initial load
    loadCommands();
});
