import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../assets/css/AnnotationLayer.css";
import "../assets/css/TextLayer.css";
import "../assets/css/reactPdf.css";

export const VerPdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  //   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  //   const url = "https://www.mhe.es/cf/ciclos_administracion/8448191412/archivos/recursos/indice_recursos/documents/Modelo_carta_comercial_pedido_U4.pdf"
  const url = "http://127.0.0.1:8000/api/licfunc/view/requisito-archivo/8";

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__document">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
          >
            {/* <Page pageNumber={pageNumber} /> */}
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>

          {/* <p>
            Page {pageNumber} of {numPages}
          </p> */}
        </div>
      </div>
    </div>
  );
};
