import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "./ProyectosEstudiantes.Css"
import { Form } from "react-bootstrap";

function ProyectosEstudiante() {
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
        inscripciones {
          estado
          id_inscripcion
          id_estudiante
          fecha_ingreso
          fecha_egreso
          
      }
      }
    }
  `;


  let  id_estudiante ="80378556";

  const MUTATION_PROYECTO = gql`
  mutation  updateInscripcionProyecto( $nombre: String , $id_estudiante:String, $id_inscripcion:String ){
    updateInscripcionProyecto( nombre: $nombre , id_estudiante: $id_estudiante, id_inscripcion: $id_inscripcion)
}
  
`;

const [creadorDeProyecto] = useMutation(MUTATION_PROYECTO);


  const { loading, error, data } = useQuery(PROYECTOS);
  if (loading) return <h1>Cargando....</h1>;

  const datosTabla = data.proyectos.map(
    ({
      lider,
      nombre,
      presupuesto,
      objetivos_generales,
      objetivos_especificos,
      fecha_inicio,
      fase,
      inscripciones,
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
                <Form
            onSubmit={(e) => {
              e.preventDefault();
              creadorDeProyecto({

                variables: {
                  nombre: nombre,
                  id_estudiante: id_estudiante,
                  id_inscripcion:String( inscripciones.length + 1),

                },
              });
              console.log(inscripciones);
              alert('Te has inscrito al proyecto ' )
               window.location.href = "/proyectos-estudiante";
            }}
          >
                <Button style={{ width: '100%' }} type="submit" variant="dark">Inscribirse</Button>
                </Form>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Fragment>
    )
  );

  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center', marginTop:'5%' }}>Proyectos Disponibles</h2>
      <div className="row" style={{ padding:'5%',paddingTop:'0' }}>
       
         
       
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

export default ProyectosEstudiante;
