// Function to load videos from localStorage
function loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) || [];
}

// Function to save videos array to localStorage
function saveVideos(videos) {
    localStorage.setItem('videos', JSON.stringify(videos));
}

// Get the video ID from URL
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('id');
const videos = loadVideos();
const video = videos.find(video => video.id === videoId);

if (!video) {
    alert('Video no encontrado.');
    window.location.href = 'user_videos.html';
}

// Fill form fields with video data
document.getElementById('editVideoTitle').value = video.title;
document.getElementById('editVideoLink').value = video.link;
document.getElementById('editVideoDescription').value = video.description;
document.getElementById('editVideoCategory').value = video.category;

// Function to save edited video
function saveEdit() {
    video.title = document.getElementById('editVideoTitle').value;
    video.link = document.getElementById('editVideoLink').value;
    video.description = document.getElementById('editVideoDescription').value;
    video.category = document.getElementById('editVideoCategory').value;

    const editImage = document.getElementById('editVideoImage').files[0];
    if (editImage) {
        const reader = new FileReader();
        reader.onloadend = function() {
            video.image = reader.result;
            saveVideos(videos);
            alert('Video editado exitosamente.');
            window.location.href = 'user_videos.html';
        };
        reader.readAsDataURL(editImage);
    } else {
        saveVideos(videos);
        alert('Video editado exitosamente.');
        window.location.href = 'user_videos.html';
    }
}

// Function to delete video
function deleteVideo() {
    const videoIndex = videos.findIndex(video => video.id === videoId);
    videos.splice(videoIndex, 1);
    saveVideos(videos);
    alert('Video eliminado exitosamente.');
    window.location.href = 'user_videos.html';
}
