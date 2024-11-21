// MyChart.jsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const dafaultOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '0%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};

const MyChart = ({ option = dafaultOption, widthChart = "150px", heightChart = "150px"}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Verificar dimensiones antes de inicializar ECharts
      const { clientWidth, clientHeight } = chartRef.current;
      if (clientWidth === 0 || clientHeight === 0) {
        console.warn('El contenedor del gráfico tiene dimensiones cero.');
      }

      const chartInstance = echarts.init(chartRef.current);

      

      chartInstance.setOption(option);

      window.addEventListener('resize', chartInstance.resize);

      return () => {
        window.removeEventListener('resize', chartInstance.resize);
        chartInstance.dispose();
      };
    }
  }, [option]);

  return (
    <div
      ref={chartRef}
      style={{ width: widthChart, height: heightChart }} // Dimensiones explícitas
    />
  );
};

export default MyChart;