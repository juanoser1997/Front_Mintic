import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function CrearAvance() {
  let idAvance = localStorage.getItem("idAvance");
  let nombre = localStorage.getItem("nombre");
  let idProyecto = localStorage.getItem("idProyecto");
  const PROYECTOS = gql`
  query getPojectId($idProyecto: String!) {
    getProjectId(_id: $idProyecto) {
      nombre
      avances {
        id_avance
        fecha_avance
        descripcion
        observaciones_lider
      }
    }
  }
`;

const MUTATION_PROYECTO = gql`
mutation  updateNuevoAvance( $nombre: String ,$id_avance : String, $descripcion:String  ){
  updateNuevoAvance( nombre: $nombre ,  id_avance: $id_avance, descripcion: $descripcion)
}

`;
const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { idProyecto },
  });
  const [creadorDeProyecto] = useMutation(MUTATION_PROYECTO);
  if (loading) return <h1>Cargando....</h1>;

 
 console.log(data.getProjectId.avances)

  let descripcion = ''
console.log(nombre)
  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }}>Crear Avances  </h2>
      <div className="row"style={{ padding:'5%',paddingTop:'1%', paddingBottom:'1%' }}>
      <hr className="lin"></hr>
      <table className="table row1">
        {" "}
        <thead className="table-dark">
          {" "}
          <tr>
            <th scope="col">Avances</th>
          </tr>
        </thead>
        <tbody> 
            <td >
            <Form
            onSubmit={(e) => {
              e.preventDefault();
              creadorDeProyecto({
                variables: {
                  nombre: nombre,
                  id_avance: String(data.getProjectId.avances.length + 1) ,
                  descripcion: descripcion.value,
                   
                   
                },
              });
              alert('Avance Creado ')
              window.location.href = "/lista-avances";
            }}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Descripción</Form.Label>
          <Form.Control   ref={descripcion1 => descripcion = descripcion1} type="text" placeholder="Describa el anvance" />
        </Form.Group>
        <Button type='submit' variant="dark" style={{ marginLeft:'44%' }} >Guardar Cambios </Button>
      </Form>
      </td>
      
      </tbody>
      </table>
      </div>
      
    </Fragment>
    
  );
}

export default CrearAvance;
