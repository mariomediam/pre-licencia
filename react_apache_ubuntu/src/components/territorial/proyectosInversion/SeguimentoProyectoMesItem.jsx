// {
//     "c_proinv": 3,
//     "ANO_EJE": 2025,
//     "c_proinv_codigo": "2331918   ",
//     "n_proinv_nombre": "MEJORAMIENTO DEL SERVICIO DE TRANSITABILIDAD PEATONAL Y VEHICULAR DE LA UPIS LOS ANGELES EN EL DISTRITO DE PIURA, PROVINCIA DE PIURA - PIURA",
//     "c_prgpro": null,
//     "m_prgpro_mes": 5,
//     "q_prgpro_financ": 0.0,
//     "p_prgpro_fisica": 0.0,
//     "q_prgpro_caida": 0.0,
//     "q_prgpro_increm": 0.0,
//     "q_prgpro_riesgo": 0.0,
//     "t_prgpro_estsit": "",
//     "t_prgpro_coment": "",
//     "c_estado": 2,
//     "c_usuari_login": null,
//     "n_prgpro_pc": null,
//     "d_prgpro_fecdig": null,
//     "MONTO_PIA": 0.0,
//     "MONTO_PIM_ACUM": 5841332.0,
//     "MONTO_CERTIFICADO": 5838829.37,
//     "MONTO_COMPROMETIDO_ANUAL": 5651225.42,
//     "MONTO_COMPROMETIDO": 5454102.77,
//     "MONTO_DEVENGADO_ACUM": 5454102.77,
//     "MONTO_GIRADO": 5454102.77,
// "n_estado_color": "#000000",
// "n_estado_descrip": "Ninguno"
// },

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CashIcon from "../../../icons/CashIcon";
import EditIcon from "../../../icons/EditIcon";
import ChevronUp from "../../../icons/ChevronUp";

export const SeguimentoProyectoMesItem = ({ proyecto }) => {
  const navigate = useNavigate();
  const {
    c_prgpro,    
    c_proinv_codigo,
    n_proinv_nombre,    
    MONTO_PIM_ACUM,
    MONTO_DEVENGADO_ACUM,
    MONTO_DEVENGADO_MES,
    q_prgpro_caida,
    q_prgpro_increm,
    q_prgpro_riesgo,
    t_prgpro_estsit,
    t_prgpro_coment,
    c_estado,
    p_prgpro_fisica,
    q_prgpro_financ,    
    n_estado_color,
    n_estado_descrip,
  } = proyecto;

  const [showDetail, setShowDetail] = useState(false);

  // Estado (ejemplo: 2 = En riesgo)
  //   const estadoLabel = c_estado === 2 ? 'En riesgo' : 'En ejecución';
  //   const estadoClass = c_estado === 2 ? 'bg-danger text-white' : 'bg-success text-white';

  // Variaciones


  // Avances
  const avanceFinanciero = MONTO_DEVENGADO_ACUM / MONTO_PIM_ACUM * 100 || 0;
  const avanceFisico = p_prgpro_fisica || 0;


  const onClickEditar = () => {
    navigate(`/territorial/proyectos-inversion/editar/${c_prgpro}`);
  }

  // Formato de moneda
  const formatMoney = (n) =>
    n?.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    });

  return (
    <div className="card mb-3 shadow-sm animate__animated animate__fadeIn animate__faster">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
          <div className="d-flex gap-2 align-items-center mb-1">
            <span className="badge bg-light text-dark border me-2">
              CUI: {c_proinv_codigo?.trim()}
            </span>
            {c_estado !== 2 && (
              <span
                className={`badge rounded-pill`}
                style={{ backgroundColor: n_estado_color }}
              >
                {n_estado_descrip}
              </span>
            )}
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-dark d-flex align-items-center"
              onClick={onClickEditar}
            >
              <EditIcon />
              Editar
            </button>
            <button
              type="button"
              className="btn btn-outline-dark d-flex align-items-center"
            >
              <CashIcon className="me-1" />
              Seguimiento de pago
            </button>

            <button
              type="button"
              className="btn d-flex align-items-center m-0 p-0"
              onClick={() => setShowDetail(!showDetail)}
            >
              {
                <ChevronUp
                  style={{
                    transform: showDetail ? "rotate(0deg)" : "rotate(180deg)",
                    transition: "transform 0.2s",
                  }}
                />
              }
            </button>
          </div>
        </div>
        <h6 className="my-3">{n_proinv_nombre}</h6>
        <hr className="my-2" />
        <div className="row text-center mb-3">
          <div className="col-12 col-md-2">
            <div className="text-muted small">Programación inicial</div>
            <div>{formatMoney(q_prgpro_financ)}</div>
          </div>
          <div className="col-12 col-md-2">
            <div className="text-muted small">Variación</div>
            <div>
              <span className="text-danger d-block">
                - {formatMoney(q_prgpro_caida)}
              </span>
              <span className="text-success d-block">
                + {formatMoney(q_prgpro_increm)}
              </span>
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="text-muted small">Proyección ajustada</div>
            <div>
              {formatMoney(q_prgpro_financ + q_prgpro_increm - q_prgpro_caida)}
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="text-muted small">Ejecución</div>
            <div className="">{formatMoney(MONTO_DEVENGADO_MES)}</div>
          </div>
          <div className="col-12 col-md-4 mb-3" >
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="small">Avance financiero</span>
                <span className="small">
                  {avanceFinanciero.toFixed(1)}%
                </span>
              </div>
              <div className="progress" style={{ height: 8 }}>
                <div
                  className="progress-bar bg-dark"
                  role="progressbar"
                  style={{ width: `${avanceFinanciero}%` }}
                  aria-valuenow={avanceFinanciero}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="mt-2 mt-md-0">
              <div className="d-flex justify-content-between">
                <span className="small">Avance físico</span>
                <span className="small">
                  {avanceFisico.toFixed(1)}%
                </span>
              </div>
              <div className="progress" style={{ height: 8 }}>
                <div
                  className="progress-bar bg-secondary"
                  role="progressbar"
                  style={{ width: `${avanceFisico}%` }}
                  aria-valuenow={avanceFisico}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {
            showDetail && (
                <div className="row border-top pt-3 mt-2 small animate__animated animate__fadeIn animate__faster">
                <div className="col-12 col-md-3 mb-2 mb-md-0">
                  <div className="text-muted small">Riesgo al 30/04/2025</div>
                  <div>{formatMoney(q_prgpro_riesgo)}</div>
                </div>
                <div className="col-12 col-md-5 mb-2 mb-md-0">
                  <div className="text-muted small">Estado situacional</div>
                  <div>{t_prgpro_estsit || <span className="text-muted">Sin información</span>}</div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="text-muted small">Comentario</div>
                  <div>{t_prgpro_coment || <span className="text-muted">Sin comentarios</span>}</div>
                </div>
              </div>
            )
        }

       
      </div>
    </div>
  );
};
