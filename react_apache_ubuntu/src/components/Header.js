import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Breadcrumb,
} from "react-bootstrap";
import { useContext } from "react";
import imgEscudo from "../assets/images/escudo_muni.png";

import AuthContext from "../context/AuthContext";

export default function Header() {
    const { userName, logoutUser } = useContext(AuthContext);
    
  return (
    <div>
      <Navbar className="color-nav" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src={imgEscudo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            &nbsp;SIGE
          </Navbar.Brand>

          {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/pre_licencia">Pre licencia</Nav.Link>
              {/* <Nav.Link href="#action2">Link</Nav.Link>

              <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
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
            </Nav>

            <Nav className="justify-content-end">
              <Navbar.Text>
               { userName }
              </Navbar.Text>
              <NavDropdown
                className="justify-content-end"
                title="Gestionar tu cuenta"
                id="basic-nav-dropdown"
                drop="start"
              >
                <NavDropdown.Item onClick={logoutUser} href="/">
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
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>SIGE / Pre licencia</Breadcrumb.Item>
        </Breadcrumb>
      </div>      
    </div>
  );
}

