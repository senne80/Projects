const txtArea = document.querySelector('#txtArea');
const lblFeedback = document.querySelector('#lblFeedback');
const btn = document.querySelector('button');
let counter;
let chars = [];

function berekenAantalCharacters(e)
{
    counter = 0;
    chars = [];
    e.preventDefault();
    for ( let c of txtArea.value) {
        chars.push(c);
        counter++;
    }
    lblFeedback.textContent = counter;
    console.log(chars.length);
}

btn.addEventListener('click', berekenAantalCharacters);
