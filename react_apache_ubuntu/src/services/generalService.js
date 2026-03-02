import UseAxios from "../utils/useAxios";
import axios from "axios";

const URL = `${process.env.REACT_APP_API}`;

const obtenerJefeDepen = async (anio, coddep) => {
    try {
      let api = UseAxios();
      
  
      let URLJefeDepen = `${URL}/jefe-depen?anio=${anio}&coddep=${coddep}`;
  
      let {
        data: { content },
      } = await api.get(`${URLJefeDepen}`);

      return content;
    } catch (error) {
      throw error;
    }
  };



//   curl --location --request POST 'http://127.0.0.1:8000/api/export-json-to-excel-multiple/' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcyNTExNTY0LCJpYXQiOjE3NzI0NjgzNjQsImp0aSI6IjcxZWVkOGQ2MjI3ZTRlMTZiMTg2OTJhNzYzNjdmMmYxIiwidXNlcl9pZCI6Ik1NRURJTkEgICAgICAgICAgICAgIn0.Qm-C7rLk2mu8wMrX1BqeLWztPKt5Tya0JMk_tW22YFE' \
// --data '  {
//             "sheets": [
//                 {
//                     "sheet_name": "Usuarios",
//                     "data": [{"nombre": "Juan", "edad": 30}]
//                 },
//                 {
//                     "sheet_name": "Productos",
//                     "data": [{"producto": "Laptop", "precio": 1200}]
//                 }
//             ],
//             "filename": "reporte_completo.xlsx"
//         }'


const exportarJsonToExcelMultiple = async (params) => {

  // Body esperado:
  // {
  //     "sheets": [
  //         {
  //             "sheet_name": "Hoja1",
  //             "data": [...],
  //             "headers": ["Col1", "Col2"]  // Opcional
  //         },
  //         {
  //             "sheet_name": "Hoja2",
  //             "data": [...]
  //         }
  //     ],
  //     "filename": "archivo.xlsx"  // Opcional
  // }

  const { sheets, filename } = params;


  const body = {
    sheets,
  }

  if (filename) {
    body.filename = filename;
  }

  try {
    const response = await axios.post(`${URL}/export-json-to-excel-multiple/`, body, { responseType: 'blob' });
    const file = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    
    
    
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return file;
  } catch (error) {
    throw error;
  }
}


export { obtenerJefeDepen, exportarJsonToExcelMultiple };