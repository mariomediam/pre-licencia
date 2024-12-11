import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {  
  InfraccionesTransporte,
} from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";

export const TransportationTicketsMonthly = () => {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [colors, setColors] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

  const { anio: anioSelected } = useParams();

  const dafaultOption = useMemo(
    () => ({
      title: {
        text: `Infracciones de transportes`,
        subtext: `${total}`,
        left: "center",
        top: "45%",
        textStyle: {
          fontSize: 10,
        },
        subtextStyle: {
          fontSize: 25,
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Infracciones de transportes",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{d}%", // Muestra el nombre y el porcentaje
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 8,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [],
        },
      ],
    }),
    [total]
  );

  useEffect(() => {
    const getTickets = async () => {
      try {
        const dataTickets = await InfraccionesTransporte(anioSelected);        
        let dataGrouped = [];
        if (dataTickets.length > 7) {
          dataGrouped = dataTickets.slice(0, 6);
          const others = dataTickets.slice(6);
          const totalOthers = others.reduce(
            (acc, item) => acc + item.q_total,
            0
          );
          dataGrouped.push({ N_Infrac_Nombre: "Otros", q_total: totalOthers });
        } else {
          dataGrouped = dataTickets;
        }        
        setTickets(dataGrouped);
        setAllTickets(dataTickets);
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
      data.push({
        value: ticket.q_total,
        name: ticket.N_Infrac_Nombre.substring(0, 100),
      });
      total += ticket.q_total;
    });
    
    setTotal(total);
    setOptionsChart({
      ...dafaultOption,
      series: [{ ...dafaultOption.series[0], data }],
    });
  }, [tickets, dafaultOption]);

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div className="d-flex flex-column align-items-center gap-2">
        <div className="d-flex gap-5 flex-wrap justify-content-center">
          <div className="pb-0 mb-0 mx-2">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="d-flex justify-content-between gap-5 "
                style={{ maxWidth: "400px" }}
              >
                <div className="d-flex align-items-top">
                  <span
                    className="circle-icon me-1"
                    style={{
                      backgroundColor: colors[index],
                      width: "16px",
                      height: "16px",
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  ></span>

                  <span style={{ fontSize: "0.8rem" }}>
                    {ticket.N_Infrac_Nombre}
                  </span>
                </div>

                <span style={{ fontSize: "0.8rem" }}>{ticket.q_total}</span>
              </div>
            ))}
          </div>
          <div className="">
          <MyChart
            option={optionChart}
            widthChart="400px"
            heightChart="400px"
            onColorsChange={setColors}
            
          />
          </div>
          <div className="d-flex justify-content-center mx-5" style={{maxWidth: "1200px"}}>
            <table className="table">
              <thead>
                <tr>
                  <th className="px-3"></th>
                  <th className="px-3"></th>
                </tr>
              </thead>
              <tbody>
                {
                  allTickets.map((ticket, index) => (
                    <tr key={index}>
                      <td className="px-3">{ticket.N_Infrac_Nombre} <span style={{fontSize: "0.7rem"}} className="text-muted">{ticket.N_Normas_Nombre}</span></td>
                      <td className="px-3 text-end">{ticket.q_total}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
