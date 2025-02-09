import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Spinner, Form, InputGroup } from "react-bootstrap";

import FileSearchIcon from "../../../../../icons/FileSearchIcon";
import { buscarCartaOrden } from "../../../../../services/siafService";
import { TrustFormatModalItemComponent } from "./TrustFormatModalItemComponent";

export const TrustFormatModalComponent = ({
  show,
  handleClose,
  addCartasSelected,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartasSearched, setCartasSearched] = useState([]);
  const [inputText, setInputText] = useState("");

  const inputSearch = useRef(null);

  useEffect(() => {
    if (!show) {
      setCartasSearched([]);      
      setInputText(new Date().getFullYear().toString());
    } else
    {
      setTimeout(() => {
        if (inputSearch.current) inputSearch.current.focus();
      }, 100);
    }
  }, [show]);

  const searchCarta = async () => {
    try {
      if (inputText.length === 0) {
        return;
      }

      setIsLoading(true);
      const numero = inputText;
      const codigo = "118";
      const cartas = await buscarCartaOrden({ codigo, numero });
      cartas.forEach((carta) => {
        carta.isSelected = false;
        carta.key = `${carta.ANO_EJE}-${carta.EXPEDIENTE}-${carta.CICLO}-${carta.FASE}-${carta.SECUENCIA}-${carta.CORRELATIVO}`;
      });

      setCartasSearched(cartas);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error buscando carta orden",
        text: JSON.stringify(error?.response?.data?.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectCarta = (key) => {
    const cartas = cartasSearched.map((carta) => {
      if (carta.key === key) {
        carta.isSelected = !carta.isSelected;
      }
      return carta;
    });

    setCartasSearched(cartas);
  };

  const existeCartaSeleccionada = () => {
    return cartasSearched.some((carta) => carta.isSelected);
  };

  const addCartas = () => {
    const cartasToAdd = cartasSearched.filter((carta) => carta.isSelected);
    addCartasSelected(cartasToAdd);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FileSearchIcon className="me-2" />
            Buscar carta orden
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="inputCarta">
            <Form.Label className="text-muted">
              <small>Número de carta orden</small>
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                aria-describedby="inputCarta"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                ref = {inputSearch}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    searchCarta();
                  }
                }}
                

                placeholder="20250015"
              />
              <Button
                variant="primary"
                disabled={isLoading || inputText.trim().length === 0}
                onClick={searchCarta}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      animation="border"
                      role="status"
                      size="sm"
                      className="me-2"
                    />
                    Buscando
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
            </InputGroup>
          </Form.Group>

          <div>
            {cartasSearched.map((item, index) => (
              <TrustFormatModalItemComponent
                key={index}
                cartaOrden={item}
                selectCarta={selectCarta}
                addCartas={addCartas}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={addCartas}
            disabled={isLoading || !existeCartaSeleccionada()}
          >
            
              Agregar
            
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
