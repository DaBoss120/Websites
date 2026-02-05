window.addEventListener('DOMContentLoaded', () => {
    const screenWidth = window.innerWidth;
    populateSlideBanner(screenWidth);
    populateRotatingBanner(screenWidth);
    initAccordion();
    initCounters();
    initWavyText();
});

// Slide Banner
function populateSlideBanner(screenWidth) {
    Array.from(document.getElementsByClassName('expressive-slide')).forEach(elem => {
        let html = ' // Expressive ';
        for(let i = 0; i < Math.ceil(screenWidth / 200) + 1; i++) {
            html += " // Expressive ";
        };
        elem.innerHTML = html;
    });
}

// Rotating Banner - Using same pattern as expressive-slide with two alternating elements
function populateRotatingBanner(screenWidth) {
    const bannerWords = ['BOLD', 'EXPRESSIVE', 'PLAYFUL', 'COLORFUL', 'MAXIMALIST', 'CREATIVE', 'UNIQUE'];
    const banners = document.querySelectorAll('.rotating-banner');
    
    banners.forEach(banner => {
        // Clear existing content
        banner.innerHTML = '';
        
        // Calculate how many repetitions needed to fill the screen
        const repetitions = Math.ceil(screenWidth / 400) + 2;
        
        // Create two identical content divs for seamless loop (like expressive-slide)
        for (let i = 0; i < 2; i++) {
            const content = document.createElement('span');
            content.className = 'rotating-banner-content';
            
            let html = '';
            for (let j = 0; j < repetitions; j++) {
                bannerWords.forEach(word => {
                    html += `<span>★ ${word}</span>`;
                });
            }
            content.innerHTML = html;
            banner.appendChild(content);
        }
    });
}

// Scroll Reveal Text
const scrollRevealElements = document.querySelectorAll('.scroll-reveal-text');

scrollRevealElements.forEach(element => {
    const childNodes = Array.from(element.childNodes);
    const fragment = document.createDocumentFragment();
    
    childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            const words = child.textContent.split(/(\s+)/);
            
            words.forEach(word => {
                if (word.trim() === '') {
                    fragment.appendChild(document.createTextNode(word));
                } else {
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.textContent = word;
                    fragment.appendChild(span);
                }
            });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            const span = document.createElement('span');
            span.className = 'word';
            span.appendChild(child.cloneNode(true));
            fragment.appendChild(span);
        }
    });
    
    element.innerHTML = '';
    element.appendChild(fragment);
});

const revealOnScroll = () => {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            const words = element.querySelectorAll('.word');
            const scrollProgress = (windowHeight * 0.8 - elementTop) / (windowHeight * 0.5);
            
            words.forEach((word, index) => {
                const wordThreshold = index / words.length;
                
                if (scrollProgress > wordThreshold) {
                    word.classList.add('revealed');
                }
            });
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Wavy Text - Split text into spans for animation
function initWavyText() {
    const wavyElements = document.querySelectorAll('.txt-wavy');
    
    wavyElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.style.animationDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });
    });
}