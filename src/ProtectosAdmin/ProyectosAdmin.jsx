import React, { Component, Fragment, useEffect, useState } from "react";
import './GesUsuariosStyles.css'
import { Link } from 'react-router-dom'
import { ElementContext } from "../context/elementContext";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button"; 
import { useQuery, gql , useMutation} from "@apollo/client";



function ProyectosAdmin () {
  const [idProyecto, setIdProyecto] = useState("");
 const handleEditar = (e) => {
    setIdProyecto(String(e));
    localStorage.setItem("idProyecto", String(e));
    localStorage.getItem("idProyecto");
    window.location.href = "/editar-proyecto-admin";
    console.log(e)
  };
  const PROYECTOS = gql`
  query {
    ProyectosAprobados {
      _id
      lider
      nombre
      presupuesto
      objetivos_generales
      objetivos_especificos
      fecha_inicio
      fecha_terminacion
      fase
      estado_proyecto
    }
  }
`;



useEffect(() => {
  setIdProyecto("");
  localStorage.setItem("idProyecto", idProyecto);
  localStorage.getItem("idProyecto");
},[] );

const { loading, error, data } = useQuery(PROYECTOS);
if (loading) return <h1>Cargando....</h1>;


const datosTabla = data.ProyectosAprobados.map(
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
    fecha_terminacion
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
                Fecha de inicio :{" "}
                {fecha_inicio != undefined ? new Date(fecha_inicio).toLocaleDateString() : ""}
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Fecha de terminacion :{" "}
                {fecha_terminacion != undefined ? new Date(fecha_terminacion).toLocaleDateString() : ""}
              </ListGroup.Item>
              <ListGroup.Item as="li">Fase : {fase}</ListGroup.Item>
          {/* <Link onClickCapture={(e, id) => { handleEditar(_id); }} to="/editar-proyecto-admin">  <Button style={{ width:'100%' }} variant="dark" >Editar</Button></Link>  */}
          { fase != 'Terminado'? <Button style={{ width:'100%' }} variant="dark"   onClickCapture={(e, id) => { handleEditar(_id); }}>Editar</Button>: <div></div> }
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  )
);


   
        
        
        
    return ( 
       
        <ElementContext.Consumer>
        {(context) => {
             const {radio0value,radio1value,radio2value,initialBoxvalue}=context;
             console.log(radio2value);
                 console.log(radio1value);
                 console.log(radio0value);
         
          return (
            <Fragment>
               
           <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }} >Proyectos Disponibles</h2>
         <Link to="/editar-proyecto-admin-pendiente">  <Button variant="dark" style={{ marginLeft:'6%', borderRadius:'10px' }} > Proyectos pendientes </Button></Link> 
            
            <div className="row" style={{ padding:'5%',paddingTop:'1%' }}>
             
         
            <hr className="lin"></hr>
            <table className="table row1">
              {" "}
              <thead className="table-dark">
                {" "}
                <tr>
                  <th scope="col">Proyectos </th>
                </tr>
              </thead>
              <tbody> {datosTabla}</tbody>
            </table>
            </div>
          </Fragment>
        );
        
        }}
      </ElementContext.Consumer>
          

       
    );
    
}

export default ProyectosAdmin;