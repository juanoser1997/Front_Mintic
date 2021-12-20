import React, { Component, Fragment, useEffect, useState } from "react";
import './GesUsuariosStyles.css'
import { Link } from 'react-router-dom'
import { ElementContext } from "../context/elementContext";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button"; 
import { useQuery, gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";



function ProyectoPendiente () {
  const [aprobacion1, setAprobacion] = useState("Pendiente");
  const [cuenta, setCuenta] = useState(0);

  const PROYECTOS = gql`
  query {
    ProyectosPendientes{
      _id
      lider
      nombre
      presupuesto
      objetivos_generales
      objetivos_especificos
      fecha_inicio
      fase
      aprobacion
    }
  }
`;

const APROBAR_PROYECTO = gql`
mutation  CambiarAprobacionProyecto($_id: String, $aprobacion : String){
  CambiarAprobacionProyecto(_id: $_id, aprobacion : $aprobacion)
}
`;
const [aprobar] = useMutation(APROBAR_PROYECTO);

function guardarProyecto(_id, aprobacion){
   aprobar({ variables: {_id: _id , aprobacion: aprobacion1} })
  console.log(_id)
  console.log(aprobacion)
  window.location.href = "/editar-proyecto-admin-pendiente";
}

const { loading, error, data } = useQuery(PROYECTOS);
if (loading) return <h1>Cargando....</h1>;

const datosTabla = data.ProyectosPendientes.map(
  ({
    nombre,
    aprobacion,
    _id
  }) =>{
    
    return(
    <Fragment>
  <tr><td>{nombre}</td>
  <td>  <Form.Select aria-label="Default select example" onChangeCapture={(e)=>setAprobacion(e.target.value)}>
                <option>{aprobacion}</option>
                <option value="Aprobado">Aprobado</option>
                <option value="No Aprobado">No Aprobado</option>
              
              </Form.Select></td>
  <td>  <Button onClick={()=> guardarProyecto(_id, aprobacion1)} variant="dark" style={{ marginLeft:'43%' }} >Guardar </Button></td>
  </tr>
 
    </Fragment>

  )}

);


   
        
        
        
    return ( 
       
        <ElementContext.Consumer>
        {(context) => {
            
         
          return (
            <Fragment>
               
           <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }} >Proyectos para Aprobar</h2>
         
            <div className="row"  style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
        
            <hr className="lin"></hr>
            <table className="table row1">
              {" "}
              <thead className="table-dark">
                {" "}
                <tr>
                  <th scope="col"> Nombre Proyecto </th>
                  <th scope="col"> Aprobacion </th>
                  <th scope="col">  </th>
                </tr>
              </thead>
              <tbody> {datosTabla}</tbody>
            </table>
              
            </div>
      <Link to={'proyectos-home'}> <Button variant="dark" style={{ marginLeft:'43%' }} >  Volver </Button> </Link>     
          </Fragment>
        );
        
        }}
      </ElementContext.Consumer>
          

       
    );
    
}

export default ProyectoPendiente;