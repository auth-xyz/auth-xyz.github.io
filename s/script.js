document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const messages = [
        "Sail the Seven Seas",
        "Search the web",
        "Explore the unknown",
        "Discover new horizons",
        "Find your treasure"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    searchBar.setAttribute('placeholder', randomMessage);
});

