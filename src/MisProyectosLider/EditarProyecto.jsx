import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql,useMutation } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";


function EditarProyecto() {


const [lista,Setlista]= useState([]);
const [cuenta,setCuenta]= useState(0);


  let idProyecto = localStorage.getItem("idProyecto");
  const PROYECTOS = gql`
    query getPojectId($idProyecto: String!) {
      getProjectId(_id: $idProyecto) {
        nombre
        objetivos_generales
        estado_proyecto
        objetivos_especificos
        presupuesto
      }
    }
  `;
  const MUTATION_PROYECTO = gql`
  mutation updateProject($objetivos_generales:String, $objetivos_especificos: [String] ,$presupuesto:Int, $nombre: String ,  $_id:String ){
    updateProject( project: {objetivos_generales: $objetivos_generales, objetivos_especificos: $objetivos_especificos, presupuesto: $presupuesto, nombre:$nombre ,_id: $_id} )
}
  
`;


  const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { idProyecto },
  });
  const [creadorDeProyecto] = useMutation(MUTATION_PROYECTO);

  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;
 
  let project = {
    nombre: "",
    objetivos_generales: "",
    estado_proyecto: "",
    objetivos_especificos: lista.slice(),
    presupuesto:0,
    _id:idProyecto,
  }
  if(cuenta==0){
    Setlista( data.getProjectId.objetivos_especificos)
    setCuenta(1)
  }

 
function cambio_objetivos(e,index){
  
   project.objetivos_especificos[index]= e.target.value

  console.log(e.target.value)
  console.log(index)
  console.log(project.objetivos_especificos)
}
function agregarObjetivo(){

  project.objetivos_especificos.push("nuevo Objetivo")
   Setlista(project.objetivos_especificos)
   console.log(lista)
}
  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }} >Editar Proyecto </h2>
    
      <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
      
     

      <Form onSubmit={e => {
            e.preventDefault();
            creadorDeProyecto({variables:{
                presupuesto: parseInt(project.presupuesto.value),
                objetivos_generales: project.objetivos_generales.value,
                objetivos_especificos: project.objetivos_especificos,
                nombre: project.nombre.value,
                _id: idProyecto,
            }});
            window.location.href = "/misproyectos-home";
            console.log(project)
        }}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control  ref={nombre => project.nombre = nombre} type="text" defaultValue={data.getProjectId.nombre} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Objetivo General</Form.Label>
          <Form.Control   ref={objetivos_generales => project.objetivos_generales = objetivos_generales} type="text" defaultValue={data.getProjectId.objetivos_generales}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Objetivo Especifico</Form.Label>
          {lista.map((objetivo, index)=>{
          return  ( <div> <Form.Control  onChangeCapture={(e)=> cambio_objetivos(e,index)} style={{marginTop: '1%'}} type="text" defaultValue={objetivo} /> </div> )
          })}
           <Button variant="dark" style={{ marginLeft:'40%' , marginTop : '2%'}} onClickCapture={agregarObjetivo} > agregar objetivo especifico </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Presupuesto</Form.Label>
          <Form.Control ref={presupuesto => project.presupuesto = presupuesto}  type="number" defaultValue={data.getProjectId.presupuesto} />
        </Form.Group>
        <Button  type="submit" variant="dark" style={{ marginLeft:'45%' }} >Registrar </Button>
      </Form>
      </div>
    
    

    </Fragment>
    
  );
}

export default EditarProyecto;