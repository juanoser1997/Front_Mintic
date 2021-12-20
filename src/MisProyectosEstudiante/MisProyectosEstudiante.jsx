import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function MisProyectosEstudiante() {
  var id_estudiante = localStorage.getItem("_id_usuario")
  const [mostrar, setMostrar]=useState(false)
  const [encontrada, setEncontrada]=useState(0)
  const PROYECTOS = gql`
    query MisProyectosEstudiante($id_estudiante: String!) {
      MisProyectosEstudiante(_id_estudiante: $id_estudiante) {
        nombre
        objetivos_generales
        estado_proyecto
        objetivos_especificos
        presupuesto
        lider
        fase
        _id
        fecha_inicio
        inscripciones {
          estado
          id_inscripcion
          id_estudiante
          _id_estudiante
          fecha_ingreso
          fecha_egreso
          
      }
      avances {
        id_avance
        fecha_avance
        descripcion
        observaciones_lider
      }
      }
    }

  `;
  const [idProyecto, setIdProyecto] = useState("");
  const [nombre, setNombre] = useState("");
  const handleEditar = (e,nombre) => {

    setIdProyecto(String(e));
    localStorage.setItem("idProyecto", String(e));
    localStorage.getItem("idProyecto");

    setNombre(String(nombre));
    localStorage.setItem("nombre", String(nombre));
    localStorage.getItem("nombre");
    // window.location.href = "/editar-proyecto";
    console.log(e)
  };
  useEffect(() => {
    setIdProyecto("");
    localStorage.setItem("idProyecto", idProyecto);
    localStorage.getItem("idProyecto");
    setNombre("");
    localStorage.setItem("nombre", nombre);
    localStorage.getItem("nombre");
  },[] );

  const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { id_estudiante },
  });
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  const datosTabla = data.MisProyectosEstudiante.map(
    ({
      lider,
      nombre,
      presupuesto,
      objetivos_generales,
      objetivos_especificos,
      fecha_inicio,
      fecha_egreso,
      estado_proyecto,
      estado,
      avances,
      inscripciones,
      fase,
      _id
    }) => (
      <Fragment>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{nombre}</Accordion.Header>
            <Accordion.Body>
              <ListGroup as="ol" numbered>
                <ListGroup.Item as="li"> Lider : {lider} </ListGroup.Item>
                <ListGroup.Item as="li">
                  Presupuesto : {presupuesto}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Estado : {estado_proyecto}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Objetivos Generales : {objetivos_generales}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Objetivos especificos :{" "}
                  {objetivos_especificos.map((objetivo_especifico) => {
                    return (
                      <ul>
                        {" "}
                        <li> {objetivo_especifico}</li>
                      </ul>
                    );
                  })}
                </ListGroup.Item>

                <ListGroup.Item as="li">
                 Avances :{" "}
                  {avances.map((avance) => {
                    return (
                      <ul>
                        {" "}
                     <b> Avance {avance.id_avance} </b> 
                        <li>  Descripcion : {avance.descripcion} </li>
                        <li> Observaciones : {avance.observaciones_lider} </li>
                        <li>  Fecha :  {avance.fecha_avance != undefined ?new Date(avance.fecha_avance).toLocaleString() : ""} </li>
                      </ul>
                    );
                  })}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                Inscripciones :{" "}
                  {inscripciones.map((inscripcion) => {
                    return (
                      <ul>
                        {" "}
                      <b> Inscripcion {inscripcion.id_inscripcion} </b>
                        <li>  Identificacion Estudiante : {inscripcion.id_estudiante} </li>
                        <li> Estado : {inscripcion.estado} </li>
                        <li>  Fecha Ingreso : {inscripcion.fecha_ingreso != undefined ? new Date(inscripcion.fecha_ingreso).toLocaleString() : ""}   </li>
                        <li>  Fecha Egreso :  {inscripcion.fecha_egreso != undefined ? new Date(inscripcion.fecha_egreso).toLocaleString() : ""} </li>

                      </ul>
                    );
                  })}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Fecha de inicio :{" "}
                  {fecha_inicio != undefined ? new Date(fecha_inicio).toLocaleDateString() : ""}
                </ListGroup.Item>
                <ListGroup.Item as="li">Fase : {fase}</ListGroup.Item>

            { inscripciones.find(ins => (ins._id_estudiante == id_estudiante && ins.fecha_egreso == undefined && ins.estado == 'Aceptada'&& estado_proyecto == "Activo") ) ? <Link to={'/lista-avances'} > <Button   onClickCapture={(e, id) => { handleEditar(_id, nombre); }} style={{ width:'100%' }} variant="dark">Mirar Avances </Button></Link> : <div></div> }
           
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Fragment>
    )
  );

  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }}>Mis Proyectos Estudiantes </h2>
      <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
       
     
      <hr className="lin"></hr>
      <table className="table row1">
        {" "}
        <thead className="table-dark">
          {" "}
          <tr>
            <th scope="col">Proyectos</th>
          </tr>
        </thead>
        <tbody> {datosTabla}</tbody>
      </table>
      </div>
    </Fragment>
  );
}

export default MisProyectosEstudiante;
