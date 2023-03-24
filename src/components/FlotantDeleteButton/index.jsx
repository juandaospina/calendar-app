import { useCalendar } from "../../hooks";
import "./style.css";

export const FlotantDeleteButton = () => {
  const { startDeleteEvent, hasEvent } = useCalendar();

  return (
    <button
      className="btn btn-danger button-danger"
      onClick={startDeleteEvent}
      style={{
        display: hasEvent ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
