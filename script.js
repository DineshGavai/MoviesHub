const moviesGrid = document.getElementById('movies');
        const searchInput = document.getElementById('search');
        const API_KEY = 'a4e6d975'; // OMDB API key
        let timeoutId;

        // display popular movies load
        fetchPopularMovies();

        // Event listner for Search input 
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const searchTerm = e.target.value.trim();
                if (searchTerm) {
                    searchMovies(searchTerm);
                } else {
                    fetchPopularMovies();
                }
            }, 500);
        });

        async function searchMovies(searchTerm) {
            try {
                showLoading();
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();

                if (data.Response === "True") {
                    displayMovies(data.Search);
                } else {
                    showError("No movies found!");
                }
            } catch (error) {
                showError("Something went wrong! Please try again later.");
            }
        }

        async function fetchPopularMovies() {
            // For demo purpose, displaying popular movies
            const popularSearches = ['Avengers', 'Batman', 'Spider'];
            // Randomly pick one search term from the list
            const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)];
            await searchMovies(randomSearch);
        }

        // Function to display movies in the grid
        function displayMovies(movies) {
            moviesGrid.innerHTML = movies.map(movie => `
                <div class="movie-card">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" 
                         alt="${movie.Title}">
                    <div class="movie-info">
                        <h3>${movie.Title}</h3>
                        <p>${movie.Year}</p>
                    </div>
                </div>
            `).join('');
        }

        // Function to show a loading message while fetching data
        function showLoading() {
            moviesGrid.innerHTML = '<div class="loading">Loading...</div>';
        }

        // Function to show an error message
        function showError(message) {
            moviesGrid.innerHTML = `<div class="error">${message}</div>`;
        }