import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { HeaderIdicators } from "./HeaderIdicators";
import { FooterIndicators } from "./FooterIndicators";
import { obtenerSenializacionAgrupadaPorAnioyMes } from "../../services/transporteService";
import { IndicatorRoadSignsHeader } from "../../components/managementIndicators/roadSigns/IndicatorRoadSignsHeader";
import { IndicatorRoadSignsByIndicator } from "../../components/managementIndicators/roadSigns/IndicatorRoadSignsByIndicator";
import { IndicatorRoadSignsByMonth } from "../../components/managementIndicators/roadSigns/IndicatorRoadSignsByMonth";
import { IndicatorRoadSignsByIndicatorAndMonth } from "../../components/managementIndicators/roadSigns/IndicatorRoadSignsByIndicatorAndMonth";

const currentYear = new Date().getFullYear();

export const IndicatorRoadSingsMain = () => {

  const navigate = useNavigate();
  const urlTipo = "01";
  const { anio } = useParams();

  // const [year, setYear] = useState(currentYear);
  const [selectedMonths, setSelectedMonths] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // Todos los meses
  const [roadSings, setRoadSings] = useState([])
  // const [totalRoadSings, setTotalRoadSings] = useState(0)
  const [roadSignsGroupByUniMed, setroadSignsGroupByUniMed] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [roadSignsGroupByIndicator, setRoadSignsGroupByIndicator] = useState([])
  const [roadSignsMonthly, setRoadSignsMonthly] = useState([])
  const [roadSignsGroupByIndicatorAndMonth, setRoadSignsGroupByIndicatorAndMonth] = useState([])


  const onChangeYear = (newYear) => {
    const year = newYear;
    // setYear(year);
    navigate(`/indicadores/senializacion-vial/${year}`);
  }


  useEffect(() => {
    try {
      setIsLoading(true);
      const getRoadSings = async () => {

        let data = await obtenerSenializacionAgrupadaPorAnioyMes({ anio });

        const dataFiltered = data.filter(item => selectedMonths.includes(item.M_Senializa_Mes));

        setRoadSings(dataFiltered);
      }
      getRoadSings();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al obtener las capacitaciones",
        text: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [anio, selectedMonths]);

  useEffect(() => {
    if (roadSings.length > 0) {
      const agrupado = []

      const groupByUniMed = Object.groupBy(roadSings,
        senializa => {
          return senializa.N_unimed_desc
        }
      )

      Object.keys(groupByUniMed).forEach(key => {
        agrupado.push({
          N_unimed_desc: key,
          cantidad: groupByUniMed[key].reduce((acc, curr) => acc + curr.Q_Senializa_Cantidad, 0)
        })
      })


      setroadSignsGroupByUniMed(agrupado);
    } else {
      setroadSignsGroupByUniMed([]);
    }
  }, [roadSings]);


  useEffect(() => {
    if (roadSings.length > 0) {
      const agrupado = []

      const groupByIndicator = Object.groupBy(roadSings,
        senializa => {
          return senializa.C_Senializa_Indicador
        }
      )

      Object.keys(groupByIndicator).forEach(key => {
        agrupado.push({
          C_Senializa_Indicador: key,
          N_unimed_desc: groupByIndicator[key][0].N_unimed_desc,
          N_Senializa_Indicador: groupByIndicator[key][0].N_Senializa_Indicador,
          cantidad: groupByIndicator[key].reduce((acc, curr) => acc + curr.Q_Senializa_Cantidad, 0)
        })
      })

      setRoadSignsGroupByIndicator(agrupado);
    } else {
      setRoadSignsGroupByIndicator([]);
    }
  }, [roadSings]);

  useEffect(() => {
    if (roadSings.length > 0) {
      const agrupado = []

      const groupByMonth = Object.groupBy(roadSings,
        senializa => {
          return senializa.M_Senializa_Mes
        }
      )

      Object.keys(groupByMonth).forEach(key => {
        agrupado.push({
          M_Senializa_Mes: parseInt(key),
          cantidad: groupByMonth[key].reduce((acc, curr) => acc + curr.Q_Senializa_Cantidad, 0)
        })
      })

      setRoadSignsMonthly(agrupado);
    } else {
      setRoadSignsMonthly([]);
    }
  }, [roadSings]);

  useEffect(() => {
    const mesesNombres = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const indicadoresUnicos = [...new Set(roadSings.map(senializa => senializa.C_Senializa_Indicador))];

    const agrupadoPorIndicadorYMes = mesesNombres.map((nombreMes, index) => {
      const mes = index + 1;
      const roadSingsDelMes = roadSings.filter(senializa => senializa.M_Senializa_Mes === mes);

      const datosMes = {
        mes: mes,
        nombreMes: nombreMes,
        indicadores: {},
        total: 0
      };

      indicadoresUnicos.forEach(codIndicador => {
        const roadSingsIndicador = roadSingsDelMes.filter(senializa => senializa.C_Senializa_Indicador === codIndicador);
        const cantidad = roadSingsIndicador.reduce((acc, curr) => acc + curr.Q_Senializa_Cantidad, 0);
        const nombreIndicador = roadSingsIndicador.length > 0 ? roadSingsIndicador[0].N_Senializa_Indicador : '';

        datosMes.indicadores[codIndicador] = {
          C_Senializa_Indicador: codIndicador,
          N_Senializa_Indicador: nombreIndicador,
          cantidad: cantidad
        };
        datosMes.total += cantidad;
      });

      return datosMes;
    });

    setRoadSignsGroupByIndicatorAndMonth(agrupadoPorIndicadorYMes);
  }, [roadSings]);

    return (
      <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
        <HeaderIdicators selectedType={urlTipo} />
        <div className="container-lg mx-auto py-4 flex-grow-1">

          <IndicatorRoadSignsHeader setYear={onChangeYear} selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} roadSignsGroupByUniMed={roadSignsGroupByUniMed} />


          <IndicatorRoadSignsByIndicator roadSignsGroupByIndicator={roadSignsGroupByIndicator} />


          <div className="g-4 mt-4">
            <IndicatorRoadSignsByMonth monthlyData={roadSignsMonthly} year={anio} />
          </div>

          <IndicatorRoadSignsByIndicatorAndMonth roadSignsGroupByIndicatorAndMonth={roadSignsGroupByIndicatorAndMonth} roadSigns={roadSings} />



        </div>

        <FooterIndicators />
      </div>
    );
  }