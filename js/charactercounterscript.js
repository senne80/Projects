const txtArea = document.querySelector('#txtArea');
const lblFeedback = document.querySelector('#lblFeedback');
const btnCountAll = document.querySelector('#btnCountAll');
const btnCountLetters = document.querySelector('#btnCountLetters');

function berekenAantalCharacters(inputText) {
    return inputText.length;
}

function berekenAantalLetters(inputText) {
    const lettersOnly = inputText.replace(/[^\w]/g, '');
    return lettersOnly.length;
}

btnCountAll.addEventListener('click', function(e) {
    e.preventDefault();
    const inputText = txtArea.value;
    const counter = berekenAantalCharacters(inputText);
    lblFeedback.textContent = `Number of characters: ${counter}`;
});

btnCountLetters.addEventListener('click', function(e) {
    e.preventDefault();
    const inputText = txtArea.value;
    const counter = berekenAantalLetters(inputText);
    lblFeedback.textContent = `Number of letters: ${counter}`;
});
