/**
 * AmrudhyaHarvest Website JavaScript
 * Modern, interactive functionality with smooth animations
 */

// ==========================================
// DOM Elements
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// ==========================================
// Utility Functions
// ==========================================

/**
 * Throttle function to limit function calls
 */
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

/**
 * Debounce function to delay function calls
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    const targetPosition = element.offsetTop - 80; // Account for navbar height
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
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

// ==========================================
// Navigation Functionality
// ==========================================

/**
 * Handle navbar scroll effect
 */
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Handle export badge visibility
    const exportBadge = document.querySelector('.export-badge');
    if (exportBadge) {
        if (window.scrollY > 500) {
            exportBadge.style.opacity = '0.8';
            exportBadge.style.transform = 'translateX(-50%) scale(0.9)';
        } else {
            exportBadge.style.opacity = '1';
            exportBadge.style.transform = 'translateX(-50%) scale(1)';
        }
    }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const isActive = navMenu.classList.contains('active');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    
    // Update ARIA attributes for accessibility
    hamburger.setAttribute('aria-expanded', !isActive);
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    // Update ARIA attributes for accessibility
    hamburger.setAttribute('aria-expanded', 'false');
}

/**
 * Handle navigation link clicks
 */
function handleNavLinkClick(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    
    if (href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
            smoothScrollTo(targetElement);
            closeMobileMenu();
        }
    }
}

// ==========================================
// Animation on Scroll
// ==========================================

/**
 * Animate elements when they come into view (optimized)
 */
let animateElements = null; // Cache the elements
function animateOnScroll() {
    // Cache elements on first run
    if (!animateElements) {
        animateElements = document.querySelectorAll('.product-card, .feature-card, .cert-card, .about-card, .stat-item, .contact-card, .capability-card, .quality-feature');
    }
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
        animateElements.forEach((element, index) => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                // Reduce animation delay for faster perception
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated');
                }, index * 50); // Reduced from 100ms to 50ms
            }
        });
    });
}

/**
 * Initialize animation styles
 */
function initAnimations() {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .cert-card, .about-card, .stat-item, .contact-card, .capability-card, .quality-feature');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// ==========================================
// Back to Top Button
// ==========================================

/**
 * Show/hide back to top button
 */
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

/**
 * Scroll to top
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================
// Counter Animation
// ==========================================

/**
 * Animate counter numbers (optimized)
 */
let counters = null; // Cache counters
function animateCounters() {
    // Cache counters on first run
    if (!counters) {
        counters = document.querySelectorAll('.stat-number');
    }

    counters.forEach(counter => {
        if (isInViewport(counter) && !counter.classList.contains('counted')) {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 1000; // Fixed duration instead of speed-based
            const startTime = performance.now();
            const startValue = 0;
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use easing for smooth animation
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(startValue + (target - startValue) * easedProgress);
                
                counter.textContent = counter.textContent.replace(/\d+/, current);
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                }
            }
            
            requestAnimationFrame(updateCounter);
            counter.classList.add('counted');
        }
    });
}

// ==========================================
// Form Handling
// ==========================================

/**
 * Validate form fields
 */
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    return errors;
}

/**
 * Check if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handle contact form submission with Formspree
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value.trim();
    });
    
    // Validate form
    const validationErrors = validateForm(formObject);
    if (validationErrors.length > 0) {
        showNotification(validationErrors.join('<br>'), 'error');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Submit to Formspree
    fetch('https://formspree.io/f/mqalavwr', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            showNotification('Thank you! Your export inquiry has been sent successfully. We will contact you within 24 hours with a detailed quote.', 'success');
            
            // Reset form
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showNotification('Sorry, there was an error sending your message. Please try again or contact us directly at info@amrudhya.com', 'error');
    })
    .finally(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let iconName;
    let backgroundColor;
    
    switch(type) {
        case 'success':
            iconName = 'check-circle';
            backgroundColor = '#4CAF50';
            break;
        case 'error':
            iconName = 'exclamation-triangle';
            backgroundColor = '#f44336';
            break;
        default:
            iconName = 'info-circle';
            backgroundColor = '#2196F3';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconName}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto close after 5 seconds
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification(notification);
    });
    
    function closeNotification(notif) {
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        }, 300);
    }
}

/**
 * Handle newsletter subscription
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        e.target.reset();
    }
}

// ==========================================
// Interactive Map Markers
// ==========================================

/**
 * Handle map marker interactions
 */
function initMapMarkers() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            const country = marker.dataset.country;
            showTooltip(marker, `We export to ${country}`);
        });
        
        marker.addEventListener('mouseleave', () => {
            hideTooltip();
        });
    });
}

/**
 * Show tooltip
 */
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--primary-forest);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        transform: translate(-50%, -100%);
        margin-top: -10px;
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = (rect.top + window.scrollY) + 'px';
    
    document.body.appendChild(tooltip);
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    const tooltip = document.querySelector('.map-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// ==========================================
// Product Card Hover Effects & Filtering
// ==========================================

/**
 * Initialize product card interactions
 */
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'linear-gradient(135deg, #f8fffe 0%, #f0f9f4 100%)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--white)';
        });
    });
}

/**
 * Initialize product filtering functionality
 */
function initProductFiltering() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card[data-category]');
    
    if (tabButtons.length === 0 || productCards.length === 0) {
        return; // No filtering elements found
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });
}

