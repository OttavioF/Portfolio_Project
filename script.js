document.addEventListener('DOMContentLoaded', () => {

    // Mode Toggling (Dark/Light)
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
    // Form Submission Handling
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
                
                alert('Thank you for your submission! You can contact Ottavio at fazzio.ottavio@gmail.com');
                form.reset();
            } else {
                console.log('Form is invalid. Please correct the errors.');
                form.reportValidity();
            }
        });
    }
    // Navigation Menu Toggle
    const menuButton = document.getElementById("menuButton");
    const navTextLinks = document.querySelector(".navTextLinks");
    if (menuButton && navTextLinks) {
        menuButton.addEventListener("click", () => {
            navTextLinks.classList.toggle("active");
        });
        // Close the menu when clicking outside of it
        document.addEventListener("click", (e) => {
            if (!navTextLinks.contains(e.target) && e.target !== menuButton) {
                navTextLinks.classList.remove("active");
            }
        });
    }
    // Lightbox & Gallery Functionality
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (galleryImages.length > 0 && lightbox && lightboxImg) {
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
    // Gallery Animation with Intersection Observer
    if (galleryImages.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationName = entry.target.dataset.animation;
                    const animationClass = `animate-${animationName}`;
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        galleryImages.forEach(image => {
            observer.observe(image);
        });
    }
    // Lightbox Close Button
    const closeBtn = document.querySelector('.close');
    if (closeBtn && lightbox) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    } else {
        console.log("Warning: close button or lightbox not found. Skipping event listener.");
    }
});

// Toggle Mode Function (for button click)
function toggleMode() {
    const body = document.body;
    const modeButton = document.getElementById('modeButton');
    const isDarkMode = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode', !isDarkMode);
    modeButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
}

// Card Flipping Function
function flipCard(event, button) {
    event.preventDefault();
    const card = button.closest('.card');
    if (card) {
        card.classList.toggle('flipped');
    }
}

// function scaleUp(event) {
//     event.target.style.transform = 'scale(1.1)';
//     console.log("on image");
// }

// function resetScale(event) {
//     event.target.style.transform = 'scale(1)';
//     console.log("out image");
// }

// const galleryImages = document.querySelectorAll(".gallery-img");
// galleryImages.forEach(image => {
//     image.style.transition = "transform 0.3s ease";
//     image.addEventListener('mouseenter', scaleUp);
//     image.addEventListener('mouseleave', resetScale );
// });

