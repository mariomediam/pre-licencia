import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { HeaderIdicators } from "./HeaderIdicators";
import { InspectionReportsHeader } from "../../components/managementIndicators/inspectionReports/InspectionReportsHeader";
import { BuscarRecaudacionActasControlSatp, BuscarPorCobrarActasControlSatp, BuscarPorEjecutarActasControlSatp } from "../../services/indicatorsService";
import { InspectionReportsCards } from "../../components/managementIndicators/inspectionReports/InspectionReportsCards";
import { InspectionReportsGraphByTotal } from "../../components/managementIndicators/inspectionReports/InspectionReportsGraphByTotal";
import { InspectionReportsGRaphByMonth } from "../../components/managementIndicators/inspectionReports/InspectionReportsGRaphByMonth";
import { InspectionReportsSummaryByInfrac } from "../../components/managementIndicators/inspectionReports/InspectionReportsSummaryByInfrac";
import { FooterIndicators } from "./FooterIndicators";

export const InspectionReports = () => {
  const { anio: urlYear } = useParams();
  
  const [recaudado, setRecaudado] = useState([]);
  const [porCobrar, setPorCobrar] = useState([]);
  const [porEjecutar, setPorEjecutar] = useState([]);
  
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [totalPorEjecutar, setTotalPorEjecutar] = useState(0);
  const [totalPorCobrar, setTotalPorCobrar] = useState(100);

  const [totalActas, setTotalActas] = useState(0);
  
  const [isLoadingRecaudado, setIsLoadingRecaudado] = useState(false);
  const [isLoadingPorCobrar, setIsLoadingPorCobrar] = useState(false);
  const [isLoadingPorEjecutar, setIsLoadingPorEjecutar] = useState(false);
  
  const [monthlyRecaudado, setmonthlyRecaudado] = useState([])
  const [recaudadoAgrupadoPorInfraccion, setRecaudadoAgrupadoPorInfraccion] = useState([])

  const urlTipo = "01";


  useEffect(() => {
    const getRecaudado = async () => {
      try {
        setIsLoadingRecaudado(true);
        const data = await BuscarRecaudacionActasControlSatp({ anio: urlYear });
        setRecaudado(data);
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
  }, [urlYear, urlTipo]);

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
        setPorCobrar(data);
      } catch (error) {
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
  }, [urlYear, urlTipo]);

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
        setPorEjecutar(data);
      } catch (error) {
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
  }, [urlYear, urlTipo]);

  useEffect(() => {
    if (porEjecutar.length > 0) {
      setTotalPorEjecutar(porEjecutar.reduce((acc, curr) => acc + curr.Monto, 0));
    } else {
      setTotalPorEjecutar(0);
    }
  }, [porEjecutar]);


  useEffect(() => {
    if (recaudado.length > 0) {
      const totalRecaudado = recaudado.reduce((acc, curr) => acc + curr.TotalActas, 0);
      const totalPorCobrar = porCobrar.reduce((acc, curr) => acc + curr.TotalActas, 0);
      const totalPorEjecutar = porEjecutar.reduce((acc, curr) => acc + curr.TotalActas, 0);
      setTotalActas(totalRecaudado + totalPorCobrar + totalPorEjecutar);
    } else {
      setTotalActas(0);
    }
  }, [recaudado, porCobrar, porEjecutar]);


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
    if (recaudado.length === 0) {
      setRecaudadoAgrupadoPorInfraccion([]);
      return;
    }


    const groupedRecaudadoByInfraccion = recaudado.reduce((acc, item) => {
      const key = `${item.Abreviatura}`;

      if (!acc[key]) {
        acc[key] = {
          Abreviatura: item.Abreviatura,
          Descripcion: item.Descripcion,
          Norma: item.Norma,
          Monto: 0,
          TotalActas: 0
        };
      }

      acc[key].Monto += item.Monto;
      acc[key].TotalActas += item.TotalActas;
      return acc;
    }, {});

    // Convertir el objeto a array
    const resultByTasaCollection = Object.values(groupedRecaudadoByInfraccion);

    setRecaudadoAgrupadoPorInfraccion(resultByTasaCollection);


  }, [recaudado]);


  return (
    <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
      <HeaderIdicators selectedType={urlTipo} />
      <div className="container-lg mx-auto py-4 flex-grow-1">
        <InspectionReportsHeader year={urlYear} />
        <InspectionReportsCards recaudado={totalRecaudado} porCobrar={totalPorCobrar} porEjecutar={totalPorEjecutar} totalActas={totalActas} isLoading={isLoadingRecaudado || isLoadingPorCobrar || isLoadingPorEjecutar} />

        <div className="row g-4 mt-0">
          <div className="col-12 col-md-4">
            <InspectionReportsGraphByTotal recaudado={totalRecaudado} porCobrar={totalPorCobrar} porEjecutar={totalPorEjecutar} year={urlYear} isLoading={isLoadingRecaudado || isLoadingPorCobrar || isLoadingPorEjecutar} />
          </div>
          <div className="col-12 col-md-8">
            <InspectionReportsGRaphByMonth monthlyData={monthlyRecaudado} totalRaised={totalRecaudado} year={urlYear} isLoading={isLoadingRecaudado || isLoadingPorCobrar || isLoadingPorEjecutar} />
          </div>
        </div>


        <div className="mt-4">
          <InspectionReportsSummaryByInfrac recaudadoAgrupadoPorInfraccion={recaudadoAgrupadoPorInfraccion} year={urlYear} isLoading={isLoadingRecaudado || isLoadingPorCobrar || isLoadingPorEjecutar} />
        </div>
      </div>
      <FooterIndicators />
    </div>
  )
}
