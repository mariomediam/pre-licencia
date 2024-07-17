import { Form } from "react-bootstrap";
import { formatNumber } from "../../../utils/varios";

export const TributoContribSaldoInicialItemComponent = ({ tributo }) => {
  const {
    M_SalIni_Anio,
    C_SalIni_Partida,
    N_SalIni_Partida,
    C_SalIni_CtaCon,
    Q_SalIni_Monto,
  } = tributo;

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
        <td className="">{M_SalIni_Anio}</td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_SalIni_Partida}
            <small className="text-muted"> Cod. {C_SalIni_Partida}</small>
          </div>
        </td>
        <td className="text-end">{C_SalIni_CtaCon}</td>
        <td className="text-end">{formatNumber(Q_SalIni_Monto)}</td>
      </tr>
    </>
  );
};
