import { useState, useEffect } from 'react'
import { Table } from "react-bootstrap";
import { obtenerCuestionarioPorPrecalId } from "../../services/licFuncService";


export default function PreLicenciaCuestionarioComponent({ precalId }) {

  const [cuestionario, setCuestionario] = useState([])

  const verCuestionario = async () => {
        
      const cuestionarioTmp = await obtenerCuestionarioPorPrecalId(precalId)    

      setCuestionario(cuestionarioTmp)
    
  };

  useEffect(() => {
    
    verCuestionario();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [precalId]);



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
        {cuestionario.map(({precalCuestId, precalCuestPreguntaNombre, precalCuestRpta}, i) => (
           <tr key = {precalCuestId}>
           <td>{i+1}</td>
           <td>{precalCuestPreguntaNombre.trim()}</td>            
           <td>{precalCuestRpta.trim()}</td>
         </tr>                            
        ))}
        </tbody>
      </Table>
    </div>
  );
}
