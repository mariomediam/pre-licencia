import { useEffect, useMemo, useState } from "react";

import { ComparacionInfraccionesTransporte, InfraccionesTransporte } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import ChevronUp from "../../../icons/ChevronUp";

export const TransportationTickets = ({ anioSelected, title = "" }) => {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [variation, setVariation] = useState(0);

  const isPositive = variation > 0;

  const dafaultOption = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
      },      
      series: [
        {
          name: title,
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 8,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    }),
    [title]
  );

  useEffect(() => {
    const getTickets = async () => {
      try {
        const dataTickets = await InfraccionesTransporte(anioSelected);        
        let dataGrouped = []
        if (dataTickets.length > 5) {
            dataGrouped = dataTickets.slice(0, 4);
            const others = dataTickets.slice(4);
            const totalOthers = others.reduce((acc, item) => acc + item.q_total, 0);
            dataGrouped.push({ N_Infrac_Nombre: "Otros", q_total: totalOthers });
            
        } else {
            dataGrouped = dataTickets;
        }        
        setTickets(dataGrouped);
      } catch (error) {
        throw error;
      }
    };
    getTickets();
  }, [anioSelected]);

  useEffect(() => {
    let total = 0;
    const data = [];
    tickets.forEach((ticket) => {
      data.push({ value: ticket.q_total, name: ticket.N_Infrac_Nombre.substring(0, 100) });
      total += ticket.q_total;
    });
    setTotal(total);
    setOptionsChart({
      ...dafaultOption,
      series: [{ ...dafaultOption.series[0], data }],
    });
  }, [tickets, dafaultOption]);

  useEffect(() => {
    const getComparacionInfraccionesTransporte = async () => {
      try {
        const currentDate = new Date();
        const dia = anioSelected === currentDate.getFullYear() ? currentDate.getDate() : 31;
        const mes = anioSelected === currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12;

        const { total1, total2 } = await ComparacionInfraccionesTransporte(
          dia,
          mes,
          anioSelected - 1,
          anioSelected
        );

        let percentVariation = 0;
        if (total1 !== 0) {
          percentVariation = ((total2 - total1) / total1) * 100;
        }
        setVariation(percentVariation);
      } catch (error) {
        console.error(error);
      }
    };
    getComparacionInfraccionesTransporte();
  }, [anioSelected]);

  return (
    <div>
      <h6>{title}</h6>
      <div className="d-flex gap-3">
        <div style={{ maxWidth: "100px" }}>
          <h3>{total}</h3>
          <span
            className="circle-icon me-1"
            style={{
              backgroundColor: isPositive ? "#67FD09" : "#F6D5AF",
              transform: `rotate(${isPositive ? 0 : 180}deg)`,
            }}
          >
            <ChevronUp width={14} height={14} className={isPositive ? "text-success" : "text-danger"}/>
          </span>
          <small className={isPositive ? "text-success" : "text-danger"}>
            {Math.round(variation)}%{" "}
          </small>
          <p
            style={{ lineHeight: 1 }}
            className={isPositive ? "text-success" : "text-danger"}
          >
            <small style={{ fontSize: "0.7rem" }}>
              Comparado con el año anterior
            </small>
          </p>
        </div>
        <div>
          <MyChart
            option={optionChart}
            widthChart="150px"
            heightChart="100px"
          />{" "}
        </div>

      </div>
    </div>
  );
};
