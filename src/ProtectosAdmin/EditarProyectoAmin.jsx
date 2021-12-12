import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditarProyectoAdmin() {
  let idProyecto = localStorage.getItem("idProyecto");
  const [fase, setFase] = useState("");
  const [estado, setEstado] = useState("");

  const productData = {
    _id: idProyecto,
    fase: fase,
    estado: estado,
  };
  const PROYECTOS = gql`
    query getPojectId($idProyecto: String!) {
      getProjectId(_id: $idProyecto) {
        nombre
        fase
        estado_proyecto
      }
    }
  `;

  const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { idProyecto },
  });
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  console.log(data.getProjectId.nombre);
  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }}>Editar Proyectos Admin </h2>
      <div className="row"  style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
      <hr className="lin"></hr>
      <table className="table row1">
        {" "}
        <thead className="table-dark">
          {" "}
          <tr>
            <th scope="col"> Editar : {data.getProjectId.nombre}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        <tr>
            {" "}
            <td> Estado del Proyecto</td>
            <td>
              <Form.Select aria-label="Default select example">
                <option>{data.getProjectId.estado_proyecto}</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              
              </Form.Select>
            </td>
          </tr>
          <tr>
            {" "}
            <td> Fase</td>
            <td>
              <Form.Select aria-label="Default select example">
                <option>{data.getProjectId.fase}</option>
                <option value="Iniciado">Iniciado</option>
                <option value="Desarrollo">En Desarrollo</option>
                <option value="Terminado">Terminado</option>
              </Form.Select>
            </td>
          </tr>
         
        </tbody>
      </table>
      </div>

      <Button variant="dark" style={{ marginLeft:'43%' }} >Guardar Cambios </Button>
    </Fragment>
  );
}

export default EditarProyectoAdmin;
