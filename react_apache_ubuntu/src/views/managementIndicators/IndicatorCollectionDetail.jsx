import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOffices } from "../../components/managementIndicators/officesData";
import { getTasas } from "../../components/managementIndicators/TasasData";

import { HeaderIdicators } from "./HeaderIdicators";
import { CollectionOfficeHeader } from "../../components/managementIndicators/collectionOffice/CollectionOfficeHeader";
import { SelectRecaudacionPorAnioYDependencia, SelectProyeccionPorAnioYDependencia } from "../../services/indicatorsService";
import { CollectionOfficeCards } from "../../components/managementIndicators/collectionOffice/CollectionOfficeCards";
import { CollectionOfficeRaisedVsProjected } from "../../components/managementIndicators/collectionOffice/CollectionOfficeRaisedVsProjected";
import { CollectionOfficeByMonth } from "../../components/managementIndicators/collectionOffice/CollectionOfficeByMonth";
import { FinancialSummaryByMonth } from "../../components/managementIndicators/collectionOffice/FinancialSummaryByMonth";
import { CollectiobOfficeByRate } from "../../components/managementIndicators/collectionOffice/CollectiobOfficeByRate";
import { CollecionDate } from "../../components/managementIndicators/CollecionDate";
import { transformarFecha } from "../../utils/varios";
import { FooterIndicators } from "./FooterIndicators";

