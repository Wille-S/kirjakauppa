# Kirjakauppa

Kirjakauppa sovelluksella pystyt lisäämään kirjoja ostoskoriin, täyttämään tilaajan tiedot ja lähettämään tilauksen tilaukset.json tiedostoon.

### Edellytykset
Seuraavat asennettuna:
- [npm](https://www.npmjs.com/)
- [node](https://nodejs.org/en)

### Asennus

#### Respositorion kloonaaminen
```bash
git clone https://github.com/Wille-S/kirjakauppa.git
```
#### NPM pakkausten asentaminen
```bash
cd kirjakauppa
```
```bash
npm install
```
#### Sovelluksen käynnistäminen
```bash
cd kirjakauppa
```
```bash
npm run dev
```
#### Datapalvelimien käynnistäminen
```bash
cd datapalvelin
```
```bash
node datapalvelin configKirjat.json
```
```bash
node dataRestPalvelin configTilaukset.json 
```

### Käyttö

#### Alkunäkymä
Valitse + ja - painikkeista mitä kirjoja haluat tilata ja paina lisätiedot painiketta nähdäksesi lisätietoja kirjasta. Tämän jälkeen paina siirrä kassalle painiketta.
#### Tilausyhteenveto
Täytä kaikki kentät ja paina lähetä näppäintä lähettääksesi tilauksen tilaukset.json tiedostoon. Jos prosessi onnistui, siittä tulee ilmoitus.
