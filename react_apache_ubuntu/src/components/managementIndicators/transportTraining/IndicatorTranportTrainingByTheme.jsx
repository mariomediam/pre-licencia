import React from 'react'
import TrendingUpIcon from '../../../icons/TrendingUpIcon';

export const IndicatorTranportTrainingByTheme = ({ capacitacionesAgrupadasPorTema }) => {
    const formatNumber = (num) => {
        return num.toLocaleString('es-PE');
    };

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 mt-4">
            <div className="d-flex align-items-center mb-4">
                <TrendingUpIcon width={24} height={24} className="text-success me-2"  />
                <h5 className="mb-0 fw-semibold text-dark">Capacitaciones por temas</h5>
            </div>
            
            <div className="row g-3">
                {capacitacionesAgrupadasPorTema.map((tema) => (
                    <div className="col-12 col-md-6 col-lg-4" key={tema.C_Capacita_Tema}>
                        <div className="card border-0 h-100" style={{ backgroundColor: '#e8f4f8' }}>
                            <div className="card-body text-center py-4">
                                <h3 className="fw-bold mb-2" style={{ color: '#2c5f7a' }}>
                                    {formatNumber(tema.Q_Capacita_Cantidad)}
                                    <small className="ms-1 text-muted small">personas capacitadas en</small>
                                </h3>
                                
                                <p className="mb-0 fw-semibold" style={{ color: '#2c5f7a', fontSize: '0.95rem' }}>
                                    {tema.N_Capacita_Tema}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {capacitacionesAgrupadasPorTema.length > 0 && (
                <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#e8f4e8' }}>
                    <p className="mb-0 text-start" style={{ color: '#4a7c59', fontSize: '0.9rem' }}>
                        Las capacitaciones del Programa de Seguridad Vial es obligatorio para obtener sus permisos de circulación
                    </p>
                </div>
            )}
        </div>
    )
}
