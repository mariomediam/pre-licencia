import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { HeaderIdicators } from "./HeaderIdicators";
import { SelectTasa, SelectRecaudacionPorAnioYTasa, SelectProyeccionPorAnioYTasa } from "../../services/indicatorsService";
import { CollectionRateHeader } from "../../components/managementIndicators/collectionRate/CollectionRateHeader";
import { CollectionOfficeCards } from "../../components/managementIndicators/collectionOffice/CollectionOfficeCards";
import { CollectionOfficeByMonth } from "../../components/managementIndicators/collectionOffice/CollectionOfficeByMonth";
import { FinancialSummaryByMonth } from "../../components/managementIndicators/collectionOffice/FinancialSummaryByMonth";
import { transformarFecha } from "../../utils/varios";
import { FooterIndicators } from "./FooterIndicators";
import { CollecionDate } from "../../components/managementIndicators/CollecionDate";

export const IndicatorRateDetail = () => {

    const { tipo: urlTipo, anio: urlYear, periodo: urlPeriodo, tasa: urlTasa } = useParams();

    const selectedMonths = useMemo(() => urlPeriodo.split(",").map(Number), [urlPeriodo]);

    const [tasa, setTasa] = useState({});
    const [collection, setCollection] = useState([]);
    const [proyected, setProyected] = useState([]);
    const [totalProjected, setTotalProjected] = useState(0);
    const [totalReaised, setTotalReaised] = useState(0);
    const [monthlyCollection, setMonthlyCollection] = useState([]);
    const [monthlyProyected, setMonthlyProyected] = useState([]);
    const [financialSummary, setFinancialSummary] = useState([]);
    const [collectionDate, setCollectionDate] = useState("");

    useEffect(() => {
        const getTasa = async () => {
            const data = await SelectTasa({ opcion: "02", valor: urlTasa });
            if (data.length > 0) {
                setTasa(data[0]);
            } else {
                setTasa({});
            }
        }
        getTasa();
    }, [urlTasa]);

    useEffect(() => {
        if (collection.length > 0) {
            setCollectionDate(transformarFecha(collection[0].D_Recaud_Inicio));
        } else {
            setCollectionDate("");
        }
    }, [collection]);

    useEffect(() => {
        if (tasa.C_Tasa) {
            const getCollection = async () => {
                const data = await SelectRecaudacionPorAnioYTasa({ anio: urlYear, tasa: tasa.C_Tasa });
                const dataFiltered = data.filter((item) => selectedMonths.includes(item.M_RecDet_Mes));
                setCollection(dataFiltered);
            }
            getCollection();
        } else {
            setCollection([]);
        }
    }, [urlYear, tasa, selectedMonths]);

    useEffect(() => {
        if (tasa.C_Tasa) {
            const getProyected = async () => {
                const data = await SelectProyeccionPorAnioYTasa({ opcion: "01", anio: urlYear, tasa: tasa.C_Tasa });
                const dataFiltered = data.filter((item) => selectedMonths.includes(item.M_Mes));
                setProyected(dataFiltered);
            }
            getProyected();
        }
    }, [urlYear, tasa, selectedMonths]);

    useEffect(() => {
        if (proyected.length > 0) {
            const total = proyected.reduce((acc, { Q_Proyecc_Monto }) => acc + Q_Proyecc_Monto, 0);
            setTotalProjected(parseFloat(total.toFixed(2)));
        } else {
            setTotalProjected(0);
        }
    }, [proyected]);

    useEffect(() => {
        const total = collection.reduce((acc, { Q_RecDet_Monto }) => acc + Q_RecDet_Monto, 0);
        setTotalReaised(parseFloat(total.toFixed(2)));
    }, [collection]);

    useEffect(() => {
        if (collection.length > 0) {
            const monthlyTotals = collection.reduce((acc, { M_RecDet_Mes, Q_RecDet_Monto }) => {
                acc[M_RecDet_Mes] = (acc[M_RecDet_Mes] || 0) + Q_RecDet_Monto;
                return acc;
            }, {});
            const result = Array.from({ length: 12 }, (_, i) => ({
                Mes: i + 1,
                Monto: monthlyTotals[i + 1] || 0
            }));
            setMonthlyCollection(result);
        } else {
            setMonthlyCollection([]);
        }
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
        if (monthlyCollection.length === 0) {
            setFinancialSummary([]);
            return;
        }

        const topMonth = parseInt(urlYear) === new Date().getFullYear() ? new Date().getMonth() + 1 : 12;


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
        const resultFiltered = result.filter((item) => selectedMonths.includes(item.Mes));
        setFinancialSummary(resultFiltered);
    }, [monthlyCollection, monthlyProyected, urlYear, selectedMonths]);




    return (
        <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
            <HeaderIdicators selectedType={urlTipo} />
            <div className="container-lg mx-auto py-4 flex-grow-1">
                <CollectionRateHeader tasa={tasa} year={urlYear} selectedMonths={urlPeriodo.split(",")} />


                <CollectionOfficeCards totalRaised={totalReaised} totalProjected={totalProjected} />

                <CollectionOfficeByMonth monthlyData={monthlyCollection} totalRaised={totalReaised} year={urlYear} />

                <div className="mt-4">
                    <FinancialSummaryByMonth financialSummary={financialSummary} />
                </div>

                <div className="mt-4">
                    {/* <CollectiobOfficeByRate rateSummary={rateSummary} year={year} periodo={selectedMonths.join(",")} /> */}
                </div>

                <div className="mt-4">
                    <CollecionDate D_Recaud_Inicio={collectionDate} />
                </div>

            </div>
            <FooterIndicators />
        </div>
    )
}