document.addEventListener('DOMContentLoaded', async function () {
    const repoContainer = document.getElementById('repoContainer');

    // Function to get all JSON files in the jsons directory
    async function getJsonFiles() {
        try {
            const response = await fetch('./jsons/');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = [...doc.querySelectorAll('a')];
            const jsonFiles = links
                .map(link => link.getAttribute('href'))
                .filter(href => href.endsWith('.json'))
                .map(href => `./jsons/${href}`);
            return jsonFiles;
        } catch (error) {
            console.error('Error fetching JSON file list:', error);
            return [];
        }
    }

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
        const repoFiles = await getJsonFiles();
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

