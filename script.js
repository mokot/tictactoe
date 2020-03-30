// zacetno polje je pravzaprav prazna tabela
var igralnoPolje = [];

// prvi igralec
var prviIgralec = 'O';
// drugi igralec
var drugiIgralec = 'X';

// imena igralcev
var imePrvi;
var imeDrugi;

// igralec na potezi: ce je vrednost true = prvi, ce je vrednost false = drugi
var naPotezi = true;
var konec;

// mozne zmagovalne kombinacije
var zmagovalneKombinacije = [
    // vodoravne moznosti
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // navpicne moznosti
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonalne moznosti
    [0, 4, 8],
    [2, 4, 6]
];

// dolocimo celico (dobimo tabelo)
var celica = document.querySelectorAll(".celica");

// ko se stran nalozi
window.addEventListener('load', function() {

    document.getElementById("igralnoPolje").style.display = "none";
    document.querySelector(".zmagovalec").style.display = "none";

    // na zacetku izpisemo opozorilo o podrobnem branju
    window.alert("Res mislite, da ste pripravljeni igrati igro vašega življenja?\n\nPOZORNO preberite spodnja navodila, saj poti nazaj NI.");
});

// ko pritisnemo gumb, se igra pricne
function zacetekIgre() {

    // dolocimo imena igralcev
    imePrvi = document.getElementById("imePrvi").value;
    imeDrugi = document.getElementById("imeDrugi").value;
    console.log("Prvi igralec: " + imePrvi);
    console.log("Drugi igralec: " + imeDrugi);

    // prikrijemo trenutno stran in prikazemo igralno polje
    document.getElementById("zacetekId").style.display = "none";
    document.getElementById("igralnoPolje").style.display = "block";
    document.querySelector(".zmagovalec").style.display = "none";

    document.getElementById("igralnoPolje").style.opacity = "1";

    // dodamo, kdo zacne igro
    document.getElementById("naPotezi").innerHTML = imePrvi;

    // zacetek igre
    igra();
}

function igra() {
    // poklicemo igra znova in ocistimo igralno polje
    igraZnova();

    // zacnemo igro (igra ima v celoti 9 korakov)
    for (let i = 0; i < celica.length; i++) {
        celica[i].addEventListener('click', function() {
            console.log("Polje: " + celica[i].id);
            izbranoPolje(celica[i].id);
        });
    }
}

function igraZnova() {
    // v primeru ponovne igre, zakrijemo okno Zmagovalca
    document.querySelector(".zmagovalec").style.display = "none";

    konec = -1;
    // igralno polje nastavimo na vrednosti -1
    for (let i = 0; i < 9; i++) {
        igralnoPolje[i] = 0 ;
    }
    console.log(igralnoPolje);

    // gremo cez celotno igralno polje (pogledamo vsako celico in jo izpraznemo)
    for (let i = 0; i < celica.length; i++) {
        // vsako polje nastavimo na prazno in izbrisemo barvo ozadja
        celica[i].innerHTML='';
        celica[i].style.removeProperty('background-color');
    }
}


// funckija, ki pove, katero polje je bilo kliknjeno
function izbranoPolje(polje) {

    // preverimo vrednost v igralnem polju, ce je enaka 0, vpisemo vrednost igralca
    if (igralnoPolje[polje] === 0) {
        igralnoPolje[polje] = naPotezi;

        // izris na sliko igralnega polja
        if (naPotezi) {
            document.getElementById(polje).innerHTML = prviIgralec;
            // izpis kdo je na potezi
            document.getElementById("naPotezi").innerHTML = imeDrugi;
        } else {
            document.getElementById(polje).innerHTML = drugiIgralec;
            // izpis kdo je na potezi
            document.getElementById("naPotezi").innerHTML = imePrvi;
        }

        // preverimo, ce je igra koncana
        // ce je igra koncana, gremo na zakljucno funckijo
        konec = konecF(naPotezi);
        if (konec >= 0 && konec <= 7) {
            konecIgre(naPotezi, konec);
        }

        // primer, ko je rezultat izenacen (dolg, neuporaben nacin)
        else if ((igralnoPolje[0] === true || igralnoPolje[0] === false) &&
                (igralnoPolje[1] === true || igralnoPolje[1] === false) &&
                (igralnoPolje[2] === true || igralnoPolje[2] === false) &&
                (igralnoPolje[3] === true || igralnoPolje[3] === false) &&
                (igralnoPolje[4] === true || igralnoPolje[4] === false) &&
                (igralnoPolje[5] === true || igralnoPolje[5] === false) &&
                (igralnoPolje[6] === true || igralnoPolje[6] === false) &&
                (igralnoPolje[7] === true || igralnoPolje[7] === false) &&
                (igralnoPolje[8] === true || igralnoPolje[8] === false)) {
                    konecIgre(-1, -1);
                }

        naPotezi = !naPotezi;
    } else {
        var stevec = 0;
        // preverimo, ce je igre konec z neodlocenim izzidom
        for (let i = 0; i < igralnoPolje.lenght; i++) {
            if (igralnoPolje[i] === true || igralnoPolje[i] === false) {
                stevec++;
            }
        }

        if (stevec >= 8) {
            konecIgre(-1);
        }
    }
}

// zaradi utrujenosti smo obrali lazjo moznost (preverimo vse mozne kombinacije na vsakem koraku...)
function konecF(naPotezi) {
    // vodoravne moznosti
    if (igralnoPolje[0] === naPotezi && igralnoPolje[1] === naPotezi && igralnoPolje[2] === naPotezi) {
        return 0;
    }
    else if (igralnoPolje[3] === naPotezi && igralnoPolje[4] === naPotezi && igralnoPolje[5] === naPotezi) {
        return 1;
    }
    else if (igralnoPolje[6] === naPotezi && igralnoPolje[7] === naPotezi && igralnoPolje[8] === naPotezi) {
        return 2;
    }
    // navpicne resitve
    else if (igralnoPolje[0] === naPotezi && igralnoPolje[3] === naPotezi && igralnoPolje[6] === naPotezi) {
        return 3;
    }
    else if (igralnoPolje[1] === naPotezi && igralnoPolje[4] === naPotezi && igralnoPolje[7] === naPotezi) {
        return 4;
    }
    else if (igralnoPolje[2] === naPotezi && igralnoPolje[5] === naPotezi && igralnoPolje[8] === naPotezi) {
        return 5;
    }
    // diagonalne resitve
    else if (igralnoPolje[0] === naPotezi && igralnoPolje[4] === naPotezi && igralnoPolje[8] === naPotezi) {
        return 6;
    }
    else if (igralnoPolje[2] === naPotezi && igralnoPolje[4] === naPotezi && igralnoPolje[6] === naPotezi) {
        return 7;
    } else {
        return -1;
    }
}

function konecIgre (naPotezi, konec) {
    // prikazemo in zameglimo polje
    document.querySelector(".zmagovalec").style.display = "block";
    document.getElementById("igralnoPolje").style.opacity = "0.15";

    if (naPotezi === true) {
        document.getElementById("zmagovalec").innerHTML = imePrvi;
    } else if (naPotezi === false) {
        document.getElementById("zmagovalec").innerHTML = imeDrugi;
    } else {
        document.getElementById("zmagovalec").innerHTML = "NIHČE";
    }

    document.getElementById("ponovnaIgra").onclick = zacetekIgre;
}
