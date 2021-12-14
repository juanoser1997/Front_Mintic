import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function MisProyectosLider() {
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
        estado_proyecto
      }
    }
  `;
  const [idProyecto, setIdProyecto] = useState("");
  
  const handleEditar = (e) => {

    setIdProyecto(String(e));
    localStorage.setItem("idProyecto", String(e));
    localStorage.getItem("idProyecto");
    // window.location.href = "/editar-proyecto";
    console.log(e)
  };
  useEffect(() => {
    setIdProyecto("");
    localStorage.setItem("idProyecto", idProyecto);
    localStorage.getItem("idProyecto");
  },[] );

  const { loading, error, data } = useQuery(PROYECTOS);
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  const datosTabla = data.proyectos.map(
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
                  {new Date(fecha_inicio).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item as="li">Fase : {fase}</ListGroup.Item>

           { estado_proyecto =='Activo'? <Link to={'editar-proyecto'}> <Button style={{ width:'100%' }}   onClickCapture={(e, id) => { handleEditar(_id); }} variant="dark">Editar Proyecto </Button> </Link> : <div></div> }
              <Link to={'/registrar-observacion'}> <Button style={{ width:'100%' }}  variant="primary">Registrar Observacion </Button></Link> 
              <Link to={'/inscripciones'}> <Button style={{ width:'100%' }} onClickCapture={(e, id) => { handleEditar(_id); }}  variant="dark">Mirar inscripciones </Button></Link> 
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Fragment>
    )
  );

  return (
    <Fragment>
      <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }}>Mis Proyectos Lider </h2>
      <Link to="/formulario-proyecto">  <Button variant="dark" style={{ marginLeft:'7%', borderRadius:'10px' }} > Crear Proyecto  </Button></Link>
      <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
        
     
      <hr className="lin"></hr>
      <table className="table row1">
        {" "}
        <thead className="table-dark">
          {" "}
          <tr>
            <th scope="col">Proyectos</th>
          </tr>
        </thead>
        <tbody> {datosTabla}</tbody>
      </table>
      </div>
    </Fragment>
  );
}

export default MisProyectosLider;
