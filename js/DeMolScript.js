// Variabelen
// Homescreen
const lblName = document.querySelector('#lblName');
const btnNext = document.querySelector('#btnNext');
const inpName = document.querySelector('#inpName');
const test = document.querySelector('#test');

// Spelers
const players = ["Senne", "Nathalie", "Jonathan", "Wout", "Veerle", "Yves", "Admin", "Daan", "Gino"];

// Naam invullen en opslaan + naar volgende scherm
btnNext.addEventListener('click', function() {
    if (!players.includes(inpName.value))
    {
        test.textContent = 'Gelieve je naam goed te schrijven';
    }
    else
    {
        test.textContent = 'U bent ingelogd';
    }
})