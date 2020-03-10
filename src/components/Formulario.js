import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  //crear state de citas
  const [cita, actualizarCita] = useState({
    mascotas: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });

  const [error, actualizarError] = useState(false); //dependiento del tipo de valor sea objeto o boleano es lo que se va actualizar por ejemplo ene este caso seria  actualizarError(true);

  //Funcion que se ejecuta cada que el usuario escribe en un input
  const actualizarState = e => {
    actualizarCita({
      //aqui regresa un state por que las propiedades del state es un boleano
      ...cita,
      [e.target.name]: e.target.value
    });
  };
  const { mascotas, propietario, fecha, hora, sintomas } = cita;

  //cuando el usuario presiona agregar cita
  const submitCita = e => {
    e.preventDefault();
    // e.preventDefault(); evita que se envie por el metodo get y aparte el query string se pinte en la url
    //ya apartir de este punto defines las acciones las acciones que van a ocurrir en lugar de que se ejecuten las que son por default

    //Validar
    if (
      mascotas.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    //Eliminar mensaje previo
    actualizarError(false);

    //Asignar ID
    cita.id = uuidv4();
    //Crear la cita

    crearCita(cita);
    //Reiniciar el form

    actualizarCita({
      mascotas: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    });
  };

  //extraer los valores
  return (
    <Fragment>
      <h2>Crear citas</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascotas</label>
        <input
          type="text"
          name="mascotas"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascotas}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
};

export default Formulario;
