import React, { Component, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ElementContext } from "../context/elementContext";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useQuery, gql } from "@apollo/client";

function ListaAvancesLider() {
  let idProyecto = localStorage.getItem("idProyecto");
  const PROYECTOS = gql`
    query getPojectId($idProyecto: String!) {
      getProjectId(_id: $idProyecto) {
        nombre
        avances {
          id_avance
          fecha_avance
          descripcion
          observaciones_lider
        }
      }
    }
  `;

  const [idAvance, setIdAvance] = useState("");

  const handleRegistrar = (e) => {
    setIdAvance(String(e));
    localStorage.setItem("idAvance", String(e));
    localStorage.getItem("idAvance");
    // window.location.href = "/editar-proyecto";
    console.log(e);
  };

  useEffect(() => {
    setIdAvance("");
    localStorage.setItem("idAvance", idAvance);
    localStorage.getItem("idAvance");
  }, []);
  const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { idProyecto },
  });

  if (loading) return <h1>Cargando....</h1>;

  const datosTabla = data.getProjectId.avances.map((avance) => (
    <Fragment>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header> Avance {avance.id_avance}</Accordion.Header>
          <Accordion.Body>
            <ListGroup as="ol" numbered>
              <ListGroup.Item as="li">
                <b> Descripción :</b> {avance.descripcion}
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <b> Observaciones del Lider :</b> {avance.observaciones_lider}
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <b> Fecha de Avance :</b>{" "}
                {new Date(avance.fecha_avance).toLocaleDateString()}
              </ListGroup.Item>

              <Link to={"/registrar-observacion"}>
                {" "}
                <Button
                  style={{ width: "100%" }}
                  variant="dark"
                  onClickCapture={(e, id) => {
                    handleRegistrar(avance.id_avance);
                  }}
                >
                  {" "}
                  Agregar observacion
                </Button>
              </Link>
              {/* <Link onClickCapture={(e, id) => { handleEditar(_id); }} to="/editar-proyecto-admin">  <Button style={{ width:'100%' }} variant="dark" >Editar</Button></Link>  */}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  ));

  return (
    <ElementContext.Consumer>
      {(context) => {
        const { radio0value, radio1value, radio2value, initialBoxvalue } =
          context;
        console.log(radio2value);
        console.log(radio1value);
        console.log(radio0value);

        return (
          <Fragment>
            <h2 className="te" style={{ textAlign: "center", marginTop: "3%" }}>
              Avances proyecto {data.getProjectId.nombre}{" "}
            </h2>

            <div
              className="row"
              style={{ padding: "5%", paddingTop: "1%", paddingBottom: "3%" }}
            >
              <hr className="lin"></hr>
              <table className="table row1">
                {" "}
                <thead className="table-dark">
                  {" "}
                  <tr>
                    <th scope="col">Avances </th>
                  </tr>
                </thead>
                <tbody> {datosTabla}</tbody>
              </table>

              <Link to={"/misproyectos-lider"}>
                {" "}
                <Button style={{ marginLeft: "43%" }} variant="dark">
                  volver{" "}
                </Button>
              </Link>
            </div>
          </Fragment>
        );
      }}
    </ElementContext.Consumer>
  );
}

export default ListaAvancesLider;
