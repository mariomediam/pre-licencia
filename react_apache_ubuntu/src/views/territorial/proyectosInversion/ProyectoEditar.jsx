import Header from "../../../components/Header";
import { Breadcrumb } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import ArrowRightIcon from "../../../icons/ArrowRight";
import { useEffect, useState } from "react";
import {
  obtenerProgramacionProyectoInversion,
  obtenerProyectosProgramacionMensual,
  actualizarProgramacionProyectoInversion,
} from "../../../services/siafService";

import Swal from "sweetalert2";

import { Toast } from "../../../components/tools/PopMessage";
import { obtenerNombreMes } from "../../../utils/varios";
import { UltimaSincro } from "./UltimaSincro";

const SEC_EJEC = process.env.REACT_APP_SEC_EJEC;

export const ProyectoEditar = () => {
  const navigate = useNavigate();
  const { c_prgpro } = useParams();
  const [programacion, setProgramacion] = useState({});
  const [ejecucion, setEjecucion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //   programacion =
  // {
  //     "c_prgpro": 95,
  //     "m_prgpro_mes": 9,
  //     "q_prgpro_financ": 900.0,
  //     "p_prgpro_fisica": 9.0,
  //     "q_prgpro_caida": 0.0,
  //     "q_prgpro_increm": 0.0,
  //     "q_prgpro_riesgo": 0.0,
  //     "t_prgpro_estsit": "",
  //     "t_prgpro_coment": "",
  //     "c_usuari_login": "MMEDINA             ",
  //     "n_prgpro_pc": "127.0.0.1",
  //     "d_prgpro_fecdig": "2025-05-22T14:45:52.337000",
  //     "c_proinv": 19,
  //     "n_proinv_nombre": "MEJORAMIENTO DEL SERVICIO DE TRANSITABILIDAD PEATONAL Y VEHICULAR DE LA UPIS LOS ANGELES EN EL DISTRITO DE PIURA, PROVINCIA DE PIURA - PIURA",
  //     "ano_eje": 2025,
  //     "c_proinv_codigo": "2331918   ",
  //     "c_estado": 2
  // }

  const {
    c_proinv_codigo: cui,
    n_proinv_nombre: proyectoNombre,
    ano_eje,
    m_prgpro_mes: mes_eje,
  } = programacion;

  useEffect(() => {
    if (c_prgpro) {
      const obtenerProgramacion = async () => {
        const response = await obtenerProgramacionProyectoInversion({
          c_prgpro: c_prgpro,
        });
        setProgramacion(response);
      };
      obtenerProgramacion();
    }
  }, [c_prgpro]);

  useEffect(() => {

    try {
        setIsLoading(true);
        if (cui && ano_eje && mes_eje && SEC_EJEC) {
            const obtenerEjecucion = async () => {
              const response = await obtenerProyectosProgramacionMensual({
                c_proinv_codigo: cui,
                anio_eje: ano_eje,
                mes_eje: mes_eje,
                sec_ejec: SEC_EJEC,
              });
              setEjecucion(response);
            };
      
            obtenerEjecucion();
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error actualizando proyecto",
            text: error.message,
          });
    } finally {
        setIsLoading(false);
    }
    
  }, [cui, ano_eje, mes_eje]);

  const saveProyecto = async () => {
    try {
      //   const json = createJsonforSave();
      //   await agregarProyectoInversion(json);
      setIsLoading(true);
      await actualizarProgramacionProyectoInversion(programacion);

      Toast.fire({
        icon: "success",
        title: "Proyecto actualizado correctamente",
        background: "#F4F6F6",
        timer: 1500,
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error actualizando proyecto",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }

  };

  const onChangeControl = (columnName, value) => {
    setProgramacion({ ...programacion, [columnName]: value });
  };


  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Territorial</Breadcrumb.Item>
          <Breadcrumb.Item active>Proyectos de inversión</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr className="p-0 m-0" />

      <div className="container my-2">
        {/* Aca se renderiza el formulario de agregar proyecto */}
        <div className="row justify-content-center ">
          <div className="col-12 col-lg-10">
            <div className="d-flex align-items-center mb-0">
              <button
                className="btn btn-outline-secondary pb-2 me-2"
                onClick={() => navigate(-1)}
                title="Regresar"
              >
                <ArrowRightIcon
                  width={20}
                  height={20}
                  style={{ transform: "rotate(180deg)" }}
                />
              </button>
              <h3 className="mb-0">
                Editando proyección {obtenerNombreMes(mes_eje)} {ano_eje}
              </h3>
            </div>
            <div className="text-muted mb-3">
              Actualice la información del proyecto
            </div>

            {/* Información básica */}
            <div className="card mb-3">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Información básica</h6>
                <div className="mb-3">
                  <label className="form-label">
                    Código del proyecto (CUI)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={cui ?? ""}
                    disabled
                  />
                </div>
                <div>
                  <label className="form-label">Descripción del proyecto</label>
                  <textarea
                    className="form-control"
                    value={proyectoNombre ?? ""}
                    disabled
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Información financiera */}
            <div className="card mb-3">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Información financiera</h6>
                <div className="row mb-3">
                  <div className="col-12 col-md-4 mb-2 mb-md-0">
                    <div className="text-muted small">Programación Inicial</div>
                    <input
                      type="number"
                      className="form-control text-end"
                      value={programacion.q_prgpro_financ ?? 0}
                      onChange={(e) =>
                        onChangeControl(
                          "q_prgpro_financ",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    <div className="form-text fw-lighter mt-0">
                      Valor inicial programado para el proyecto
                    </div>
                  </div>
                  <div className="col-6 col-md-4 mb-2 mb-md-0">
                    <div className="text-muted small">Caídas</div>
                    <input
                      type="number"
                      className="form-control text-end"
                      value={programacion.q_prgpro_caida ?? 0}
                      onChange={(e) =>
                        onChangeControl(
                          "q_prgpro_caida",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    <div className="form-text fw-lighter mt-0">
                      Reducciones en el presupuesto del proyecto
                    </div>
                  </div>
                  <div className="col-6 col-md-4 mb-2 mb-md-0">
                    <div className="text-muted small">Incrementos</div>
                    <input
                      type="number"
                      className="form-control text-end"
                      value={programacion.q_prgpro_increm ?? 0}
                      onChange={(e) =>
                        onChangeControl(
                          "q_prgpro_increm",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    <div className="form-text fw-lighter mt-0">
                      Aumentos en el presupuesto del proyecto
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-4 mb-2 mb-md-0">
                    <div className="text-muted small">Proyección ajustada</div>
                    <div className="fw-bold">
                      <input
                        type="text"
                        className="form-control text-end"
                        disabled
                        value={Number(
                          (programacion.q_prgpro_financ ?? 0) -
                            (programacion.q_prgpro_caida ?? 0) +
                            (programacion.q_prgpro_increm ?? 0)
                        ).toLocaleString("es-PE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      />
                    </div>
                    <div className="form-text fw-lighter mt-0">
                      Programación Inicial - Caídas + Incrementos
                    </div>
                  </div>
                  <div className="col-6 col-md-4 mb-2 mb-md-0">
                    <div className="text-muted small">Ejecución</div>
                    <input
                      type="text"
                      className="form-control text-end"
                      disabled
                      value={
                        ejecucion?.MONTO_DEVENGADO_MES !== undefined
                          ? Number(
                              ejecucion.MONTO_DEVENGADO_MES ?? 0
                            ).toLocaleString("es-PE", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ""
                      }
                    />
                    <div className="form-text fw-lighter mt-0">
                      Monto ejecutado en el mes
                    </div>
                  </div>
                  <div className="col-6 col-md-4 mb-2 mb-md-0">
                    <div className="text-muted small">Avance (%)</div>
                    <div className="fw-bold">
                      <input
                        type="text"
                        className="form-control text-end"
                        disabled
                        value={(
                          ((ejecucion?.MONTO_DEVENGADO_MES ?? 0) /
                            ((programacion.q_prgpro_financ ?? 0) -
                              (programacion.q_prgpro_caida ?? 0) +
                              (programacion.q_prgpro_increm ?? 0))) *
                          100
                        ).toFixed(2)}
                      />
                    </div>
                    <div className="form-text fw-lighter mt-0">
                      Ejecución / Proyección ajustada * 100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Información detallada */}
            <div className="card mb-3">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Información detallada</h6>
                <div className="mb-3">
                  <label className="form-label">Avance físico (%)</label>
                  <div className="input-group" style={{ maxWidth: 200 }}>
                    <input
                      type="number"
                      className="form-control text-end"
                      min="0"
                      max="100"
                      step="0.01"
                      value={programacion.p_prgpro_fisica ?? 0}
                      onChange={(e) =>
                        onChangeControl(
                          "p_prgpro_fisica",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    <span className="input-group-text">%</span>
                  </div>
                  <div className="form-text fw-lighter mt-0">
                    Porcentaje de avance físico del proyecto
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Riesgo a final de {obtenerNombreMes(mes_eje)} {ano_eje}
                  </label>
                  <input
                    type="number"
                    className="form-control text-end"
                    min="0"
                    step="0.01"
                    value={programacion.q_prgpro_riesgo ?? 0}
                    onChange={(e) =>
                      onChangeControl(
                        "q_prgpro_riesgo",
                        parseFloat(e.target.value)
                      )
                    }

                    // TODO: manejar el cambio
                  />
                  <div className="form-text fw-lighter mt-0">
                    Monto en riesgo identificado para este proyecto (en soles)
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado situacional</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={programacion.t_prgpro_estsit ?? ""}
                    onChange={(e) =>
                      onChangeControl("t_prgpro_estsit", e.target.value)
                    }
                    // TODO: manejar el cambio
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Comentario</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={programacion.t_prgpro_coment ?? ""}
                    onChange={(e) =>
                      onChangeControl("t_prgpro_coment", e.target.value)
                    }
                    // TODO: manejar el cambio
                  />
                </div>
              </div>
            </div>

            {JSON.stringify(programacion)}

            <UltimaSincro ano_eje={ano_eje} sec_ejec={SEC_EJEC} />

            {/* Botones */}
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={saveProyecto} disabled={isLoading}>
                Guardar proyecto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
