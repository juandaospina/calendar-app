import { useCalendar, useInterface } from "../../hooks";
import "./style.css"

export const FlotantButton = () => {
    // const { activeEvent } = useCalendar();
    const { onOpenModal } = useInterface();

  return (
    <button className="button" onClick={onOpenModal}>
        <i className="fas fa-plus"></i>
    </button>
  );
};
