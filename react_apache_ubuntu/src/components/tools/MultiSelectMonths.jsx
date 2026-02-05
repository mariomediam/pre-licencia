import { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";

const MONTHS = [
  { value: 1, label: "Ene" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Abr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Ago" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dic" },
];

export const MultiSelectMonths = ({
  selectedMonths = [],
  onChange,
  label = "Meses/Periodo:",
  placeholder = "Seleccionar",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMonth = (monthValue) => {
    const newSelected = selectedMonths.includes(monthValue)
      ? selectedMonths.filter((m) => m !== monthValue)
      : [...selectedMonths, monthValue].sort((a, b) => a - b);
    
    onChange(newSelected);
  };

  const handleToggleAll = () => {
    if (selectedMonths.length === MONTHS.length) {
      onChange([]);
    } else {
      onChange(MONTHS.map((m) => m.value));
    }
  };

  const getDisplayText = () => {
    if (selectedMonths.length === 0) return placeholder;
    if (selectedMonths.length === MONTHS.length) return "Todos";
    
    return selectedMonths
      .map((value) => MONTHS.find((m) => m.value === value)?.label)
      .filter(Boolean)
      .join(", ");
  };

  const isAllSelected = selectedMonths.length === MONTHS.length;

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Botón trigger */}
      <div style={styles.triggerWrapper}>
        <span style={styles.label}>{label}</span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={styles.trigger}
        >
          <span style={styles.triggerText}>{getDisplayText()}</span>
          <span style={styles.arrow}>▼</span>
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.dropdownHeader}>Selecciona meses / periodos</div>
          
          {/* Opción "Todos" */}
          <div style={styles.optionItem}>
            <Form.Check
              type="checkbox"
              id="month-all"
              label="Todos"
              checked={isAllSelected}
              onChange={handleToggleAll}
              style={styles.checkbox}
            />
          </div>

          {/* Lista de meses */}
          <div style={styles.monthsList}>
            {MONTHS.map((month) => (
              <div key={month.value} style={styles.optionItem}>
                <Form.Check
                  type="checkbox"
                  id={`month-${month.value}`}
                  label={month.label}
                  checked={selectedMonths.includes(month.value)}
                  onChange={() => handleToggleMonth(month.value)}
                  style={styles.checkbox}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "inline-block",
  },
  triggerWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#3366cc",
    borderRadius: "4px",
    padding: "6px 12px",
  },
  label: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#5588dd",
    border: "none",
    borderRadius: "4px",
    padding: "4px 10px",
    cursor: "pointer",
    minWidth: "100px",
  },
  triggerText: {
    color: "#ffffff",
    fontSize: "14px",
    flex: 1,
    textAlign: "left",
  },
  arrow: {
    color: "#ffffff",
    fontSize: "10px",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    marginTop: "4px",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    minWidth: "220px",
    zIndex: 1000,
    maxHeight: "300px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  dropdownHeader: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333333",
    borderBottom: "1px solid #e0e0e0",
    fontWeight: "500",
  },
  monthsList: {
    overflowY: "auto",
    maxHeight: "220px",
  },
  optionItem: {
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  checkbox: {
    cursor: "pointer",
  },
};

export default MultiSelectMonths;
