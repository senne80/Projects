// VARIABELEN
// databank
let dbSenneVanMolOrigineel;
let dbSenneVanMolRace;

// Gravatar
let gravatarData;
let hashData;
let mail;

// Quote
let randomQuoteData;
let quote;
let charsOfText = [];

// klok
const stopwatch = document.querySelector('#stopwatch');
let startTijd;
let aftelTijd;
let intervalCounter;

// geluiden
const fouteAntwoord = document.querySelector('#fouteAntwoord');
const juisteAntwoord = document.querySelector('#juisteAntwoord');

// inlog / uitlog
const frm = document.querySelector('#frm');
const btnSubmit = document.querySelector('#btnSubmit');
const inpEmail = document.querySelector('#inpEmail');
const username = document.querySelector('#username');
const btnLogUit = document.querySelector('#btnLogUit');
const lblGravatarFeedback = document.querySelector('#lblGravatarFeedback');
const imgBox = document.querySelector('#imgGravatar');
const locatie = document.querySelector('#locatie');
let inputMail;

// Keuze spellen
const lblKies = document.querySelector('#lblKies');
const btnOrigineel = document.querySelector('#btnOrigineel');
const btnRace = document.querySelector('#btnRace');
const btnStop = document.querySelector('#btnStop');
let keuzeSpel;
const raceTijd = 20;
const inpTekst = document.querySelector('#inpTekst');
const txtTekst = document.querySelector('#txtTekst');
let foutperc;

// einde spel
const btnOpnieuw = document.querySelector('#btnOpnieuw');
const lblFeedback = document.querySelector('#lblFeedback');

// score
const score = document.querySelector('#score');
const aantalFouten = document.querySelector('#aantalFouten');
const foutpercentage = document.querySelector('#foutpercentage');
const totaleTijd = document.querySelector('#totaleTijd');
const prestatiescore = document.querySelector('#prestatiescore');
let totaleScore;

// highscore
const tbodyHighscore = document.querySelector('#tbodyHighscore');
const tableHighscore = document.querySelector('#tableHighscore');
const btnZieHighscore = document.querySelector('#btnZieHighscore');
const lblHighscore = document.querySelector('#lblHighscore');
const btnTerug = document.querySelector('#btnTerug');
const tbodyHighscoreRace = document.querySelector('#tbodyHighscoreRace');
const tableHighscoreRace = document.querySelector('#tableHighscoreRace');
const lblRace = document.querySelector('#lblRace');
const lblOrig = document.querySelector('#lblOrig');

// API
// tekst genereren api
async function haalTekstOp() {
   quote = '';
   
   // url voor quote op te halen
   const url = 'https://api.quotable.io/random?minLength=60&maxLength=100';

   // fetch
   const resp = await fetch(url);

   // get json data from response
   if (resp.ok)
   {
      randomQuoteData = await resp.json();
   }
   else
   {
      console.log('fout bij quote');
   }
   quote = randomQuoteData.content;
}

// tekst invullen zodat gebruiker deze kan zien
async function zetTekst() {
   await haalTekstOp();
   charsOfText = quote.split('');
   charsOfText.forEach((c, index) => {
      txtTekst.innerHTML += `<span id="char${index}">${c}</span>`;
   });
}
zetTekst();

// md5 aanmaken api
async function maakMD5(inputMail) {
   // url voor md5 op te halen
   const url = `https://api.hashify.net/hash/md5/hex?value=${inputMail}`;

   // fetch
   const resp = await fetch(url);

   // get json data from response
   if (resp.ok)
   {
      hashData = await resp.json();
   }
   else
   {
      console.log('fout bij md5');
   }

   // hashed mail returnen
   mail = hashData.Digest;
   startTijd = null;
}

// gravatar api
async function gravatar() {
   // url voor md5 op te halen
   const url = `https://gravatar.com/${mail}.json`;

   // fetch
   const resp = await fetch(url);
   let data;

   // get json data from response
   if (resp.ok)
   {
      data = await resp.json();
      lblGravatarFeedback.classList.add('hidden');
   }
   else
   {
      console.log('fout bij gravatar');
      lblGravatarFeedback.classList.remove('hidden');
      inpEmail.value = '';
   }

   // data returnen zodat deze kan opgevraagd worden
   return data.entry[0];
}

