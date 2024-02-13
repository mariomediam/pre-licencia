import { transformarFecha } from "../../../utils/varios";
import { RequeListaOptionSplitComponent } from "./RequeListaOptionSplitComponent";

const classBadge = {
  1: "badge bg-secondary",
  2: "badge bg-primary",
  3: "badge bg-danger",
};

export const RequeListaDependItemComponent = ({ requerimiento }) => {
  const {
    C_anipre,
    C_reque,
    C_biesertipo,
    F_reque_estado,
    tipo_reque,
    D_reque_fecha,
    T_reque_obs,
    Q_REQUE_TOTAL,
    N_ESTADO_NOMBRE,
    C_exp,
    F_certif,
  } = requerimiento;

  const formattedRequeTotal = Q_REQUE_TOTAL.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <td className="align-middle pe-3 ">
        <div>{C_reque}</div>
        <div>
          <small className="text-muted">{tipo_reque}</small>
        </div>
        <div>
          <small className="text-muted">
            Fecha: {transformarFecha(D_reque_fecha).substring(0, 10)}
          </small>
        </div>
        <div>
          <span className={classBadge[F_reque_estado]}>
            <div>
              <small>
                {F_reque_estado === "2"
                  ? `PRE COMPROMISO ${parseInt(C_exp, 10)}`
                  : N_ESTADO_NOMBRE}
              </small>
            </div>
            <small><small>{F_certif  && <div>CERTIFICADO</div>}</small></small>
            
          </span>
        </div>
        <div></div>
      </td>
      <td className="align-middle">
        <p className=" max-five-lines">{T_reque_obs}</p>
      </td>
      <td className="text-end align-middle ">{formattedRequeTotal}</td>
      <td className="text-center align-middle ">
        <RequeListaOptionSplitComponent
          C_anipre={C_anipre}
          C_reque={C_reque}
          C_biesertipo={C_biesertipo}
          F_reque_estado={F_reque_estado}
          Q_REQUE_TOTAL={Q_REQUE_TOTAL}
        />
      </td>
      
    </>
  );
};
