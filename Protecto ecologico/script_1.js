
// Function to load videos from localStorage
function loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) || [];
}


// Function to save videos array to localStorage
function saveVideos(videos) {
    localStorage.setItem('videos', JSON.stringify(videos));
}

// Function to delete video by ID
function deleteVideo(videoId) {
    const videos = loadVideos();
    const updatedVideos = videos.filter(video => video.id !== videoId);
    saveVideos(updatedVideos);
    alert('Video eliminado exitosamente.');
    displayUserVideos();
}

// Function to display user's videos
function displayUserVideos() {
    const videos = loadVideos();
    const videoList = document.getElementById('userVideoList');
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
    const userVideos = videos.filter(video => video.userId === userId);
    
    videoList.innerHTML = '';

    if (userVideos.length === 0) {
        videoList.innerHTML = '<p>No has subido videos aún.</p>';
        return;
    }

    userVideos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <h3>${video.title}</h3>
             <a href="${video.link}" target="_blank">
                <img src="${video.image}" alt="Video Image" style="max-width: 200px; height: auto;">
            </a>
            <p>${video.description}</p>
            
            <p><strong>Categoría:</strong> ${getCategoryName(video.category)}</p>
            <button onclick="deleteVideo('${video.id}')" style="background-color:red; color:white;">Eliminar Video</button>
        `;
        videoList.appendChild(videoItem);
    });
}



// Function to get the category name from its value
function getCategoryName(categoryValue) {
    const categories = {
        '1': 'Energía',
        '2': 'Reciclaje',
        '3': 'Sostenibilidad'
    };
    return categories[categoryValue];
}

// Call displayUserVideos when the page loads
if (document.getElementById('userVideoList')) {
    displayUserVideos();
}
// Functions to open and close the sidebar
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}