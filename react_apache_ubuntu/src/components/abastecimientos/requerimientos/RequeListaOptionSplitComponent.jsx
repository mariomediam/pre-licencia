export const RequeListaOptionSplitComponent = ({
  C_anipre,
  C_reque,
  C_biesertipo,
  F_reque_estado,
  Q_REQUE_TOTAL
}) => {

  const currentYear = new Date().getFullYear().toString();

  return (
    <div className="dropdown">
      <button
        className="btn"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <svg
          width="12"
          height="14"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </button>
      <ul className="dropdown-menu  ">
        {F_reque_estado === "1" && Q_REQUE_TOTAL > 0 && C_anipre === currentYear && (
          <li>
            <a className="d-flex align-items-center dropdown-item" href=".">
              <img
                src="/images/file-dollar.svg"
                className="me-1 thumbnail"                
                alt="Precomprometer requerimiento"
              />
              Precomprometer
            </a>
          </li>
        )}

        {F_reque_estado === "2" && (
          <li>
            <a className="d-flex align-items-center dropdown-item" href="http://www.munipiura.gob.pe">
              <img
                src="/images/printer.svg"
                className="me-1 thumbnail"                
                alt="Imprimir requerimiento"
              />
              Imprimir
            </a>
          </li>
        )}

        <li>
          <a className="d-flex align-items-center dropdown-item" href=".">
            <img
              src="/images/eye.svg"
              className="me-1 thumbnail"              
              alt="Ver requerimiento"
            />
            Ver
          </a>
        </li>

        {F_reque_estado === "1" && C_anipre === currentYear && (
          <>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="text-primary">
              <a
                className="d-flex align-items-center text-primary dropdown-item"
                href="."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-pencil me-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                  <path d="M13.5 6.5l4 4" />
                </svg>
                Modificar
              </a>
            </li>
          </>
        )}

        {F_reque_estado === "1" && C_anipre === currentYear && (
          <>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="text-danger">
              <a
                className="d-flex align-items-center text-danger dropdown-item"
                href="."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-square-x me-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                  <path d="M9 9l6 6m0 -6l-6 6" />
                </svg>
                Anular
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
