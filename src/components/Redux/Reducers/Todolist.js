import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listGastos: [
    {
      mes: "Enero",
      gastos: [],
      monto: 0,
    },
    {
      mes: "Febrero",
      gastos: [],
      monto: 0,
    },
  ],
};

const gastosSlice = createSlice({
  name: "gastos",
  initialState,
  reducers: {
    addList: (state, list) => {
      //Agregar

      state.listGastos[list.payload.mes].gastos.push(list.payload.gasto);
      //let newGasto = state.listGastos.gastos.push(list.payload);
    },
    restart: (state) => {
      //Reiniciar todo
      state.listGastos = [
        {
          mes: "Enero",
          gastos: [],
          monto: 0,
        },
        {
          mes: "Febrero",
          gastos: [],
          monto: 0,
        },
      ];
    },
    deleteOne: (state, info) => {
      //Borrar uno

      let newMonto =
        state.listGastos[info.payload.mes].monto - parseInt(info.payload.monto);
      let newState = state.listGastos[info.payload.mes].gastos.filter(
        (g) => g.nombre !== info.payload.nombre
      );
      console.log(newState);

      state.listGastos[info.payload.mes].monto = newMonto;
      state.listGastos[info.payload.mes].gastos = newState;
    },
    updateMonto: (state, monto) => {
      let newState = (state.listGastos[monto.payload.mes].monto += parseInt(
        monto.payload.monto
      ));
      state.listGastos[monto.payload.mes].monto = newState;
    },

    createANewMonth: (state, xd) => {
      let newMonth = { mes: xd.payload, gastos: [], monto: 0 };
      state.listGastos.push(newMonth);
    },
  },
});

export const {
  addList,
  restart,
  deleteOne,
  updateMonto,
  restaMonto,
  createANewMonth,
} = gastosSlice.actions;

export default gastosSlice.reducer;

export const Mygastos = (state) => state.gastos.listGastos;
