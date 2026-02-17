import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BuscarRecaudacionActasControlSatp } from "../../services/indicatorsService";
import Swal from "sweetalert2";

import { HeaderIdicators } from "./HeaderIdicators";
import { FooterIndicators } from "./FooterIndicators";
import { InspectionReportsInfractHeader } from "../../components/managementIndicators/inspectionReports/InspectionReportsInfractHeader";
import { InspectionReportsCards } from "../../components/managementIndicators/inspectionReports/InspectionReportsCards";
import { InspectionReportsGraphByTotal } from "../../components/managementIndicators/inspectionReports/InspectionReportsGraphByTotal";
import { InspectionReportsGRaphByMonth } from "../../components/managementIndicators/inspectionReports/InspectionReportsGRaphByMonth";

export const InspectionReportsDetail = () => {

    const { anio: urlYear, abreviatura: urlAbreviatura } = useParams();
  const [recaudado, setRecaudado] = useState([]);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [totalActas, setTotalActas] = useState(0);
  const [isLoadingRecaudado, setIsLoadingRecaudado] = useState(false);
  const [totalPorCobrar, setTotalPorCobrar] = useState(100);
  const [totalPorEjecutar, setTotalPorEjecutar] = useState(200);
  const [monthlyRecaudado, setmonthlyRecaudado] = useState([])
  const [recaudadoAgrupadoPorInfraccion, setRecaudadoAgrupadoPorInfraccion] = useState([])
  const [infraction, setinfraction] = useState({})

    const urlTipo = "01";


    useEffect(() => {
        const getRecaudado = async () => {
          try {
            setIsLoadingRecaudado(true);
            const data = await BuscarRecaudacionActasControlSatp({ anio: urlYear, tipo: 1 });
            setRecaudado(data.filter((item) => item.Abreviatura === urlAbreviatura));
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error al buscar la recaudación de actas",
              text: error.response.data.message,
            });
          } finally {
            setIsLoadingRecaudado(false);
          }
    
    
        }
        getRecaudado();
      }, [urlYear, urlTipo, urlAbreviatura]);


      useEffect(() => {
        if (recaudado.length > 0) {
          setTotalRecaudado(recaudado.reduce((acc, curr) => acc + curr.Monto, 0));
        } else {
          setTotalRecaudado(0);
        }
      }, [recaudado]);

      useEffect(() => {
        if (recaudado.length > 0) {
          setinfraction(recaudado[0]);
        } else {
          setinfraction({});
        }
      }, [recaudado]);

      useEffect(() => {
        const monthlyTotals = recaudado.reduce((acc, { Mes, Monto }) => {
          acc[Mes] = (acc[Mes] || 0) + Monto;
          return acc;
        }, {});
    
        const result = Array.from({ length: 12 }, (_, i) => ({
          Mes: i + 1,
          Monto: monthlyTotals[i + 1] || 0
        }));
        setmonthlyRecaudado(result);
      }, [recaudado]);

      useEffect(() => {
        if (recaudado.length > 0) {
          setTotalActas(recaudado.reduce((acc, curr) => acc + curr.TotalActas, 0));
        } else {
          setTotalActas(0);
        }
      }, [recaudado]);


      return (
        <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
          <HeaderIdicators selectedType={urlTipo} />
          <div className="container-lg mx-auto py-4 flex-grow-1">
            <InspectionReportsInfractHeader year={urlYear} infraction={infraction} />
            <InspectionReportsCards recaudado={totalRecaudado} porCobrar={totalPorCobrar} porEjecutar={totalPorEjecutar} totalActas={totalActas} isLoading={isLoadingRecaudado} />
    
            <div className="row g-4 mt-0">
              <div className="col-12 col-md-4">
                <InspectionReportsGraphByTotal recaudado={totalRecaudado} porCobrar={totalPorCobrar} porEjecutar={totalPorEjecutar} year={urlYear} />
              </div>
              <div className="col-12 col-md-8">
                <InspectionReportsGRaphByMonth monthlyData={monthlyRecaudado} totalRaised={totalRecaudado} year={urlYear} />
              </div>
            </div>
    
    
            {/* <div className="mt-4">
              <InspectionReportsSummaryByInfrac recaudadoAgrupadoPorInfraccion={recaudadoAgrupadoPorInfraccion} />
            </div> */}
          </div>
          <FooterIndicators />
        </div>
      )
}
