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
  const [dataOccurrenceFormat, setDataOccurrenceFormat] = useState([]);
  const [totalOccurrences, setTotalOccurrences] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [colors, setColors] = useState([]);

  const dafaultOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: "category",
        data: [], // Se asignará en el useEffect
      },
      yAxis: {
        type: "value",
      },
      series: [],
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

        const objMes = Object.groupBy(dataOccurrence, ({ mes }) => mes);
        const listMes = Object.keys(objMes);

        const objTipoApoyo = Object.groupBy(
          dataOccurrence,
          ({ tipo_de_apoyo }) => tipo_de_apoyo
        );
        const listTipoApoyo = Object.keys(objTipoApoyo);

        const series = listTipoApoyo.map((tipoApoyo) => {
          const data = listMes.map((mes) => {
            const item = dataOccurrence.find(
              (item) =>
                item.mes === parseInt(mes) && item.tipo_de_apoyo === tipoApoyo
            );
            return item ? item.q_total : 0;
          });
          return {
            name: tipoApoyo,
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data,
          };
        });

        const sumOccurrences = dataOccurrence.reduce(
          (acc, item) => acc + item.q_total,
          0
        );
        setTotalOccurrences(sumOccurrences);

        setDataOccurrence({
          tipoApoyo: listTipoApoyo,
          meses: listMes.map((mes) => obtenerNombreMes(mes)),
          seriesData: series,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getOccurrences();
  }, [urlYear]);

  useEffect(() => {
    setOptionsChart({
      ...dafaultOption,
      xAxis: {
        ...dafaultOption.xAxis,
        data: dataOccurrence.meses,
        type: "category",
      },
      yAxis: {
        ...dafaultOption.yAxis,
        type: "value",
      },
      series: dataOccurrence.seriesData,
      legend: {
        ...dafaultOption.legend,
        data: dataOccurrence.tipoApoyo,
      },
    });
  }, [dataOccurrence, dafaultOption]);

  useEffect(() => {
    

    const data = dataOccurrence?.meses?.map((mes, index) => {
      const obj = {
        mes,
        value: dataOccurrence.seriesData.reduce(
          (acc, item) => acc + item.data[index],
          0
        ),
        data: dataOccurrence.seriesData.map((item) => ({
          tipo_de_apoyo: item.name,
          value: item.data[index],
        })),
      };
      return obj;
    });

    setDataOccurrenceFormat(data);

    // ]
  }, [dataOccurrence]);

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
            <h3 className="m-0 pt-2 pb-0"> {totalOccurrences} ocurrencias</h3>
            <div className="d-flex flex-column gap-0 flex-wrap justify-content-center align-items-center border">
              <div className="mychart">
                <MyChart
                  option={optionChart}
                  widthChart="100%"
                  heightChart="550px"
                  onColorsChange={setColors}
                />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="d-flex justify-content-center ">
                  <Accordion
                    defaultActiveKey="0"
                    flush
                    className="col-sm-12 border"
                  >
                    {dataOccurrenceFormat?.map((item, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          <div className="d-flex justify-content-between w-100">
                            <div className="">
                              <p className="m-0 p-0">{item.mes}</p>
                            </div>
                            <div className="pe-2">
                              <p className="m-0 p-0">{item.value}</p>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="d-flex flex-column gap-2 ps-3 pe-4">
                            {item.data.map((itemData, indexData) => (
                              <div
                                key={indexData}
                                className="d-flex justify-content-between  gap-5"
                              >
                                <div className="d-flex align-items-start">
                                  <span
                                    className="circle-icon me-1 mt-1"
                                    style={{
                                      backgroundColor: colors[indexData],
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                  ></span>
                                  <p className="m-0 p-0">
                                    {itemData.tipo_de_apoyo}
                                  </p>
                                </div>
                                <div>
                                  <p className="m-0 p-0">{itemData.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
