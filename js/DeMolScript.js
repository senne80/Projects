// Variabelen
// Homescreen
const lblName = document.querySelector('#lblName');
const btnNext = document.querySelector('#btnNext');
const inpName = document.querySelector('#inpName');
const test = document.querySelector('#test');

// Spelers
const players = ["Senne", "Nathalie", "Jonathan", "Wout", "Veerle", "Yves", "Josie", "Daan", "Gino"];
let activePlayer;

// Questions
const questionContainer = document.querySelector('.questionContainer');

// Naam invullen en opslaan + naar volgende scherm
btnNext.addEventListener('click', function() {
    if (players.includes(inpName.value))
    {
        if (inpName.value == 'Josie') {
            test.textContent = 'Ej Josie stinkaard da werkt nog ni';
            maakHomescreenLeeg();
        }
        else {
            activePlayer = inpName.value;
            test.textContent = `Proficiat ${activePlayer}, je bent ingelogd`;
            maakHomescreenLeeg();
        }
    }
    else
    {
        test.textContent = 'Gelieve je naam goed te schrijven';
    }
})

function maakHomescreenLeeg() {
    questionContainer.classList.remove('hidden')
    lblName.classList.add('hidden');
    btnNext.classList.add('hidden');
    inpName.classList.add('hidden');
}

// Admin functies
function startEliminatie() {

}

if (inpName.value == 'Josie')
{
    
}