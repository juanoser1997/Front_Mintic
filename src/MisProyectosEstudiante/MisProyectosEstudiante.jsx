import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function MisProyectosEstudiante() {
  const PROYECTOS = gql`
    query {
      proyectos {
        lider
        nombre
        presupuesto
        objetivos_generales
        objetivos_especificos
        fecha_inicio
        fase
        _id
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

  const { loading, error, data } = useQuery(PROYECTOS);
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  const datosTabla = data.proyectos.map(
    ({
      lider,
      nombre,
      presupuesto,
      objetivos_generales,
      objetivos_especificos,
      fecha_inicio,
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
                  Fecha de inicio :{" "}
                  {new Date(fecha_inicio).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item as="li">Fase : {fase}</ListGroup.Item>

                <Link to={'/lista-avances'} > <Button   onClickCapture={(e, id) => { handleEditar(_id, nombre); }} style={{ width:'100%' }} variant="dark">Mirar Avances </Button></Link>
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
