import { Table } from "react-bootstrap";

export default function PreLicenciaCuestionarioComponent() {
  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Pregunta</th>
            <th>Respuesta</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>¿La actividad económica esta relacionada con laboratorios clínicos?</td>            
            <td>No</td>
          </tr>
          <tr>
            <td>2</td>
            <td>¿La Resolución Directoral de DIRESA establace categoría I1 o I2?</td>
            <td>Si</td>
          </tr>          
        </tbody>
      </Table>
    </div>
  );
}
