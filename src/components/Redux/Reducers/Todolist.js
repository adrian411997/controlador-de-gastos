import { createSlice } from "@reduxjs/toolkit";

const initialState = { gastos: [] };

const gastosSlice = createSlice({
  name: "gastos",
  initialState,
  reducers: {
    addList: (state, list) => {
      //Agregar
      let newGasto = state.gastos.unshift(list.payload);
    },
    restart: (state) => {
      //Reiniciar todo
      state.gastos = initialState;
    },
    deleteOne: (state, name) => {
      //Borrar uno
      let newGasto = state.gastos.filter((gas) => gas.nombre !== name.payload);
      state.gastos = newGasto;
    },
  },
});

export const { addList, restart, deleteOne } = gastosSlice.actions;

export default gastosSlice.reducer;

export const gastos = (state) => state.gastos.gastos;
