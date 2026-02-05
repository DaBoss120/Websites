function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger input');
    
    menu.classList.toggle('menu-open');
    document.body.classList.toggle('no-scroll', menu.classList.contains('menu-open'));
}

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu ul li a');
    const hamburgerInput = document.querySelector('.hamburger input');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.menu');
            if (menu.classList.contains('menu-open')) {
                menu.classList.remove('menu-open');
                document.body.classList.remove('no-scroll');
                if (hamburgerInput) hamburgerInput.checked = false;
            }
        });
    });
});