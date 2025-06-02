import { formatMoney } from "../../../utils/varios";

export const ResumenProyectoItem = ({
  producto_proyecto,
  producto_proyecto_nombre,
  MONTO_PIM,
  MONTO_DEVENGADO,
}) => {
  let avanceFinanciero = 0;

  if (MONTO_PIM > 0) {
    avanceFinanciero = (MONTO_DEVENGADO / MONTO_PIM) * 100;
  }

  return (
    <tr>
      <td>{producto_proyecto}</td>
      <td>{producto_proyecto_nombre}</td>
      <td className="text-end">{formatMoney(MONTO_PIM)}</td>
      <td className="text-end">{formatMoney(MONTO_DEVENGADO)}</td>
      <td className="text-end">
        <div className="mb-2 text-end">
          <div className="d-flex justify-content-end" >            
            <span className="small text-end">{avanceFinanciero.toFixed(1)}%</span>
          </div>
          <div className="progress" style={{ height: 8,  minWidth: 100}}>
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
      </td>
    </tr>
  );
};
