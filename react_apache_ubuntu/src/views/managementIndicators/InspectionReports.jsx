import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { HeaderIdicators } from "./HeaderIdicators";
import { InspectionReportsHeader } from "../../components/managementIndicators/inspectionReports/InspectionReportsHeader";
import { BuscarRecaudacionActasControlSatp } from "../../services/indicatorsService";
import { InspectionReportsCards } from "../../components/managementIndicators/inspectionReports/InspectionReportsCards";
import { InspectionReportsGraphByTotal } from "../../components/managementIndicators/inspectionReports/InspectionReportsGraphByTotal";
import { InspectionReportsGRaphByMonth } from "../../components/managementIndicators/inspectionReports/InspectionReportsGRaphByMonth";
import { InspectionReportsSummaryByInfrac } from "../../components/managementIndicators/inspectionReports/InspectionReportsSummaryByInfrac";

export const InspectionReports = () => {
  const { anio: urlYear } = useParams();
  const [recaudado, setRecaudado] = useState([]);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [totalActas, setTotalActas] = useState(0);
  const [totalPorCobrar, setTotalPorCobrar] = useState(100);
  const [totalPorEjecutar, setTotalPorEjecutar] = useState(200);
  const [isLoadingRecaudado, setIsLoadingRecaudado] = useState(false);
  const [monthlyRecaudado, setmonthlyRecaudado] = useState([])
  const [recaudadoAgrupadoPorInfraccion, setRecaudadoAgrupadoPorInfraccion] = useState([])

  const urlTipo = "01";


  useEffect(() => {
    const getRecaudado = async () => {
      try {
        setIsLoadingRecaudado(true);
        const data = await BuscarRecaudacionActasControlSatp({ anio: urlYear, tipo: 1 });
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
    if (recaudado.length > 0) {
      setTotalActas(recaudado.reduce((acc, curr) => acc + curr.TotalActas, 0));
    } else {
      setTotalActas(0);
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
          Monto: 0
        };
      }

      acc[key].Monto += item.Monto;
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
          <InspectionReportsSummaryByInfrac recaudadoAgrupadoPorInfraccion={recaudadoAgrupadoPorInfraccion} />
        </div>
      </div>
    </div>
  )
}
