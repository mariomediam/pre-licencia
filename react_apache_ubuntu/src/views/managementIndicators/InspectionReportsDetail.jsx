import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BuscarRecaudacionActasControlSatp, BuscarPorCobrarActasControlSatp, BuscarPorEjecutarActasControlSatp } from "../../services/indicatorsService";
import Swal from "sweetalert2";

import { HeaderIdicators } from "./HeaderIdicators";
import { FooterIndicators } from "./FooterIndicators";
import { InspectionReportsInfractHeader } from "../../components/managementIndicators/inspectionReports/InspectionReportsInfractHeader";
import { InspectionReportsCards } from "../../components/managementIndicators/inspectionReports/InspectionReportsCards";
import { InspectionReportsGraphByTotal } from "../../components/managementIndicators/inspectionReports/InspectionReportsGraphByTotal";
import { InspectionReportsGRaphByMonth } from "../../components/managementIndicators/inspectionReports/InspectionReportsGRaphByMonth";
import { InspectionReportsInfractSummaryByMonth } from "../../components/managementIndicators/inspectionReports/InspectionReportsInfractSummaryByMonth";

export const InspectionReportsDetail = () => {

    const { anio: urlYear, abreviatura: urlAbreviatura } = useParams();
  const [recaudado, setRecaudado] = useState([]);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [isLoadingRecaudado, setIsLoadingRecaudado] = useState(false);

  const [porCobrar, setPorCobrar] = useState([]);
  const [totalPorCobrar, setTotalPorCobrar] = useState(0);
  const [isLoadingPorCobrar, setIsLoadingPorCobrar] = useState(false);
  
  const [porEjecutar, setPorEjecutar] = useState([]);
  const [totalPorEjecutar, setTotalPorEjecutar] = useState(0);
  const [isLoadingPorEjecutar, setIsLoadingPorEjecutar] = useState(false);

  

  const [totalActas, setTotalActas] = useState(0);
  
  const [monthlyRecaudado, setmonthlyRecaudado] = useState([])
  
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
        const getPorCobrar = async () => {
          try {
            setIsLoadingPorCobrar(true);
            const data = await BuscarPorCobrarActasControlSatp({ anio: urlYear });
            setPorCobrar(data.filter((item) => item.Abreviatura === urlAbreviatura));
          }
          catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error al buscar la recaudación por cobrar de actas",
              text: error.response.data.message,
            });
          } finally {
            setIsLoadingPorCobrar(false);
          }
        }
        getPorCobrar();
      }, [urlYear, urlTipo, urlAbreviatura]);

      useEffect(() => {
        if (porCobrar.length > 0) {
          setTotalPorCobrar(porCobrar.reduce((acc, curr) => acc + curr.Monto, 0));
        } else {
          setTotalPorCobrar(0);
        }
      }, [porCobrar]);


      useEffect(() => {
        const getPorEjecutar = async () => {
          try {
            setIsLoadingPorEjecutar(true);
            const data = await BuscarPorEjecutarActasControlSatp({ anio: urlYear });
            setPorEjecutar(data.filter((item) => item.Abreviatura === urlAbreviatura));
          }
          catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error al buscar la recaudación por ejecutar de actas",
              text: error.response.data.message,
            });
          } finally {
            setIsLoadingPorEjecutar(false);
          }
        }
        getPorEjecutar();
      }, [urlYear, urlTipo, urlAbreviatura]);


      useEffect(() => {
        if (porEjecutar.length > 0) {
          setTotalPorEjecutar(porEjecutar.reduce((acc, curr) => acc + curr.Monto, 0));
        } else {
          setTotalPorEjecutar(0);
        }
      }, [porEjecutar]);


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
        const totalRecaudado = recaudado.reduce((acc, curr) => acc + curr.TotalActas, 0);
        const totalPorCobrar = porCobrar.reduce((acc, curr) => acc + curr.TotalActas, 0);
        const totalPorEjecutar = porEjecutar.reduce((acc, curr) => acc + curr.TotalActas, 0);
        setTotalActas(totalRecaudado + totalPorCobrar + totalPorEjecutar);  
      }, [recaudado, porCobrar, porEjecutar]);

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
    
    
            <div className="mt-4">
              <InspectionReportsInfractSummaryByMonth monthlyData={recaudado} />
            </div>
          </div>
          <FooterIndicators />
        </div>
      )
}
