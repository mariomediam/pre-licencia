import { Accordion } from "react-bootstrap";
import { TributoArchivoTipoOpeComponent } from "./TributoArchivoTipoOpeComponent";
import { useEffect, useState } from "react";
import { formatNumber } from "../../../utils/varios";

export const TributoArchivoContribComponent = ({ tributo, setListTributoContribSelected, allSelected }) => {
  const { C_Contrib, N_Contrib, detalle } = tributo;

  const [totales, setTotales] = useState(0);

  useEffect(() => {
    let totalSaldoInicial = 0;
    let totalEmision = 0;
    let totalAltas = 0;
    let totalBajas = 0;
    let totalRecaudacion = 0;
    let totalBeneficios = 0;

    detalle.forEach((listTipoOperacion) => {
      if (listTipoOperacion.C_TipOpe === "01") {
        listTipoOperacion.detalle.forEach((saldoInicial) => {
          totalSaldoInicial += saldoInicial.Q_SalIni_Monto;
        });
      }
      if (listTipoOperacion.C_TipOpe === "02") {
        listTipoOperacion.detalle.forEach((emision) => {
          totalEmision += emision.Q_Emision_Monto;
        });
      }

      if (listTipoOperacion.C_TipOpe === "03") {
        listTipoOperacion.detalle.forEach((altas) => {
          altas.detalle.forEach((alta) => {
            totalAltas += alta.Q_Alta_Monto;
          });
        });
      }

      if (listTipoOperacion.C_TipOpe === "04") {
        listTipoOperacion.detalle.forEach((bajas) => {
          bajas.detalle.forEach((baja) => {
            totalBajas += baja.Q_Baja_Monto;
          });
        });
      }

      if (listTipoOperacion.C_TipOpe === "05") {
        listTipoOperacion.detalle.forEach((recaudacion) => {
          recaudacion.detalle.forEach((recauda) => {
            totalRecaudacion += recauda.Q_Recaud_Monto;
          });
        });
      }

      if (listTipoOperacion.C_TipOpe === "06") {
        listTipoOperacion.detalle.forEach((beneficios) => {
          beneficios.detalle.forEach((beneficio) => {
            totalBeneficios += beneficio.Q_Benefi_Monto;
          });
        });
      }

      setTotales(
        totalSaldoInicial +
          totalEmision +
          totalAltas -
          totalBajas -
          totalRecaudacion -
          totalBeneficios
      );
    });
  }, [detalle]);

  return (
    <Accordion className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="row flex-grow-1 me-3 ">
            <div className="col-7">
              {N_Contrib} <br />
              <small className="text-muted"> Cód. {C_Contrib} </small>
            </div>
            <div className="col-5 text-end">
              <h5>{formatNumber(totales, 2)}</h5>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {detalle.map((listTipoOperacion) => (
            <TributoArchivoTipoOpeComponent
              key={`${C_Contrib}_${listTipoOperacion.C_TipOpe}`}
              C_Contrib={C_Contrib}
              N_Contrib={N_Contrib}
              listTipoOperacion={listTipoOperacion}
              setListTributoContribSelected={setListTributoContribSelected}
              allSelected={allSelected}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
