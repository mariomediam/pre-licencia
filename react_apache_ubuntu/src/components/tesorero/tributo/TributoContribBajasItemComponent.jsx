import { Form } from "react-bootstrap";
import { formatNumber, transformarFecha } from "../../../utils/varios";

export const TributoContribBajastemComponent = ({ tributo }) => {
  const {    
    C_Baja_Partida,
    N_Baja_Partida,
    C_Baja_CtaCon,
    Q_Baja_Monto,
    M_Baja_Anio,
    D_Baja
  } = tributo;


  console.log("tributo", tributo);

  return (
    <>
      <tr>
        <td className="">
          {" "}
          <Form.Check
            aria-label="option 1"
            // onChange={onChangeCheckSelected}
            // checked={selected}
          />
        </td>        
        <td>{M_Baja_Anio}</td>
        <td>{transformarFecha(D_Baja).substring(0,10)}</td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Baja_Partida}
            <small className="text-muted"> Cod. {C_Baja_Partida}</small>
          </div>
        </td>
        <td className="text-end">{C_Baja_CtaCon}</td>
        <td className="text-end pe-3">{formatNumber(Q_Baja_Monto)}</td>
      </tr>
    </>
  );
};
