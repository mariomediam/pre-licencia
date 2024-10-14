import { FilterSIAFCommentComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCommentComponent";
import { FilterSIAFDocumentComponent } from "../../../components/tesorero/reports/filters/FilterSIAFDocumentComponent";
import { FilterSIAFNumberDocComponent } from "../../../components/tesorero/reports/filters/FilterSIAFNumberDocComponent";

export const ExecutionFilterDocumentView = () => {
  return (
    <div className=" d-flex gap-3 flex-wrap animate__animated animate__fadeIn animate__faster">
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "300px" }}
      >
        <FilterSIAFDocumentComponent />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "180px" }}
      >
        <FilterSIAFNumberDocComponent />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "400px" }}
      >
        <FilterSIAFCommentComponent />
      </div>
    </div>
  );
};
