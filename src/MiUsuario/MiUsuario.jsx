import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useMutation} from "@apollo/client";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";


function MiUsuario() {
    let _id = localStorage.getItem("_id_usuario")
    const USUARIOS = gql`
      query  usuario($_id: String) { 
      usuario(_id: $_id) { 
      nombre_completo
      identificacion
      estado
      correo
      clave
      _id
      tipo_usuario
        }
      }
    `;
  
    const MUTATION_USUARIO = gql`
        mutation  updateUser($nombre_completo:String,$identificacion:Int,$clave:String,$correo:String,$_id:String){
        updateUser(user:{nombre_completo:$nombre_completo,identificacion:$identificacion,clave:$clave,correo:$correo,_id:$_id})

    }
    `;
  

  const [creadorDeProyecto] = useMutation(MUTATION_USUARIO)

    const { loading, error, data } = useQuery(USUARIOS, {
        variables: {_id },
      });
    if (loading) return <h1>Cargando....</h1>;
    if (error) return <h1>Error</h1>;
  
    let user = {
        nombre_completo: "",
        identificacion: 0,
        correo: "",
        clave: "",
        _id:data.usuario._id,
        
    
    
    
      }
    
  
  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }}>Usuario:{data.usuario.nombre_completo} </h2>
      <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
       
     
      <hr className="lin"></hr>
       <Form onSubmit={e => {
      e.preventDefault();
      creadorDeProyecto({
        variables: {
          
          nombre_completo: user.nombre_completo.value,
          identificacion:parseInt(user.identificacion.value),
          correo: user.correo.value,
          clave: user.clave.value,
          _id:data.usuario._id
         
        }
      })
    }}> 
      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control type="text" input ref={nombre => user.nombre_completo = nombre} defaultValue={data.usuario.nombre_completo} />
        </Form.Group>
      </div>

      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>identificacion</Form.Label>
          <Form.Control type="text" input ref={identificacion => user.identificacion =identificacion} defaultValue={data.usuario.identificacion} />
        </Form.Group>
      </div>
      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="text" input ref={correo => user.correo = correo} defaultValue={data.usuario.correo} />
        </Form.Group>
      </div>
      <div>

       
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="text" input ref={clave => user.clave = clave} defaultValue={data.usuario.clave} />
        </Form.Group>
      </div>
      
      <div><Button variant="dark" type="submit" style={{ marginLeft: '40%' }} >Editar Usuario</Button></div>
    </Form>
      </div>
    </Fragment>
  );
}

export default MiUsuario;


