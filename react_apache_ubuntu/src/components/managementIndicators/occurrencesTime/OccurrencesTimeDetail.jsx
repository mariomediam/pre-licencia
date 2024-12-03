import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";

import { OcurrenciasxAnio } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import XIcon from "../../../icons/XIcon";
import { obtenerNombreMes } from "../../../utils/varios";


export const OccurrencesTimeDetail = () => {
  const navigate = useNavigate();
  const { anio: urlYear } = useParams();

  const [dataOccurrence, setDataOccurrence] = useState([]);
  const [totalOccurrences, setTotalOccurrences] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [colors, setColors] = useState([]);

  const dafaultOption = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {
        show: false,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series: [      
      ]
    }),
    []
  );

 
  useEffect(() => {
    const getOccurrences = async () => {
      try {
        const params = {
          anio: urlYear,
          opcion: "02",
        };
        const dataOccurrence = await OcurrenciasxAnio(params);
        console.log("dataOccurrence", dataOccurrence);

        const objMes = Object.groupBy(dataOccurrence, ({ mes }) => mes);
        const listMes = Object.keys(objMes);

        const objTipoApoyo = Object.groupBy(dataOccurrence, ({ tipo_de_apoyo }) => tipo_de_apoyo);
        const listTipoApoyo = Object.keys(objTipoApoyo);


        console.log("listMes", listMes);
        console.log("listTipoApoyo", listTipoApoyo);

        const series = listTipoApoyo.map((tipoApoyo) => {
          const data = listMes.map((mes) => {
            const item = dataOccurrence.find((item) => item.mes === parseInt(mes) && item.tipo_de_apoyo === tipoApoyo);
            return item ? item.q_total : 0;
          });
          return {
        
          name: tipoApoyo,
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data
        
          };
        });

        const sumOccurrences = dataOccurrence.reduce((acc, item) => acc + item.value, 0);
        setTotalOccurrences(sumOccurrences);
        
        setDataOccurrence({legendData: listTipoApoyo, xAxisData: listMes.map((mes) => obtenerNombreMes(mes)), seriesData: series});
      } catch (error) {
        console.error(error);
      }
    };
    getOccurrences();
  }, [urlYear]);

  useEffect(() => {
    setOptionsChart({
      ...dafaultOption,
      yAxis: { ...dafaultOption.yAxis, data: dataOccurrence.xAxisData },
      series: dataOccurrence.seriesData,
      legend: {
        ...dafaultOption.legend,
        data: dataOccurrence.legendData
      },
    });
  }, [dataOccurrence, dafaultOption]);

  const onClickClose = () => {
    navigate(-1);
  };

  return (
    <div className="p-3">
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p
              className="p-0"
              style={{ marginTop: "-5px", marginBottom: "0px" }}
            >
              {`Seguridad ciudadana / Ocurrencias ${urlYear} mensualizadas`}
            </p>
          </div>
        </div>

        <div
          className="d-flex align-items-center gap-2 "
          role="button"
          onClick={onClickClose}
        >
          <XIcon className="cursor-pointer" />
        </div>
      </header>
      <main>
        <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-between pt-0">
          <div className="d-flex flex-column align-items-center gap-2">
            {/* <h3 className="m-0 pt-2 pb-0"> {totalOccurrences} ocurrencias</h3> */}
            <div className="d-flex flex-column gap-0 flex-wrap justify-content-center align-items-center">
              <MyChart
                option={optionChart}
                widthChart="550px"
                heightChart="550px"
                onColorsChange={setColors}
              />{" "}
              <div
                className="d-flex justify-content-center pt-4 px-2"
               
              >
                {/* aqui van los valores de la tabla */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
