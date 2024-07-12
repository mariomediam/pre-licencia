import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ReactComponent as IconDown } from "../../../assets/images/svg/chevron-down.svg";
import { ReactComponent as IconUp } from "../../../assets/images/svg/chevron-up.svg";
import { obtenerNombreMes, transformarFecha } from "../../../utils/varios";

export const TributoContribAltasItemComponent = ({
  C_OpeFin,
  C_Archivo,
  D_Alta,
  C_Alta_Contrib,
  N_Alta_Contrib,
  M_Alta_Anio,
  C_Alta_Partida,
  N_Alta_Partida,
  Q_Alta_Monto,
  C_Alta_CtaCon,
  D_Alta_FecDig,
  C_Usuari_Login,
  N_Alta_PC,
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
        <td className="">
          <div className="d-flex flex-column">
            {N_TipOpe}
            <span>{obtenerNombreMes(M_Archivo_Mes)}</span>
          </div>
        </td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Alta_Contrib}
            <small className="text-muted"> Cod. {C_Alta_Contrib}</small>
          </div>
        </td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Alta_Partida}
            <small className="text-muted"> Cod. {C_Alta_Partida}</small>
          </div>
        </td>
        <td className="text-end align-middle">{Q_Alta_Monto}</td>
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
            <div className="d-flex align-items-center gap-3">
              <div>
                <small className="text-muted">Cuenta contable: </small>
                {C_Alta_CtaCon}
              </div>
              <div>
                <small className="text-muted">Fecha: </small>
                {transformarFecha(D_Alta).substring(0, 10)}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
