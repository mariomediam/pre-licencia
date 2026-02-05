import { formatMoney } from '../../../utils/varios';

const getProgressColor = (percentage) => {
  if (percentage >= 100) return '#22c55e'; // verde
  if (percentage >= 70) return '#3b82f6';  // azul
  if (percentage >= 40) return '#f59e0b';  // naranja
  return '#ef4444'; // rojo
};

export const CollectiobOfficeByRate = ({ rateSummary = [] }) => {
  return (
    <div className="bg-white rounded-4 shadow-sm p-4">
      <h6 className="fw-bold mb-4">Detalle por concepto de tasa</h6>
      <div className="table-responsive">
        <table className="table table-borderless align-middle mb-0">
          <thead>
            <tr className="text-muted small">
              <th className="fw-semibold" style={{ width: '40%' }}>Descripción del concepto</th>
              <th className="fw-semibold text-end" style={{ width: '20%' }}>Monto recaudado</th>
              <th className="fw-semibold" style={{ width: '25%' }}>Avance meta</th>
              <th className="fw-semibold text-center" style={{ width: '15%' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {rateSummary.map((item) => {
              const percentage = item.Q_Proyecc_Monto > 0 
                ? Math.min((item.Q_RecDet_Monto / item.Q_Proyecc_Monto) * 100, 100) 
                : 0;
              const progressColor = getProgressColor(percentage);
              
              return (
                <tr key={item.C_Tasa_SATP} className="border-bottom">
                  <td className="py-3">{item.N_Tasa_Descrip} <small>(Cod tasa: {item.C_Tasa_SATP})</small>
                  <p className='m-0 p-0'><small className="text-muted">{item.N_depend_Descripcion}</small></p></td>
                  <td className="py-3 text-end">{formatMoney(item.Q_RecDet_Monto)}</td>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="progress flex-grow-1" 
                        style={{ height: '8px', backgroundColor: '#e5e7eb' }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ 
                            width: `${percentage}%`, 
                            backgroundColor: progressColor,
                            borderRadius: '4px'
                          }}
                          aria-valuenow={percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                      <span className="text-muted small" style={{ minWidth: '40px' }}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <a
                      href="#" 
                      className="text-primary text-decoration-none small"
                      onClick={(e) => e.preventDefault()}
                    >
                      Ver detalle <span>&gt;</span>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}