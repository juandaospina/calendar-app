import { useEffect, useMemo, useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.all";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);

import { differenceInSeconds } from "date-fns";
import { useInterface } from "../../hooks/useInterface";
import "./style.css";
import { useCalendar } from "../../hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const values = {
  title: "",
  notes: "",
  start: "",
  end: "",
  // user: {}
};

export const CalendarModal = () => {
  const { activeEvent, onSetActiveEvent, startSaveEvent } = useCalendar();
  const { isDateModalOpen, onCloseModal } = useInterface();
  const [isSubmited, setIsSubmited] = useState(false);
  const [formValues, setFormValaues] = useState(values);

  const titleMemo = useMemo(() => {
    if (!isSubmited) return "";
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, isSubmited]);

  useEffect(() => {
    if (activeEvent !== null) {
      // Se pasa el evento activo que registra en Redux
      setFormValaues({ ...activeEvent });
    } else {
      setFormValaues(values);
    }
  }, [activeEvent]);

  const onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setFormValaues({
      ...formValues,
      [name]: value,
    });
  };

  const onDateChange = (event, itemDate) => {
    setFormValaues({
      ...formValues,
      [itemDate]: event,
    });
  };

  const onModalCloseHandler = () => {
    onSetActiveEvent(null);
    onCloseModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmited(true);

    const differenceInTime = differenceInSeconds(
      formValues.end,
      formValues.start
    );
    if (isNaN(differenceInTime) || differenceInTime < 0) {
      Swal.fire({
        icon: "error",
        title: "Error en fechas",
        text: "Verifica que las fechas ingresadas sean válidas",
        timer: 3000,
      });
      return;
    }
    if (formValues.title <= 0) return;
    
    startSaveEvent(formValues);
    setIsSubmited(false);
    setFormValaues(values);
    onCloseModal();
  };

  return (
    <div>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onModalCloseHandler}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        contentLabel="Example Modal"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValues.start}
              onChange={(date) => onDateChange(date, "start")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              className="form-control"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(date) => onDateChange(date, "end")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              className="form-control"
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo evento</label>
            <input
              type="text"
              className={`form-control ${titleMemo}`}
              placeholder="Título del evento"
              value={formValues.title}
              onChange={onInputChange}
              name="title"
              autoComplete="off"
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <label>
              Notas evento{" "}
              <small className="form-text text-muted">(Opcional)</small>
            </label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              value={formValues.notes}
              onChange={onInputChange}
              rows="5"
              name="notes"
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
