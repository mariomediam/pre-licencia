import { useState, useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  ListGroup,
} from "react-bootstrap";
// import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";

import Offcanvas from "react-bootstrap/Offcanvas";

import imgEscudo from "../assets/images/escudo_muni.png";
import AuthContext from "../context/AuthContext";
// import { obtenerMenues } from "../services/usuarioService";

export default function Header() {
  const { userName, logoutUser, setMencodi, menuPrincipal } = useContext(AuthContext);
  // const { userName, logoutUser, menuSecundario, setMencodi, menuPrincipal } = useContext(AuthContext);
  // const [menuPrincipal, setMenuPrincipal] = useState([]);
  // const [menuSecundario, setMenuSecundario] = useState([]);
  // const [mencodi, setMencodi] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const verMenusPrincipal = async () => {
  //   alert("verMenusPrincipal")
  //   if (userName) {
  //     const menuesTmp = await obtenerMenues(userName, "36", "02");
  //     setMenuPrincipal(menuesTmp);
      
  //     if (menuesTmp.length > 0){        
  //       setMencodi(menuesTmp[0].menCodi);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   verMenusPrincipal();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userName]);



  const mostrarMenusSecundarios = async (e) => {
    setMencodi(e.target.id);
    handleClose();
  };

  return (
    <div>
      <Navbar className="color-nav" variant="dark" expand="lg">
        <Container fluid>
          {/* <Navbar.Text style={{ cursor: "pointer" }}>
            <i className="fas fa-grip-vertical me-2" onClick={handleShow}></i>
          </Navbar.Text> */}
          <Navbar.Brand href="#home">
            <img
              src={imgEscudo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            &nbsp;MPP
          </Navbar.Brand>

          {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/pre_licencia"> Pre licencia</Nav.Link>
              <Nav.Link href="/contribuyente/ver_contribuyente"> Contribuyente</Nav.Link>

              {/* <NavDropdown title="Reportes" id="basic-nav-dropdown">
                {menuSecundario.map(({ menCodi, menDesc, menProg }, i) => (
                  <NavDropdown.Item key={menCodi} id={menCodi} href={menProg}>
                    {menDesc}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <NavDropdown title="Reportes" id="basic-nav-dropdown">
                <NavDropdown.Item href="/buscar_trabajador">
                  Buscar trabajador
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Reporte 1
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Reporte 3
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Reporte 4
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdownMenu
              title="Dropdown R"
              id="collasible-nav-dropdown"            
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <DropdownSubmenu href="#action/3.7" title="Text to show">
                <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </NavDropdownMenu> */}
            </Nav>


            <Nav className="justify-content-end">
              <Navbar.Text>{userName}</Navbar.Text>
              <NavDropdown
                className="justify-content-end"
                title="Gestionar tu cuenta"
                id="basic-nav-dropdown"
                drop="start"
              >
                <NavDropdown.Item onClick={logoutUser} href="/login">
                  Cerrar sesión
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Aplicaciones</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {menuPrincipal.map(({ menCodi, menDesc, menProg }, i) => (
              <ListGroup.Item
                action
                key={menCodi}
                id={menCodi}
                onClick={mostrarMenusSecundarios}
              >
                <i
                  className={
                    menProg.length > 0 ? menProg : "fas fa-bookmark me-3"
                  }
                ></i>{" "}
                {menDesc}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
