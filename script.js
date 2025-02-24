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
    let toast = document.createElement('div');
    toast.id = 'toast';
    // Basic styling for the toast; adjust as needed
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(109, 0, 0, 0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '25px';
    toast.style.border = '2px solid rgba(0, 218, 65, 0.8)';
    toast.style.fontSize = '18px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(toast);

    // Function to show toast notifications
    function showToast(message, duration = 7000) {
        toast.textContent = message;
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
        }, duration);
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
                
                showToast('Thank you for your submission! You can contact Ottavio at "fazzio.ottavio@gmail.com"');
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

