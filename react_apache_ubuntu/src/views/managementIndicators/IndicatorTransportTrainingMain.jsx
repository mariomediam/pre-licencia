import { useState, useEffect } from "react";

import { HeaderIdicators } from "./HeaderIdicators";
import { FooterIndicators } from "./FooterIndicators";
import { IndicatorTranportTrainingHeader } from "../../components/managementIndicators/transportTraining/IndicatorTranportTrainingHeader";
import { obtenerCapacitacionPorAnio } from "../../services/transporteService";
import { IndicatorTranportTrainingByTheme } from "../../components/managementIndicators/transportTraining/IndicatorTranportTrainingByTheme";
import { IndicatorTranportTrainingByModality } from "../../components/managementIndicators/transportTraining/IndicatorTranportTrainingByModality";
import { IndicatorTranportTrainingByMonth } from "../../components/managementIndicators/transportTraining/IndicatorTranportTrainingByMonth";
import { IndicatorTransportTrainingByModalityAndMonth } from "../../components/managementIndicators/transportTraining/IndicatorTransportTrainingByModalityAndMonth";


const currentYear = new Date().getFullYear();


export const IndicatorTransportTrainingMain = () => {
    const urlTipo = "01";

    const [year, setYear] = useState(currentYear);
    const [selectedMonths, setSelectedMonths] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // Todos los meses
    const [capacitaciones, setCapacitaciones] = useState([])
    const [totalCapacitaciones, setTotalCapacitaciones] = useState(0)
    const [capacitacionesAgrupadasPorTema, setCapacitacionesAgrupadasPorTema] = useState([])
    const [capacitacionesAgrupadasPorModalidad, setCapacitacionesAgrupadasPorModalidad] = useState([])

    const [capacitacionesPorMes, setCapacitacionesPorMes] = useState([])
    const [capacitacionesPorModalidadYMes, setCapacitacionesPorModalidadYMes] = useState([])

    useEffect(() => {
        const getCapacitaciones = async () => {
            const data = await obtenerCapacitacionPorAnio({ anio: year });

            const dataWithMonth = data.map(item => ({
                ...item,
                month: parseInt(item.D_Capacita_Fecha.split('-')[1])
            }));

            const dataFiltered = dataWithMonth.filter(item => selectedMonths.includes(item.month));

            setCapacitaciones(dataFiltered);
        }
        getCapacitaciones();
    }, [year, selectedMonths]);

    useEffect(() => {
        if (capacitaciones.length > 0) {
            setTotalCapacitaciones(capacitaciones.reduce((acc, curr) => acc + curr.Q_Capacita_Cantidad, 0));
        } else {
            setTotalCapacitaciones(0);
        }
    }, [capacitaciones]);


    useEffect(() => {
        if (capacitaciones.length > 0) {
            const agrupado = capacitaciones.reduce((acc, curr) => {
                const temaExistente = acc.find(item => item.C_Capacita_Tema === curr.C_Capacita_Tema);

                if (temaExistente) {
                    temaExistente.Q_Capacita_Cantidad += curr.Q_Capacita_Cantidad;
                } else {
                    acc.push({
                        C_Capacita_Tema: curr.C_Capacita_Tema,
                        N_Capacita_Tema: curr.N_Capacita_Tema,
                        Q_Capacita_Cantidad: curr.Q_Capacita_Cantidad
                    });
                }
                return acc;
            }, []);

            setCapacitacionesAgrupadasPorTema(agrupado);
        } else {
            setCapacitacionesAgrupadasPorTema([]);
        }
    }, [capacitaciones]);

    useEffect(() => {
        if (capacitaciones.length > 0) {
            const agrupado = capacitaciones.reduce((acc, curr) => {
                const modalidadExistente = acc.find(item => item.C_Capacita_Modalidad === curr.C_Capacita_Modalidad);

                if (modalidadExistente) {
                    modalidadExistente.Q_Capacita_Cantidad += curr.Q_Capacita_Cantidad;
                } else {
                    acc.push({
                        C_Capacita_Modalidad: curr.C_Capacita_Modalidad,
                        N_Capacita_Modalidad: curr.N_Capacita_Modalidad,
                        Q_Capacita_Cantidad: curr.Q_Capacita_Cantidad
                    });
                }
                return acc;
            }, []);

            setCapacitacionesAgrupadasPorModalidad(agrupado);
        } else {
            setCapacitacionesAgrupadasPorModalidad([]);
        }
    }, [capacitaciones]);

    useEffect(() => {
        const mesesNombres = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const agrupadoPorMes = mesesNombres.map((nombreMes, index) => {
            const mes = index + 1;
            const capacitacionesDelMes = capacitaciones.filter(cap => cap.month === mes);
            const cantidad = capacitacionesDelMes.reduce((acc, curr) => acc + curr.Q_Capacita_Cantidad, 0);

            return {
                mes: mes,
                nombreMes: nombreMes,
                Q_Capacita_Cantidad: cantidad
            };
        });

        setCapacitacionesPorMes(agrupadoPorMes);
    }, [capacitaciones]);

    useEffect(() => {
        const mesesNombres = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const modalidadesUnicas = [...new Set(capacitaciones.map(cap => cap.C_Capacita_Modalidad))];

        const agrupadoPorModalidadYMes = mesesNombres.map((nombreMes, index) => {
            const mes = index + 1;
            const capacitacionesDelMes = capacitaciones.filter(cap => cap.month === mes);

            const datosMes = {
                mes: mes,
                nombreMes: nombreMes,
                modalidades: {},
                total: 0
            };

            modalidadesUnicas.forEach(codModalidad => {
                const capacitacionesModalidad = capacitacionesDelMes.filter(cap => cap.C_Capacita_Modalidad === codModalidad);
                const cantidad = capacitacionesModalidad.reduce((acc, curr) => acc + curr.Q_Capacita_Cantidad, 0);
                const nombreModalidad = capacitacionesModalidad.length > 0 ? capacitacionesModalidad[0].N_Capacita_Modalidad : '';

                datosMes.modalidades[codModalidad] = {
                    C_Capacita_Modalidad: codModalidad,
                    N_Capacita_Modalidad: nombreModalidad,
                    cantidad: cantidad
                };
                datosMes.total += cantidad;
            });

            return datosMes;
        });

        setCapacitacionesPorModalidadYMes(agrupadoPorModalidadYMes);
    }, [capacitaciones]);





    // Ejemplo de lo que se almacena en capacitaciones
    // [{"C_Capacitacion":3,"D_Capacita_Fecha":"2026-01-02","C_Capacita_Tema":3,"C_Capacita_Modalidad":1,"C_Capacita_Capacitador":2,"N_Capacita_Empresas":"empresa 3","N_Capacita_Lugar":"lugar 3","Q_Capacita_Cantidad":15,"T_Capacita_Observ":"observaciones 3","C_Usuari_Login":"MMEDINA ","D_Capacita_FecDig":"2026-02-21T01:10:00","N_Capacita_Tema":"Talleres de Seguridad Vial","N_Capacita_Modalidad":"Vehículos menores","N_Capacita_Capacitador":"PEDRO MENDOZA PAIMA"},{"C_Capacitacion":1,"D_Capacita_Fecha":"2026-02-17","C_Capacita_Tema":1,"C_Capacita_Modalidad":2,"C_Capacita_Capacitador":1,"N_Capacita_Empresas":"empresa","N_Capacita_Lugar":"lugar","Q_Capacita_Cantidad":30,"T_Capacita_Observ":"obervaciones","C_Usuari_Login":"mmedina ","D_Capacita_FecDig":"2026-02-17T00:00:00","N_Capacita_Tema":"Programa de Seguridad Vial","N_Capacita_Modalidad":"Servicio de taxi","N_Capacita_Capacitador":"ORLANDO SANDOVAL CHANGANAQUE"},{"C_Capacitacion":2,"D_Capacita_Fecha":"2026-02-20","C_Capacita_Tema":2,"C_Capacita_Modalidad":3,"C_Capacita_Capacitador":1,"N_Capacita_Empresas":"empresa 2","N_Capacita_Lugar":"lugar 2","Q_Capacita_Cantidad":20,"T_Capacita_Observ":"observaciones 2","C_Usuari_Login":"mmedina ","D_Capacita_FecDig":"2026-02-17T00:00:00","N_Capacita_Tema":"Protocolo de Acoso Sexual","N_Capacita_Modalidad":"Transporte urbano","N_Capacita_Capacitador":"ORLANDO SANDOVAL CHANGANAQUE"},{"C_Capacitacion":10,"D_Capacita_Fecha":"2026-02-21","C_Capacita_Tema":1,"C_Capacita_Modalidad":1,"C_Capacita_Capacitador":1,"N_Capacita_Empresas":"NINGUNA","N_Capacita_Lugar":"BIBLIOTECA MUNICIPAL","Q_Capacita_Cantidad":150,"T_Capacita_Observ":"NINGUNA","C_Usuari_Login":"MMEDINA ","D_Capacita_FecDig":"2026-02-21T23:09:00","N_Capacita_Tema":"Programa de Seguridad Vial","N_Capacita_Modalidad":"Vehículos menores","N_Capacita_Capacitador":"ORLANDO SANDOVAL CHANGANAQUE"},{"C_Capacitacion":8,"D_Capacita_Fecha":"2026-02-25","C_Capacita_Tema":1,"C_Capacita_Modalidad":3,"C_Capacita_Capacitador":2,"N_Capacita_Empresas":"AEDAEDE editado","N_Capacita_Lugar":"ADADE ditado","Q_Capacita_Cantidad":25,"T_Capacita_Observ":"SDASDASD editado","C_Usuari_Login":"MMEDINA ","D_Capacita_FecDig":"2026-02-21T11:50:00","N_Capacita_Tema":"Programa de Seguridad Vial","N_Capacita_Modalidad":"Transporte urbano","N_Capacita_Capacitador":"PEDRO MENDOZA PAIMA"}]

    return (
        <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
            <HeaderIdicators selectedType={urlTipo} />
            <div className="container-lg mx-auto py-4 flex-grow-1">
                <IndicatorTranportTrainingHeader setYear={setYear} selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} totalCapacitaciones={totalCapacitaciones} />

                <IndicatorTranportTrainingByTheme capacitacionesAgrupadasPorTema={capacitacionesAgrupadasPorTema} />

                <IndicatorTranportTrainingByModality capacitacionesAgrupadasPorModalidad={capacitacionesAgrupadasPorModalidad} />

                <div className="g-4 mt-4">
                    <IndicatorTranportTrainingByMonth monthlyData={capacitacionesPorMes} year={year} />
                </div>

                <IndicatorTransportTrainingByModalityAndMonth
                    capacitacionesPorModalidadYMes={capacitacionesPorModalidadYMes}
                    capacitaciones={capacitaciones}
                />




                {/* <CollectionOfficeCards totalRaised={totalReaised} totalProjected={totalProjected} />
  
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
            <CollectiobOfficeByRate rateSummary={rateSummary} year={year} periodo={selectedMonths.join(",")} tipo={urlTipo} />
          </div>
  
          <div className="mt-4">
            <CollecionDate D_Recaud_Inicio={collectionDate} />
          </div> */}

            </div>

            {/* {JSON.stringify(capacitaciones)} */}
            {/* {JSON.stringify(capacitacionesAgrupadasPorModalidad)} */}
            {/* {JSON.stringify(capacitacionesPorMes)} */}
            <FooterIndicators />
        </div>
    );
}
