window.addEventListener('DOMContentLoaded', () => {
    const screenWidth = window.innerWidth;
    populateSlideBanner(screenWidth);
});
function populateSlideBanner(screenWidth) {
    Array.from(document.getElementsByClassName('expressive-slide')).forEach(elem => {
        let html = ' // Expressive ';
        for(let i = 0; i < Math.ceil(screenWidth / 200) + 1; i++) {
            html += " // Expressive ";
        };
        elem.innerHTML = html;
    });
}

const scrollRevealElements = document.querySelectorAll('.scroll-reveal-text');

// Wrap each word in a span while preserving HTML elements
scrollRevealElements.forEach(element => {
    const childNodes = Array.from(element.childNodes);
    const fragment = document.createDocumentFragment();
    
    childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            // It's a text node - wrap each word in a span
            const words = child.textContent.split(/(\s+)/); // Keep whitespace
            
            words.forEach(word => {
                if (word.trim() === '') {
                    // It's whitespace, keep it as is
                    fragment.appendChild(document.createTextNode(word));
                } else {
                    // It's a word, wrap it in a span
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.textContent = word;
                    fragment.appendChild(span);
                }
            });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            // It's an element (like <mark>) - wrap the whole element in a span
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
        
        // Start revealing when element is 80% into the viewport
        if (elementTop < windowHeight * 0.8) {
            const words = element.querySelectorAll('.word');
            const scrollProgress = (windowHeight * 0.8 - elementTop) / (windowHeight * 0.5);
            
            words.forEach((word, index) => {
                // Calculate threshold for each word
                const wordThreshold = index / words.length;
                
                if (scrollProgress > wordThreshold) {
                    word.classList.add('revealed');
                }
            });
        }
    });
};

// Run on scroll
window.addEventListener('scroll', revealOnScroll);

// Run once on load in case element is already visible
revealOnScroll();