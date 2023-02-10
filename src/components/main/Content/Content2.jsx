import React, { useState, useEffect } from "react";
import "./Content.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Mygastos,
  addList,
  deleteOne,
  updateMonto,
  createANewMonth,
  restart,
} from "../../Redux/Reducers/Todolist";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Content2 = () => {
  const date = new Date();
  const [mes, setMes] = useState(date.getMonth());
  const [modal, setModal] = useState("");
  const [gastoForm, setGastoForm] = useState({
    nombre: "",
    monto: 0,
    tipo: "",
    dia: "",
  });

  const [indicador, setIndicador] = useState(0);
  const [dias, setDias] = useState([]);

  let gastoFinal = { mes: date.getMonth(), gasto: gastoForm };

  //Variables
  const dispatch = useDispatch();
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let tipos = ["Casa", "Estudios", "Automovil", "Varios", "Entretenimiento"];
  let store = useSelector(Mygastos);
  const reinicio = () => {
    dispatch(restart());
  };
  let actualInfo = store.filter((a) => a.mes === meses[mes]);

  //Funciones
  const newGasto = (e) => {
    setGastoForm({ ...gastoForm, [e.target.name]: e.target.value });
  };

  const addNewGasto = () => {
    dispatch(addList(gastoFinal));
    dispatch(updateMonto({ mes: date.getMonth(), monto: gastoForm.monto }));
    setModal("");
    document.getElementById("name").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("dia").value = "";
    document.getElementById("tipo").value = "";
  };
  const deleteOneGasto = (name, monto) => {
    dispatch(deleteOne({ mes: date.getMonth(), nombre: name, monto: monto }));
  };
  const changeActualInfo = (e) => {
    setMes(meses.indexOf(e.target.value));
  };

  const createAMonth = () => {
    if (store[mes] === undefined) {
      dispatch(createANewMonth(meses[mes]));
    } else {
      return null;
    }
  };
  const paraElGrafico = (array) => {
    return array.filter((g, index) => array.indexOf(g) === index);
  };

  const objects = actualInfo[0].gastos;
  const arrayOfTipos = paraElGrafico(objects.map((object) => object.tipo));
  const totalesTipos = () => {
    let sumas = [];
    for (let i = 0; i < arrayOfTipos.length; i++) {
      sumas.push(
        objects
          .filter((object) => object.tipo === arrayOfTipos[i])
          .reduce(
            (accumulator, monto) => accumulator + parseInt(monto.monto),
            0
          ) *
          (100 / actualInfo[0].monto)
      );
    }
    return sumas;
  };
  const data = {
    labels: arrayOfTipos,
    datasets: [
      {
        data: totalesTipos(),
        backgroundColor: ["red", "blue"],
      },
    ],
  };
  const opciones = {
    responsive: true,
    legend: {
      display: true,
      position: "bottom",
    },
  };
  console.log(data);
  const getDays = () => {
    const actualYear = date.getFullYear();
    const actualMonth = date.getMonth();
    setIndicador(new Date(actualYear, actualMonth + 1, 0).getDate());
    for (let i = 1; i < indicador; i++) {
      setDias((dias) => [...dias, i]);
    }
  };
  const showModal = () => {
    if (modal === "") {
      setModal("show");
    } else {
      setModal("");
    }
  };
  //Renderizado
  useEffect(() => {
    getDays();
    createAMonth();
  }, [indicador, mes]);

  return (
    <div className="content2-container">
      <div className="lateral-bar-content">
        <div className="title-lateral-bar">My bills</div>
        <div className="list-lateral-bar">
          <ul>
            <li>Dashboard</li>
            <li>Anotaciones</li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="central-screen-content">
        <div className="fichas">
          <div className="ficha-content">
            <div className="ficha">
              <h1>{actualInfo[0].gastos.length}</h1>
              <p>Total de gastos efectuados</p>
            </div>
            <div className="ficha">
              <h1>${actualInfo[0].monto}</h1>
              <p>Total monto mensual</p>
            </div>
            <div className="ficha">
              <h1>
                $
                {actualInfo[0].gastos.length === 0
                  ? 0
                  : parseInt(actualInfo[0].monto) / actualInfo[0].gastos.length}
              </h1>
              <p>Total monto mensual</p>
            </div>
          </div>
        </div>
        <div className="central-table-content">
          <div className="filters">
            <select id="mes" onChange={changeActualInfo}>
              <option value="">Elija un mes</option>
              {meses.map((m, index) => {
                return (
                  <option
                    key={index}
                    disabled={index > date.getMonth()}
                    selected={m === meses[date.getMonth()]}
                    value={m}
                  >
                    {m}
                  </option>
                );
              })}
            </select>
            <input className="search" placeholder="Nombre del gasto" />
            <select>
              <option> Elija un tipo de gasto</option>
            </select>
          </div>
          <div className="table-content">
            <div className="table">
              <div className="title-table">
                <h1>Tus cuentas</h1>
                <button className="addButton" onClick={showModal}>
                  Agregar
                </button>
              </div>
              <div className="list-gastos2">
                <div className="title-gastos-property">
                  <div className="gasto-name">
                    <p>
                      <b>Nombre</b>
                    </p>
                  </div>
                  <div className="gasto-mount">
                    <span>
                      <b>Monto</b>
                    </span>
                  </div>
                  <div className="type">
                    <p>
                      <b>Tipo</b>
                    </p>
                  </div>
                  <div className="day">
                    <p>
                      <b>Dia</b>
                    </p>
                  </div>{" "}
                  <div className="actions">
                    <p>
                      <b>Acciones</b>
                    </p>
                  </div>
                </div>
                {actualInfo[0].gastos.length === 0 ? (
                  <div className="empty">No ha registrado ningun gasto</div>
                ) : (
                  actualInfo[0].gastos.map((g, index) => (
                    <div key={index} className="gastos">
                      <div className="gasto-name">
                        <p>{g.nombre}</p>
                      </div>
                      <div className="gasto-mount">
                        <p>{g.monto}</p>
                      </div>
                      <div className="type">
                        <p>{g.tipo}</p>
                      </div>
                      <div className="day">
                        <p>
                          {g.dia}/{date.getMonth() + 1}
                        </p>
                      </div>
                      <div className="actions">
                        <button
                          onClick={() => deleteOneGasto(g.nombre, g.monto)}
                          className="trash"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="19"
                            viewBox="0 0 16 19"
                            fill="none"
                          >
                            <path
                              d="M11.681 2.41458C11.7194 2.55015 11.874 2.66 12.0286 2.66H15.0175C15.5603 2.66 16 3.05682 16 3.54666C16 3.95141 15.6996 4.29181 15.2906 4.39869L14.7774 17.1327C14.7358 18.1687 13.7807 19 12.6294 19H3.37062C2.22147 19 1.26424 18.1678 1.22258 17.1327L0.709425 4.39869C0.300438 4.29181 0 3.95141 0 3.54666C0 3.05682 0.439696 2.66 0.982467 2.66H3.97141C4.12602 2.66 4.28173 2.54817 4.31901 2.41458L4.52844 1.65557C4.78831 0.717461 5.80587 0 6.87606 0H9.12388C10.1952 0 11.2116 0.717436 11.4715 1.65557L11.681 2.41458ZM7.29835 6.71337V15.3267C7.29835 15.676 7.61305 15.96 8.00011 15.96C8.38718 15.96 8.70187 15.676 8.70187 15.3267V6.71337C8.70187 6.36405 8.38718 6.08004 8.00011 6.08004C7.61305 6.08004 7.29835 6.36405 7.29835 6.71337ZM4.07025 6.73217L4.35095 15.3455C4.36301 15.6948 4.68648 15.9699 5.07354 15.96C5.46061 15.9491 5.76542 15.6572 5.75448 15.3079L5.47377 6.69458C5.46171 6.34526 5.13824 6.07016 4.75118 6.08004C4.36412 6.09093 4.0593 6.38285 4.07025 6.73217ZM10.5265 6.69457L10.2458 15.3078C10.2348 15.6572 10.5396 15.9491 10.9267 15.96C11.3137 15.9699 11.6372 15.6948 11.6493 15.3454L11.93 6.73216C11.9409 6.38284 11.6361 6.09093 11.249 6.08003C10.862 6.07014 10.5385 6.34525 10.5265 6.69457ZM6.41553 2.66H9.58441C9.66117 2.66 9.70941 2.60558 9.69077 2.53829L9.56467 2.08505C9.5241 1.93661 9.29274 1.77332 9.12388 1.77332H6.87606C6.7072 1.77332 6.47583 1.93661 6.43527 2.08505L6.30917 2.53829C6.29053 2.60657 6.33877 2.66 6.41553 2.66H6.41553Z"
                              fill="#EB5757"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="central-left">
              <div className="grafico-title">
                <h3>Grafico representativo de tus gastos</h3>
              </div>
              <div className="grafico">
                <Pie data={data} options={opciones} />
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className={`modal ${modal}`}>
        <div className="modal-content">
          <div className="modal-close">
            <h2>Ingreso de gasto</h2>
            <span onClick={showModal} className="cerrar">
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div>
              <input
                name="nombre"
                onChange={newGasto}
                placeholder="Nombre del gasto"
                id="name"
              />
            </div>
            <div>
              <input
                name="monto"
                onChange={newGasto}
                placeholder="Cantidad del monto"
                id="monto"
                type={"number"}
              />
            </div>
            <div>
              <select name="dia" onChange={newGasto} id="dia">
                <option value="">Dia</option>
                {dias.map((d, index) => {
                  return (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <select name="tipo" onChange={newGasto} id="tipo">
                <option value="">Tipo de gasto</option>
                {tipos.map((d, index) => {
                  return (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <div className="button">
              <button
                onClick={addNewGasto}
                disabled={
                  gastoForm.dia === "" ||
                  gastoForm.nombre === "" ||
                  gastoForm.tipo === "" ||
                  gastoForm.monto === 0
                }
                className="addButton"
              >
                Aceptar
              </button>
              <button onClick={showModal} className="addButton cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content2;
