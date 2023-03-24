
// Componente que personalizar el cuadro del evento, recibiendo las props de la lista de eventos 
export const CalendarEvent = ({ event }) => {
  // console.log("[CALENDAR_EVENT]", event)
  const { title } = event;
  
  return (
    <>
      <strong>{ title }</strong>
      {/* { name ? (
        <span>- { name }</span>
      ) : null} */}
    </>
  );
};
