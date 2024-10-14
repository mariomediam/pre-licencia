import { Form } from "react-bootstrap";
import ABCIcon from "../../../../icons/AbcIcon";

export const FilterSIAFCommentComponent = () => {
  return (
    <div>
    <div className="d-flex align-items-end text-color-default mb-2">
      <ABCIcon className="pt-1" />
      <small className="ms-1">Glosa</small>
    </div>
    <div>
      <Form.Control type="text" aria-describedby="Número de documento" />
    </div>
  </div>
  )
}
