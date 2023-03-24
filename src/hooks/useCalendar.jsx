import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendar = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const onSetActiveEvent = (calendarEvent) => {
    dispatch(onSetEvent(calendarEvent));
  }

  const startSaveEvent = async (calendarEvent) => {
    if (calendarEvent.id) {
      // Updating
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      // Create new event
      dispatch(onAddNewEvent({...calendarEvent, id: new Date().getTime()}))
    }
  }

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  }


  return {
    // Properties
    events,
    activeEvent,
    hasEvent: !!activeEvent,

    // Methods
    onSetActiveEvent,
    startSaveEvent,
    startDeleteEvent,
  };
};
