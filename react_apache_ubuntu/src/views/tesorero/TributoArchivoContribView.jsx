import { useState, useRef, useEffect, useCallback } from "react";
import { Breadcrumb, Form } from "react-bootstrap";
import Swal from "sweetalert2";

import { Toast } from "../../components/tools/PopMessage";
import Header from "../../components/Header";
import {
  eliminarOpeFin,
  obtenerTributoContrib,
} from "../../services/tesoreroService";
import { TributoArchivoContribComponent } from "../../components/tesorero/tributo/TributoArchivoContribComponent";
import { TributoContribSaldoInicialModalComponent } from "../../components/tesorero/tributo/TributoContribSaldoInicialModalComponent";

const anios = [];
const anioActual = new Date().getFullYear();
for (let i = anioActual; i >= 2000; i--) {
  anios.push(i);
}

export const TributoArchivoContribView = () => {


  console.log("Se renderizo TributoArchivoContribView");

  const [anioSelected, setAnioSelected] = useState(
    anios.length > 0 ? anios[0] : undefined
  );
  const [listTributoContrib, setListTributoContrib] = useState([]);
  const [listTributoContribSelected, setListTributoContribSelected] = useState(
    []
  );
  const [allSelected, setAllSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputContribuyente = useRef(null);

  const buscarTributoContrib = useCallback(async (paramAnio = undefined) => {
    console.log("********* 2 ***********")
    try {
      const valor = inputContribuyente.current.value;
      if (valor === "") return;
      const anio = paramAnio || anioSelected;
      const data = await obtenerTributoContrib({ valor, anio });
      setListTributoContrib(data);
      // setAllSelected(false);
    } catch (error) {
      console.error(error);
    }
  }, [inputContribuyente, anioSelected]);

  const onChangeInputContrib = (event) => {
    console.log("********* 3 ***********")
    if (event.key !== "Enter") return;
    buscarTributoContrib();
  };

  const eliminarOperacionFinanciera = async () => {
    console.log("********* 4 ***********")
    
    let messageWarning = `¿Seguro de eliminar las operaciones financieras?`;

    const result = await Swal.fire({
      title: messageWarning,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await eliminarOpeFin(listTributoContribSelected);

        await buscarTributoContrib();
        Toast.fire({
          icon: "success",
          title: "Operaciones financieras eliminadas correctamente",
          background: "#F4F6F6",
          timer: 1500,
        });
        // window.location.reload();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error eliminando operaciones financieras",
          text: error.message,
        });
      }
    }
  };

  

  const onClickCheckAll = (event) => {
    console.log("********* 5 ***********")
    setAllSelected(event.target.checked);
  };

  useEffect(() => {
    console.log("********* 6 ***********")
    setListTributoContribSelected([]);
  }, [listTributoContrib]);

  const onChangeSelectAnio = async (event) => {
    console.log("********* 7 ***********")
    setAnioSelected(event.target.value);    
    // await buscarTributoContrib(event.target.value);
  }

  useEffect(() => {
    console.log("********* 8 ***********")
    buscarTributoContrib();
   
  }, [anioSelected]);


  useEffect(() => {
    console.log("********* 10 ***********")
   
  }, [allSelected]);

  useEffect(() => {
    console.log("********* 11 ***********")
   
  }, [listTributoContribSelected]);




  return (
    <>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Gestión y operaciones</Breadcrumb.Item>
          <Breadcrumb.Item active>Control y Gestión Tributaria</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />

      <h3 className="mt-0 mb-3 text-center text-color-default">
        <i className="fas fa-user me-2"></i>
        Buscar contribuyente
      </h3>

      <div className="d-flex justify-content-center px-5 pt-4 mb-5">
        <div className="col-sm-12 col-lg-10 col-xl-6 p-4 border rounded">
          {/* INPUT BUSQUEDA */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese código o nombre del contribuyente"
              aria-label="Ingrese código o nombre del contribuyente"
              aria-describedby="basic-addon2"
              ref={inputContribuyente}
              onKeyPress={onChangeInputContrib}
            />
            <span className="input-group-text" id="basic-addon2">
              <i className="fas fa-search"></i>
            </span>
          </div>

          {/* SELECT AÑO */}
          <div className="mb-4">
            <h5 className="text-color-default">Año</h5>
            <select
              className="form-select mb-3"
              aria-label="Default select example"
              defaultValue={anios[0]}
              // onChange={(e) => setAnioSelected(e.target.value)}
              onChange={onChangeSelectAnio}
            >
              {anios.map((anio) => (
                <option key={anio} value={anio}>
                  {anio}
                </option>
              ))}
            </select>
          </div>

          {/* OPERACIONES FINANCIERAS */}
          <div className="mb-4">
            <h5 className="text-color-default">Operaciones financieras</h5>

            <Form.Check
              aria-label="option 1"
              label="Seleccionar todos"
              onChange={onClickCheckAll}
              checked={allSelected}
            />
            {listTributoContrib.map((tributo) => (
              <TributoArchivoContribComponent
                key={tributo.C_Contrib}
                tributo={tributo}
                setListTributoContribSelected={setListTributoContribSelected}
                allSelected={allSelected}                
              />
            ))}
          </div>
          {/* <span>{JSON.stringify(listTributoContribSelected)}</span> */}
          <span>{JSON.stringify(listTributoContrib)}</span>
        </div>

        {/* BOTON AGREGAR */}
        {listTributoContribSelected.length === 0 && (
          <div
            style={{ position: "relative" }}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <div style={{ position: "absolute", right: "0px", width: "70px" }}>
              <div style={{ position: "fixed", bottom: "25px" }}>
                <button
                  className="btn btn-primary rounded-circle"
                  style={{ width: "70px", height: "70px" }}
                  title="Agregar operación financiera"
                  onClick={handleShow}                  
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTON EDITAR */}
        {listTributoContribSelected.length === 1 && (
          <div
            style={{ position: "relative" }}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <div style={{ position: "absolute", right: "0px", width: "70px" }}>
              <div style={{ position: "fixed", bottom: "25px" }}>
                <button
                  className="btn btn-primary rounded-circle"
                  style={{ width: "70px", height: "70px" }}
                  title="Editar operación financiera"
                  onClick={handleShow}                  
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTON ELIMINAR */}
        {listTributoContribSelected.length > 0 && (
          <div
            style={{ position: "relative" }}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <div
              style={{
                position: "absolute",
                right: listTributoContribSelected.length > 1 ? "0px" : "75px",
                width: "70px",
              }}
            >
              <div style={{ position: "fixed", bottom: "25px" }}>
                <button
                  className="btn btn-danger rounded-circle"
                  style={{ width: "70px", height: "70px" }}
                  title="Eliminar operación financiera"
                  onClick={eliminarOperacionFinanciera}                  
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <TributoContribSaldoInicialModalComponent
        show={show}
        handleClose={handleClose}
        listTributoContribSelected={listTributoContribSelected}
        anioSelected={anioSelected}
        inputContribuyente={inputContribuyente}
        buscarTributoContrib={buscarTributoContrib}
      />
    </>
  );
};
