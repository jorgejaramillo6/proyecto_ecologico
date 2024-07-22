// Function to generate a unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to save user data to localStorage
function saveUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const id = generateId();
    users.push({ id, username, password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to find user by username
function findUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === username);
}

// Function to get the currently logged in user
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
}

// Function to save the currently logged in user
function setLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

// Event listener for the register form
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const regUsername = document.getElementById('regUsername').value;
        const regPassword = document.getElementById('regPassword').value;
        const registerMessage = document.getElementById('registerMessage');

        if (findUser(regUsername)) {
            registerMessage.style.color = 'red';
            registerMessage.textContent = 'Username already exists!';
        } else {
            saveUser(regUsername, regPassword);
            registerMessage.style.color = 'green';
            registerMessage.textContent = 'Registration successful! Redirecting to login...';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); // Wait 2 seconds before redirecting
        }
    });
}

// Event listener for the login form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('loginMessage');

        const user = findUser(username);

        if (user && user.password === password) {
            loginMessage.style.color = 'green';
            loginMessage.textContent = `Login successful! Redirecting...`;

            setLoggedInUser(user);

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000); // Wait 2 seconds before redirecting
        } else {
            loginMessage.style.color = 'red';
            loginMessage.textContent = 'Invalid username or password.';
        }
    });
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

// Populate profile form with logged in user's data
if (document.getElementById('profileForm')) {
    const user = getLoggedInUser();
    if (user) {
        document.getElementById('profileUsername').value = user.username;
        document.getElementById('profilePassword').value = user.password;
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profileDescription').value = user.description || '';
    }

    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const user = getLoggedInUser();
        user.password = document.getElementById('profilePassword').value;
        user.email = document.getElementById('profileEmail').value;
        user.description = document.getElementById('profileDescription').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));

        const profileMessage = document.getElementById('profileMessage');
        profileMessage.style.color = 'green';
        profileMessage.textContent = 'Profile updated successfully!';
    });
}

// Toggle password visibility for profile
if (document.getElementById('togglePasswordProfile')) {
    document.getElementById('togglePasswordProfile').addEventListener('click', function() {
        const passwordField = document.getElementById('profilePassword');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.textContent = '🙈';
        } else {
            passwordField.type = 'password';
            this.textContent = '👁️';
        }
    });
}

// Toggle password visibility for login
if (document.getElementById('togglePasswordLogin')) {
    document.getElementById('togglePasswordLogin').addEventListener('click', function() {
        const passwordField = document.getElementById('password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.textContent = '🙈';
        } else {
            passwordField.type = 'password';
            this.textContent = '👁️';
        }
    });
}

function saveVideo(title, link, description, category, image) {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const userId = localStorage.getItem('userId');
    const id = Date.now().toString(); // Generar un ID único basado en la fecha actual
    videos.push({ id, title, link, description, category, image, userId });
    localStorage.setItem('videos', JSON.stringify(videos));
}

// Event listener for the upload form
if (document.getElementById('uploadForm')) {
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const videoTitle = document.getElementById('videoTitle').value;
        const videoLink = document.getElementById('videoLink').value;
        const videoDescription = document.getElementById('videoDescription').value;
        const videoCategory = document.getElementById('videoCategory').value;
        const videoImage = document.getElementById('videoImage').files[0];
        
        const reader = new FileReader();
        reader.onloadend = function() {
            const imageBase64 = reader.result;
            saveVideo(videoTitle, videoLink, videoDescription, videoCategory, imageBase64);
            const uploadMessage = document.getElementById('uploadMessage');
            uploadMessage.style.color = 'green';
            uploadMessage.textContent = 'Video guardado exitosamente! Redirigiendo a la lista...';

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000); // Wait 2 seconds before redirecting
        };
        reader.readAsDataURL(videoImage);
    });
}

// Function to load videos from localStorage
function loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) || [];
}

// Function to display videos
function displayVideos(filter = 'Todos') {
    const videos = loadVideos();
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';

    const filteredVideos = filter === 'Todos' ? videos : videos.filter(video => video.category === filter);

    if (filteredVideos.length === 0) {
        videoList.innerHTML = '<p>No hay videos disponibles.</p>';
        return;
    }

    filteredVideos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <h3>${video.title}</h3>
            <a href="${video.link}" target="_blank">
            <img src="${video.image}" alt="Video Image" style="max-width: 200px; height: auto;">
            </a>
            <p>${video.description}</p>
            <p><strong>Categoría:</strong> ${getCategoryName(video.category)}</p>
           
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

// Event listener for the filter category links
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        displayVideos(this.dataset.category);
    });
});

// Display all videos on page load
displayVideos();


