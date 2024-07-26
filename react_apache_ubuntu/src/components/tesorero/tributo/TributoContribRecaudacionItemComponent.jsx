import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { formatNumber, transformarFecha } from "../../../utils/varios";

export const TributoContribRecaudacionItemComponent = ({ tributo, setListTributoContribSelected, allSelected }) => {

  const [selected, setSelected] = useState(false);

  const {    
    C_Recaud_Partida,
    N_Reacud_Partida,
    C_Recaud_CtaCon,
    Q_Recaud_Monto,
    M_Recaud_Anio,
    D_Recaud,
    M_Recaud_Recibo,
    C_OpeFin,
    C_Archivo
  } = tributo;

  const onChangeCheckSelected = (event) => {
    setSelected(event.target.checked);
  };

  useEffect(() => {
    if (selected) {
      setListTributoContribSelected((prev) => [
        ...prev,
        tributo,
      ]);
    } else {
      setListTributoContribSelected((prev) =>
        prev.filter(
          (item) => item.C_OpeFin !== C_OpeFin || item.C_Archivo !== C_Archivo
        )
      );
    }
  }, [selected, setListTributoContribSelected, C_OpeFin, C_Archivo, tributo]);

  useEffect(() => {
    setSelected(allSelected);
  }, [allSelected]);

  useEffect(() => {
    setSelected(false);
  }, [tributo]);

  return (
    <>
      <tr>
        <td className="">
          {" "}
          <Form.Check
            aria-label="option 1"
            onChange={onChangeCheckSelected}
            checked={selected}
          />
        </td>        
        <td>{M_Recaud_Anio}</td>
        <td>
           <div className="d-flex flex-column">
            {M_Recaud_Recibo}
            <small className="text-muted"> {transformarFecha(D_Recaud).substring(0,10)}</small>
          </div>
          
          </td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Reacud_Partida}
            <small className="text-muted"> Cod. {C_Recaud_Partida}</small>
          </div>
        </td>
        <td className="text-end">{C_Recaud_CtaCon}</td>
        <td className="text-end pe-3">{formatNumber(Q_Recaud_Monto)}</td>
      </tr>
    </>
  );
};
