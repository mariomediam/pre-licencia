import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import {
  getTotalRequerimiento,
  getClasifToPresupuesto,
} from "../../../store/slices";
import { RequeComprometeItemComponent } from "./RequeComprometeItemComponent";
import { RequeComprometeItemFuenteComponent } from "./RequeComprometeItemFuenteComponent";
import { obtenerRequeSaldoPresupItem } from "../../../services/abastecService";

export const RequeComprometeComponent = () => {
  const dispatch = useDispatch();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { T_reque_obs } = currentReque;

  const [requeGasto, setRequeGasto] = useState([]);
  
  const [showAddFuente, setShowAddFuente] = useState(false);
  const [saldoPresupItem, setSaldoPresupItem] = useState([])
  const [selectItem, setSelectItem] = useState({})

  const handleCloseAddFuente = () => setShowAddFuente(false);
  const handleShowAddFuente = () => setShowAddFuente(true);

  const onClicSelectFuente = async ( item ) => {
    setSelectItem(item)
    // const saldos = await obtenerRequeSaldoPresupItem(item)    
    // await setSaldoPresupItem(saldos)

    handleShowAddFuente();
  };




  const getTotal = () => {
    // Obtener la suma de los subtotales de los items
    const total = dispatch(getTotalRequerimiento());

    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const obtenerItemFuente = async () => {
      const saldos = await obtenerRequeSaldoPresupItem(selectItem)    
      await setSaldoPresupItem(saldos)
    }
    
    obtenerItemFuente()
  
    
  }, [selectItem])
  

  useEffect(() => {
    const getRequeGasto = async () => {
      const clasifTotal = await dispatch(getClasifToPresupuesto());
      setRequeGasto(clasifTotal);
    };

    getRequeGasto();
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between">
      <div className="d-flex flex-column justify-content-end">
  <h6 className="text-muted mb-0 pb-0">Observaciones</h6>
</div>
      <div className="d-flex justify-content-end align-items-end mt-0 pt-0">
        <small className="text-muted pe-2">Total: </small>{" "}
        <h4 className="pt-0 mb-0 pb-0"> S/. {getTotal()}</h4>
      </div>

      </div>
      
      
      <p className="mt-0 pt-0">{T_reque_obs}</p>

      <h6 className="text-muted mb-1">Seleccionar fuente de financiamiento</h6>
      <small>
      <div className="table-responsive">

        <Table
          hover
          responsive
          size="sm"
          className="caption-top mb-1 animate__animated animate__fadeIn animate__faster table accordion"
          
        >
          <thead>
            <tr className="color-header1 text-white">
              <th scope="row" className="text-center align-middle m-0 p-0">Clasificador</th>
              <th className="align-middle m-0 p-0">Secfun</th>
              <th className="align-middle m-0 p-0">Dependencia</th>
              <th className="align-middle m-0 p-0">Tarea</th>              
              <th className="text-end align-middle m-0 p-0">
                Requerimiento
              </th>
              <th className="text-center align-middle m-0 p-0" colSpan="2">
                FF/TR asignado
              </th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {requeGasto.map((reque, i) => (              
                <RequeComprometeItemComponent key={i} requeGasto={reque} i={i} onClicSelectFuente = {onClicSelectFuente}/>              
            ))}
          </tbody>
        </Table>
        </div>
      </small>

      { selectItem && (
        <RequeComprometeItemFuenteComponent
        show={showAddFuente}
        handleClose={handleCloseAddFuente}
        selectItem={selectItem}
        saldoPresupItem = {saldoPresupItem}       
        setSaldoPresupItem = {setSaldoPresupItem} 
      />
      )}
      
    </div>
  );
};
