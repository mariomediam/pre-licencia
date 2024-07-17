import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";

import { TributoContribAltastemComponent } from "./TributoContribAltasItemComponent";
import { formatNumber, obtenerNombreMes } from "../../../utils/varios";

export const TributoContribAltasMesComponent = ({
  C_Contrib,
  N_Contrib,
  C_TipOpe,
  N_TipOpe,
  mes,
}) => {
  const [totales, setTotales] = useState(0);
  const { M_Archivo_Mes, detalle: listTributo } = mes;

  const nombreMes = obtenerNombreMes(M_Archivo_Mes);

  useEffect(() => {
    let total = 0;
    listTributo.forEach((tributo) => {
      total += tributo.Q_Alta_Monto;
    });
    setTotales(total);
  }, [listTributo]);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="row flex-grow-1 me-3 ">
            <div className="col-7">
              <span className="small">{nombreMes}</span>
            </div>
            <div className="col-5 text-end">
              <h6>S/. {formatNumber(totales, 2)}</h6>
              
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="mt-0 pt-0">
          <>
            <small>
              <small className="text-muted">
                {" "}
                {C_Contrib} {N_Contrib} / {N_TipOpe} / {nombreMes}
              </small>
            </small>
            <Table
              hover
              responsive
              size="sm"
              className="caption-top mb-1 animate__animated animate__fadeIn animate__faster mt-2"
            >
              <thead>
                <tr
                  className="color-header2 text-white"
                  style={{ fontSize: "14px" }}
                >
                  <th className="align-middle m-0"></th>
                  <th
                    className="align-middle m-0"
                    style={{ fontWeight: "100" }}
                  >
                    Año
                  </th>
                  <th
                    className="align-middle m-0"
                    style={{ fontWeight: "100" }}
                  >
                    Fecha
                  </th>
                  <th
                    className="align-middle m-0"
                    style={{ fontWeight: "100" }}
                  >
                    Partida
                  </th>
                  <th
                    className="text-end align-middle m-0"
                    style={{ fontWeight: "100" }}
                  >
                    Cta Contable
                  </th>
                  <th className="text-end pe-3" style={{ fontWeight: "100" }}>
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                {listTributo.map((tributo, index) => (
                  <TributoContribAltastemComponent
                    key={`${tributo.C_Archivo}_${tributo.C_OpeFin}`}
                    tributo={tributo}
                  />
                ))}
              </tbody>
            </Table>
          </>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
