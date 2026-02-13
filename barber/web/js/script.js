// function revealOnScroll() {
//     const elements = document.querySelectorAll('.reveal-on-scroll');
//     const windowHeight = window.innerHeight;
//     const revealPoint = 150; // Adjust this value to control when the element is revealed

//     elements.forEach(element => {
//         const elementTop = element.getBoundingClientRect().top;
//         if (elementTop < windowHeight - revealPoint) {
//             element.classList.add('revealed');
//         } else {
//             element.classList.remove('revealed');
//         }
//     });
// }
// Hamburger menu toggle
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');
    const hamburgerInput = document.querySelector('.hamburger input');

    menu.classList.toggle('menu-open');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    // Uncheck hamburger if closing
    if (!menu.classList.contains('menu-open') && hamburgerInput) {
        hamburgerInput.checked = false;
    }
}

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu ul li a');
    const hamburgerInput = document.querySelector('.hamburger input');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.menu');
            const overlay = document.querySelector('.menu-overlay');
            if (menu.classList.contains('menu-open')) {
                menu.classList.remove('menu-open');
                overlay.classList.remove('active');
                if (hamburgerInput) hamburgerInput.checked = false;
                document.body.classList.remove('no-scroll');
            }
        });
    });
});
// function revealOnScroll() {
//     const elements = document.querySelectorAll('.reveal-on-scroll');
//     const windowHeight = window.innerHeight;
//     const revealPoint = 150; // Adjust this value to control when the element is revealed

//     // Group elements by their top position (same row)
//     const rows = new Map();

//     elements.forEach(element => {
//         const elementTop = element.getBoundingClientRect().top;
//         const elementAbsoluteTop = elementTop + window.scrollY;

//         // Round to nearest 10px to group elements on the same row
//         const rowKey = Math.round(elementAbsoluteTop / 10) * 10;

//         if (!rows.has(rowKey)) {
//             rows.set(rowKey, []);
//         }
//         rows.get(rowKey).push({ element, elementTop });
//     });

//     // Process each row
//     rows.forEach((rowElements) => {
//         rowElements.forEach(({ element, elementTop }, index) => {
//             if (elementTop < windowHeight - revealPoint) {
//                 // Add a staggered delay based on the element's position in the row
//                 setTimeout(() => {
//                     element.classList.add('revealed');
//                 }, index * 150); // 150ms delay between each element
//             } else {
//                 element.classList.remove('revealed');
//             }
//         });
//     });
// }

// window.addEventListener('scroll', revealOnScroll);
// window.addEventListener('load', revealOnScroll);
// Store timeout IDs to be able to clear them
const revealTimeouts = new Map();

function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    // Group elements by their top position (same row)
    const rows = new Map();

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementAbsoluteTop = elementTop + window.scrollY;

        // Round to nearest 10px to group elements on the same row
        const rowKey = Math.round(elementAbsoluteTop / 10) * 10;

        if (!rows.has(rowKey)) {
            rows.set(rowKey, []);
        }
        rows.get(rowKey).push({ element, elementTop });
    });

    // Process each row
    rows.forEach((rowElements) => {
        rowElements.forEach(({ element, elementTop }, index) => {
            // Clear any pending timeout for this element
            if (revealTimeouts.has(element)) {
                clearTimeout(revealTimeouts.get(element));
                revealTimeouts.delete(element);
            }

            if (elementTop < windowHeight - revealPoint) {
                // Add a staggered delay based on the element's position in the row
                const timeoutId = setTimeout(() => {
                    element.classList.add('revealed');
                    revealTimeouts.delete(element);
                }, index * 150);
                revealTimeouts.set(element, timeoutId);
            } else {
                element.classList.remove('revealed');
            }
        });
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);