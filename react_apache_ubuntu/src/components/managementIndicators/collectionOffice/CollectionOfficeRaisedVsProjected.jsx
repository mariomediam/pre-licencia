import { useMemo } from 'react'
import MyChart from '../../helpers/MyChart'

const formatNumber = (value) => {
    return new Intl.NumberFormat('de-DE', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(Number(value));
};

export const CollectionOfficeRaisedVsProjected = ({ totalRaised, totalProjected }) => {

    const dafaultOption = useMemo(
        () => {
            return {
                legend: {
                    bottom: 0,
                    left: 'center'
                },
                grid: {
                    top: 20,
                    bottom: 50,
                    left: 40,
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
                        formatter: (value) => new Intl.NumberFormat('de-DE').format(value)
                    }
                },
                series: [
                    {
                        name: 'Proyectado',
                        data: [totalProjected],
                        type: 'bar',
                        barWidth: '40%',
                        itemStyle: { color: '#22c55e' },
                        label: {
                            show: true,
                            position: "top",
                            formatter: (params) => formatNumber(params.value)
                        },
                    },
                    {
                        name: 'Recaudado',
                        data: [totalRaised],
                        type: 'bar',
                        barWidth: '40%',
                        itemStyle: { color:  '#3b82f6'},
                        label: {
                            show: true,
                            position: "top",
                            formatter: (params) => formatNumber(params.value)
                        },
                    }
                ]
            };
        },
        [totalRaised, totalProjected]
    );

    return (
        <div className="bg-white rounded-4 shadow-sm p-4 h-100">
            <h6 className="fw-semibold text-secondary mb-3">Recaudado vs. Proyectado</h6>
            <MyChart option={dafaultOption} widthChart="100%" heightChart="300px" />
        </div>
    )
}
