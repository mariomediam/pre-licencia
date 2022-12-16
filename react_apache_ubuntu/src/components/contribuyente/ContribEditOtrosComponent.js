import { Container, Col } from "react-bootstrap";
import { ContribEditOtrosDocComponent } from "./ContribEditOtrosDocComponent";
import { ContribEditOtrosTelComponent } from "./ContribEditOtrosTelComponent";
import { ContribEditOtrosEmaComponent } from "./ContribEditOtrosEmaComponent";
import { ContribEditOtrosNacComponent } from "./ContribEditOtrosNacComponent";

export const ContribEditOtrosComponent = ({ valores, setField, errors }) => {
  return (
    <div className="col-sm-12 col-lg-8">
      <Container>
        <Col md={{ span: 12, offset: 3 }}>
          <ContribEditOtrosDocComponent
            valores={valores}
            setField={setField}
            errors={errors}
          />
          <br />
          <ContribEditOtrosTelComponent
            valores={valores}
            setField={setField}
            errors={errors}
          />
          <br />
          <ContribEditOtrosEmaComponent
            valores={valores}
            setField={setField}
            errors={errors}
          />
          <br />
          {valores.tipoContrib === "01" && (
            <ContribEditOtrosNacComponent
              valores={valores}
              setField={setField}
              errors={errors}
            />
          )}
        </Col>
      </Container>
    </div>
  );
};
