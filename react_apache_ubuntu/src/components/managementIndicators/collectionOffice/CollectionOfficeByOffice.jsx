import { useEffect, useState } from 'react';
import { formatMoney } from '../../../utils/varios';
import { BuscarRecaudacionActasControlSatp } from '../../../services/indicatorsService';

export const CollectionOfficeByOffice  = ({ collectionByOffice = [], isGerenciaTransportes = false , year = 0 }) => {

    const [collectionAndInspection , setCollectionAndInspection] = useState(collectionByOffice);
    const [isLoadingRecaudado, setIsLoadingRecaudado] = useState(false);
    const [totalMonto, settotalMonto] = useState(0)

    useEffect(() => {
        const getRecaudado = async () => {
            try {
              setIsLoadingRecaudado(true);
              const recaudado = await BuscarRecaudacionActasControlSatp({ anio: year });

              const totalMontoRecaudado = recaudado.reduce((acc, curr) => acc + curr.Monto, 0);

              const rowInspection = {
                N_depend_Descripcion: "SUBGERENCIA DE FISCALIZACIÓN DE TRANSPORTE Y TRÁNSITO (ACTAS DE CONTROL)",
                Q_RecDet_Monto: totalMontoRecaudado
              }

              
              setCollectionAndInspection([...collectionByOffice, rowInspection]);
              
              
            } catch (error) {
              console.error(error);
            } finally {
              setIsLoadingRecaudado(false);
            }
      
      
          }
          getRecaudado();
    }, [year, collectionByOffice]);

    useEffect(() => {
        settotalMonto(collectionAndInspection.reduce((acc, curr) => acc + curr.Q_RecDet_Monto, 0));
    }, [collectionAndInspection]);

  return (
    <div className="bg-white rounded-4 shadow-sm p-4">
      <h6 className="fw-bold mb-4">Detalle de recaudación por Subgerencia</h6>


      {isLoadingRecaudado ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
      <div className="table-responsive">
        <table className="table table-borderless align-middle mb-0">
          <thead>
            <tr className="text-muted small">
              <th className="fw-semibold">Subgerencia</th>
              <th className="fw-semibold text-end">Monto</th>              
            </tr>
          </thead>
          <tbody>
            {collectionAndInspection.map(({ N_depend_Descripcion, Q_RecDet_Monto }) => (
              <tr key={N_depend_Descripcion} className="border-bottom">
                <td className="py-3">{N_depend_Descripcion}</td>
                <td className="py-3 text-end">{formatMoney(Q_RecDet_Monto)}</td>
              </tr>
            ))}
            <tr>
              <td className="fw-bold">TOTAL RECAUDADO</td>
              <td className="fw-bold text-end">{formatMoney(totalMonto)}</td>
            </tr>
          </tbody>
        </table>
        <div className="alert alert-info" role="alert">
        El presente visor muestra la recaudación por tasas; sin embargo, en la sección “Detalle de recaudación por Subgerencia” se ha incorporado también el monto recaudado por actas de control de la Subgerencia de Fiscalización de Transporte y Tránsito, a fin de presentar un resumen consolidado de ingresos por subgerencia.
</div>
      </div>
      )}
    </div>

  );
}