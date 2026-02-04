const meetText = document.querySelector('.meet');
const expressiveText = document.querySelector('.expressive');
const highlight = document.createElement('div');
function createLetterSpan(letter) {
    let span = document.createElement('span');
    span.textContent = letter;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%)';
    span.style.transition = 'transform 0.24s cubic-bezier(0.2, 1.3, 0.8, 1), opacity 0.1s ease-out';

    // Handle spaces
    if (letter === ' ') {
        span.style.width = '0.3em';
    }

    return span;
}

function animateSpanIn(span) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    });
}
function animateSpanOut(span) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // span.parentNode.style.overflow = 'hidden';
            span.style.transform = 'translateY(-100%)';
        });
    });
}
function colorText(container) {
    const spans = container.querySelectorAll('span');
    const totalDuration = 600; // Total highlight animation time in ms

    // Easing function for highlight timing
    const easeOutCubic = t => (--t) * t * t + 1;

    spans.forEach((span, index) => {
        // Calculate delay based on easing
        const progress = index / spans.length;
        const easedTime = easeOutCubic(progress) * totalDuration;

        setTimeout(() => {
            span.style.transition = 'color 0.3s ease-out';
            span.style.color = 'var(--green)';
        }, easedTime);
    });
}
function highlightText(container) {
    // Create the highlighter element

    const highlightOverflowPercentage = 10; // Slightly wider than text
    highlight.className = 'highlight-bar';
    highlight.style.position = 'absolute';
    highlight.style.left = `${(highlightOverflowPercentage / 4) * 3}%`; // For some reason this is what makes the highlight centered
    highlight.style.top = '50%';
    highlight.style.height = '80%';
    highlight.style.width = '0%'; // Will be incremented
    highlight.style.backgroundColor = 'var(--green)';
    highlight.style.opacity = '0.4';
    highlight.style.transform = 'translateY(-45%) rotate(-2deg)'; // Start a bit under the middle of the text and tilted
    highlight.style.transformOrigin = 'left center';
    highlight.style.transition = 'width 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    highlight.style.zIndex = '-1';
    highlight.style.borderRadius = '4px';

    // Make sure container is positioned for the absolute child
    container.style.position = 'absolute';
    // container.style.overflow = 'visible';
    container.style.left = '50%';
    container.appendChild(highlight);

    // Trigger the animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            highlight.style.width = `${85}%`; // Slightly wider to cover edges
        });
    });
}
function unhighlightText() {
    const highlightOverflowPercentage = 10;
    const fullWidth = 100 + highlightOverflowPercentage;

    // highlight.style.transformOrigin = 'center center';
    // Animate left to move right, and width to shrink
    highlight.style.transition = 'left 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'; // , transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // @TODO: Make the highlight move from left to right while shrinking
            // highlight.style.left = `${fullWidth - (highlightOverflowPercentage / 3) * 4}%`;
            highlight.style.width = '0%';
            // highlight.style.height = '100%';
            highlight.style.transform = 'translateY(-45%) rotate(-2deg)'; // Keep tilted

        });
    });
    highlight.addEventListener('transitionend', () => {
        removeIntroText();
        fadeInBody();
    });
}
function removeIntroText() {
    meetText.style.display = 'none';
    expressiveText.style.display = 'none';
}
function fadeInBody() {
    // let bodyElements = document.querySelectorAll('body :not(.meet):not(.expressive)');
    let bodyElements = document.querySelectorAll('body > header, body > main');
    bodyElements.forEach(el => {
        el.style.transition = 'opacity 1s ease-in';
        el.style.opacity = '1';
    });
}
meetText.addEventListener('animationend', function () {
    meetText.style.opacity = 0;
    let text = document.querySelector('.expressive');
    let txtContent = text.textContent;
    let length = txtContent.length;
    let character = 0;

    // Clear the text and set up for animation
    text.textContent = '';
    text.style.opacity = 1;

    // Remove the centering transform and position manually
    text.style.left = '50%';

    // Easing functions - pick one!
    const easeInQuad = t => t * t;
    const easeOutQuad = t => t * (2 - t);
    const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const easeInCubic = t => (t * t * t) / 2;
    const easeOutCubic = t => (--t) * t * t + 1;
    const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    // Configuration
    const totalDuration = 750; // Total time for all letters in ms
    const minDelay = 15;        // Minimum delay between letters
    const easingFn = easeInCubic; // Letters start fast, slow down at end

    // Pre-calculate delays based on easing
    function getDelay(index, total) {
        const t1 = easingFn(index / total);
        const t2 = easingFn((index + 1) / total);
        const delay = (t2 - t1) * totalDuration;
        return Math.max(delay, minDelay);
    }

    (function typeWriter() {
        if (character < length) {
            let span = createLetterSpan(txtContent[character]);
            text.appendChild(span);

            // Smoothly adjust the left position to keep centered
            let newWidth = text.offsetWidth;
            text.style.marginLeft = `-${newWidth / 2}px`;

            animateSpanIn(span);

            const delay = getDelay(character, length);
            character++;
            setTimeout(typeWriter, delay);
        } else {
            // Start highlight animation after typing is done
            setTimeout(() => highlightText(text), 300);
        }
    }());
});

highlight.addEventListener('transitionend', function () {
    document.querySelectorAll('.expressive span').forEach(span => {
        animateSpanOut(span);
        unhighlightText();
    });
});