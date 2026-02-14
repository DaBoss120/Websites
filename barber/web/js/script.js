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

function generateMenu() {
    const menu = document.querySelector('.menu');
    if (menu) {
        menu.innerHTML = `<ul>
                <li><a href="/" class="has-arrow hover-color-gold hover-motion-blur">Home <span
                            class="inline-arrow">&#8594;</span></a></li>
                <li><a href="/services/" class="has-arrow hover-color-gold hover-motion-blur">Services <span
                            class="inline-arrow">&#8594;</span></a></li>
                <li><a href="/ourteam/" class="has-arrow hover-color-gold hover-motion-blur">Our Team <span
                            class="inline-arrow">&#8594;</span></a></li>
                <li><a href="/contact/" class="has-arrow hover-color-gold hover-motion-blur">Contact <span
                            class="inline-arrow">&#8594;</span></a></li>
            </ul>`;
    }
}
function generateFooter() {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `        
        <div class="footer-grid">
            <div class="footer-col">
                <h4>Navigation</h4>
                <a href="/">Home</a>
                <a href="/services/">Services</a>
                <a href="/ourteam/">Our Team</a>
                <a href="/contact/">Contact</a>
            </div>
            <div class="footer-col">
                <h4>Hours</h4>
                <p>Mon – Fri: 9:00 AM – 8:00 PM</p>
                <p>Saturday: 9:00 AM – 6:00 PM</p>
                <p>Sunday: Closed</p>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <p>123 Main Street, Downtown</p>
                <a href="tel:+15551234567">(555) 123-4567</a>
                <a href="mailto:info@barbershop.com">info@barbershop.com</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Barber Shop. All rights reserved.</p>
        </div>`;
    }
}

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
    generateMenu();
    generateFooter();
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

    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const body = item.querySelector('.accordion-body');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.accordion-body').style.maxHeight = null;
            });

            // Open clicked (if it wasn't already open)
            if (!isOpen) {
                item.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px'; // Set max-height dynamically based on content height
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