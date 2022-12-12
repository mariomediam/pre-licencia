import { useState } from "react";
import Header from "../../components/Header";
import BuscarContribuyentesComponent from "../../components/contribuyente/BuscarContribuyentesComponent";
import { ContribuyenteEditComponent } from "../../components/contribuyente/ContribuyenteEditComponent";

export const ContribuyentesView = () => {
  const [showForm, setShowForm] = useState(1); // showForm 1 = buscar contribuyente, 2 = agregar contribuyente, 3 editar contribuyente
  const [contribEdit, setContribEdit] = useState("")

  return (
    <div>
      <Header />
      {showForm === 1 ? (
        <BuscarContribuyentesComponent
          showForm={showForm}
          setShowForm={setShowForm}
          setContribEdit = {setContribEdit}
        />
      ) : (
        <div>{showForm === 3 ? <ContribuyenteEditComponent contribEdit = {contribEdit} /> : <div></div>}</div>
      )}
    </div>
  );
};
