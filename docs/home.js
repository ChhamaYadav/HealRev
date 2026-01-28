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

showSlide(currentSlide);
setInterval(nextSlide, slideInterval);

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

// Select all result numbers
const results = document.querySelectorAll(".result-box");

const options = {
    threshold: 0.5 // Trigger when 50% of element is visible
};

const countUp = (el, endValue) => {
    let current = 0;
    const increment = endValue / 100; // smooth increment
    const duration = 2000; // 2 seconds
    const stepTime = duration / (endValue / increment);

    const timer = setInterval(() => {
        current += increment;
        if (current >= endValue) {
            current = endValue;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, stepTime);
};

// Observer for fade-in + count-up when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberSpan = entry.target.querySelector(".number");
            const endValue = parseFloat(numberSpan.getAttribute("data-value"));

            // Fade in
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";

            // Start count up
            countUp(numberSpan, endValue);

            // Stop observing once done
            observer.unobserve(entry.target);
        }
    });
}, options);

// Initialize opacity and position
results.forEach(result => {
    result.style.opacity = 0;
    result.style.transform = "translateY(30px)";
    result.style.transition = "all 0.8s ease-out";
    observer.observe(result);
});

// ================= TESTIMONIAL FADE + SLIDE =================

const testimonials = document.querySelectorAll(".testimonial-card");
const nextTestimonial = document.getElementById("nextTestimonial");
const prevTestimonial = document.getElementById("prevTestimonial");

let testimonialIndex = 0;

function showTestimonial(newIndex, direction) {
    const current = testimonials[testimonialIndex];
    const next = testimonials[newIndex];

    current.classList.remove("active");
    current.classList.add(direction === "next" ? "exit-left" : "");

    setTimeout(() => {
        current.classList.remove("exit-left");
        next.classList.add("active");
    }, 50);

    testimonialIndex = newIndex;
}

nextTestimonial.addEventListener("click", () => {
    const newIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(newIndex, "next");
});

prevTestimonial.addEventListener("click", () => {
    const newIndex =
        (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(newIndex, "prev");
});
setInterval(() => {
    const newIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(newIndex, "next");
}, 6000);






