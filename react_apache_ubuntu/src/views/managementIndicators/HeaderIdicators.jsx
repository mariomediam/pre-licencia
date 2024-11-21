import SideBarIcon from "../../icons/SideBarIcon";


export const HeaderIdicators = ({anios = [], setAnioSelected}) => {

    const onChangeSelectYear = (e) => {
        setAnioSelected( parseInt(e.target.value) );
    }


  return (
    <>
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="">
            <SideBarIcon className="me-1" />
          </div>
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p className="p-0" style={{ marginTop: "-5px", marginBottom: "0px" }}>
              Transportes
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 ">
          <span className="m-0 p-0">Año: </span>
          <select className="form-select " aria-label="Año a consultar" onChange={onChangeSelectYear}>
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>
      </header>
    </>
  );
};
