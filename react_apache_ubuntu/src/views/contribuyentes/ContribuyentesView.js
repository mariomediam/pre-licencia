import { useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import BuscarContribuyentesComponent from "../../components/contribuyente/BuscarContribuyentesComponent";
import { ContribuyenteEditComponent } from "../../components/contribuyente/ContribuyenteEditComponent";

export const ContribuyentesView = () => {
  const [showForm, setShowForm] = useState(1); // showForm 1 = buscar contribuyente, 2 = agregar contribuyente, 3 editar contribuyente

  return (
    <div>
      <Header />
      {showForm === 1 ? (
        <BuscarContribuyentesComponent
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ) : (
        <div>{showForm === 3 ? <ContribuyenteEditComponent /> : <div></div>}</div>
      )}
      ContribuyentesView
      <Button
        variant="light"
        size="sm"
        className="mt-0"
        onClick={() => setShowForm(showForm === 1 ? 3 : 1)}
      >
        <i className="far fa-save me-2"></i>Editar
      </Button>{" "}
    </div>
  );
};
