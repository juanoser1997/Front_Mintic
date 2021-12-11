import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function FormularioProyecto() {
  const PROYECTOS = gql`
    query {
      proyectos {
        lider
        nombre
        presupuesto
        objetivos_generales
        objetivos_especificos
        fecha_inicio
        fase
      }
    }
  `;

  const { loading, error, data } = useQuery(PROYECTOS);
  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <Fragment>
      <h2 className="te"  style={{ textAlign:'center' }} >Registrar Proyecto </h2>
    
      <div className="row">
        <div className="col "></div>
      </div>
      <div style={{ padding: '5%' }}>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="email" placeholder="Nombre" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Objetivo General</Form.Label>
          <Form.Control type="password" placeholder="Objetivo General" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Objetivo Especifico</Form.Label>
          <Form.Control type="password" placeholder="Objetivo Especifico" />
        </Form.Group>
      </Form>
      <Button variant="dark" style={{ marginLeft:'40%' }} >Registrar </Button>
      </div>
    </Fragment>
    
  );
}

export default FormularioProyecto;
