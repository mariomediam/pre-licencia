import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { formatNumber } from "../../../utils/varios";

export const TributoContribSaldoInicialItemComponent = ({ tributo, setListTributoContribSelected, allSelected }) => {
  const [selected, setSelected] = useState(false);

  const {
    M_SalIni_Anio,
    C_SalIni_Partida,
    N_SalIni_Partida,
    C_SalIni_CtaCon,
    Q_SalIni_Monto,
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
