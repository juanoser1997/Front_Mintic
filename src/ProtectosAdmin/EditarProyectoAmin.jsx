import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditarProyectoAdmin() {
  let idProyecto = localStorage.getItem("idProyecto");
  const [fase, setFase] = useState("");
  const [estado, setEstado] = useState("");
  const [cuenta, setCuenta] = useState(0);

  const project = {
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
  const ACTIVAR_PROYECTO = gql`
mutation ActivarProyecto($idProyecto: String!){
    ActivarProyecto(_id: $idProyecto)
}
`;
const INACTIVAR_PROYECTO = gql`
mutation InactivarProyecto($idProyecto: String!){
  InactivarProyecto(_id: $idProyecto)
}
`;
const CAMBIAR_FASE = gql`
mutation CambiarFaseProyecto($idProyecto: String, $fase: String ){
    CambiarFaseProyecto(_id: $idProyecto,fase: $fase )
}
`;

useEffect(() => {
   
}, )

  const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { idProyecto },
  });


  
const [activar] = useMutation(ACTIVAR_PROYECTO);
const [cambiar_fase] = useMutation(CAMBIAR_FASE);
const [inactivar] = useMutation(INACTIVAR_PROYECTO);
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;
  

 

  if(cuenta == 0){
    setEstado(data.getProjectId.estado_proyecto)
    setFase(data.getProjectId.fase)
    setCuenta(1)
  }

 
function handleGuardar(fase,estado){
    if(estado == 'Activo'){
      activar({ variables: {idProyecto:idProyecto} })
       
    }
    if(estado == 'Inactivo'){
      inactivar({ variables: {idProyecto:idProyecto} })
   
    }

    cambiar_fase({ variables: {idProyecto:idProyecto, fase: fase} })
    if (fase == 'Terminado')
    inactivar({ variables: {idProyecto:idProyecto} })
    
    alert(' el Proyecto ha sido Actualizado')
    window.location.href = "/proyectos-home";
     console.log(fase)
     console.log(estado)
    
  }


  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }}>Editar Proyecto : {data.getProjectId.nombre} </h2>
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
              <Form.Select aria-label="Default select example"  onChangeCapture={(e)=> setEstado(e.target.value)}>
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
              <Form.Select aria-label="Default select example" onChangeCapture={(e)=> setFase(e.target.value)}>
                <option>{data.getProjectId.fase}</option>
                <option value="Iniciado">Iniciado</option>
                <option value="En Desarrollo">En Desarrollo</option>
                <option value="Terminado">Terminado</option>
              </Form.Select>
            </td>
          </tr>
         
        </tbody>
      </table>
      </div>

      <Button variant="dark" onClickCapture={() => handleGuardar(project.fase, project.estado)} style={{ marginLeft:'43%' }} >Guardar Cambios </Button>
    </Fragment>
  );
}

export default EditarProyectoAdmin;
