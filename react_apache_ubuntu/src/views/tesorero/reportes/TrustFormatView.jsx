import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import FilesIcon from "../../../icons/FilesIcon";
import { TrustFormatModalComponent } from "../../../components/tesorero/reports/filters/TrustFormat/TrustFormatModalComponent";
import { TrustFormatItemComponent } from "../../../components/tesorero/reports/filters/TrustFormat/TrustFormatItemComponent";
import PlusIcon from "../../../icons/PlusIcon";
import DownloadIcon from "../../../icons/DownloadIcon";

export const TrustFormatView = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cartasSelected, setCartasSelected] = useState([]);

  const addCartasSelected = (cartas) => {
    const cartasSelectedKeys = cartasSelected.map((carta) => carta.key);
    const cartasToAdd = cartas.filter(
      (carta) => !cartasSelectedKeys.includes(carta.key)
    );
    setCartasSelected([...cartasSelected, ...cartasToAdd]);
  };

  const removeCartaSelected = (key) => {    
    const cartas = cartasSelected.filter((carta) => carta.key !== key);
    setCartasSelected(cartas);
  };

  return (
    <>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Reportes</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />
      <div className="d-flex justify-content-center align-items-center">
        <FilesIcon className="me-1 thumbnail text-color-default mb-1" />
        <h3 className="text-color-default">Formato para fideicomiso</h3>
      </div>
      <div className="d-flex justify-content-center pt-3 pb-3">
        <div style={{ maxWidth: "576px" }}>
          <div className="p-2">
            {cartasSelected.map((item, index) => (
              <TrustFormatItemComponent
                key={item.key}
                cartaOrden={item}
                removeCartaSelected={removeCartaSelected}
              />
            ))}
            <div className="d-grid ">
              <button
                className="btn btn-primary"
                title="Descargar documento"
                // onClick={handleShow}
                hidden={cartasSelected.length === 0}
              >
                Descargar Documento <DownloadIcon className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: "300px", width: "70px" }}>
          <div style={{ position: "fixed", bottom: "45px" }}>
            <button
              className="btn btn-primary rounded-circle"
              style={{ width: "70px", height: "70px" }}
              title="Agregar carta orden"
              onClick={handleShow}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div> */}

      <div className="agregar-btn">
        <button
          className="btn btn-primary rounded-circle"
          style={{ width: "70px", height: "70px" }}
          title="Agregar carta orden"
          onClick={handleShow}
        >
          <PlusIcon />
        </button>
      </div>

      <TrustFormatModalComponent
        show={show}
        handleClose={handleClose}
        addCartasSelected={addCartasSelected}
      />
    </>
  );
};
