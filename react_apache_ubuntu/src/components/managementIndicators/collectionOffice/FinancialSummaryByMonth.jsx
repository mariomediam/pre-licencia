import { obtenerNombreMes, formatMoney } from '../../../utils/varios';

export const FinancialSummaryByMonth = ({ financialSummary = [] }) => {
  return (
    <div className="bg-white rounded-4 shadow-sm p-4">
      <h6 className="fw-bold mb-4">Detalle de recaudación mensual</h6>
      <div className="table-responsive">
        <table className="table table-borderless align-middle mb-0">
          <thead>
            <tr className="text-muted small">
              <th className="fw-semibold">Mes</th>
              <th className="fw-semibold text-end">Recaudado</th>
              <th className="fw-semibold text-end">Proyectado</th>
              <th className="fw-semibold text-end">Pendiente de recaudar</th>
              <th className="fw-semibold text-end">Acumulado pendiente de recaudar</th>
            </tr>
          </thead>
          <tbody>
            {financialSummary.map(({ Mes, collection, projected, pendingCollection, accumulatedPendingCollection }) => (
              <tr key={Mes} className="border-bottom">
                <td className="py-3">{obtenerNombreMes(Mes)}</td>
                <td className="py-3 text-end">{formatMoney(collection)}</td>
                <td className="py-3 text-end">{formatMoney(projected)}</td>
                <td className="py-3 text-end">{formatMoney(pendingCollection)}</td>
                <td className="py-3 text-end">{formatMoney(accumulatedPendingCollection)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}