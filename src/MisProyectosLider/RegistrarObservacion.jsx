import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function RegistrarObservacion() {

  let idProyecto = localStorage.getItem("idProyecto");
  let idAvance = localStorage.getItem("idAvance");
 

  const PROYECTOS = gql`
    query getPojectId($idProyecto: String!) {
      getProjectId(_id: $idProyecto) {
    nombre
    avances
    {id_avance
    fecha_avance
    descripcion
    observaciones_lider}
      }
    }
  `;
  const MUTATION_PROYECTO = gql`
  mutation updateObservaciones( $_id:String, $id_avance:String, $observaciones: String  ){
    updateObservaciones( _id: $_id, id_avance: $id_avance, observaciones: $observaciones )
}
  
`;




 const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { idProyecto },
  });
  const [registradorObservaciones] = useMutation(MUTATION_PROYECTO);
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  let project = {observaciones : ""} 
  console.log(project.observaciones)

  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }} >Registrar Observaciones en Avance {idAvance} </h2>
      <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
        
    
      <hr className="lin"></hr>
      <table className="table row1">
        {" "}
        <thead className="table-dark">
          {" "}
          <tr>
            <th scope="col">Observación</th>
          </tr>
        </thead>
        <tbody> 
            <td >
            <Form onSubmit={e => {
            e.preventDefault();
            registradorObservaciones({variables:{
              _id: idProyecto,
              id_avance: idAvance,
              observaciones:  project.observaciones.value,
               
            }});
            window.location.href = "/lista-avances-lider";
           
        }}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Descripción</Form.Label>
          <Form.Control  ref={observaciones => project.observaciones = observaciones} type="text" placeholder="Describa la Observación" />
        </Form.Group>
        <Button type="submit" variant="dark" style={{ marginLeft:'40%' }} >Guardar Cambios </Button>
      </Form>
      </td>
      
      </tbody>
      </table>
      </div>
    
    </Fragment>
    
  );
}

export default RegistrarObservacion;