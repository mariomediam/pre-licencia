import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeaderIdicators } from "./HeaderIdicators";
import { SelectTasa, SelectRecaudacionPorAnioYTasa } from "../../services/indicatorsService";
import { CollectionRateHeader } from "../../components/managementIndicators/collectionRate/CollectionRateHeader";
export const IndicatorRateDetail = () => {

    const { tipo: urlTipo, anio: urlYear, periodo: urlPeriodo, tasa: urlTasa } = useParams();

    const [tasa, setTasa] = useState({});
    const [collection, setCollection] = useState([]);
    const [proyected, setProyected] = useState([]);

    useEffect(() => {
        const getTasa = async () => {
            const data = await SelectTasa({ opcion: "02", valor: urlTasa });
            setTasa(data);
        }
        getTasa();
    }, [urlTasa]);

    useEffect(() => {
        if (tasa.C_Tasa) {
            const getCollection = async () => {
                const data = await SelectRecaudacionPorAnioYTasa({ anio: urlYear, tasa: tasa.C_Tasa });
                console.log(data);
                setCollection(data);
            }
            getCollection();
        } else {
            setCollection([]);
        }
    }, [urlYear, tasa]);



    return (
        <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
            <HeaderIdicators selectedType={urlTipo} />
            <div className="container-lg mx-auto py-4 flex-grow-1">
                <CollectionRateHeader tasa={tasa} year={urlYear} selectedMonths={urlPeriodo.split(",")} />
                {/* <CollectionOfficeHeader dataOffice={filteredOffice} setYear={setYear} selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} />
    
            <CollectionOfficeCards totalRaised={totalReaised} totalProjected={totalProjected} /> */}

                <div className="row g-4 mt-2">
                    <div className="col-12 col-md-4">
                        {/* <CollectionOfficeRaisedVsProjected totalRaised={totalReaised} totalProjected={totalProjected} year={year} /> */}
                    </div>
                    <div className="col-12 col-md-8">
                        {/* <CollectionOfficeByMonth monthlyData={monthlyCollection} totalRaised={totalReaised} year={year} /> */}
                    </div>
                </div>

                <div className="mt-4">
                    {/* <FinancialSummaryByMonth financialSummary={financialSummary} /> */}
                </div>

                <div className="mt-4">
                    {/* <CollectiobOfficeByRate rateSummary={rateSummary} year={year} periodo={selectedMonths.join(",")} /> */}
                </div>

                <div className="mt-4">
                    {/* <CollecionDate D_Recaud_Inicio={collectionDate} /> */}
                </div>

            </div>
            {/* <FooterIndicators /> */}
        </div>
    )
}