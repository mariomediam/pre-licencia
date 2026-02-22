import React from 'react'
import BusIcon from '../../../icons/BusIcon';

export const IndicatorTranportTrainingByModality = ({ capacitacionesAgrupadasPorModalidad }) => {
    const formatNumber = (num) => {
        return num.toLocaleString('es-PE');
    };

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 mt-4">
            <div className="d-flex align-items-center mb-4">
                <BusIcon width={24} height={24} className="text-success me-2"  />
                <h5 className="mb-0 fw-semibold text-dark">Capacitaciones por modalidades</h5>
            </div>
            
            <div className="row g-3">
                {capacitacionesAgrupadasPorModalidad.map((modalidad) => (
                    <div className="col-12 col-md-6 col-lg-4" key={modalidad.C_Capacita_Modalidad}>
                        <div className="card border-0 h-100" style={{ backgroundColor: '#e8f4f8' }}>
                            <div className="card-body text-center py-4">
                                <h3 className="fw-bold mb-2" style={{ color: '#2c5f7a' }}>
                                    {formatNumber(modalidad.Q_Capacita_Cantidad)}
                                    <small className="ms-1 text-muted small">personas capacitadas en</small>
                                </h3>
                                
                                <p className="mb-0 fw-semibold" style={{ color: '#2c5f7a', fontSize: '0.95rem' }}>
                                    {modalidad.N_Capacita_Modalidad}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
