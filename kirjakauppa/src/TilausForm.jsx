/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function TilausForm({ onPeruuta, onLaheta, tilaus }) {
  const [formData, setFormData] = useState({
    etunimi: "",
    sukunimi: "",
    katuosoite: "",
    postitoimipaikka: "",
    paivays: new Date().toLocaleDateString(),
    tilausyhteenveto: "",
  });

  useEffect(() => {
    const tilausyhteenveto = tilaus.filter(tilauskirja => tilauskirja.maara > 0).map(
      (tilauskirja) =>
        `${tilauskirja.nimi}: ${tilauskirja.maara} kpl, ${
          tilauskirja.maara * tilauskirja.hinta
        } €`
    );

    setFormData((prevFormData) => ({ ...prevFormData, tilausyhteenveto }));
  }, [tilaus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!formData.etunimi || !formData.sukunimi || !formData.katuosoite || !formData.postitoimipaikka || formData.tilausyhteenveto.length === 0) {
      alert('Kaikki kentät tulee täyttää!');
      return;
    }
    onLaheta(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="formi">
      <div>
        <h3>Tilausyhteenveto:</h3>
        {formData.tilausyhteenveto && formData.tilausyhteenveto.length > 0 && formData.tilausyhteenveto.map((summary, index) => (
          <div key={index}>{summary}</div>
        ))}
      </div>
      <div>
        Päiväys: <span>{formData.paivays}</span>
      </div>
      <input
        type="text"
        name="etunimi"
        placeholder="Etunimi"
        value={formData.etunimi}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="sukunimi"
        placeholder="Sukunimi"
        value={formData.sukunimi}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="katuosoite"
        placeholder="Katuosoite"
        value={formData.katuosoite}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="postitoimipaikka"
        placeholder="Postitoimipaikka"
        value={formData.postitoimipaikka}
        onChange={handleInputChange}
      />
      <button type="button" onClick={onPeruuta}>
        Peruuta
      </button>
      <button type="submit">Lähetä</button>
    </form>
  );
}

export default TilausForm;
