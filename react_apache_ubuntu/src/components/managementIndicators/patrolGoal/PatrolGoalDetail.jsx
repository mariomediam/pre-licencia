import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import upIcon from "../../../assets/images/indicators/thumb-up.png";
import downIcon from "../../../assets/images/indicators/thumb-down.png";

import MyChart from "../../helpers/MyChart";
import XIcon from "../../../icons/XIcon";
import CheckIcon from "../../../icons/CheckIcon";

export const PatrolGoalDetail = () => {
  const navigate = useNavigate();
  const { anio: urlYear } = useParams();

    const urlUpIcon = `image://${upIcon}`;
  const urlDownIcon = `image://${downIcon}`;

  const rawData = useMemo(() => [
    [70, 72, 96, 94],
    [30, 28, 4, 6],
  ], []);

  const totalData = useMemo(() => [100, 100, 100, 100], []);

  const dataTable = [
    { mes: "AGOSTO", programado: 341, validado: 242, percent: 70 },
    {
      mes: "SETIEMBRE",
      programado: 330,
      validado: 239,
      percent: 72,
    },
    {
      mes: "OCTUBRE",
      programado: 341,
      validado: 324,
      percent: 96,
    },
    {
      mes: "NOVIEMBRE",
      programado: 330,
      validado: 307,
      percent: 94,
    },
  ];

  const months = useMemo(() => ["Ago", "Sep", "Oct", "Nov"], []);

  
  const cumplimientoPorcentajes = rawData[0].map((cumplido, index) => {
    const total = totalData[index];
    return total <= 0 ? 0 : cumplido / total;
  });

  const series = useMemo(
    () => [
      {
        name: "CUMPLIDO",
        type: "bar",
        stack: "total",
        barWidth: "60%",
        label: {
          show: true,
          formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
        },
        data: rawData[0].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        ),
        
        markPoint: {
          data: cumplimientoPorcentajes.map((porcentaje, index) => ({
            xAxis: index,
            y: porcentaje,
            symbol: porcentaje >= 0.75 ? urlUpIcon : urlDownIcon,
            symbolSize: 20,
            symbolOffset: [0, 40],
          })),
          label: {
            show: false,
          },
        },
      },
      {
        name: "FALTANTE",
        type: "bar",
        stack: "total",
        barWidth: "60%",
        label: {
          show: true,
          formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
        },
        data: rawData[1].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        ),
      },
    ],
    [rawData, totalData, urlUpIcon, urlDownIcon, cumplimientoPorcentajes]
  );

  const dafaultOption = useMemo(
    () => ({
      legend: {
        selectedMode: false,
      },
      yAxis: {
        type: "value",
      },
      xAxis: {
        type: "category",
        data: months,
      },
      series,
    }),
    [series, months]
  );

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
              {`Seguridad ciudadana / Cumplimiento de metas por patrullaje ${urlYear}`}
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
        <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-between pt-4">
          <div className="d-flex flex-column align-items-center gap-2">
            {/* <h3 className="m-0 pt-2 pb-0"> ocurrencias</h3> */}
            <div className="d-flex gap-0 flex-wrap justify-content-center align-items-center">
              <MyChart
                option={dafaultOption}
                widthChart="400px"
                heightChart="550px"
              />{" "}
              <div className="d-flex justify-content-center ">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="px-3"></th>
                      <th className="text-end">PROGRAMADO</th>
                      <th className="text-end">VALIDADO</th>
                      <th className="text-end">% META</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable.map((mes, indexMeses) => (
                      <tr key={indexMeses} className="py-0 my-0">
                        <td className="py-0">{mes.mes}</td>
                        <td className="py-0 text-end">{mes.programado} <small className="text-muted">patrullajes</small></td>
                        <td className="py-0 text-end">{mes.validado} <small className="text-muted">patrullajes</small></td>
                        <td className="py-0 text-end">
                          <span className="me-1">{mes.percent}%</span>
                          {mes.percent >= 75 ? (
                            <CheckIcon className="text-success" />
                          ) : (
                            <XIcon className="text-danger" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="text-center">
                        <small>
                          El patrullaje cumple la meta si el porcentaje es mayor
                          o igual al 75%.
                        </small>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
