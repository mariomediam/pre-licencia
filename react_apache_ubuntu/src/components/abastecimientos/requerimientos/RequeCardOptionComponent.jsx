import { useDispatch } from "react-redux";
import { setCurrentRequerimiento } from "../../../store/slices";

import { Form } from "react-bootstrap";


export const RequeCardOptionComponent = ({ tipoRequerimiento, tipoRequeChecked, setTipoRequeChecked }) => {
  const dispatch = useDispatch();

  const { id, descripcion, C_biesertipo, f_libre, pathImage } = tipoRequerimiento;

  

    const handleRadioChange = (e) => {

      
      dispatch(
        setCurrentRequerimiento({
          C_biesertipo: C_biesertipo,     
          f_libre: f_libre,       
        })
      );
        setTipoRequeChecked(id);

       
    }

         
  return (
    <div className="px-5">
      <label htmlFor={tipoRequerimiento.id} className="w-100">
        <div className={`mb-3 border rounded  ${ id === tipoRequeChecked && "bg-primary text-white"}`}>
          <div className="d-flex p-2 align-items-center">
            <Form.Check
              type="radio"
              label=""
              id={id}
              name="requeTipo"
              defaultChecked={id === tipoRequeChecked}
              onChange={handleRadioChange}
             className="my-radio"
            />
            <img
                src={pathImage}
                className="ms-2"
                thumbnail
                alt={`Elaborar requerimiento de ${descripcion}`}
                
              />
            <h6 className="ps-2 py-0 my-0">{descripcion}</h6>
          </div>
        </div>
      </label>
    </div>
  );
};
