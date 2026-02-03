import { useMemo } from 'react'
import MyChart from '../../helpers/MyChart'

const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const formatNumber = (value) => {
    return new Intl.NumberFormat('de-DE', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(Number(value));
};

export const CollectionOfficeByMonth = ({ monthlyData = [], totalRaised = 0 }) => {
    const dafaultOption = useMemo(
        () => {
            const montos = monthlyData.length > 0 
                ? monthlyData.map(item => item.Monto) 
                : [120, 200, 150, 80, 70, 110, 130, 90, 160, 140, 100, 180];

            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    valueFormatter: (value) => formatNumber(value)
                },
                grid: {
                    top: 20,
                    bottom: 30,
                    left: 50,
                    right: 20
                },
                xAxis: {
                    type: 'category',
                    data: MONTH_LABELS,
                    axisLine: { show: false },
                    axisTick: { show: false }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: {
                        lineStyle: { type: 'dashed', color: '#e0e0e0' }
                    },
                    axisLabel: {
                        formatter: (value) => new Intl.NumberFormat('de-DE').format(value)
                    }
                },
                series: [
                    {
                        name: 'Recaudado',
                        data: montos,
                        type: 'bar',
                        itemStyle: { color: '#3b82f6' },
                        label: {
                            show: true,
                            position: 'top',
                            fontSize: 9,
                            formatter: (params) => formatNumber(params.value)
                        }
                    }
                ]
            };
        },
        [monthlyData]
    );

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-PE', { 
            style: 'currency', 
            currency: 'PEN',
            minimumFractionDigits: 2 
        }).format(value);
    };

    return (
        <div className="bg-white rounded-4 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                    <h6 className="fw-semibold text-secondary mb-1">Evolución de la recaudación por mes</h6>
                    <h4 className="fw-bold text-dark mb-0">{formatCurrency(totalRaised)}</h4>
                </div>
                <span className="text-muted small">Año 2026</span>
            </div>
            <MyChart option={dafaultOption} widthChart="100%" heightChart="280px" />
        </div>
    )
}
