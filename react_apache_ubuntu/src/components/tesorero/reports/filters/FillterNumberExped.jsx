import { Form } from "react-bootstrap";
import FolderIcon from "../../../../icons/FolderIcon";

export const FillterNumberExped = () => {
  return (
    <div>
      <div className="d_flex align-items-end text-color-default mb-2">
            <FolderIcon />
            <small className="ms-1">N° de expediente</small>

      </div>
      <div>
        <Form.Control type="text" aria-describedby="Número de expediente" />
      </div>
    </div>
  );
};
