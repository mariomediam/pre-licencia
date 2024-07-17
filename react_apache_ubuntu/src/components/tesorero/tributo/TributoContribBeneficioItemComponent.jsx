import { Form } from "react-bootstrap";
import { formatNumber, transformarFecha } from "../../../utils/varios";

export const TributoContribBeneficioItemComponent = ({ tributo }) => {
  const {    
    C_Benefi_Partida,
    N_Benefi_Partida,
    C_Benefi_CtaCon,
    Q_Benefi_Monto,
    M_Benefi_Anio,
    D_Benefi_Pago,
    N_Benefi_BasLeg,
    M_Benefi_Recibo,
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
        <td>{M_Benefi_Anio}</td>
        <td>
        <div className="d-flex flex-column">
            {M_Benefi_Recibo}
            <small className="text-muted"> {transformarFecha(D_Benefi_Pago).substring(0,10)}</small>            
          </div>
            </td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Benefi_Partida}
            <small className="text-muted"> Cod. {C_Benefi_Partida}</small>
            <small>{N_Benefi_BasLeg}</small>
          </div>
        </td>
        <td className="text-end">{C_Benefi_CtaCon}</td>
        <td className="text-end pe-3">{formatNumber(Q_Benefi_Monto)}</td>
      </tr>
    </>
  );
};
