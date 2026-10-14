// =============================================
// NAVIGATION & HAMBURGER MENU
// =============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle hamburger menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// =============================================
// FAQ ACCORDION
// =============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('h4');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// =============================================
// ADMISSION FORM SUBMISSION
// =============================================

const admissionForm = document.getElementById('admissionForm');

if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address', 'error', 'formMessage');
            return;
        }
        
        // Validate phone
        const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneRegex.test(data.phone.replace(/[^0-9]/g, ''))) {
            showFormMessage('Please enter a valid phone number', 'error', 'formMessage');
            return;
        }
        
        // Show success message
        showFormMessage('Your application has been submitted successfully! We will contact you soon.', 'success', 'formMessage');
        
        // Log form data (in real application, send to server)
        console.log('Application Data:', data);
        
        // Optional: Reset form after 2 seconds
        setTimeout(() => {
            this.reset();
            document.getElementById('formMessage').style.display = 'none';
        }, 3000);
    });
}

// =============================================
// CONTACT FORM SUBMISSION
// =============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contactEmail)) {
            showFormMessage('Please enter a valid email address', 'error', 'contactMessage');
            return;
        }
        
        // Show success message
        showFormMessage('Your message has been sent successfully! We will get back to you soon.', 'success', 'contactMessage');
        
        // Log form data (in real application, send to server)
        console.log('Contact Data:', data);
        
        // Reset form after 2 seconds
        setTimeout(() => {
            this.reset();
            document.getElementById('contactMessage').style.display = 'none';
        }, 3000);
    });
}

// =============================================
// FORM MESSAGE DISPLAY
// =============================================

function showFormMessage(message, type, elementId) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'form-message ' + type;
        messageElement.style.display = 'block';
        
        // Auto hide error message after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
}

// =============================================
// SMOOTH SCROLLING
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================

window.addEventListener('scroll', () => {
    let current = '';
    const navMenuItems = document.querySelectorAll('.nav-menu a');
    
    // You can add scroll detection here if needed
});

// =============================================
// LAZY LOADING FOR IMAGES
// =============================================

const images = document.querySelectorAll('img');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src || img.dataset.src;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// =============================================
// COUNTER ANIMATION FOR STATISTICS
// =============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
if (document.querySelector('.statistics')) {
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statBoxes = entry.target.querySelectorAll('.stat-box h3');
                statBoxes.forEach(box => {
                    const text = box.textContent.replace(/[^0-9]/g, '');
                    if (text) {
                        animateCounter(box, parseInt(text));
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// =============================================
// VALIDATION HELPERS
// =============================================

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[0-9]{10,}$/;
    return regex.test(phone.replace(/[^0-9]/g, ''));
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Debounce function for optimizing scroll/resize events
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// =============================================
// DOCUMENT READY
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Elite Academy Website Loaded Successfully');
    
    // Add any initialization code here
    initializePage();
});

function initializePage() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${currentYear} Elite Academy. All rights reserved.`;
    }
}

// =============================================
// SUBMIT FUNCTIONS (for forms)
// =============================================

function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    
    // Create FormData object
    const formData = new FormData(form);
    
    // In a real application, you would send this to a server
    // Example with fetch:
    /*
    fetch('/api/admission', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showFormMessage('Application submitted successfully!', 'success', 'formMessage');
    })
    .catch(error => {
        showFormMessage('Error submitting application. Please try again.', 'error', 'formMessage');
    });
    */
    
    // For demo, just show success message
    showFormMessage('Your application has been submitted successfully! We will contact you soon.', 'success', 'formMessage');
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        document.getElementById('formMessage').style.display = 'none';
    }, 3000);
}

function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    
    // Validate required fields
    const email = form.querySelector('#contactEmail').value;
    const name = form.querySelector('#name').value;
    const message = form.querySelector('#message').value;
    
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields', 'error', 'contactMessage');
        return;
    }
    
    if (!validateEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error', 'contactMessage');
        return;
    }
    
    // In a real application, send to server
    showFormMessage('Your message has been sent successfully! We will get back to you soon.', 'success', 'contactMessage');
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        document.getElementById('contactMessage').style.display = 'none';
    }, 3000);
}

// =============================================
// EXPORT FUNCTIONS (if needed)
// =============================================

window.submitForm = submitForm;
window.submitContactForm = submitContactForm;
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
