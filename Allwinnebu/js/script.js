// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initializeAnimations();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize header scroll behavior
    initializeHeader();
});

function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.section-title, .about-text, .about-image, .feature-card, .timeline-item, .faq-item, .footer-column').forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Handle FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const modal = document.getElementById('faq-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalText = modal.querySelector('.modal-text');
    const modalClose = modal.querySelector('.modal-close');

    const faqAnswers = {
        1: {
            title: "Who can participate in HackSphere 2025?",
            text: "HackSphere 2025 is open to all developers, designers, and creators worldwide. Whether you're a student, professional, or hobbyist, if you're passionate about technology and innovation, you're welcome to join!"
        },
        2: {
            title: "Do I need to have a team to participate?",
            text: "No, you don't need a team to participate. You can register as an individual, and we'll help you find team members during the team formation session. Teams can have 2-4 members."
        },
        3: {
            title: "What if I'm a beginner?",
            text: "Beginners are more than welcome! HackSphere 2025 includes workshops, mentorship sessions, and resources specifically designed for beginners. It's a great opportunity to learn and grow."
        },
        4: {
            title: "Is there a registration fee?",
            text: "No, HackSphere 2025 is completely free to participate. We believe in making technology accessible to everyone."
        }
    };

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const faqId = item.getAttribute('data-faq');
            const faqData = faqAnswers[faqId];
            
            modalTitle.textContent = faqData.title;
            modalText.textContent = faqData.text;
            modal.classList.add('active');
            
            // Add animation to modal
            modal.querySelector('.modal-content').style.animation = 'slideUp 0.5s ease-out';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Handle header scroll behavior
function initializeHeader() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Add smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = debounce(() => {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}, 10); 

window.addEventListener('scroll', handleScroll);