// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initParticles();
    initContactForm();
    initMobileMenu();
    initDownloadCV();
    addScrollToTopButton();
    initParallaxEffect();
    showPageLoader();
    initProfileImageAnimations();
    initProjectAnimations();
    initSkillTagAnimations();
});

// Navigation functionality - Fixed
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    }, 100));
    
    // Smooth scrolling for all navigation links
    document.addEventListener('click', (e) => {
        // Check if clicked element is a link with hash href
        if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
            const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                e.preventDefault();
                smoothScrollToSection(targetId);
            }
        }
    });
}

// Smooth scroll to section - Enhanced
function smoothScrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        
        // Use smooth scrolling with fallback
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            // Fallback for browsers that don't support smooth scrolling
            animateScrollTo(offsetTop, 1000);
        }
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Fallback smooth scroll animation
function animateScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Close mobile menu helper
function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Download CV functionality
/*
 function initDownloadCV() {
    const downloadBtn = document.getElementById('download-cv-btn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        downloadBtn.disabled = true;
        
        // Simulate download preparation
        setTimeout(() => {
            // Reset button
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            
            // Show notification that CV download is ready
            showNotification('CV download will be available soon! Please contact me directly for now.', 'info');
            
            // In a real application, you would trigger the actual download here
            // For example: window.open('path/to/cv.pdf', '_blank');
        }, 2000);
    });
}
    */

// Download CV functionality
function initDownloadCV() {
  const downloadBtn = document.getElementById("download-cv-btn");
  if (!downloadBtn) return;

  // Let browser handle the file download
  downloadBtn.addEventListener("click", () => {
    setTimeout(() => {
      showNotification(
        "If the download did not start, please contact me directly.",
        "info"
      );
    }, 2000);
  });
}


// Project animations
// function initProjectAnimations() {
//     const projectCards = document.querySelectorAll('.project-card');
    
//     projectCards.forEach(card => {
//         const projectLinks = card.querySelectorAll('.project-link');
        
//         // Add click handlers to project links
//         projectLinks.forEach(link => {
//             link.addEventListener('click', (e) => {
//                 e.preventDefault();
                
//                 // Show notification since these are demo links
//                 const isGithub = link.querySelector('.fab.fa-github');
//                 const linkType = isGithub ? 'GitHub repository' : 'live project';
                
//                 showNotification(`${linkType} link will be available soon! This is a demo portfolio.`, 'info');
//             });
//         });
        
//         // Add hover effects for better interaction
//         card.addEventListener('mouseenter', () => {
//             card.style.transform = 'translateY(-10px)';
//         });
        
//         card.addEventListener('mouseleave', () => {
//             card.style.transform = 'translateY(0)';
//         });
//     });
// }

function initProjectAnimations() {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    const projectLinks = card.querySelectorAll(".project-link");
    projectLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Only block and show message if it's a placeholder
        if (link.getAttribute("href") === "#" || !link.getAttribute("href")) {
          e.preventDefault(); // Show notification only for placeholder links
          const isGithub = link.querySelector(".fab.fa-github");
          const linkType = isGithub ? "GitHub repository" : "live project";
          showNotification(
            `${linkType} link will be available soon! This is a demo portfolio.`,
            "info"
          );
        } // Otherwise, let the link work normally and open the URL in a new tab
      });
    });
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}


// Skill tag animations - Enhanced
function initSkillTagAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        // Add staggered animation on scroll
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        // Enhanced hover effects
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
            tag.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
        });
        
        // Add click interaction for fun
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 150);
        });
    });
}

// Animate skill tags on scroll
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
            tag.style.transition = 'all 0.5s ease';
        }, index * 50);
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on section
                const sectionId = entry.target.getAttribute('id');
                
                if (sectionId === 'skills') {
                    setTimeout(() => animateSkillTags(), 300);
                }
                
                if (sectionId === 'projects') {
                    setTimeout(() => animateProjectCards(), 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe individual elements that need animation
    const animatedElements = document.querySelectorAll('.badge-item, .skill-category, .contact-item, .project-card');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Animate project cards on scroll
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Profile image animations
function initProfileImageAnimations() {
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.querySelector('.profile-image');
    
    if (profileContainer && profileImage) {
        // Add hover effects for desktop
        if (window.innerWidth > 768) {
            profileContainer.addEventListener('mouseenter', () => {
                profileImage.style.transform = 'scale(1.05)';
            });
            
            profileContainer.addEventListener('mouseleave', () => {
                profileImage.style.transform = 'scale(1)';
            });
        }
        
        // Add subtle floating animation
        let floatDirection = 1;
        setInterval(() => {
            if (profileImage && !profileImage.matches(':hover')) {
                floatDirection *= -1;
                const currentTransform = profileImage.style.transform || 'scale(1)';
                profileImage.style.transform = currentTransform + ` translateY(${floatDirection * 2}px)`;
            }
        }, 3000);
    }
}

// Particles animation for hero background
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 50 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 6}s`;
    
    container.appendChild(particle);
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showLoadingState(true);
        
        setTimeout(() => {
            showLoadingState(false);
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show loading state for form submission
function showLoadingState(isLoading) {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    if (!submitBtn) return;
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification--${type}`);
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                animation: slideInRight 0.3s ease;
                font-family: 'Inter', sans-serif;
            }
            
            .notification--success {
                background: rgba(34, 197, 94, 0.1);
                border: 1px solid rgba(34, 197, 94, 0.3);
                color: #22c55e;
            }
            
            .notification--error {
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: #ef4444;
            }
            
            .notification--info {
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.3);
                color: #3b82f6;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add slide out animation
    if (!document.querySelector('#slideout-styles')) {
        const style = document.createElement('style');
        style.id = 'slideout-styles';
        style.textContent = `
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.addEventListener('click', scrollToTop);
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles if not already added
    if (!document.querySelector('#scroll-top-styles')) {
        const style = document.createElement('style');
        style.id = 'scroll-top-styles';
        style.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                z-index: 1000;
                font-size: 1.2rem;
            }
            
            .scroll-top-btn.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-top-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
            }
            
            @media (max-width: 768px) {
                .scroll-top-btn {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100));
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (!hero || !heroContent) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.2;
        
        // Only apply parallax on desktop
        if (window.innerWidth > 768) {
            heroContent.style.transform = `translateY(${parallax}px)`;
        }
    }, 16));
}

// Add loading animation
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#loader-styles')) {
        const style = document.createElement('style');
        style.id = 'loader-styles';
        style.textContent = `
            #page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
                color: #ffffff;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(99, 102, 241, 0.3);
                border-top: 3px solid #6366f1;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(loader);
    
    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }, 1000);
    });
}

// Handle responsive layout changes
function handleResponsiveChanges() {
    window.addEventListener('resize', throttle(() => {
        // Reinitialize particles with appropriate count
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            initParticles();
        }
        
        // Reset profile image animations for mobile
        const profileImage = document.querySelector('.profile-image');
        if (profileImage && window.innerWidth <= 768) {
            profileImage.style.transform = 'scale(1)';
        }
    }, 300));
}

// Initialize responsive handlers
handleResponsiveChanges();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}