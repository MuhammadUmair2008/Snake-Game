let text = document.getElementById('text');
let text2 = document.getElementById('text2');
let para = 'INSTRUCTIONS'
let para2 = '1.Your score will be shown \nat the top\n2.Do not touch the border line.\nIf you will touch the border line \nthe game will be over\n3.If the game will be over so \n you have to reload \nthe page again'
let x = 1;
setInterval(write,115);

function write () {
    text.innerText = para.slice(0,x);
    text2.innerText = para2.slice(0,x);
    x++;
    // if(x > para3.length) {
    //     x=1;
    // }
    
}