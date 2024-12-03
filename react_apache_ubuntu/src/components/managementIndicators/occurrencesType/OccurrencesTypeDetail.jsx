import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";

import { OcurrenciasxAnio } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import XIcon from "../../../icons/XIcon";

export const OccurrencesTypeDetail = () => {
  const navigate = useNavigate();
  const { anio: urlYear } = useParams();

  const [dataOccurrence, setDataOccurrence] = useState([]);
  const [totalOccurrences, setTotalOccurrences] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [colors, setColors] = useState([]);

  const dafaultOption = useMemo(
    () => ({
      title: {
        text: `${totalOccurrences} ocurrencias`,

        left: "center",
        top: "3%",
        textStyle: {
          fontSize: 20,
        },
      },
      label: {
        position: "insideTopLeft",
        formatter: function (params) {
          const total = params.treePathInfo[0].value;
          const percent = ((params.value / total) * 100).toFixed(2);
          let arr = [
            "{name|" + params.name + "}",
            "{hr|}",
            "{value|" + params.value + "}{name| ocurrencias}",
            "{name|" + percent + "}{name|%}",
          ];
          return arr.join("\n");
        },

        rich: {
          value: {
            fontSize: 22,
            lineHeight: 30,
            // color: 'yellow'
          },
          name: {
            fontSize: 12,
            color: "#fff",
          },
          hr: {
            width: "100%",
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: 0.5,
            height: 0,
            lineHeight: 10,
          },
        },
      },

      tooltip: {
        formatter: function (info) {
          var treePathInfo = info.treePathInfo;
          var treePath = [];
          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }
        },
      },
      series: [
        {
          name: "Ocurrencias",
          type: "treemap",
          leafDepth: 1,
          breadcrumb: {},

          upperLabel: {
            show: true,
            fontFamily: "Arial",
            fontSize: 10,
            color: "#fff",
            textBorderColor: "transparent",
            textBorderWidth: 0,
            textShadowColor: "transparent",
            textShadowBlur: 0,
          },
          itemStyle: {
            borderColor: "#fff",
          },
          levels: getLevelOption(),
          data: dataOccurrence,
        },
      ],
    }),
    [dataOccurrence, totalOccurrences]
  );

  function getLevelOption() {
    return [
      {
        // Nivel 0: Primer nivel
        itemStyle: {
          borderColor: "#777",
          borderWidth: 0,
          gapWidth: 1,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        // Nivel 1: Segundo nivel
        itemStyle: {
          borderColor: "#555",
          borderWidth: 5,
          gapWidth: 1,
        },
        label: {
          show: true,
          fontFamily: "Arial",
          fontSize: 12,
          fontWeight: "normal",
          color: "#fff",
          // Puedes agregar más estilos si es necesario
        },
        upperLabel: {
          show: true,
          formatter: function (params) {
            return params.name;
          },
        },
        emphasis: {
          focus: "none",
          itemStyle: {
            color: null,
          },
        },
        blur: {
          itemStyle: {
            color: null,
          },
        },
      },
      {
        // Nivel 2: Tercer nivel
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6,
        },
        label: {
          show: true,
          fontFamily: "Arial",
          fontSize: 12,
          fontWeight: "normal",
          color: "#fff",
          // Asegúrate de que los estilos coincidan con los del segundo nivel
        },
        upperLabel: {
          show: true,
          formatter: function (params) {
            return params.name;
          },
        },
      },
    ];
  }
  useEffect(() => {
    const getOccurrences = async () => {
      try {
        const params = {
          anio: urlYear,
          opcion: "01",
        };
        const dataOccurrence = await OcurrenciasxAnio(params);

        // Agrupar por tipo de apoyo, subtipo y modalidad
        const dataMap = {};

        dataOccurrence.forEach(
          ({ tipo_de_apoyo, sub_tipo, modalidad_ocurrencia, q_total }) => {
            if (!dataMap[tipo_de_apoyo]) {
              dataMap[tipo_de_apoyo] = {
                name: tipo_de_apoyo,
                value: 0,
                path: tipo_de_apoyo,
                children: {},
              };
            }
            dataMap[tipo_de_apoyo].value += q_total;

            if (!dataMap[tipo_de_apoyo].children[sub_tipo]) {
              dataMap[tipo_de_apoyo].children[sub_tipo] = {
                name: sub_tipo,
                value: 0,
                path: `${tipo_de_apoyo}/${sub_tipo}`,
                children: {},
              };
            }
            dataMap[tipo_de_apoyo].children[sub_tipo].value += q_total;

            if (
              !dataMap[tipo_de_apoyo].children[sub_tipo].children[
                modalidad_ocurrencia
              ]
            ) {
              dataMap[tipo_de_apoyo].children[sub_tipo].children[
                modalidad_ocurrencia
              ] = {
                name: modalidad_ocurrencia,
                value: 0,
                path: `${tipo_de_apoyo}/${sub_tipo}/${modalidad_ocurrencia}`,
              };
            }
            dataMap[tipo_de_apoyo].children[sub_tipo].children[
              modalidad_ocurrencia
            ].value += q_total;
          }
        );

        // Convertir dataMap en un array y ordenar por 'value' en orden descendente
        const data = Object.values(dataMap)
          .map((tipo) => ({
            ...tipo,
            children: Object.values(tipo.children).map((subTipo) => ({
              ...subTipo,
              children: Object.values(subTipo.children),
            })),
          }))
          .sort((a, b) => b.value - a.value); // Ordenar por 'value' descendente

        const sumOccurrences = data.reduce((acc, item) => acc + item.value, 0);
        setTotalOccurrences(sumOccurrences);
        
        setDataOccurrence(data);
      } catch (error) {
        console.error(error);
      }
    };
    getOccurrences();
  }, [urlYear]);

  useEffect(() => {
    setOptionsChart({
      ...dafaultOption,
      series: [{ ...dafaultOption.series[0], data: dataOccurrence }],
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
              {`Seguridad ciudadana / Ocurrencias ${urlYear} por tipo de apoyo`}
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
            <div className="mychart">

              <MyChart
                option={optionChart}
                widthChart="100%"
                heightChart="550px"
                onColorsChange={setColors}
              />{" "}
              </div>
              <div
                className="d-flex justify-content-center pt-4 px-2"
                style={{ maxWidth: "900px" }}
              >
                <Accordion defaultActiveKey="0" flush>
                  {dataOccurrence.map((occurrence, index) => (
                    <Accordion.Item key={occurrence.name} eventKey={index}>
                      <Accordion.Header>
                        <div className="d-flex flex-grow-1 gap-3 justify-content-between px-3">
                          <div className="d-flex align-items-start">
                            <span
                              className="circle-icon me-1 "
                              style={{
                                backgroundColor: colors[index],
                                width: "16px",
                                height: "16px",
                                flexShrink: 0,
                              }}
                            ></span>
                            <h6>{occurrence.name}</h6>
                          </div>
                          <h5>{occurrence.value}</h5>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Accordion defaultActiveKey="0" flush>
                          {occurrence.children.map((subOccurrence, index) => (
                            <Accordion.Item
                              key={subOccurrence.name}
                              eventKey={index}
                            >
                              <Accordion.Header>
                                <div className="d-flex flex-grow-1 gap-3 justify-content-between px-3">
                                  <span>{subOccurrence.name}</span>
                                  <span>{subOccurrence.value}</span>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <Accordion defaultActiveKey="0" flush>
                                  {subOccurrence.children.map(
                                    (modalidad, index) => (
                                      <div className="d-flex flex-grow-1 gap-3 justify-content-between mx-5" key={modalidad.name}>
                                        <small>{modalidad.name}</small>
                                        <small>{modalidad.value}</small>
                                      </div>
                                    )
                                  )}
                                </Accordion>
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
