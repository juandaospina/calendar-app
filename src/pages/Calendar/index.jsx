import { Calendar } from "react-big-calendar";
// Ayudan al manejo de fechas
import { addHours } from "date-fns";

import { CalendarModal, CalendarEvent, FlotantButton, NavBar, FlotantDeleteButton } from "../../components";
import { useCalendar, useInterface } from "../../hooks";
import { getMessagesES, localizer } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";


export const CalendarPage = () => {
  const { onOpenModal } = useInterface();
  const { events, onSetActiveEvent } = useCalendar();

  const eventStyleMessages = (event, start, end, isSelected) => {
    return;
  };

  return (
    <>
      <NavBar />
      <Calendar
        // Cambia la cultura, región
        culture="es"
        localizer={localizer}
        // Recibe lista de eventos con sus diferentes variables, fechas, nombres, etc
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        // Cambia, o renombra el nombre de variables 'today' a 'Hoy' - 'month' a 'Mes'
        messages={getMessagesES()}
        eventPropGetter={eventStyleMessages}
        // Permite configurar el cuadro de los eventos, la información que estos contienen para ser sobreescrita
        // o componentes del mismo evento
        components={{
          event: CalendarEvent,
        }}
        // Acción al realizar doble click sobre evento
        onDoubleClickEvent={onOpenModal}
        // Acción que se ejecuta al presionar o hacer click sobre evento
        onSelectEvent={onSetActiveEvent}
      />
      <CalendarModal />
      <FlotantButton />
      <FlotantDeleteButton />
    </>
  );
};