/**
 * Filter products based on category
 */
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card[data-category]');
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Show card
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate in
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }, 50);
        } else {
            // Hide card
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Update grid layout after filtering
    setTimeout(() => {
        const grid = document.querySelector('.products-grid');
        if (grid) {
            // Trigger layout recalculation
            grid.style.display = 'grid';
        }
    }, 350);
}

// ==========================================
// Lazy Loading for Images
// ==========================================

/**
 * Initialize lazy loading
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ==========================================
// Performance Monitoring
// ==========================================

/**
 * Monitor page performance
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            // Only log if page load time is concerning
            if (pageLoadTime > 3000) {
                console.warn(`Page load time: ${pageLoadTime}ms - Consider optimization`);
            }
        });
    }
}

// ==========================================
// Error Handling
// ==========================================

/**
 * Global error handling
 */
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // In production, you might want to send this to an error tracking service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        // In production, you might want to send this to an error tracking service
    });
}

// ==========================================
// Accessibility Improvements
// ==========================================

/**
 * Improve keyboard navigation
 */
function initKeyboardNavigation() {
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Trap focus in mobile menu when open
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

/**
 * Add skip to content link
 */
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-forest);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ==========================================
// Event Listeners
// ==========================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    try {
        // Optimized scroll events with better throttling
        let ticking = false;
        function optimizedScrollHandler() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    try {
                        handleNavbarScroll();
                        toggleBackToTop();
                        animateOnScroll();
                        animateCounters();
                    } catch (error) {
                        console.error('Error in scroll handler:', error);
                    } finally {
                        ticking = false;
                    }
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
        
        // Navigation events with error handling
        if (hamburger) {
            hamburger.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    toggleMobileMenu();
                } catch (error) {
                    console.error('Error toggling mobile menu:', error);
                }
            });
        }
        
        // Navigation links with error handling
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                try {
                    handleNavLinkClick(e);
                } catch (error) {
                    console.error('Error handling nav link click:', error);
                    // Fallback to default behavior
                }
            });
        });
        
        // Back to top button with error handling
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    scrollToTop();
                } catch (error) {
                    console.error('Error scrolling to top:', error);
                }
            });
        }
        
        // Contact form with enhanced error handling
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                try {
                    handleFormSubmit(e);
                } catch (error) {
                    console.error('Error handling form submission:', error);
                    e.preventDefault();
                    showNotification('An unexpected error occurred. Please try again.', 'error');
                }
            });
        }
        
        // Newsletter forms with error handling
        document.querySelectorAll('.newsletter-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                try {
                    handleNewsletterSubmit(e);
                } catch (error) {
                    console.error('Error handling newsletter submission:', error);
                    e.preventDefault();
                }
            });
        });
        
        // Close mobile menu when clicking outside with error handling
        document.addEventListener('click', (e) => {
            try {
                if (navMenu && hamburger && !navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            } catch (error) {
                console.error('Error handling outside click:', error);
            }
        });
        
        // Window resize with error handling
        window.addEventListener('resize', debounce(() => {
            try {
                closeMobileMenu();
            } catch (error) {
                console.error('Error handling window resize:', error);
            }
        }, 250));
        
        // Page visibility change
        document.addEventListener('visibilitychange', () => {
            try {
                if (document.hidden) {
                    // Page is hidden, pause any animations or timers if needed
                } else {
                    // Page is visible again
                }
            } catch (error) {
                console.error('Error handling visibility change:', error);
            }
        });
        
    } catch (error) {
        console.error('Critical error initializing event listeners:', error);
        // Initialize basic fallback functionality
        initFallbackEventListeners();
    }
}

/**
 * Fallback event listeners for critical errors
 */
function initFallbackEventListeners() {
    try {
        // Basic hamburger menu functionality
        const hamburgerEl = document.getElementById('hamburger');
        const navMenuEl = document.getElementById('nav-menu');
        
        if (hamburgerEl && navMenuEl) {
            hamburgerEl.addEventListener('click', () => {
                navMenuEl.classList.toggle('active');
                hamburgerEl.classList.toggle('active');
            });
        }
        
        // Basic smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
    } catch (error) {
        console.error('Even fallback event listeners failed:', error);
    }
}

// ==========================================
// Initialization
// ==========================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    console.log('AmrudhyaHarvest website initialized');
    
    // Initialize components
    initAnimations();
    initEventListeners();
    initMapMarkers();
    initProductCards();
    initProductFiltering();
    initLazyLoading();
    initKeyboardNavigation();
    addSkipLink();
    initErrorHandling();
    monitorPerformance();
    
    // Initial calls
    handleNavbarScroll();
    toggleBackToTop();
    
    // Add main content ID for skip link
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('tabindex', '-1');
    }
    
    // Smooth scroll polyfill check
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Load smooth scroll polyfill if needed
        console.log('Smooth scroll not supported, consider loading polyfill');
    }
    
    // Set initial theme based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('User prefers dark mode - consider implementing dark theme');
    }
    
    // Performance mark
    if ('performance' in window && 'mark' in window.performance) {
        performance.mark('amrudhya-harvest-initialized');
    }
}

// ==========================================
// Start the application
// ==========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScrollTo,
        handleNavbarScroll,
        toggleMobileMenu,
        animateOnScroll,
        handleFormSubmit
    };
}