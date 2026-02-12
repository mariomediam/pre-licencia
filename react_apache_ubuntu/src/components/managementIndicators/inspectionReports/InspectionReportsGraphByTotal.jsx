import { useMemo } from 'react'
import MyChart from '../../helpers/MyChart'


const formatNumber = (value) => {
    return new Intl.NumberFormat('de-DE', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(Number(value));
};

export const InspectionReportsGraphByTotal = ({ recaudado, porCobrar, porEjecutar, year = 0 }) => {
    const dafaultOption = useMemo(
        () => {
            return {
                legend: {
                    bottom: 0,
                    left: 'center'
                },
                grid: {
                    top: 30,
                    bottom: 50,
                    left: 70,
                    right: 20
                },
                xAxis: {
                    type: 'category',
                    data: [''],
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
                        fontSize: 10,
                        formatter: (value) => new Intl.NumberFormat('de-DE').format(value)
                    }
                },
                series: [
                    {
                        name: 'Recaudado',
                        data: [recaudado],
                        type: 'bar',
                        barWidth: '25%',
                        itemStyle: { color: '#3b82f6' },
                        label: {
                            show: true,
                            position: "top",
                            fontSize: 10,
                            formatter: (params) => formatNumber(params.value.toFixed(2))
                        },
                    },
                    {
                        name: 'Por cobrar',
                        data: [porCobrar],
                        type: 'bar',
                        barWidth: '25%',
                        itemStyle: { color:  '#22c55e'},
                        label: {
                            show: true,
                            position: "top",
                            fontSize: 10,
                            formatter: (params) => formatNumber(params.value)
                        },
                    },
                    {
                        name: 'Por ejecutar',
                        data: [porEjecutar],
                        type: 'bar',
                        barWidth: '25%',
                        itemStyle: { color:  '#ef4444'},
                        label: {
                            show: true,
                            position: "top",
                            fontSize: 10,
                            formatter: (params) => formatNumber(params.value)
                        },
                    }
                ]
            };
        },
        [recaudado, porCobrar, porEjecutar]
    );

    return (
        <div className="bg-white rounded-4 shadow-sm p-4 h-100">
            <h6 className="fw-semibold text-secondary mb-3">Recaudación de actas - Año {year}</h6>
            <MyChart option={dafaultOption} widthChart="100%" heightChart="300px" />
        </div>
    )
}
