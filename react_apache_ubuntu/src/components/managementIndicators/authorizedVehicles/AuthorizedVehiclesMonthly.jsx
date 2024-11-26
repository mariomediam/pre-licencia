import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  VehiculosAutorizadosMes,
  ComparacionVehiculosAutorizados,
} from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { obtenerNombreMes } from "../../../utils/varios";

export const AuthorizedVehiclesMonthly = () => {
  const [vehicles, setVehicles] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});

  const { anio: anioSelected } = useParams();


  const defaultOption = useMemo(
    () => ({
      // title: {
      //   text: 'Autorizaciones emitidas por mes',        
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']        
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: []
    }),
    []
  );

  useEffect(() => {
    const getVehiculosVigentes = async () => {
      try {
        const vehiculos = await VehiculosAutorizadosMes(anioSelected);

        let total = 0;

        total = vehiculos.reduce((acc, { q_total }) => acc + q_total, 0);
        setTotal(total);
        

        const objTipos = Object.groupBy(vehiculos, ({ tipo }) => tipo);
        const objMeses = Object.groupBy(vehiculos, ({ mes }) => mes);

        const listTipos = Object.keys(objTipos);
        const listMeses = Object.keys(objMeses);

        const series = [];
        for (const keyTipo of listTipos) {
          if (Object.hasOwnProperty.call(objTipos, keyTipo)) {
            const objMesesporTipo = Object.groupBy(
              objTipos[keyTipo],
              ({ mes }) => mes
            );
            const serie = {
              name: keyTipo,
              data: [],
              type: "line",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
            };
            for (const mes of listMeses) {
              let monto = 0;
              if (Object.hasOwnProperty.call(objMesesporTipo, mes)) {
                monto = objMesesporTipo[mes].reduce(
                  (acc, { q_total }) => acc + q_total,
                  0
                );
              }
              serie.data.push(monto);
            }
            console.log("entro");
            series.push(serie);
          }
        }

        console.log("series", series);
        console.log("listTipos", listTipos);

        setOptionsChart({
          ...defaultOption,
          legend: { data: listTipos },
          xAxis: { ...defaultOption.xAxis, data: listMeses.map((mes) => obtenerNombreMes(mes)) },          
          series: series,
        });
        
      } catch (error) {
        console.error(error);
      }
    };
    getVehiculosVigentes();
  }, [anioSelected, defaultOption]);

  useEffect(() => {
    let total = 0;

    total = vehicles.reduce((acc, { value }) => acc + value, 0);
    setTotal(total);

    const xAxisData = vehicles.map(({ name }) => name);
    const seriesData = vehicles.map(({ value }) => value);

    setOptionsChart({
      ...defaultOption,
      xAxis: { ...defaultOption.xAxis, data: xAxisData },
      series: [{ ...defaultOption.series[0], data: seriesData }],
    });
  }, [vehicles, defaultOption]);



  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div className="d-flex flex-column align-items-center gap-2">
        <h6> {total} autorizaciones emitidas</h6>
        <div className="d-flex gap-3">
         
          
            <MyChart
              option={optionChart}
              widthChart="400px"
              heightChart="400px"
            />{" "}
          
        </div>
      </div>      
    </div>
  );
};
