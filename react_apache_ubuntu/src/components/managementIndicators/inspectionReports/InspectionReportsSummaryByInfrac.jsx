import { formatMoney } from '../../../utils/varios';


export const InspectionReportsSummaryByInfrac = ({ recaudadoAgrupadoPorInfraccion }) => {
    return (
        <div className="bg-white rounded-4 shadow-sm p-4">
          <h6 className="fw-bold mb-4">Detalle por concepto de infracción</h6>
          <div className="table-responsive">
            <table className="table table-borderless align-middle mb-0">
              <thead>
                <tr className="text-muted small">
                  <th className="fw-semibold" style={{ width: '65%' }}>Infracción</th>
                  <th className="fw-semibold text-end" style={{ width: '20%' }}>Monto recaudado</th>                  
                  <th className="fw-semibold text-center" style={{ width: '15%' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {recaudadoAgrupadoPorInfraccion.map((item) => {
                 
                  
                  return (
                    <tr key={item.Abreviatura} className="border-bottom">
                      <td className="py-3">{item.Descripcion} 
                      <p className='m-0 p-0'><small className="text-muted">Norma: {item.Norma}</small></p></td>
                      <td className="py-3 text-end">{formatMoney(item.Monto)}</td>
                      
                      <td className="py-3 text-center">
                        <a
                          href={`https://www.google.com`} 
                          className="text-primary text-decoration-none small"
                          
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
