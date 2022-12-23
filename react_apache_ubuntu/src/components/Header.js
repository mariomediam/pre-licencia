import React, { useState, useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MenuHeader } from "./menues/MenuHeader";

import "react-bootstrap-submenu/dist/index.css";
import Offcanvas from "react-bootstrap/Offcanvas";

import AuthContext from "../context/AuthContext";
import imgEscudo from "../assets/images/escudo_muni.png";

export default function Header() {
  const navigate = useNavigate();

  const { userName, logoutUser, menuSecundario, setMencodi, menuPrincipal, mencodiPrincipal : menCodiSelec } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mostrarMenusSecundarios = async (e) => {
    setMencodi(e.target.id);
    handleClose();
    navigate("/inicio");
  };

  return (
    <div>
      <Navbar className="color-nav" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Text style={{ cursor: "pointer" }}>
            <i className="fas fa-grip-vertical me-2" onClick={handleShow}></i>
          </Navbar.Text>
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

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >

              {menuSecundario
                .filter((menu) => menu.menCodi.substr(4, 6) === "000000")
                .map(({ menCodi, menDesc, menProg, menTipo }, i) => (
                  <React.Fragment key={i}>
                    {menTipo === "M" ? (
                      <MenuHeader
                        menCodi={menCodi}
                        menDesc={menDesc}
                        menProg={menProg}
                        menTipo={menTipo}
                        menues={menuSecundario.filter(menu => menu.menCodi.startsWith(menCodi.substr(0, 4)))}
                        menCodiFilter={menCodi.substr(0, 4)}
                      />
                    ) : menTipo === "P" ? (
                      <Nav.Link href={menProg}>{menDesc}</Nav.Link>
                    ) : null}
                  </React.Fragment>
                ))}
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
            {menuPrincipal.map(({ menCodi, menDesc, menProg, acceso }, i) => (
              <ListGroup.Item
                action                
                variant = {menCodi === menCodiSelec ? "dark" : ""}                
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
