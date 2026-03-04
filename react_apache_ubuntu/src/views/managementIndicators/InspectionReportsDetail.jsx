import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BuscarRecaudacionActasControlSatp, BuscarPorCobrarActasControlSatp, BuscarImpuestoActasControlSatp } from "../../services/indicatorsService";
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

  const [impuesto, setImpuesto] = useState([]);
  const [totalImpuesto, setTotalImpuesto] = useState(0);
  const [isLoadingImpuesto, setIsLoadingImpuesto] = useState(false);

  const [recaudado, setRecaudado] = useState([]);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [isLoadingRecaudado, setIsLoadingRecaudado] = useState(false);

  const [porCobrar, setPorCobrar] = useState([]);
  const [totalPorCobrar, setTotalPorCobrar] = useState(0);
  const [isLoadingPorCobrar, setIsLoadingPorCobrar] = useState(false);

  
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
    const getImpuesto = async () => {
      try {
        setIsLoadingImpuesto(true);
        const data = await BuscarImpuestoActasControlSatp({ anio: urlYear });
        setImpuesto(data.filter((item) => item.Abreviatura === urlAbreviatura));
      }
      catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al buscar las actas impuestas",
          text: error.response.data.message,
        });
      } finally {
        setIsLoadingImpuesto(false);
      }
    }
    getImpuesto();
  }, [urlYear, urlTipo, urlAbreviatura]);


  useEffect(() => {
    if (impuesto.length > 0) {
      setTotalImpuesto(impuesto.reduce((acc, curr) => acc + curr.Monto, 0));
    } else {
      setTotalImpuesto(0);
    }
  }, [impuesto]);


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
    const totalImpuesto = impuesto.reduce((acc, curr) => acc + curr.TotalActas, 0);
    setTotalActas(totalImpuesto);
  }, [impuesto]);

  return (
    <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
      <HeaderIdicators selectedType={urlTipo} />
      <div className="container-lg mx-auto py-4 flex-grow-1">
        <InspectionReportsInfractHeader year={urlYear} infraction={infraction} />
        <InspectionReportsCards recaudado={totalRecaudado} porCobrar={totalPorCobrar} impuesto={totalImpuesto} totalActas={totalActas} isLoading={isLoadingRecaudado || isLoadingPorCobrar || isLoadingImpuesto} />

        <div className="row g-4 mt-0">
          <div className="col-12 col-md-4">
            <InspectionReportsGraphByTotal recaudado={totalRecaudado} porCobrar={totalPorCobrar} impuesto={totalImpuesto} year={urlYear} isLoading={isLoadingRecaudado || isLoadingPorCobrar || isLoadingImpuesto} />
          </div>
          <div className="col-12 col-md-8">
            <InspectionReportsGRaphByMonth monthlyData={monthlyRecaudado} totalRaised={totalRecaudado} year={urlYear} isLoading={isLoadingRecaudado || isLoadingPorCobrar || isLoadingImpuesto} />
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
