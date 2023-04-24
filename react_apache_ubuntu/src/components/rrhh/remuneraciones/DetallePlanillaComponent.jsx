import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner, Table } from "react-bootstrap";
import { getPlanilla } from "../../../store/slices/remuneraciones";
import { DetallePlanillaItemComponent } from "./DetallePlanillaItemComponent";
import { obtenerNombreMes } from "../../../utils/varios";

export const DetallePlanillaComponent = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
}) => {
  const { detalle, isLoading } = useSelector((state) => state.planilla);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlanilla(d_ano, d_mes, c_tippla_id, c_plani_nro));
  }, [dispatch, d_ano, d_mes, c_tippla_id, c_plani_nro]);

  const obtenerNombrePlanilla = () => {
    if (detalle.length > 0) {
      const { n_tippla_nombre } = detalle[0];
      return n_tippla_nombre;
    } else {
      return "";
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-10 col-xl-6">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" className="me-2">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
            Cargando
          </div>
        ) : (
          <>
            <small>
              {" "}
              {obtenerNombreMes(d_mes)} {d_ano} - {obtenerNombrePlanilla()}{" "}
              {c_plani_nro}
            </small>

            <div style={{ border: "1px solid lightgrey" }}>
              <Table
                hover
                responsive
                className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
              >
                <thead>
                  <tr className="color-header1 text-white">
                    <th className="text-center align-middle m-0 p-0">
                      DNI /Nombre
                    </th>
                    <th className="text-center align-middle m-0 p-0">Bruto</th>
                    <th className="text-center align-middle m-0 p-0">Dscto</th>
                    <th className="text-center align-middle m-0 p-0">
                      Aportes
                    </th>
                    <th className="text-center align-middle m-0 p-0">
                      Líquido
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detalle.map(
                    (
                      {
                        c_traba_dni,
                        n_nombre,
                        n_conlab_nombre,
                        q_bruto,
                        q_dscto,
                        q_aporte,
                        q_liquido,
                      },
                      i
                    ) => (
                      <tr key={c_traba_dni}>
                        <DetallePlanillaItemComponent
                          d_ano={d_ano}
                          d_mes={d_mes}
                          c_tippla_id={c_tippla_id}
                          c_plani_nro={c_plani_nro}
                          c_traba_dni={c_traba_dni}
                          n_nombre={n_nombre}
                          n_conlab_nombre={n_conlab_nombre}
                          q_bruto={q_bruto}
                          q_dscto={q_dscto}
                          q_aporte={q_aporte}
                          q_liquido={q_liquido}
                        />
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
