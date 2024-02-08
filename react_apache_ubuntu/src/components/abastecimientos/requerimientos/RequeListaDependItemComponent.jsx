import { transformarFecha } from "../../../utils/varios";

const classBadge = {
  1: "badge bg-secondary",
  2: "badge bg-primary",
  3: "badge bg-danger",
};

export const RequeListaDependItemComponent = ({ requerimiento }) => {
  const {
    C_reque,
    F_reque_estado,
    tipo_reque,
    D_reque_fecha,
    T_reque_obs,
    Q_REQUE_TOTAL,
    N_ESTADO_NOMBRE,
    C_exp,
  } = requerimiento;

  const formattedRequeTotal = Q_REQUE_TOTAL.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <td className="align-middle pe-3 ">
        <div>{C_reque}
        </div>
        <div><small className="text-muted">
           {tipo_reque}
          </small>
        </div>
        <div>
          <small className="text-muted">
            Fecha: {transformarFecha(D_reque_fecha).substring(0, 10)}
          </small>
        </div>
        <div>
          <span className={classBadge[F_reque_estado]}>
            <small>{F_reque_estado === "2" ? `PRE COMPROMISO ${parseInt(C_exp, 10)}` : N_ESTADO_NOMBRE}</small>
          </span>
        </div>
        <div></div>
      </td>
      <td className="align-middle"><p className=" max-five-lines">{T_reque_obs}</p></td>
      <td className="text-end align-middle ">{formattedRequeTotal}</td>
      <td className="text-center align-middle ">
        {/* <Button variant="outline-primary" onClick={onClicVerEnvios}>
        {" "}
        Ver envios{" "}
      </Button>{" "} */}
      </td>
      {/* <td
      className={`text-center align-middle m-1 p-1 ${
        actual_envio !== f_plani_envio &&
        "animate__animated animate__zoomIn"
      }`}
    >
      <CellEnviarBoleta
        d_ano={d_ano}
        d_mes={d_mes}
        c_tippla_id={c_tippla_id}
        c_plani_nro={c_plani_nro}
        actual_envio={actual_envio}
        actual_user={actual_user}
        actual_datetime={actual_datetime}
        actual_carpeta={actual_carpeta}
        n_tippla_nombre = {n_tippla_nombre}
        setEstadoPlanillaBoleta={setEstadoPlanillaBoleta}
      />

    </td> */}
    
    </>
  );
};
