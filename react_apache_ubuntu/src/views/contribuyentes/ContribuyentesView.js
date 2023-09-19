import { useState } from "react";
import Header from "../../components/Header";
import BuscarContribuyentesComponent from "../../components/contribuyente/BuscarContribuyentesComponent";
import { ContribuyenteEditComponent } from "../../components/contribuyente/ContribuyenteEditComponent";
import { ContribuyenteAddComponent } from "../../components/contribuyente/ContribuyenteAddComponent";
import { ContribAddDocComponent } from "../../components/contribuyente/ContribAddDocComponent";

export const ContribuyentesView = () => {
  const [showForm, setShowForm] = useState(1); // showForm 1 = buscar contribuyente, 2 = agregar contribuyente, 3 editar contribuyente, 4 agregar documento
  const [contribEdit, setContribEdit] = useState("");
  const [codContribIni, setCodContribIni] = useState(undefined);

  return (
    <div>
      <Header />
      {showForm === 1 ? (
        <BuscarContribuyentesComponent
          showForm={showForm}
          setShowForm={setShowForm}
          setContribEdit={setContribEdit}
          codContribIni={codContribIni}          
        />
      ) : (
        <div>
          {showForm === 3 ? (
            <ContribuyenteEditComponent
              contribEdit={contribEdit}
              setCodContribIni={setCodContribIni}
              setShowForm={setShowForm}
            />
          ) : (
            <div>
              {showForm === 2 ? (
                <ContribuyenteAddComponent
                  contribEdit={contribEdit}
                  setCodContribIni={setCodContribIni}
                  setShowForm={setShowForm}
                />
              ) : (
                <ContribAddDocComponent
                  contribEdit={contribEdit}
                  setCodContribIni={setCodContribIni}
                  setShowForm={setShowForm}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
