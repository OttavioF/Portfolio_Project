document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mode Toggling (Dark/Light)
    const savedMode = localStorage.getItem('mode');
    const body = document.body;
    const modeButton = document.getElementById('modeButton');
    if (savedMode === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        modeButton.textContent = 'Light Mode';
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        modeButton.textContent = 'Dark Mode';
    }

    // 2. Form Submission Handling
    const form = document.getElementById("userForm");
    if (form) {
        const nameInput = form.elements['name'];
        const emailInput = form.elements['email'];
        const messageInput = form.elements['message'];
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (form.checkValidity()) {
                console.log('Form is valid. Submitting...');
                console.log('Name:', nameInput.value);
                console.log('Email:', emailInput.value);
                console.log('Message:', messageInput.value);
                
                // You could replace this alert with a custom toast if desired.
                alert('Thank you for your submission! You can contact Ottavio at fazzio.ottavio@gmail.com');
                form.reset();
            } else {
                console.log('Form is invalid. Please correct the errors.');
                form.reportValidity();
            }
        });
    }

    // 3. Navigation Menu Toggle
    const menuButton = document.getElementById("menuButton");
    if (menuButton) {
        menuButton.addEventListener("click", () => {
            const navTextLinks = document.querySelector(".navTextLinks");
            if (navTextLinks) {
                navTextLinks.classList.toggle("active");
            }
        });
    }

    // 4. Lightbox & Gallery Functionality
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    if (galleryImages && lightbox && lightboxImg) {
        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = image.src;
            });
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }

    // 5. Lightbox Close Button
    // Use querySelector to select the element with the class 'close'
    const closeBtn = document.querySelector('.close');
    if (closeBtn && lightbox) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    } else {
        console.warn("Warning: close button or lightbox not found. Skipping event listener.");
    }
});

// 6. Toggle Mode Function (for button click)
function toggleMode() {
    const body = document.body;
    const modeButton = document.getElementById('modeButton');
    const isDarkMode = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode', !isDarkMode);
    modeButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
}


// 7. Card Flipping Function
function flipCard(event, button) {
    event.preventDefault();
    const card = button.closest('.card');
    if (card) {
        card.classList.toggle('flipped');
    }
}

async function getFruits() {
    try {
        const response = await fetch('https://www.fruityvice.com/api/fruit/all'); // Replace with your actual API
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fruits = await response.json();
        console.log(fruits); // Logs all available fruits

        // Display fruits in the document
        const fruitList = document.getElementById('fruitList');
        fruitList.innerHTML = fruits.map(fruit => `<li>${fruit.name}</li>`).join('');
    } catch (error) {
        console.error("Error fetching fruit data:", error);
    }
}

// Call function on page load
document.addEventListener('DOMContentLoaded', getFruits);
