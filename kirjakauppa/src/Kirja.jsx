/* eslint-disable react/prop-types */
import { useState } from 'react';

function Kirja({ kirja, onValinta, onLisays, onVahennys }) {
  const [naytaLisatiedot, setNaytaLisatiedot] = useState(false);
  const [maara, setMaara] = useState(0);

  const handleLisatiedot = () => {
    setNaytaLisatiedot(!naytaLisatiedot);
  };

  const handleLisays = () => {
    setMaara(prevMaara => prevMaara + 1);
    onLisays(kirja);
  };

  const handleVahennys = () => {
    if (maara > 0) {
      setMaara(prevMaara => prevMaara - 1);
      onVahennys(kirja);
    }
  };

  return (
    <div className="kirja">
      <div onClick={() => onValinta(kirja)}>
        <strong>{kirja.nimi}</strong><br />
        Tekijä: {kirja.tekijä.etunimi} {kirja.tekijä.sukunimi}<br />
        Hinta: {kirja.hinta} €<br />
        Kuvaus: {kirja.kuvaus.join(', ')}
      </div>
      <button onClick={handleVahennys}>-</button>
      <span>{maara}</span>
      <button onClick={handleLisays}>+</button>
      <button onClick={handleLisatiedot}>Lisätiedot</button>
      {naytaLisatiedot && (
        <div>
          Julkaisuvuosi: {kirja.julkaisuvuosi}<br />
          Sivut: {kirja.sivut}<br />
          Kieli: {kirja.kieli}<br />
          Kustantaja: {kirja.kustantaja}<br />
          Sidosasu: {kirja.sidosasu}<br />
          ISBN: {kirja.isbn}<br />
          Tuoteryhmä: {kirja.tuoteryhmä.join(', ')}<br />
          Avainsanat: {kirja.avainsanat.join(', ')}<br />
          Varastotilanne: {kirja.varastotilanne}
        </div>
      )}
    </div>
  );
}

export default Kirja;
