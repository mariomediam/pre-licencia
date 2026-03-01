export const IndicatorRoadSignsByIndicatorAndMonth = ({ roadSignsGroupByIndicatorAndMonth, roadSigns }) => {

    const formatNumber = (num) => {
        return num.toLocaleString('es-PE');
    };

    const indicadoresUnicos = [...new Set(roadSigns.map(senializa => senializa.C_Senializa_Indicador))];
    const nombresIndicadores = {};
    
    roadSigns.forEach(senializa => {
        if (!nombresIndicadores[senializa.C_Senializa_Indicador]) {
            nombresIndicadores[senializa.C_Senializa_Indicador] = senializa.N_Senializa_Indicador;
        }
    });

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 mt-4">
            <h5 className="mb-4 fw-semibold text-dark">Total de señalizaciones por indicador y mes</h5>
            
                <div className="table-responsive">
                <table className="table table-borderless">
                    <thead>
                        <tr className="border-bottom">
                            <th className="text-muted fw-normal pb-3">Mes</th>
                            {indicadoresUnicos.map(codIndicador => (
                                <th key={codIndicador} className="text-muted fw-normal pb-3 text-center">
                                    {nombresIndicadores[codIndicador]}
                                </th>
                            ))}
                            <th className="text-muted fw-normal pb-3 text-center">Total de señalizaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roadSignsGroupByIndicatorAndMonth.map((datosMes) => (
                            <tr key={datosMes.mes} className="border-bottom">
                                <td className="py-3">{datosMes.nombreMes}</td>
                                {indicadoresUnicos.map(codIndicador => (
                                    <td key={codIndicador} className="py-3 text-center">
                                        {datosMes.indicadores[codIndicador]?.cantidad > 0 
                                            ? formatNumber(datosMes.indicadores[codIndicador].cantidad) 
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
