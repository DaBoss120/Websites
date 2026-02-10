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
        for (let i = 0; i < Math.ceil(screenWidth / 200) + 1; i++) {
            html += " // Expressive ";
        };
        elem.innerHTML = html;
    });
}
function animateRotatingElements() {
    const rotatingElements = document.querySelectorAll('.rotating-elements-in-circle .rotating-element');
    const rotationSpeed = 0.2; // degrees per frame
    const radius = 17.5;
    const elementCount = rotatingElements.length;

    rotatingElements.forEach((elem, index) => {
        // Initialize or get current angle from data attribute
        let currentAngle = parseFloat(elem.getAttribute('data-angle'));
        if (isNaN(currentAngle)) {
            // Initialize with evenly spaced positions around the circle
            currentAngle = (360 / elementCount) * index;
        }

        // Increment the angle
        const newAngle = currentAngle + rotationSpeed;
        elem.setAttribute('data-angle', newAngle);

        // Position element on circle, counter-rotate to keep it upright
        const scaleTransform = (index === 1 || index === 4) ? 'scale(0.3)' : '';
        elem.style.transform = `translate(-50%, -50%) rotate(${newAngle}deg) translateX(${radius}vw) rotate(${-newAngle}deg) ${scaleTransform}`;
    });
    // const rotatingElements = document.querySelectorAll('.rotating-elements-in-circle .rotating-element');
    // const rotationSpeed = 0.1; // degrees per frame

    // rotatingElements.forEach((elem, index) => {

    //     const currentRotationMatrix = window.getComputedStyle(elem).getPropertyValue('transform');  // parseFloat(elem.getAttribute('data-rotation') || '0');}
    //     var values = currentRotationMatrix.split('(')[1],
    //         values = values.split(')')[0],
    //         values = values.split(',');
    //     var a = values[0]; // 0.866025
    //     var b = values[1]; // 0.5
    //     var c = values[2]; // -0.5
    //     var d = values[3]; // 0.866025
    //     var scale = Math.sqrt(a*a + b*b);
    //     var sin = b/scale;
    //     var currentRotationAngle = Math.round(Math.asin(sin) * (180 / Math.PI));
    //     console.log(currentRotationAngle);
    //     console.log(currentRotationMatrix);
    //     const newRotationAngle = currentRotationAngle + rotationSpeed;
    //     const radius = 17.5;
    //     elem.style.transform = `translate(-50%, -50%) rotate(${index * 60 + newRotationAngle}deg) translateX(${radius}vw) rotate(${-index * 60 - newRotationAngle}deg) ${index === 1 || index === 4 ? 'scale(0.3)' : ''}`;
    // });
}
setInterval(animateRotatingElements, 16); // ~60fps

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
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        if (elementTop < windowHeight * 0.8) {
            const words = element.querySelectorAll('.word');

            // Calculate scroll progress, but also check if we're near page bottom
            const isNearPageBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;

            let scrollProgress;
            if (isNearPageBottom) {
                // If near bottom, reveal all words
                scrollProgress = 1;
            } else {
                scrollProgress = (windowHeight * 0.8 - elementTop) / (windowHeight * 0.5);
            }

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
        const hasPlusSign = counter.getAttribute('data-plus') === 'true';
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + (hasPlusSign ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (hasPlusSign ? '+' : '');
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