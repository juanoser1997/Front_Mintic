import React, { Component, Fragment, useEffect, useState } from "react";
import './GesUsuariosStyles.css'
import { Link } from 'react-router-dom'
import { ElementContext } from "../context/elementContext";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button"; 
import { useQuery, gql } from "@apollo/client";
import Form from "react-bootstrap/Form";



function ProyectoPendiente () {
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
    proyectos {
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

useEffect(() => {
  setIdProyecto("");
  localStorage.setItem("idProyecto", idProyecto);
  localStorage.getItem("idProyecto");
},[] );

const { loading, error, data } = useQuery(PROYECTOS);
if (loading) return <h1>Cargando....</h1>;

const datosTabla = data.proyectos.map(
  ({
    nombre,
    aprobacion,
  }) => (
    <Fragment>
  <tr><td>{nombre}</td>
  <td>  <Form.Select aria-label="Default select example">
                <option>{aprobacion}</option>
                <option value="Aprobado">Aprobado</option>
                <option value="No Aprobado">No Aprobado</option>
              
              </Form.Select></td>
  </tr>
 
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
                </tr>
              </thead>
              <tbody> {datosTabla}</tbody>
            </table>
              
            </div>
            <Button variant="dark" style={{ marginLeft:'43%' }} >Guardar Cambios </Button>
          </Fragment>
        );
        
        }}
      </ElementContext.Consumer>
          

       
    );
    
}

export default ProyectoPendiente;