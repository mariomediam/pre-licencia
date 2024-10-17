import { Form } from "react-bootstrap";
import CertificateIcon from "../../../../icons/CertificateIcon";

export const FilterSIGAPreCommitmentComponent = ({ value, setValue }) => {
  return (
    <div>
      <div className="d_flex align-items-end text-color-default mb-2">
        <CertificateIcon />
        <small className="ms-1">Precompromiso</small>
      </div>
      <div>
        <Form.Control
          type="text"
          aria-describedby="Número de precompromiso"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
