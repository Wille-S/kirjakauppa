import { useState, useEffect } from 'react';
import './App.css';
import Kirja from './Kirja';
import TilausForm from './TilausForm';
import Tilaus from './Tilaus';
import { kaikkiUrl, lisaysUrlPost } from './urlit';

async function getLatestTilausnumero() {
  try {
    const response = await fetch(lisaysUrlPost);
    const data = await response.json();
    const maxTilausnumero = Math.max(...data.map(order => order.tilausnumero), 0);
    return maxTilausnumero;
  } catch (error) {
    console.error('There was a problem fetching the orders:', error);
    return 0;  // Default to 0 if there's an error
  }
}


function App() {
  const [kirjat, setKirjat] = useState([]);
  const [tilaus, setTilaus] = useState([]);
  const [naytaTilausForm, setNaytaTilausForm] = useState(false);

  useEffect(() => {
    fetch(kaikkiUrl)
      .then(response => response.json())
      .then(data => setKirjat(data))
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  }, []);

  const calculateTotalPrice = () => {
    return tilaus.reduce((acc, tilauskirja) => {
      return acc + (tilauskirja.maara * tilauskirja.hinta);
    }, 0);
  };


  const handleLisays = (kirja) => {
    // Update the quantity of the book in the order state
    setTilaus(prevTilaus => {
      const existingOrder = prevTilaus.find(order => order.id === kirja.id);
      console.log(prevTilaus)
      if (existingOrder) {
        return prevTilaus.map(order =>
          order.id === kirja.id ? { ...order, maara: order.maara + 1 } : order
        );
      }
      return [...prevTilaus, { ...kirja, maara: 1 }];
    });
  };

  const handleVahennys = (kirja) => {
    // Update the quantity of the book in the order state
    setTilaus(prevTilaus => {
      const existingOrder = prevTilaus.find(order => order.id === kirja.id);
      if (existingOrder && existingOrder.maara > 1) {
        return prevTilaus.map(order =>
          order.id === kirja.id ? { ...order, maara: order.maara - 1 } : order
        );
      } else if (existingOrder && existingOrder.maara === 1) {
        return prevTilaus.filter(order => order.id !== kirja.id);
      }
      return prevTilaus;
    });
  };
  

  const handlePeruuta = () => {
    setTilaus([]);
    setNaytaTilausForm(false);
  };

  const handleLaheta = async (tilausData) => {
    const latestTilausnumero = await getLatestTilausnumero();
    
    const tilausInfo = {
      tilausnumero: latestTilausnumero + 1,
      tilauspvm: tilausData.paivays,
      tilaaja: {
        etunimi: tilausData.etunimi,
        sukunimi: tilausData.sukunimi,
        katuosoite: tilausData.katuosoite,
        postitoimipaikka: tilausData.postitoimipaikka,
      },
      tuotteet: tilaus.filter(tilauskirja => tilauskirja.maara > 0).map(tilauskirja => ({
        tuotenumero: tilauskirja.id,
        nimi: tilauskirja.nimi,
        määrä: tilauskirja.maara,
        hinta: tilauskirja.hinta,
      })),
    };
    console.log(tilausInfo)
    fetch(lisaysUrlPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tilausInfo),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Tilaus onnistui:', data);
      alert('Tilaus onnistui')
      setTilaus([]);
      setNaytaTilausForm(false);
    })
    .catch(error => console.error('There was a problem with your fetch operation:', error));
  };
  
  

  return (
    <div className="App">
      {!naytaTilausForm ? (
        <>
          <div className="kirjalista">
            {kirjat.map(kirja => (
              <Kirja
                key={kirja.id}
                kirja={kirja}
                onLisays={() => handleLisays(kirja)}
                onVahennys={() => handleVahennys(kirja)}
              />
            ))}
          </div>
          {tilaus.some(tilauskirja => tilauskirja.maara > 0) && (
            <>
              {tilaus.filter(tilauskirja => tilauskirja.maara > 0).map(tilauskirja => (
                <Tilaus
                  key={tilauskirja.id}
                  kirja={tilauskirja}
                  maara={tilauskirja.maara}
                />
              ))}
              <div>Yhteishinta: {calculateTotalPrice().toFixed(2)} €</div>
              <button onClick={() => setNaytaTilausForm(true)}>Siirry kassalle</button>
            </>
          )}
        </>
      ) : (
        <TilausForm 
          onPeruuta={handlePeruuta} 
          onLaheta={handleLaheta} 
          tilaus={tilaus}
        />
      )}
    </div>
  );
}

export default App;


