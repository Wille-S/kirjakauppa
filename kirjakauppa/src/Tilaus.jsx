/* eslint-disable react/prop-types */
function Tilaus({ kirja, }) {

  return (
    <div className="tilaus">
      <div>{kirja.nimi} ({kirja.maara})</div>
    </div>
  );
}

export default Tilaus;
