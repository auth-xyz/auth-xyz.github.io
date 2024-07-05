document.addEventListener('DOMContentLoaded', async function () {
    const repoContainer = document.getElementById('repoContainer');

    // List of repository JSON files
    const repoFiles = [
        'jsons/portfoward.json',
        'jsons/serenity.json',
        'jsons/sshman.json'
    ];

    // Function to fetch repository data from JSON files
    async function fetchRepoData(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const repoData = await response.json();
            return repoData;
        } catch (error) {
            console.error('Error fetching repository data:', error);
        }
    }

    // Function to display repository information
    async function displayRepos() {
        for (const file of repoFiles) {
            const repoData = await fetchRepoData(file);
            if (repoData && repoData.title && repoData.description && repoData.url) {
                const repoDiv = document.createElement('div');
                repoDiv.classList.add('repo');

                const title = document.createElement('h2');
                title.textContent = repoData.title;
                repoDiv.appendChild(title);

                const description = document.createElement('p');
                description.textContent = repoData.description;
                repoDiv.appendChild(description);

                const link = document.createElement('a');
                link.href = repoData.url;
                link.textContent = 'View Repository';
                link.target = '_blank'; // Open link in new tab
                repoDiv.appendChild(link);

                repoContainer.appendChild(repoDiv);
            } else {
                console.warn(`Invalid structure in ${file}`);
            }
        }
    }

    // Call the function to display repositories
    displayRepos();
});

