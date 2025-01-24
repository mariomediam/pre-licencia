import XIcon from "../../../../../icons/XIcon";

export const AccruralRetentionItem = ({ retention, setRetentions, expedErrors, setExpedErrors }) => {
  const { code, description, value, isPersonalized } = retention;

  const onChangeInput = (e) => {
    const { value } = e.target;
    const valueFloat = parseFloat(value) || 0;
    setRetentions((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, value: valueFloat } : item
      )
    );
    setExpedErrors({ ...expedErrors, [code]: "" });
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
            className={`form-control text-end ${
              expedErrors[code] ? "is-invalid" : ""
            }`}
            id={`idRetention-${code}`}
            maxLength={10}
            name={`retention-${code}`}
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
        <span className="text-danger" style={{ fontSize: "0.8rem" }}>
          {" "}
          {expedErrors[code]}
        </span>
      </div>
    </article>
  );
};
