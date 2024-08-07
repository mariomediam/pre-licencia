import { Table } from "react-bootstrap";
import { formatNumber } from "../../../utils/varios";

export const TributoArchivoReporteComponent = ({ dataReport }) => {
  let columnNames = dataReport.length > 0 ? Object.keys(dataReport[0]) : [];

  
  if (dataReport.length === 0) {
    return <></>;
  }

  return (
    <div>
      <Table
        hover
        responsive
        className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
      >
        <thead>
        <tr className="color-header2 text-white">
            
              <th className="">
                Descripcion
              </th>
                <th className="text-end">
                    Valor
                </th>            
          </tr>  
            </thead>
            <tbody>
            

            {columnNames.map((columna) => (
                <tr key={columna}>
                    <td key={`${columna}_name`} className="align-middle  text-uppercase">
                    {columna.replace(/_/g, " ").replace(/-/g, " ")}

                    </td>
                    <td key={`${columna}_value`} className="align-middle text-end">
                        {/* si  dataReport[0][columna] es numerico aplicar formatNumber*/}
                        {isNaN(dataReport[0][columna]) ? dataReport[0][columna] : formatNumber(dataReport[0][columna])}

                        
                    </td>
                </tr>    
            
            ))}
            </tbody>

        {/* <thead>
          <tr className="color-header2 text-white">
            {columnNames.map((columna) => (
              <th key={columna} className="vertical-text text-uppercase">
                {columna.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataReport.map((item, index) => (
            <tr key={index}>
              {columnNames.map((columna) => (
                <td key={columna} className="align-middle">
                  {item[columna]}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}
      </Table>
    </div>
  );
};