const IndicatorCollectionDetail = () => {

  const navigate = useNavigate();
  const { tipo: urlTipo = "01", code: urlCode = "00" } = useParams();

  const offices = getOffices();


  const filteredOffice = offices.find((row) => row.type === urlTipo && row.code === urlCode);
  // const filteredTasas = tasas


  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState("00");
  const [filteredTasas, setFilteredTasas] = useState([]);
  const [proyected, setProyected] = useState([]);
  const [collection, setCollection] = useState([]);
  const [totalProjected, setTotalProjected] = useState(0);
  const [totalReaised, setTotalReaised] = useState(0);
  const [monthlyCollection, setMonthlyCollection] = useState([]);
  const [monthlyProyected, setMonthlyProyected] = useState([]);
  const [financialSummary, setFinancialSummary] = useState([]);
  const [rateSummary, setRateSummary] = useState([]);
  const [collectionDate, setCollectionDate] = useState("");


  useEffect(() => {
    const tasas = getTasas();
    setFilteredTasas(tasas);
  }, []);

  useEffect(() => {
    if (collection.length > 0) {
      setCollectionDate(transformarFecha(collection[0].D_Recaud_Inicio));
    } else {
      setCollectionDate("");
    }
  }, [collection]);

  useEffect(() => {
    const getCollection = async () => {

      if (filteredTasas.length > 0 && filteredOffice.dependencia) {
        const data = await SelectRecaudacionPorAnioYDependencia({ anio: year, dependencia: filteredOffice.dependencia });
        setCollection(data);
      }
    }

    getCollection();
  }, [year, month, filteredOffice.dependencia, filteredTasas]);


  useEffect(() => {
    const getProyected = async () => {
      const data = await SelectProyeccionPorAnioYDependencia({ opcion: "01", anio: year, dependencia: filteredOffice.dependencia });

      setProyected(data);
    }
    getProyected();
  }, [year, filteredOffice.dependencia]);

  useEffect(() => {
    const total = collection.reduce((acc, { Q_RecDet_Monto }) => acc + Q_RecDet_Monto, 0);
    setTotalReaised(parseFloat(total.toFixed(2)));
  }, [collection]);

  useEffect(() => {
    const total = proyected.reduce((acc, { Q_Proyecc_Monto }) => acc + Q_Proyecc_Monto, 0);
    setTotalProjected(parseFloat(total.toFixed(2)));
  }, [proyected]);

  useEffect(() => {
    const monthlyTotals = collection.reduce((acc, { M_RecDet_Mes, Q_RecDet_Monto }) => {
      acc[M_RecDet_Mes] = (acc[M_RecDet_Mes] || 0) + Q_RecDet_Monto;
      return acc;
    }, {});

    const result = Array.from({ length: 12 }, (_, i) => ({
      Mes: i + 1,
      Monto: monthlyTotals[i + 1] || 0
    }));
    setMonthlyCollection(result);
  }, [collection]);

  useEffect(() => {
    const monthlyTotals = proyected.reduce((acc, { M_Mes, Q_Proyecc_Monto }) => {
      acc[M_Mes] = (acc[M_Mes] || 0) + Q_Proyecc_Monto;
      return acc;
    }, {});

    const result = Array.from({ length: 12 }, (_, i) => ({
      Mes: i + 1,
      Monto: monthlyTotals[i + 1] || 0
    }));
    setMonthlyProyected(result);
  }, [proyected]);

  useEffect(() => {
    if (monthlyCollection.length === 0 || monthlyProyected.length === 0) return;

    const topMonth = year === new Date().getFullYear() ? new Date().getMonth() + 1 : 12;

    const result = monthlyCollection.filter(({ Mes }) => Mes <= topMonth).map(({ Mes, Monto }, index) => {
      // Suma acumulada de projected hasta el mes actual (index + 1)
      const accumulatedProjected = monthlyProyected.slice(0, index + 1).reduce((acc, { Monto }) => acc + Monto, 0);
      // Suma acumulada de collection hasta el mes actual (index + 1)
      const accumulatedCollection = monthlyCollection.slice(0, index + 1).reduce((acc, { Monto }) => acc + Monto, 0);

      return {
        Mes: Mes,
        collection: Monto,
        projected: monthlyProyected[index]?.Monto || 0,
        pendingCollection: (monthlyProyected[index]?.Monto || 0) - Monto > 0 ? (monthlyProyected[index]?.Monto || 0) - Monto : 0,
        accumulatedPendingCollection: accumulatedProjected - accumulatedCollection > 0 ? accumulatedProjected - accumulatedCollection : 0
      };
    });
    setFinancialSummary(result);
  }, [monthlyCollection, monthlyProyected, year]);

  useEffect(() => {
    if (collection.length === 0 ) return;

    const groupedColletionByTasa = collection.reduce((acc, item) => {
      const key = `${item.C_Tasa_SATP}-${item.C_Tasa}`;
      
      if (!acc[key]) {
        acc[key] = {
          C_Tasa_SATP: item.C_Tasa_SATP,
          N_Tasa_Descrip: item.N_Tasa_Descrip,
          N_depend_Descripcion: item.N_depend_Descripcion,
          Q_RecDet_Monto: 0
        };
      }
      
      acc[key].Q_RecDet_Monto += item.Q_RecDet_Monto;
      return acc;
    }, {});
    
    // Convertir el objeto a array
    const resultByTasaCollection = Object.values(groupedColletionByTasa);  

    const groupedProyectedByTasa = proyected.reduce((acc, item) => {
      const key = `${item.C_Tasa_SATP}-${item.C_Tasa}`;
      
      if (!acc[key]) {
        acc[key] = {
          C_Tasa_SATP: item.C_Tasa_SATP,
          N_Tasa_Descrip: item.N_Tasa_Descrip,
          N_depend_Descripcion: item.N_depend_Descripcion,
          Q_Proyecc_Monto: 0
        };
      }
      
      acc[key].Q_Proyecc_Monto += item.Q_Proyecc_Monto;
      return acc;
    }, {});
    
    // Convertir el objeto a array
    const resultByTasaProyected = Object.values(groupedProyectedByTasa);  

// Merge resultByTasaCollection and resultByTasaProyected
    const resultByTasa = resultByTasaCollection.map((item) => {
      const proyectedItem = resultByTasaProyected.find((p) => p.C_Tasa_SATP === item.C_Tasa_SATP);
      return {
        ...item,
        "Q_Proyecc_Monto": proyectedItem.Q_Proyecc_Monto,
        "rate": item.Q_RecDet_Monto / proyectedItem.Q_Proyecc_Monto
      };
    });
    setRateSummary(resultByTasa);
  }, [ collection, proyected ]);

  console.log("rateSummary", rateSummary);

  return (
    <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
      <HeaderIdicators selectedType={urlTipo} />
      <div className="container-lg mx-auto py-4 flex-grow-1">
        <CollectionOfficeHeader dataOffice={filteredOffice} setYear={setYear} setMonth={setMonth} />

        <CollectionOfficeCards totalRaised={totalReaised} totalProjected={totalProjected} />

        <div className="row g-4 mt-2">
          <div className="col-12 col-md-4">
            <CollectionOfficeRaisedVsProjected totalRaised={totalReaised} totalProjected={totalProjected} year={year} />
          </div>
          <div className="col-12 col-md-8">
            <CollectionOfficeByMonth monthlyData={monthlyCollection} totalRaised={totalReaised} year={year} />
          </div>
        </div>

        <div className="mt-4">
          <FinancialSummaryByMonth financialSummary={financialSummary} />
        </div>

        <div className="mt-4">
          <CollectiobOfficeByRate rateSummary={rateSummary} />
        </div>

        <div className="mt-4">
          <CollecionDate D_Recaud_Inicio={collectionDate} />
        </div>

      </div>
        <FooterIndicators />
    </div>
  )
}

export default IndicatorCollectionDetail