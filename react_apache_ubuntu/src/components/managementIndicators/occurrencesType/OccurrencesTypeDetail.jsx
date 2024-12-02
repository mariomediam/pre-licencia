import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OcurrenciasxAnio } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import XIcon from "../../../icons/XIcon";

export const OccurrencesTypeDetail = () => {
  const navigate = useNavigate();
  const { anio: urlYear } = useParams();

  const [dataOccurrence, setDataOccurrence] = useState([]);
  const [totalOccurrences, setTotalOccurrences] = useState(0);
  const [optionChart, setOptionsChart] = useState({});

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
          breadcrumb: {
          
          },

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
    [dataOccurrence]
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

        // Agrupar por tipo de apoyo y subtipo y modalidad

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

        const data = Object.values(dataMap).map((tipo) => ({
          ...tipo,
          children: Object.values(tipo.children).map((subTipo) => ({
            ...subTipo,
            children: Object.values(subTipo.children),
          })),
        }));

        const sumOccurrences = data.reduce((acc, item) => acc + item.value, 0);
        setTotalOccurrences(sumOccurrences);

        console.log("data", data);
        setDataOccurrence(data);
      } catch (error) {
        throw error;
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
              <MyChart
                option={optionChart}
                widthChart="550px"
                heightChart="550px"
              />{" "}
              <div className="d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="px-3"></th>
                      {/* {formatData?.tipos?.map((tipo) => (
                    <th className="px-3" key={tipo}>{tipo}</th>
                  ))} */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* {formatData?.meses?.map((mes, indexMeses) => (
                  <tr className="py-0 my-0" key={indexMeses}>
                    <td className="py-0">{obtenerNombreMes(mes)}</td>
                    {formatData?.series?.map((serie, indexSerie) => (
                      <td className="px-3 py-0 text-end" key={indexSerie}>{serie.data[indexMeses]}</td>
                    ))}
                  </tr>
                ))} */}
                  </tbody>
                </table>

                {/* <small>{JSON.stringify(formatData)}</small> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
