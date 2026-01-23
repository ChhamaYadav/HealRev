const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const slideInterval = 4000; // 4 seconds

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Mobile dropdown toggle
const dropdownLinks = document.querySelectorAll('.dropdown > a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth < 993) { // only mobile
            e.preventDefault();

            const dropdownMenu = this.nextElementSibling;
            if (!dropdownMenu) return;

            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== dropdownMenu) menu.classList.remove('show');
            });

            // Toggle current dropdown
            dropdownMenu.classList.toggle('show');
        }
    });
});

// Close mobile dropdown if click outside
document.addEventListener('click', (e) => {
    if (window.innerWidth < 993) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
        }
    }
});
