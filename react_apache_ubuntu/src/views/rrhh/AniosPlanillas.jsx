import { Form } from "react-bootstrap";

const anioTope = () => {
    const fecha = new Date();
    return fecha.getFullYear();
  };

const anioDesde = 1999;

export const AniosPlanillas = ({ selectedYear, setSelectedYear }) => {

  return (
    <Form.Select aria-label="Selecciones mes" onChange={(e) => setSelectedYear(e.target.value)} defaultValue={selectedYear}>
     {Array.from(
                { length: anioTope() - anioDesde + 1 },
                (v, k) => k + anioDesde
              )
                .reverse()
                .map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
    </Form.Select>
  );
};
