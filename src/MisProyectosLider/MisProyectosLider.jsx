import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function MisProyectosLider() {
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
      }
    }
  `;

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

              <Link to={'/editar-proyecto'} > <Button style={{ width:'100%' }} variant="dark">Editar Proyecto </Button></Link> 
              <Link to={'/registrar-observacion'}> <Button style={{ width:'100%' }}  variant="primary">Registrar Observacion </Button></Link> 
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Fragment>
    )
  );

  return (
    <Fragment>
      <h2 className="te">Mis Proyectos Lider </h2>
      <Link to="/formulario-proyecto">  <Button variant="dark" style={{ marginLeft:'11%', borderRadius:'10px' }} > Crear Proyecto  </Button></Link>
      <div className="row">
        <div className="col "></div>
      </div>
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
    </Fragment>
  );
}

export default MisProyectosLider;
