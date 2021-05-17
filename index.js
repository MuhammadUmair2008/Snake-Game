let text = document.getElementById('text');
let para2 = 'SNAKE GAME'
let x = 1;
setInterval(write,115);

function write () {
    text.innerText = para2.slice(0,x);
    x++;
    // if(x > para2.length) {
    //     x=1;
    // }
    
}