import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

import SideBarIcon from "../../icons/SideBarIcon";
import BusIcon from "../../icons/BusIcon";
import LockIcon from "../../icons/LockIcon";
import WreckingBallIcon from "../../icons/WreckingBallIcon";

export const HeaderIdicators = ({ anios = [], setAnioSelected, selectedType }) => {
  const navigate = useNavigate();
  const { selectedYear } = useSelector((state) => state.indicators);
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeSelectYear = (e) => {
    setAnioSelected(parseInt(e.target.value));
    navigate(`/indicadores/${selectedType}/${e.target.value}`);
  };

  const onClickMenu = (e) => {    
    navigate(`/indicadores/${e.target.id}`);
    handleClose();

  }

  
  const menuPrincipal = useMemo(() => ( [
    {
      tipo: "01",
      menDesc: "Transportes",
      icon: <BusIcon className="me-2"/>,
    },
    {
      tipo: "02",
      menDesc: "Seguridad ciudadana",
      icon: <LockIcon className="me-2"/>,
    },
    {
      tipo: "03",
      menDesc: "Desarrollo territorial",
      icon: <WreckingBallIcon className="me-2"/>,
    },
  ]),[]);

  return (
    <>
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="" role="button" onClick={handleShow}>
            <SideBarIcon className="me-1" onClick={handleShow} />
          </div>
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p
              className="p-0"
              style={{ marginTop: "-5px", marginBottom: "0px" }}
            >
              {
                menuPrincipal.find((item) => item.tipo === selectedType)
                  ?.menDesc
              }
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 ">
          <span className="m-0 p-0">Año: </span>
          <select
            className="form-select "
            aria-label="Año a consultar"
            onChange={onChangeSelectYear}
            value={selectedYear}
          >
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>
      </header>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Aplicaciones</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {menuPrincipal.map(({ tipo, menDesc, icon }, i) => (
              <ListGroup.Item
                action
                variant={tipo === selectedType ? "dark" : ""}
                key={tipo}
                id={tipo}                
                onClick={onClickMenu}
                className="d-flex align-items-center"
              >                
                {icon}
                {menDesc}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
