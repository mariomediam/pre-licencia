import { Form } from "react-bootstrap";
import { formatNumber } from "../../../utils/varios";

export const TributoContribEmisionItemComponent = ({ tributo }) => {
  const {    
    C_Emision_Partida,
    N_Emision_Partida,
    C_Emision_CtaCon,
    Q_Emision_Monto,
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
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Emision_Partida}
            <small className="text-muted"> Cod. {C_Emision_Partida}</small>
          </div>
        </td>
        <td className="text-end">{C_Emision_CtaCon}</td>
        <td className="text-end pe-3">{formatNumber(Q_Emision_Monto)}</td>
      </tr>
    </>
  );
};