// check per input of het overeenkomt met de gegeven quote (ik ben niet voor keydown gegaan aangezien het te ingewikkeld leek om toetsen zoals shift, caps... uit te schakelen)
inpTekst.addEventListener('input', function()
{
   const arrayInput = inpTekst.value.split('');
   btnStop.disabled = false;
   charsOfText.forEach((character, index) => {
      if (startTijd === null && keuzeSpel === 'origineel')
      {
         startStopwatchOrigineel();
      }
      if (aftelTijd === null && keuzeSpel === 'race')
      {
         startAftelKlok();
      }
      if (arrayInput[index] === character) {
         const i = txtTekst.querySelector(`#char${index}`);
         i.classList.add('juist');
         i.classList.remove('fout');
      }
      else
      {
         const i = txtTekst.querySelector(`#char${index}`);
         i.classList.add('fout');
         i.classList.remove('juist');
      }
      if (index === arrayInput.length) {
         const i = txtTekst.querySelector(`#char${index}`);
         i.classList.add('active');
      } else {
         const i = txtTekst.querySelector(`#char${index}`);
         i.classList.remove('active');
      }
   });

   // als de quote even lang is als de getypte tekst stopt het spel automatisch
   if (arrayInput.length === charsOfText.length)
      {
         eindeSpel();
         if (keuzeSpel == 'origineel') {
            stopStopwatch();
         } else {
            stopAftelKlok();
         }
      }

   //  check of laatste getypte letter juist of fout is
   if (arrayInput[arrayInput.length - 1] != charsOfText[arrayInput.length - 1]) {
      fouteAntwoord.play();
      fouteAntwoord.currentTime = 0;
   } else {
      juisteAntwoord.play();
      juisteAntwoord.currentTime = 0;
   }
});

// inloggen met een email -> gegevens worden opgehaald en keuze spellen worden getoont
btnSubmit.addEventListener('click', async function(e) {
   e.preventDefault();
   inputMail = inpEmail.value;
   await maakMD5(inputMail);

   // profiel + foto van gravatar
   gravatarData = await gravatar();
   imgBox.src = gravatarData.thumbnailUrl;


   // hidden
   username.classList.remove('hidden');
   username.textContent = gravatarData.displayName;
   locatie.classList.remove('hidden');
   locatie.textContent = gravatarData.currentLocation;
   btnLogUit.classList.remove('hidden');
   frm.classList.add('hidden');
   imgBox.classList.remove('imgHidden');
   btnOrigineel.classList.remove('hidden');
   btnRace.classList.remove('hidden');
   btnZieHighscore.classList.remove('hidden');
   lblKies.classList.remove('hidden');
});

// pagina reloaden = uitloggen
btnLogUit.addEventListener('click', function() {
   location.reload(); // chatgpt -- anders moest ik alles hidden maken
});

// Origineel spel
function startSpel() {
   btnStop.disabled = true;
   keuzeSpel = 'origineel';

   // hidden
   txtTekst.classList.remove('hidden');
   btnOrigineel.classList.add('hidden');
   stopwatch.classList.remove('hidden');
   btnRace.classList.add('hidden');
   lblKies.classList.add('hidden');
   btnStop.classList.remove('hidden');
   inpTekst.classList.remove('hidden');
}

// open het spel origineel (start vanaf je typt)
btnOrigineel.addEventListener('click', function() {
   stopwatch.textContent = 0;
   startSpel();
   inpTekst.disabled = false;

   // hidden
   btnZieHighscore.classList.add('hidden');
});

// Race tegen de klok -- zorg dat je binnen de tijd alles getypt hebt
btnRace.addEventListener('click', function() {
   stopwatch.textContent = raceTijd;
   startSpel();
   aftelTijd = null;
   stopwatch.textContent = aftelTijd;
   keuzeSpel = 'race';
   inpTekst.disabled = false;

   // hidden
   btnZieHighscore.classList.add('hidden');
   btnStop.classList.add('hidden');
});

// stopwatch -- ik zorg ervoor dat de timer weet welke tijd het is door het uur van nu min het startuur te doen en dit elke seconde aan te passen

function startStopwatchOrigineel() {
   stopwatch.textContent = 0;
   startTijd = new Date();
   intervalCounter = setInterval(() => {
      stopwatch.textContent = getTimerTijd();
   }, 1000);
}

function getTimerTijd() {
   return Math.floor((new Date() - startTijd) / 1000);
}

