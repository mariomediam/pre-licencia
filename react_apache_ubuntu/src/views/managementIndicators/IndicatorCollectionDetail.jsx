import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getOffices } from "../../components/managementIndicators/officesData";
import { getTasas } from "../../components/managementIndicators/TasasData";

import { HeaderIdicators } from "./HeaderIdicators";
import { CollectionOfficeHeader } from "../../components/managementIndicators/collectionOffice/CollectionOfficeHeader";
import { SelectRecaudacionPorAnioYDependencia, SelectProyeccionPorAnioYDependencia } from "../../services/indicatorsService";
import { CollectionOfficeCards } from "../../components/managementIndicators/collectionOffice/CollectionOfficeCards";
import { CollectionOfficeRaisedVsProjected } from "../../components/managementIndicators/collectionOffice/CollectionOfficeRaisedVsProjected";
import { CollectionOfficeByMonth } from "../../components/managementIndicators/collectionOffice/CollectionOfficeByMonth";

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
  

  useEffect(() => {
    const tasas = getTasas();
    setFilteredTasas(tasas);
  }, []);

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

  const monthlyCollection = useMemo(() => {
    const monthlyTotals = collection.reduce((acc, { M_RecDet_Mes, Q_RecDet_Monto }) => {
      acc[M_RecDet_Mes] = (acc[M_RecDet_Mes] || 0) + Q_RecDet_Monto;
      return acc;
    }, {});

    return Array.from({ length: 12 }, (_, i) => ({
      Mes: i + 1,
      Monto: monthlyTotals[i + 1] || 0
    }));
  }, [collection]);


  return (
    <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
      <HeaderIdicators selectedType={urlTipo} />      
      <div className="container-lg mx-auto py-4 flex-grow-1">
        <CollectionOfficeHeader dataOffice={filteredOffice} setYear={setYear} setMonth={setMonth} />

        <CollectionOfficeCards totalRaised={totalReaised} totalProjected={totalProjected} />

        <div className="row g-4 mt-2">
          <div className="col-12 col-md-4">
            <CollectionOfficeRaisedVsProjected totalRaised={totalReaised} totalProjected={totalProjected} />
          </div>
          <div className="col-12 col-md-8">
            <CollectionOfficeByMonth monthlyData={monthlyCollection} totalRaised={totalReaised} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndicatorCollectionDetail