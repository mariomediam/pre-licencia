import { Form } from "react-bootstrap";
import CertificateIcon from "../../../../icons/CertificateIcon";

export const FilterSIAFCertificateComponent = () => {
  return (
    <div>
    <div className="d_flex align-items-end text-color-default mb-2">
          <CertificateIcon />
          <small className="ms-1">Certificado anual</small>

    </div>
    <div>
      <Form.Control type="text" aria-describedby="Número de expediente" />
    </div>
  </div>
  )
}
