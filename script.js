document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        "'Appear weak when you are strong, and strong when you are weak.' - Sun Tzu",
        "'Elfen Lied fucking traumatized me' - Auth",
        "'The supreme art of war is to subdue the enemy without fighting.' - Sun Tzu",
        "'If you know the enemy and know yourself, you need not fear the result of a hundred battles.' - Sun Tzu",
        "'Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.' - Sun Tzu",
        "'All warfare is based on deception.' - Sun Tzu"
    ];

    const quoteElement = document.querySelector('.quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const fullQuote = quotes[randomIndex];

    // Determine number of characters before breaking into new lines
    const maxCharactersPerLine = 50; // Adjust this as needed

    // Split the full quote into lines based on maxCharactersPerLine
    let formattedQuote = '';
    let currentLine = '';
    const words = fullQuote.split(' ');

    words.forEach((word, index) => {
        if ((currentLine + word).length > maxCharactersPerLine) {
            formattedQuote += currentLine.trim() + '<br>';
            currentLine = '';
        }
        currentLine += word + ' ';
        if (index === words.length - 1) {
            formattedQuote += currentLine.trim();
        }
    });

    quoteElement.innerHTML = formattedQuote;

    const themeToggle = document.getElementById('theme-toggle');

    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        themeToggle.checked = currentTheme === 'light-theme';
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });
});

