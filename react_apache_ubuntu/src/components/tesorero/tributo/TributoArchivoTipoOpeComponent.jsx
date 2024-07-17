import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { TributoContribSaldoInicialComponent } from "./TributoContribSaldoInicialComponent";
import { formatNumber } from "../../../utils/varios";
import { TributoContribEmisionComponent } from "./TributoContribEmisionComponent";
import { TributoContribAltasComponent } from "./TributoContribAltasComponent";
import { TributoContribBajasComponent } from "./TributoContribBajasComponent";
import { TributoContribRecaudacionComponent } from "./TributoContribRecaudacionComponent";
import { TributoContribBeneficioComponent } from "./TributoContribBeneficioComponent";

export const TributoArchivoTipoOpeComponent = ({
  C_Contrib,
  N_Contrib,
  listTipoOperacion,
  setListTributoContribSelected,
  allSelected,
}) => {
  const { C_TipOpe, N_TipOpe, detalle } = listTipoOperacion;
  const [totales, setTotales] = useState(0);

  const tipoOperacionComponentes = {
    "01": TributoContribSaldoInicialComponent,
    "02": TributoContribEmisionComponent,
    "03": TributoContribAltasComponent,
    "04": TributoContribBajasComponent,
    "05": TributoContribRecaudacionComponent,
    "06": TributoContribBeneficioComponent,
    
  };

  const ComponenteSeleccionado = tipoOperacionComponentes[C_TipOpe];

  useEffect(() => {
    const calcularTotal = () => {
      let total = 0;
      switch (C_TipOpe) {
        case "01":
          detalle.forEach((item) => (total += item.Q_SalIni_Monto));
          break;
        case "02":
          detalle.forEach((item) => (total += item.Q_Emision_Monto));
          break;
        case "03":
          detalle.forEach((mes) => mes.detalle.forEach((item) => (total += item.Q_Alta_Monto)));
          break;
        case "04":
            detalle.forEach((mes) => mes.detalle.forEach((item) => (total += item.Q_Baja_Monto)));
            break;
        case "05":
              detalle.forEach((mes) => mes.detalle.forEach((item) => (total += item.Q_Recaud_Monto)));
              break;
        case "06":
              detalle.forEach((mes) => mes.detalle.forEach((item) => (total += item.Q_Benefi_Monto)));
              break;
        default:
          total = 0;
      }
      return total;
    };

    setTotales(calcularTotal());
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
              <h6>S/. {formatNumber(totales, 2)}</h6>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="mt-0 pt-0">
          <>
            {ComponenteSeleccionado && (
              <ComponenteSeleccionado
                C_Contrib={C_Contrib}
                N_Contrib={N_Contrib}
                C_TipOpe={C_TipOpe}
                N_TipOpe={N_TipOpe}
                listTributo={detalle}
                setListTributoContribSelected={setListTributoContribSelected}
                allSelected={allSelected}
              />
            )}
          </>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
