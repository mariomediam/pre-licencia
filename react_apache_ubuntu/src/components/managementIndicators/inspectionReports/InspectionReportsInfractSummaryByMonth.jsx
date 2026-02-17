import { formatMoney, obtenerNombreMes } from '../../../utils/varios';

export const InspectionReportsInfractSummaryByMonth = ({ monthlyData }) => {
    return (
        <div className="bg-white rounded-4 shadow-sm p-4">
          <h6 className="fw-bold mb-4">Detalle mensualizado</h6>
          <div className="table-responsive">
            <table className="table table-borderless align-middle mb-0">
              <thead>
                <tr className="text-muted small">
                  <th className="fw-semibold" style={{ width: '65%' }}>Mes</th>
                  <th className="fw-semibold text-end" style={{ width: '10%' }}>Total actas</th>
                  <th className="fw-semibold text-end" style={{ width: '20%' }}>Monto recaudado</th>                  
                 
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((item) => {
                 
                  
                  return (
                    <tr key={item.Abreviatura} className="border-bottom">
                      <td className="py-3">{obtenerNombreMes(item.Mes)} 
                     </td>
                      <td className="py-3 text-end">{item.TotalActas}</td>
                      <td className="py-3 text-end">{formatMoney(item.Monto)}</td>
                      
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
}
