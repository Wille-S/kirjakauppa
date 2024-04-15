'use strict';

function muunna(muunnettavaOlio){
    return Object.assign(muunnettavaOlio, {
        id: +muunnettavaOlio.id,
        hinta: +muunnettavaOlio.hinta,
        julkaisuvuosi: +muunnettavaOlio.julkaisuvuosi,
        sivut: +muunnettavaOlio.sivut,
        varastotilanne: +muunnettavaOlio.varastotilanne,
    });
}

module.exports={muunna}