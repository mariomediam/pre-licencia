import React from 'react';

export const IndicatorTransportTrainingByModalityAndMonth = ({ capacitacionesPorModalidadYMes, capacitaciones }) => {
    const formatNumber = (num) => {
        return num.toLocaleString('es-PE');
    };

    const modalidadesUnicas = [...new Set(capacitaciones.map(cap => cap.C_Capacita_Modalidad))];
    const nombresModalidades = {};
    
    capacitaciones.forEach(cap => {
        if (!nombresModalidades[cap.C_Capacita_Modalidad]) {
            nombresModalidades[cap.C_Capacita_Modalidad] = cap.N_Capacita_Modalidad;
        }
    });

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 mt-4">
            <h5 className="mb-4 fw-semibold text-dark">Total de choferes capacitados por mes</h5>
            
            <div className="table-responsive">
                <table className="table table-borderless">
                    <thead>
                        <tr className="border-bottom">
                            <th className="text-muted fw-normal pb-3">Mes</th>
                            {modalidadesUnicas.map(codModalidad => (
                                <th key={codModalidad} className="text-muted fw-normal pb-3 text-center">
                                    {nombresModalidades[codModalidad]}
                                </th>
                            ))}
                            <th className="text-muted fw-normal pb-3 text-center">Total de choferes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {capacitacionesPorModalidadYMes.map((datosMes) => (
                            <tr key={datosMes.mes} className="border-bottom">
                                <td className="py-3">{datosMes.nombreMes}</td>
                                {modalidadesUnicas.map(codModalidad => (
                                    <td key={codModalidad} className="py-3 text-center">
                                        {datosMes.modalidades[codModalidad]?.cantidad > 0 
                                            ? formatNumber(datosMes.modalidades[codModalidad].cantidad) 
                                            : '-'}
                                    </td>
                                ))}
                                <td className="py-3 text-center fw-semibold">
                                    {datosMes.total > 0 ? formatNumber(datosMes.total) : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
