import { Form } from "react-bootstrap";
import { formatNumber, transformarFecha } from "../../../utils/varios";

export const TributoContribAltastemComponent = ({ tributo }) => {
  const {    
    C_Alta_Partida,
    N_Alta_Partida,
    C_Alta_CtaCon,
    Q_Alta_Monto,
    M_Alta_Anio,
    D_Alta
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
        <td>{M_Alta_Anio}</td>
        <td>{transformarFecha(D_Alta).substring(0,10)}</td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Alta_Partida}
            <small className="text-muted"> Cod. {C_Alta_Partida}</small>
          </div>
        </td>
        <td className="text-end">{C_Alta_CtaCon}</td>
        <td className="text-end pe-3">{formatNumber(Q_Alta_Monto)}</td>
      </tr>
    </>
  );
};
