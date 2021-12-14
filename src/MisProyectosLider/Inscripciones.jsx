import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql,useMutation } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";


function Inscripciones() {


const [lista,Setlista]= useState([]);
const [cuenta,setCuenta]= useState(0);


  let idProyecto = localStorage.getItem("idProyecto");
  const PROYECTOS = gql`
  query getPojectId($idProyecto: String!) {
    getProjectId(_id: $idProyecto) {
      nombre
     
      inscripciones {
        estado
        id_inscripcion
        id_estudiante
        
    }
   
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

  const datosTabla = data.getProjectId.inscripciones.map(
    ({
        estado,
        id_inscripcion,
        id_estudiante
    },index) => (
      <Fragment>
          
     <tr>
            {" "}
            <td> {id_estudiante} </td>
            <td>
              <Form.Select  onChangeCapture={(e)=> cambio_ins(e,index)} aria-label="Default select example">
                <option>{estado}</option>
                <option value="Acepatada">Aceptar</option>
                <option value="Rechazada">Rechazar</option>
              
              </Form.Select>
            </td>
          </tr>
         
      </Fragment>
    )
  );
 
  let inscripciones = data.getProjectId.inscripciones.slice();
  
  if(cuenta==0){
    Setlista( data.getProjectId.inscripciones.slice())
    setCuenta(1)
  }

 console.log(inscripciones)
function cambio_ins(e,index){
  // inscripciones[index].estado =e.target.value
//  let p = inscripciones.slice()
//  p[index].estado= e.target.value
//  Object.defineProperty(inscripciones[index],'estado',e.target.value)
// inscripciones[index].prototype.estado=e.target.value
// _.set(inscripciones[index],'estado',"a")
// inscripciones[index].estado = e.target.value
// let p = Object.assign({},e.target.value ,inscripciones[index].estado)
Object.defineProperties(inscripciones[index], {
  estado: {
   configurable: true, 
   writable: true,
   value:e.target.value
  }
 });
//  inscripciones[index].estado =e.target.value
 
 

  console.log(e.target.value)
  console.log(index)
  console.log(inscripciones[index].estado)
}

console.log(data.getProjectId.nombre)

  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }} >Editar Proyecto </h2>
    
      <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
        
      <div className="row" style={{ padding:'5%',paddingTop:'0' }}>
       
         
      <Form onSubmit={e => {
            e.preventDefault();
            creadorDeProyecto({variables:{
              _id: idProyecto,
              inscripciones: inscripciones,
            
            }});
            // window.location.href = "/misproyectos-home";
          
        }}>
       <hr className="lin"></hr>
       <table className="table row1">
         {" "}
         <thead className="table-dark">
           {" "}
           <tr>
             <th scope="col">Id estudiante</th>
             <th scope="col">Estado</th>
           </tr>
         </thead>
         <tbody> {datosTabla}</tbody>
       </table>
       <Button  type="submit" variant="dark" style={{ marginLeft:'45%' }} >Registrar </Button>
       </Form>
       </div>
       

      {/* <Form onSubmit={e => {
            e.preventDefault();
            creadorDeProyecto({variables:{
                presupuesto: parseInt(project.presupuesto.value),
                objetivos_generales: project.objetivos_generales.value,
                objetivos_especificos: project.objetivos_especificos,
                nombre: project.nombre.value,
                _id: idProyecto,
            }});
            // window.location.href = "/misproyectos-home";
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
          return  ( <div> <Form.Control  onChangeCapture={(e)=> cambio_ins(e,index)} style={{marginTop: '1%'}} type="text" defaultValue={objetivo} /> </div> )
          })}
           <Button variant="dark" style={{ marginLeft:'40%' , marginTop : '2%'}} onClickCapture={agregarObjetivo} > agregar objetivo especifico </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Presupuesto</Form.Label>
          <Form.Control ref={presupuesto => project.presupuesto = presupuesto}  type="number" defaultValue={data.getProjectId.presupuesto} />
        </Form.Group>
      
      </Form> */}
      </div>
    
    

    </Fragment>
    
  );
}

export default Inscripciones;