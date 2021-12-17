import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function MisProyectosLider() {
  var nombre_lider = "Andres"
  const PROYECTOS = gql`
    query findLiderProjects($nombre_lider: String!) {
      findLiderProjects(lider: $nombre_lider) {
        nombre
        objetivos_generales
        estado_proyecto
        objetivos_especificos
        presupuesto
        lider
        fase
        _id
        fecha_inicio
        inscripciones {
          estado
          id_inscripcion
          id_estudiante
          fecha_ingreso
          fecha_egreso
          
      }
      avances {
        id_avance
        fecha_avance
        descripcion
        observaciones_lider
      }
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

  const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { nombre_lider },
  });
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  const datosTabla = data.findLiderProjects.map(
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
      avances,
      inscripciones,
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
                 Avances :{" "}
                  {avances.map((avance) => {
                    return (
                      <ul>
                        {" "}
                     <b> Avance {avance.id_avance} </b> 
                        <li>  Descripcion : {avance.descripcion} </li>
                        <li> Observaciones : {avance.observaciones_lider} </li>
                        <li>  Fecha :  { new Date(avance.fecha_avance).toLocaleString()} </li>
                      </ul>
                    );
                  })}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                Inscripciones :{" "}
                  {inscripciones.map((inscripcion) => {
                    return (
                      <ul>
                        {" "}
                      <b> Inscripcion {inscripcion.id_inscripcion} </b>
                        <li>  Identificacion Estudiante : {inscripcion.id_estudiante} </li>
                        <li> Estado : {inscripcion.estado} </li>
                        <li>  Fecha Ingreso :  { new Date(inscripcion.fecha_ingreso).toLocaleString()} </li>
                        <li>  Fecha Egreso :  { new Date(inscripcion.fecha_egreso).toLocaleString()} </li>

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
              <Link to={'/lista-avances-lider'}> <Button style={{ width:'100%' }}  onClickCapture={(e, id) => { handleEditar(_id); }}  variant="primary"> Ver avances </Button></Link> 
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
