![image](https://github.com/Wille-S/kirjakauppa/assets/144103119/4275b4f2-3d5e-448c-85dd-ea70970b7b66)# Kirjakauppa

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
