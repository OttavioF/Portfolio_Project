document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('mode');
    const body = document.body;
    const button = document.getElementById('modeButton');
    if (savedMode === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        button.textContent = 'Light Mode';
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        button.textContent = 'Dark Mode';
    }
});

function toggleMode() {
    const body = document.body;
    const button = document.getElementById('modeButton');
    const isDarkMode = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode', !isDarkMode);
    button.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("userForm");
    if (form) {
        const nameInput = form.elements['name'];
        const companyInput = form.elements['company'];
        const emailInput = form.elements['email'];
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (form.checkValidity()) {
                console.log('Form is valid. Submitting...');
                console.log('Name:', nameInput.value);
                console.log('Company:', companyInput.value);
                console.log('Email:', emailInput.value);
                form.reset();
                // Here you would typically send the data to a server
            } else {
                console.log('Form is invalid. Please correct the errors.');
                form.reportValidity();
            }
        });
    }
});
const form = document.getElementById('userForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for your submission! You can contact Ottavio at fazzio.ottavio@gmail.com');
    });