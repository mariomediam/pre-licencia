import React from 'react'
import TrendingUpIcon from '../../../icons/TrendingUpIcon';

export const IndicatorRoadSignsByIndicator = ({ roadSignsGroupByIndicator }) => {
    const formatNumber = (num) => {
        return num.toLocaleString('es-PE');
    };

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 mt-4">
            <div className="d-flex align-items-center mb-4">
                <TrendingUpIcon width={24} height={24} className="text-success me-2"  />
                <h5 className="mb-0 fw-semibold text-dark">Registro de Mantenimiento de Señalización por tipo</h5>
            </div>
            
            <div className="row g-3">
                {roadSignsGroupByIndicator.map((indicator) => (
                    <div className="col-12 col-md-6 col-lg-4" key={indicator.C_Senializa_Indicador}>
                        <div className="card border-0 h-100" style={{ backgroundColor: '#e8f4f8' }}>
                            <div className="card-body text-center py-4">
                                <h3 className="fw-bold mb-2" style={{ color: '#2c5f7a' }}>
                                    {formatNumber(indicator.cantidad)} {indicator.N_unimed_desc === "M2" ? "m²" : indicator.N_unimed_desc}
                                    
                                </h3>
                                
                                <p className="mb-0 fw-semibold" style={{ color: '#2c5f7a', fontSize: '0.95rem' }}>
                                    {indicator.N_Senializa_Indicador}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
