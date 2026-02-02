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