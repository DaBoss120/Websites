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

// Wrap each word in a span
scrollRevealElements.forEach(element => {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join('');
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