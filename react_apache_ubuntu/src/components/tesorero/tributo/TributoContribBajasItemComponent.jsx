import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { formatNumber, transformarFecha } from "../../../utils/varios";

export const TributoContribBajastemComponent = ({ tributo, setListTributoContribSelected, allSelected }) => {
  const [selected, setSelected] = useState(false);

  const {    
    C_Baja_Partida,
    N_Baja_Partida,
    C_Baja_CtaCon,
    Q_Baja_Monto,
    M_Baja_Anio,
    D_Baja,
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
        { C_OpeFin, C_Archivo },
      ]);
    } else {
      setListTributoContribSelected((prev) =>
        prev.filter(
          (item) => item.C_OpeFin !== C_OpeFin || item.C_Archivo !== C_Archivo
        )
      );
    }
  }, [selected, setListTributoContribSelected, C_OpeFin, C_Archivo]);

  useEffect(() => {
    setSelected(allSelected);
  }, [allSelected]);

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
