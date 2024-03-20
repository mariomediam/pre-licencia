import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { Toast } from "../../tools/PopMessage";
import Swal from "sweetalert2";

import {
  getTotalRequerimiento,
  getClasifToPresupuesto,  
} from "../../../store/slices";
import { RequeComprometeItemComponent } from "./RequeComprometeItemComponent";
import { RequeComprometeItemFuenteComponent } from "./RequeComprometeItemFuenteComponent";
import {
  obtenerRequeSaldoPresupItem, precomprometerRequerimiento,
} from "../../../services/abastecService";

export const RequeComprometeComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const {
    T_reque_obs,
    C_reque,
    C_anipre,
    C_biesertipo,
    C_sf_dep,
    c_traba_dni,
    f_libre,
  } = currentReque;

  const [requeGasto, setRequeGasto] = useState([]);

  const [showAddFuente, setShowAddFuente] = useState(false);
  const [saldoPresupItem, setSaldoPresupItem] = useState([]);
  const [selectItem, setSelectItem] = useState({});

  const [isLoadingPrecompromete, setIsLoadingPrecompromete] = useState(false)

  const handleCloseAddFuente = () => setShowAddFuente(false);
  const handleShowAddFuente = () => setShowAddFuente(true);

  const onClicSelectFuente = async (item) => {
    setSelectItem(item);
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
      const saldos = await obtenerRequeSaldoPresupItem(selectItem);
      console.log(saldos);
      await setSaldoPresupItem(saldos.filter((item) => item.q_saldo >= 0));
    };

    obtenerItemFuente();
  }, [selectItem]);

  useEffect(() => {
    const getRequeGasto = async () => {
      const clasifTotal = await dispatch(getClasifToPresupuesto());
      setRequeGasto(clasifTotal);
    };

    getRequeGasto();
  }, [dispatch]);

  const validatePrecomprometer = () => {
    let subTotalPreCompro = 0;
    let totalPreCompro = 0;

    requeGasto.forEach((item) => {
      subTotalPreCompro = 0;
      item.presupuesto.forEach((presup) => {
        subTotalPreCompro += parseFloat(presup.total_precompromiso);
      });

      totalPreCompro += subTotalPreCompro;

      if (subTotalPreCompro !== item.total_reque) {
        return false;
      }
    });

    if (totalPreCompro <= 0) {
      return false;
    }

    return true;
  };

  const onClicPrecomprometer = async (e) => {
    e.preventDefault();

    try {
      if (validatePrecomprometer()) {

        setIsLoadingPrecompromete(true)

        let gastos = requeGasto.map((item) => {
          const presupuesto = item.presupuesto.map((presup) => {
            return {
              C_depen: item.C_depen,
              C_secfun: item.C_secfun,
              C_clapre: item.C_clapre,
              C_objpoi: item.C_objpoi,
              C_metapoi: item.C_metapoi,
              C_activpoi: item.C_activpoi,
              C_fuefin: presup.C_fuefin,
              C_recurso: presup.C_recurso,
              total_precompromiso: Number(
                parseFloat(presup.total_precompromiso).toFixed(2)
              ),
            };
          });

          return presupuesto;
        });

        gastos = gastos.flat();

        const dataPrecomprometer = {
          C_sf_dep,
          c_traba_dni,
          f_libre,
          gastos: gastos,
        };

        // console.log(dataPrecomprometer);
        console.log("01")

        await precomprometerRequerimiento(
          C_anipre,
          C_reque,
          C_biesertipo,
          dataPrecomprometer
        );

        console.log("04")


        // await dispatch(savePrecompromiso(C_anipre, C_reque, C_biesertipo, dataPrecomprometer));

        // console.log("10")

        Toast.fire({
          icon: "success",
          title: `Requerimiento ${C_reque} precomprometdio correctamente`,
          background: "#F4F6F6",
          timer: 1500,
        });
        setTimeout(() => {
          navigate(
            `/abastecimientos/requerimientos?anio=${C_anipre}&depend=${C_sf_dep}`
          );
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error grabando requerimiento",
        text: JSON.stringify(error?.response?.data?.message),
      });

      setIsLoadingPrecompromete(false)
    }
  };

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
                <th scope="row" className="text-center align-middle m-0 p-0">
                  Clasificador
                </th>
                <th className="align-middle m-0 p-0">Secfun</th>
                <th className="align-middle m-0 p-0">Dependencia</th>
                <th className="align-middle m-0 p-0">Tarea</th>
                <th className="text-end align-middle m-0 p-0">Requerimiento</th>
                <th className="text-center align-middle m-0 p-0" colSpan="2">
                  FF/TR asignado
                </th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {requeGasto.map((reque, i) => (
                <RequeComprometeItemComponent
                  key={i}
                  requeGasto={reque}
                  i={i}
                  onClicSelectFuente={onClicSelectFuente}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </small>

      {selectItem && (
        <RequeComprometeItemFuenteComponent
          show={showAddFuente}
          handleClose={handleCloseAddFuente}
          selectItem={selectItem}
          saldoPresupItem={saldoPresupItem}
          setSaldoPresupItem={setSaldoPresupItem}
          requeGasto={requeGasto}
          setRequeGasto={setRequeGasto}
        />
      )}

      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="primary"
          // size="sm"
          className="d-flex align-items-center"
          disabled={!validatePrecomprometer() || isLoadingPrecompromete}
          onClick={onClicPrecomprometer}
        >
          {" "}
          {/* <FileDollarIcon className="me-1 thumbnail" /> */}
          <p className="m-0 p-0">{ isLoadingPrecompromete ? "Precomprometiendo..." : "Precomprometer"}</p>
        </Button>
      </div>
    </div>
  );
};
