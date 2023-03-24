import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const templateEvent = {
  id: "1029832992",
  title: "Cumpleaños",
  notes: "Comprar pastel",
  start: new Date(),
  end: addHours(new Date(), 5),
  user: {
    _id: "102736272",
    name: "Juan Ospina",
  },
};

export const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState: {
    events: [templateEvent],
    activeEvent: null,
  },
  reducers: {
    onSetEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action) => {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? { ...action.payload } : { ...event }
      );
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(
        (event) => event.id !== state.activeEvent.id
      );
      state.activeEvent = null;
    },
  },
});

export const { onSetEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
