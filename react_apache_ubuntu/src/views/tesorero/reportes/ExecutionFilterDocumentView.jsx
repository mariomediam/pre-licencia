import { useDispatch, useSelector } from "react-redux";

import { FilterSIAFCommentComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCommentComponent";
import { FilterSIAFDocumentComponent } from "../../../components/tesorero/reports/filters/FilterSIAFDocumentComponent";
import { FilterSIAFNumberDocComponent } from "../../../components/tesorero/reports/filters/FilterSIAFNumberDocComponent";

import { updateFilterSearch } from "../../../store/slices/helpers/filterSearch/thunks";

export const ExecutionFilterDocumentView = () => {
  const dispatch = useDispatch();
  const { filterSearch } = useSelector((state) => state.filterSearch);

  const { documento = "", numerodoc = "", glosa = "" } = filterSearch;

  const updateDocumento = (value) => {
    dispatch(updateFilterSearch({ documento: value }));
  }

  const updateNroDocumento = (value) => {    
    dispatch(updateFilterSearch({ numerodoc: value }));
  }

  const updateGlosa = (value) => {
    dispatch(updateFilterSearch({ glosa: value }));
  }

  return (
    <div className=" d-flex gap-3 flex-wrap animate__animated animate__fadeIn animate__faster">
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "300px" }}
      >
        <FilterSIAFDocumentComponent value={documento} setValue={updateDocumento} />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "180px" }}
      >
        <FilterSIAFNumberDocComponent value={numerodoc} setValue={updateNroDocumento} />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "400px" }}
      >
        <FilterSIAFCommentComponent value={glosa} setValue={updateGlosa} />
      </div>
    </div>
  );
};