// chatgpt (ook voor intervalCounter)
function stopStopwatch()
{
   clearInterval(intervalCounter);
}

// aftelklok -- elke seconde gaat er 1 seconde weg van de teller tot de teller op 0 staat
let intervalRace;
function startAftelKlok() {
   aftelTijd = raceTijd;
   stopwatch.textContent = raceTijd;
   intervalRace = setInterval(() => {
      stopwatch.textContent = aftelTijd;
      if (aftelTijd == 0) {
         stopAftelKlok();
         eindeSpel();
      } else {
         aftelTijd--;
      }
   }, 1000);
}

// stopt de klok
function stopAftelKlok() {
   clearInterval(intervalRace);
}

// spel stoppen -- met ene button en escape button

btnStop.addEventListener('click', function() {
   eindeSpel();
   stopStopwatch();
   stopAftelKlok();
   score.classList.remove('hidden');
   btnOpnieuw.classList.remove('hidden');
});

inpTekst.addEventListener('keydown', function(e) {
   if (e.key == 'Escape' && !btnStop.disabled) {
      eindeSpel();
      stopStopwatch();
      stopAftelKlok();
      score.classList.remove('hidden');
      btnOpnieuw.classList.remove('hidden');
   }
});

// einde spel checkt of het origineel of race spel is, dan gaat hij de functie scoreberekenen oproepen deze is specifiek per spel
function eindeSpel() {
   lblFeedback.classList.remove('hidden');
   if (keuzeSpel == 'origineel') {
      berekenScoreOrigineel();
      tableHighscore.classList.remove('hidden');
   } else {
      berekenScoreRace();
      aantalFouten.classList.add('hidden');
      tableHighscore.classList.add('hidden');
      tableHighscoreRace.classList.remove('hidden');
   }
   inpTekst.disabled = true;
   score.classList.remove('hidden');
   btnStop.disabled = true;
   btnOpnieuw.classList.remove('hidden');
}

// Maakt het spel terug klaar voor een volgende speelbeurt
async function terugKiezen() {
   txtTekst.classList.add('hidden');
   inpTekst.classList.add('hidden');
   inpTekst.value = '';
   txtTekst.innerHTML = '';
   await zetTekst();
}

// score wordt berekent door juist% - aantal seconden en beide vergroot zodat de best 'haalbare'(0seconden alles juist dus niet echt haalbaar) score 1000 is
function berekenScoreOrigineel() {
   const fouten = document.querySelectorAll('.fout');
   aantalFouten.textContent = `Antal fouten: ${fouten.length}`;
   foutperc = ((fouten.length / charsOfText.length) * 100).toFixed(1);
   foutpercentage.textContent = `Foutpercentage: ${foutperc}%`;
   totaleTijd.textContent = `Totale tijd: ${stopwatch.textContent}s`;
   totaleScore = Math.floor((100 - foutperc) * 10) - (stopwatch.textContent * 10);
   prestatiescore.textContent = `Totale score: ${totaleScore}`;
   saveOrigineel();
   vulHighscoresIn();
}

// score voor de race is gewoon het percentage dat af is en de tijd wordth ook meegegeven
function berekenScoreRace() {
   const fouten = document.querySelectorAll('.fout');
   foutperc = ((fouten.length / charsOfText.length) * 100).toFixed(1);
   foutpercentage.textContent = `Foutpercentage: ${foutperc}%`;
   totaleTijd.textContent = `Tijd over: ${stopwatch.textContent}s`;
   btnStop.classList.add('hidden');
   totaleScore = Math.floor((100 - foutperc) * 10) + (stopwatch.textContent * 10);
   prestatiescore.textContent = `Totale score: ${totaleScore}`;

   saveRace();
   vulHighscoresInRace();
}

// opnieuw kiezen
btnOpnieuw.addEventListener('click', function() {
   terugKiezen();
   startTijd = null;

   // hidden
   tableHighscoreRace.classList.add('hidden');
   btnZieHighscore.classList.remove('hidden');
   stopwatch.classList.add('hidden');
   score.classList.add('hidden');
   btnStop.classList.add('hidden');
   btnOpnieuw.classList.add('hidden');
   lblFeedback.classList.add('hidden');
   lblKies.classList.remove('hidden');
   btnOrigineel.classList.remove('hidden');
   btnRace.classList.remove('hidden');
   tableHighscore.classList.add('hidden');
   foutpercentage.textContent = '';
   aantalFouten.textContent = '';
   totaleTijd.textContent = '';
   prestatiescore.textContent = '';
});

