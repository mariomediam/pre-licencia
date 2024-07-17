import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { formatNumber } from "../../../utils/varios";

export const TributoContribEmisionItemComponent = ({
  tributo,
  setListTributoContribSelected,
  allSelected,
}) => {

  const [selected, setSelected] = useState(false);

  const {
    C_Emision_Partida,
    N_Emision_Partida,
    C_Emision_CtaCon,
    Q_Emision_Monto,
    C_OpeFin,
    C_Archivo,
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
