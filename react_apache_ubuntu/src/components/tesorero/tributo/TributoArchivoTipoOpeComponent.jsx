import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { TributoContribSaldoInicialComponent } from "./TributoContribSaldoInicialComponent";
import { formatNumber } from "../../../utils/varios";
import { TributoContribEmisionComponent } from "./TributoContribEmisionComponent";

export const TributoArchivoTipoOpeComponent = ({
  C_Contrib,
  N_Contrib,
  listTipoOperacion,
}) => {
  const { C_TipOpe, N_TipOpe, detalle } = listTipoOperacion;
  const [totales, setTotales] = useState(0);

  useEffect(() => {
    let total = 0;

    if (C_TipOpe === "01") {
      detalle.forEach((item) => {
        total += item.Q_SalIni_Monto;
      });
      setTotales(total.toFixed(2));
    }
    if (C_TipOpe === "02") {
        detalle.forEach((item) => {
          total += item.Q_Emision_Monto;
        });
        setTotales(total.toFixed(2));
      }
  }, [detalle, C_TipOpe]);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="row flex-grow-1 me-3 ">
            <div className="col-7">
              <span className="small">{N_TipOpe}</span>
            </div>
            <div className="col-5 text-end">
              <h6>S/. {formatNumber(totales)}</h6>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="mt-0 pt-0">
            <>
            
          {C_TipOpe === "01" && (
            <TributoContribSaldoInicialComponent
              C_Contrib={C_Contrib}
              N_Contrib={N_Contrib}
              C_TipOpe={C_TipOpe}
              N_TipOpe={N_TipOpe}
              listTributo={detalle}
            />
          )}

        {C_TipOpe === "02" && (
            <TributoContribEmisionComponent
              C_Contrib={C_Contrib}
              N_Contrib={N_Contrib}
              C_TipOpe={C_TipOpe}
              N_TipOpe={N_TipOpe}
              listTributo={detalle}
            />
          )}



          </>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
