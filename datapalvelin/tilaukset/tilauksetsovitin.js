'use strict';

function muunna(muunnettavaOlio){
    const uusi = JSON.parse(JSON.stringify(muunnettavaOlio))
    uusi.tilausnumero = +uusi.tilausnumero;
    for (let tuote of uusi.tuotteet)
     {  tuote.tuotenumero = +tuote.tuotenumero;
        tuote.määrä = +tuote.määrä,
        tuote.hinta = +tuote.hinta
    };
    return uusi;
}

module.exports={muunna}