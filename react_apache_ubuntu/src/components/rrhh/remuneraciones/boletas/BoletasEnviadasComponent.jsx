import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner, Table } from "react-bootstrap";

import { obtenerNombreMes } from "../../../../utils/varios";
import { getBoletasEnvio } from "../../../../store/slices";
import { obtenerTipoPlanillaXTipo } from "../../../../services/rrhhService";
import { ListaBoletasEnviadas } from "./ListaBoletasEnviadas";

export const BoletasEnviadasComponent = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
}) => {
  const dispatch = useDispatch();

  const { boletasEnvio, isLoading } = useSelector(
    (state) => state.boletasEnviadas
  );

  const [nombrePlanilla, setNombrePlanilla] = useState("");

  useEffect(() => {
    dispatch(getBoletasEnvio(d_ano, d_mes, c_tippla_id, c_plani_nro));
  }, [dispatch, d_ano, d_mes, c_tippla_id, c_plani_nro]);

  useEffect(() => {
    const getEncabezado = async () => {
      const { n_tippla_nombre } = await obtenerTipoPlanillaXTipo(c_tippla_id);
      setNombrePlanilla(n_tippla_nombre);
    };
    getEncabezado();
  }, [c_tippla_id]);

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
              {obtenerNombreMes(d_mes)} {d_ano} - {nombrePlanilla} {c_plani_nro}
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
                      DNI / Nombre
                    </th>
                    <th className="text-center align-middle m-0 p-0">Correo</th>
                    <th className="text-center align-middle m-0 p-0">Fecha</th>
                    <th className="text-left align-middle m-0 p-0">                      
                      Responsable
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boletasEnvio.map(
                    (
                      {
                        c_envio_id,
                        c_traba_dni,
                        n_nombre,
                        n_traba_correo,
                        d_datetime_insert,
                        n_user_insert,
                      },
                      i
                    ) => (
                      <tr key={c_envio_id}>
                        <ListaBoletasEnviadas
                          d_ano={d_ano}
                          d_mes={d_mes}
                          c_tippla_id={c_tippla_id}
                          c_plani_nro={c_plani_nro}
                          c_traba_dni={c_traba_dni}
                          n_nombre={n_nombre}
                          n_traba_correo={n_traba_correo}
                          d_datetime_insert={d_datetime_insert}
                          n_user_insert={n_user_insert}
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