// Opslaan in LocalStorage -- origineel en race
function saveOrigineel() {
   let bestaandeData = localStorage.getItem('dbSenneVanMolOrigineel');
   dbSenneVanMolOrigineel = {
      user: inputMail,
      score: totaleScore,
      foutpercent: foutperc,
      tijd: stopwatch.textContent,
      datum: new Date().toLocaleDateString(),
      username: gravatarData.displayName
   };
   
   if (bestaandeData) {
      bestaandeData = JSON.parse(bestaandeData);
      bestaandeData.push(dbSenneVanMolOrigineel);
      localStorage.setItem('dbSenneVanMolOrigineel', JSON.stringify(bestaandeData));
   } else {
      localStorage.setItem('dbSenneVanMolOrigineel', JSON.stringify([dbSenneVanMolOrigineel]));
   }
}

function saveRace() {
   let bestaandeData = localStorage.getItem('dbSenneVanMolRace');
   dbSenneVanMolRace = {
      user: inputMail,
      score: totaleScore,
      tijdover: stopwatch.textContent,
      datum: new Date().toLocaleDateString(),
      username: gravatarData.displayName
   };
   
   if (bestaandeData) {
      bestaandeData = JSON.parse(bestaandeData);
      bestaandeData.push(dbSenneVanMolRace);
      localStorage.setItem('dbSenneVanMolRace', JSON.stringify(bestaandeData));
   } else {
      localStorage.setItem('dbSenneVanMolRace', JSON.stringify([dbSenneVanMolRace]));
   }
}

// Highscores vullen -- chatgpt(sort) aangezien ik neit wist hoe ik 1 element eruit kon nemen om op te sorteren
function vulHighscoresIn() {
   tbodyHighscore.innerHTML = '';
   const db = JSON.parse(localStorage.getItem('dbSenneVanMolOrigineel'));
   db.sort((a, b) => (a.score < b.score) ? 1 : -1);
   const scoresPerUser = db.filter(user => user.user === inputMail);
   scoresPerUser.forEach((dbElement, index) => {
         tbodyHighscore.innerHTML += `<tr>
         <td>${index + 1}</td>
         <td>${dbElement.username}</td>
         <td>${dbElement.score}</td>
         <td>${dbElement.foutpercent}%</td>
         <td>${dbElement.tijd}</td>
         <td>${dbElement.datum}</td>
      </tr>`;
   });
}

function vulHighscoresInRace() {
   tbodyHighscoreRace.innerHTML = '';
   const db = JSON.parse(localStorage.getItem('dbSenneVanMolRace'));
   db.sort((a, b) => (a.score < b.score) ? 1 : -1);
   const scoresPerUser = db.filter(user => user.user === inputMail);
   scoresPerUser.forEach((dbElement, index) => {
      tbodyHighscoreRace.innerHTML += `<tr>
         <td>${index + 1}</td>
         <td>${dbElement.username}</td>
         <td>${dbElement.score}</td>
         <td>${dbElement.tijdover}</td>
         <td>${dbElement.datum}</td>
      </tr>`;
   });
}

// brengt je naar een pagina waar je highscores ziet van origineel en race
btnZieHighscore.addEventListener('click', function() {
   // hidden
   lblRace.classList.remove('hidden');
   lblOrig.classList.remove('hidden');
   btnTerug.classList.remove('hidden');
   lblHighscore.classList.remove('hidden');
   lblKies.classList.add('hidden');
   tableHighscore.classList.remove('hidden');
   tableHighscoreRace.classList.remove('hidden');
   vulHighscoresIn();
   btnZieHighscore.classList.add('hidden');
   btnRace.classList.add('hidden');
   btnOrigineel.classList.add('hidden');
});

// gaat terug naar keuzescherm
btnTerug.addEventListener('click', function() {
   // hidden
   tableHighscoreRace.classList.add('hidden');
   lblRace.classList.add('hidden');
   lblOrig.classList.add('hidden');
   lblKies.classList.remove('hidden');
   lblHighscore.classList.add('hidden');
   tableHighscore.classList.add('hidden');
   btnTerug.classList.add('hidden');
   btnOrigineel.classList.remove('hidden');
   btnRace.classList.remove('hidden');
   btnZieHighscore.classList.remove('hidden');
});
