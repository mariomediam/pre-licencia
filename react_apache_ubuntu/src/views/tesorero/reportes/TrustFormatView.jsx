import { useState } from "react";
import { Breadcrumb, Spinner } from "react-bootstrap";

import Header from "../../../components/Header";
import FilesIcon from "../../../icons/FilesIcon";
import { TrustFormatModalComponent } from "../../../components/tesorero/reports/filters/TrustFormat/TrustFormatModalComponent";
import { TrustFormatItemComponent } from "../../../components/tesorero/reports/filters/TrustFormat/TrustFormatItemComponent";
import { downloadCartaOrdenFideicomiso } from "../../../services/siafService";
import PlusIcon from "../../../icons/PlusIcon";
import DownloadIcon from "../../../icons/DownloadIcon";
import { AlertStartSearch } from "../../../components/tools/AlertStartSearch";

export const TrustFormatView = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);

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

  const downloadDocumento = async () => {
    try {
      setIsLoading(true);
      const file = await downloadCartaOrdenFideicomiso({
        cartas: cartasSelected,
      });
      const url = window.URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CartaOrdenFideicomiso.xlsx";
      a.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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

          {cartasSelected.length === 0 && (
            <div className="d-flex justify-content-center">
              <div className="col-sm-6 col-md-9 ">
              <AlertStartSearch parametros={{ message: "Por favor, agregue una o más cartas orden." }}/>
              </div>
            </div>
          )}

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
                onClick={downloadDocumento}
                hidden={cartasSelected.length === 0}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      animation="border"
                      role="status"
                      size="sm"
                      className="me-2"
                    />
                    Generando documento
                  </>
                ) : (
                  <>
                    Descargar Documento <DownloadIcon className="ms-2" />
                  </>
                )}
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
