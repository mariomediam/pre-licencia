import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ReactComponent as IconDown } from "../../../assets/images/svg/chevron-down.svg";
import { ReactComponent as IconUp } from "../../../assets/images/svg/chevron-up.svg";

export const TributoContribEmisionItemComponent = ({
  C_OpeFin,
  C_Archivo,
  C_Emision_Contrib,
  N_Emision_Contrib,
  C_Emision_Partida,
  N_Emision_Partida,
  Q_Emision_Monto,
  C_Emision_CtaCon,
  D_Emision_FecDig,
  C_Usuari_Login,
  N_Emision_PC,
  C_TipOpe,
  M_Archivo_Anio,
  M_Archivo_Mes,
  N_TipOpe,
  setListTributoContribSelected,
  allSelected,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState(false);

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
      <tr style={!showDetail ? { borderBottom: "1px solid black" } : {}}>
        <td className="">
          {" "}
          <Form.Check
            aria-label="option 1"
            onChange={onChangeCheckSelected}
            checked={selected}
          />
        </td>
        <td className="">{N_TipOpe}</td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Emision_Contrib}
            <small className="text-muted"> Cod. {C_Emision_Contrib}</small>
          </div>
        </td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Emision_Partida}
            <small className="text-muted"> Cod. {C_Emision_Partida}</small>
          </div>
        </td>
        <td className="text-end align-middle">{Q_Emision_Monto}</td>
        <td className="align-middle">
          {showDetail ? (
            <IconUp role="button" onClick={() => setShowDetail(!showDetail)} />
          ) : (
            <IconDown
              role="button"
              onClick={() => setShowDetail(!showDetail)}
            />
          )}
        </td>
      </tr>
      {showDetail && (
        <tr style={{ borderBottom: "1px solid black" }}>
          <td colSpan={5}>
            <div className="d-flex align-items-center">
              <div>
                <small className="text-muted">Cuenta contable: </small>
                {C_Emision_CtaCon}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
