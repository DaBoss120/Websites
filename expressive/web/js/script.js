var text = document.querySelector('.expressive').textContent;

var length = text.length;
var timeOut;
var character = 0;


(function typeWriter() { 
    timeOut = setTimeout(function() {
        character++;
        var type = text.substring(0, character);
        document.querySelector('.expressive').textContent = type;
        typeWriter();
        
        if (character == length) {
            clearTimeout(timeOut);
        }
        
    }, 50);
}());
