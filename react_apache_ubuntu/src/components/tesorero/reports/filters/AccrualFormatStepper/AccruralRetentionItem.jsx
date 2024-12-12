export const AccruralRetentionItem = ({ retention, setRetentions }) => {
  const { code, description, value } = retention;

  const onChangeInput = (e) => {
    const { value } = e.target;
    const valueFloat = parseFloat(value) || 0;
    setRetentions((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, value: valueFloat } : item
      )
    );
  };

  return (
    <article className="row py-1">
      <div className="col d-flex align-items-center">{description}</div>

      <div class="col">
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
      </div>
    </article>
  );
};
