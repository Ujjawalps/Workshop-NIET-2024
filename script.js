// script.js

const API_KEY = 'AIzaSyABneoOBKqC4HDCmZIq1Dp42kSyzOFvR0w'; // Replace with your API key
const VIDEO_GRID = document.getElementById('video-grid');
const SEARCH_BUTTON = document.getElementById('search-button');
const SEARCH_QUERY = document.getElementById('search-query');

function fetchVideos(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&type=video&maxResults=10`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayVideos(videos) {
    VIDEO_GRID.innerHTML = ''; // Clear previous results
    
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                <h3>${video.snippet.title}</h3>
                <p>${video.snippet.channelTitle}</p>
            </a>
        `;
        VIDEO_GRID.appendChild(videoCard);
    });
}

SEARCH_BUTTON.addEventListener('click', () => {
    const query = SEARCH_QUERY.value;
    fetchVideos(query);
});

// Optional: Fetch videos on Enter key press
SEARCH_QUERY.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        SEARCH_BUTTON.click();
    }
});
