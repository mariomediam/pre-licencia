import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ReactComponent as IconDown } from "../../../assets/images/svg/chevron-down.svg";
import { ReactComponent as IconUp } from "../../../assets/images/svg/chevron-up.svg";
import { obtenerNombreMes, transformarFecha } from "../../../utils/varios";

export const TributoContribRecaudacionItemComponent = ({
  C_OpeFin,
  C_Archivo,
  D_Recaud,
  M_Recaud_Recibo,
  C_Recaud_Contrib,
  N_Recaud_Contrib,
  C_Recaud_Partida,
  N_Reacud_Partida,
  M_Recaud_Anio,
  Q_Recaud_Monto,
  C_Recaud_CtaCon,
  D_Recaud_FecDig,
  C_Usuari_Login,
  N_Recaud_PC,
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
            {N_Recaud_Contrib}
            <small className="text-muted"> Cod. {C_Recaud_Contrib}</small>
          </div>
        </td>
        <td className="align-middle">
          <div className="d-flex flex-column">
            {N_Reacud_Partida}
            <small className="text-muted"> Cod. {C_Recaud_Partida}</small>
          </div>
        </td>
        <td className="text-end align-middle">{Q_Recaud_Monto}</td>
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
                {C_Recaud_CtaCon}
              </div>
              <div>
                <small className="text-muted">Fecha: </small>
                {transformarFecha(D_Recaud).substring(0, 10)}
              </div>
              <div>
                <small className="text-muted">Recibo: </small>
                {M_Recaud_Recibo}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
