import { useState } from "react";
import Header from "../../components/Header";
import BuscarContribuyentesComponent from "../../components/contribuyente/BuscarContribuyentesComponent";
import { ContribuyenteEditComponent } from "../../components/contribuyente/ContribuyenteEditComponent";
import { ContribuyenteAddComponent } from "../../components/contribuyente/ContribuyenteAddComponent";

export const ContribuyentesView = () => {

  const [showForm, setShowForm] = useState(1); // showForm 1 = buscar contribuyente, 2 = agregar contribuyente, 3 editar contribuyente
  const [contribEdit, setContribEdit] = useState("")
  const [codContribIni, setCodContribIni] = useState(undefined)

  return (
    <div>
      <Header />
      {showForm === 1 ? (
        <BuscarContribuyentesComponent
          showForm={showForm}
          setShowForm={setShowForm}
          setContribEdit = {setContribEdit}
          codContribIni = {codContribIni}
          
        />
      ) : (
        <div>{showForm === 3 ? <ContribuyenteEditComponent contribEdit = {contribEdit} setCodContribIni = {setCodContribIni} setShowForm = {setShowForm}/> : <ContribuyenteAddComponent contribEdit = {contribEdit} setCodContribIni = {setCodContribIni} setShowForm = {setShowForm}/>}</div>
      )}
    </div>
  );
};
