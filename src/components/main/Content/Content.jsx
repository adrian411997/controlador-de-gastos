import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gastos } from "../../Redux/Reducers/Todolist";
import "./Content.css";

const Content = () => {
  const [indicador, setIndicador] = useState(0);
  const [dias, setDias] = useState([]);
  //Estados para construir el gasto final
  const [gastoIndividual, setGastoIndividual] = useState({
    nombre: "",
    monto: "",
    dia: "",
  });
  const [gasto, setGasto] = useState({ mes: "" });
  const [listGastos, setListGastos] = useState([]);

  //Gasto para el estado
  const [finalGasto, setFinalGasto] = useState({ mes: "", gastos: listGastos });

  //Variables
  const dispatch = useDispatch();
  let store = useSelector(gastos);
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

  //Funciones
  const plusItem = () => {
    setListGastos((listGastos) => [...listGastos, gastoIndividual]);
    setGastoIndividual({ nombre: "", monto: "", dia: "" });
    document.getElementById("nombre").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("dia").value = "";
  };
  const getDays = () => {
    const date = new Date();
    const actualYear = date.getFullYear();
    const actualMonth = date.getMonth();

    setIndicador(new Date(actualYear, actualMonth + 1, 0).getDate());

    for (let i = 1; i < indicador; i++) {
      setDias((dias) => [...dias, i]);
    }
  };
  const onChangeInputs = (e) => {
    setGastoIndividual({ ...gastoIndividual, [e.target.name]: e.target.value });
  };
  const deleteItem = (nombre) => {
    setListGastos((prevState) =>
      prevState.filter((pr) => pr.nombre !== nombre)
    );
  };
  //Renderizado
  useEffect(() => {
    getDays();
  }, [indicador]);

  console.log(gastoIndividual);
  return (
    <>
      <div className="content-container">
        <div className="content">
          <div className="list-gastos">
            {store.length === 0 ? (
              <h1>No tiene seguimiento de gastos. Por favor cree uno.</h1>
            ) : (
              store.map((index, g) => {
                return <div>{g.name}</div>;
              })
            )}
          </div>
          <div className="input-list-gastos">
            <select name="mes" onChange={onChangeInputs}>
              <option value={""}>Mes del seguimiento</option>
              {meses.map((m, index) => {
                return (
                  <option key={index} value={m}>
                    {m}
                  </option>
                );
              })}
            </select>
            <span className="errorInput"></span>
            <div className="list">
              {listGastos.length !== 0
                ? listGastos.map((li) => (
                    <div className="list-desc">
                      <div className="title-desc">
                        <li>{li.nombre}</li>
                        <li className="money">{li.monto}</li>
                      </div>

                      <div className="closeButton">
                        <button
                          className="trash"
                          onClick={() => deleteItem(li.nombre)}
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
                : ""}
            </div>{" "}
            <div className="addItem">
              <div className="inputAddItem">
                <input
                  name="nombre"
                  placeholder="Nombre del gasto"
                  id="nombre"
                  onChange={onChangeInputs}
                />
                <input
                  name="monto"
                  onChange={onChangeInputs}
                  type="number"
                  placeholder="Monto del gasto"
                  id="monto"
                />
                <select id="dia" name="dia" onChange={onChangeInputs}>
                  <option value="">Dia del mes</option>
                  {dias.map((d, index) => {
                    return (
                      <option key={index} value={d}>
                        {d}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="addItemButton">
                <button
                  onClick={plusItem}
                  disabled={
                    gastoIndividual.name === "" ||
                    gastoIndividual.monto === "" ||
                    gastoIndividual.dia === ""
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 50 50"
                    width={20}
                    height={20}
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 50 50"
                  >
                    <rect fill="none" height="50" width="50" />
                    <line
                      fill="#fff"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="4"
                      x1="9"
                      x2="41"
                      y1="25"
                      y2="25"
                    />
                    <line
                      fill="#fff"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="4"
                      x1="25"
                      x2="25"
                      y1="9"
                      y2="41"
                    />
                  </svg>
                </button>
              </div>
            </div>{" "}
            <div className="btn-finish">
              <button disabled={gasto.mes === ""} className="btn-add">
                Agregar
              </button>
              <button className="btn-cancel">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
