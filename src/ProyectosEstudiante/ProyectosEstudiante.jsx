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


  let  id_estudiante =String(localStorage.getItem("identificacion"));

  const MUTATION_PROYECTO = gql`
  mutation  updateInscripcionProyecto( $nombre: String , $id_estudiante:String, $id_inscripcion:String, $_id_estudiante: String ){
    updateInscripcionProyecto( nombre: $nombre , id_estudiante: $id_estudiante, id_inscripcion: $id_inscripcion, _id_estudiante: $_id_estudiante)
}
  
`;

const [creadorDeProyecto] = useMutation(MUTATION_PROYECTO);


  const { loading, error, data } = useQuery(PROYECTOS);
  if (loading) return <h1>Cargando....</h1>;

  const datosTabla = data.proyectos.map(
    ({
      _id,
      lider,
      nombre,
      presupuesto,
      objetivos_generales,
      objetivos_especificos,
      fecha_inicio,
      fase,
      estado_proyecto,
      avances,
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
                  Estado del Proyecto : {estado_proyecto}
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
              let id_ins;
              if(inscripciones.length==1)
             {  id_ins =  "1" }
           

              creadorDeProyecto({
                      
                variables: {
                  nombre: nombre,
                  id_estudiante: id_estudiante,
                  id_inscripcion: String( inscripciones.length + 1),
                  _id_estudiante: localStorage.getItem("_id_usuario"),

                },
              });
              console.log(inscripciones);
              alert('Te has inscrito al proyecto ' )
               window.location.href = "/proyectos-estudiante";
            }}
          >
              {(estado_proyecto != 'Activo' && inscripciones.find(ins => (ins._id_estudiante == localStorage.getItem("_id_usuario") ) )) || inscripciones.find(ins => (ins._id_estudiante == localStorage.getItem("_id_usuario") && ins.fecha_egreso == undefined) ) ?   <div></div> :<Button style={{ width: '100%' }} type="submit" variant="dark">Inscribirse</Button>}
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
