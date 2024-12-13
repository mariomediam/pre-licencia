import XIcon from "../../../../../icons/XIcon";

export const AccruralRetentionItem = ({ retention, setRetentions }) => {
  const { code, description, value, isPersonalized } = retention;

  const onChangeInput = (e) => {
    const { value } = e.target;
    const valueFloat = parseFloat(value) || 0;
    setRetentions((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, value: valueFloat } : item
      )
    );
  };

  const oncClicRemoveRetention = () => {
    setRetentions((prev) => prev.filter((item) => item.code !== code));
  };

  return (
    <article className="row py-1 d-flex align-items-center">
      <div className="col ">{description}</div>

      <div className="col">
        <div className="input-group">
          <input
            type="number"
            className={`form-control text-end`}
            id="numeroInput"
            maxLength={10}
            name="numeroExped"
            onChange={onChangeInput}
            value={value}
            step={1}
          />
          {isPersonalized && (
            <button className="btn btn-outline-secondary" type="button" title="Eliminar retención" onClick={oncClicRemoveRetention}>
              <XIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
