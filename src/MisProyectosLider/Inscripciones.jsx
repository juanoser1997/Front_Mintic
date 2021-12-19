import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function Inscripciones() {
  const [lista, Setlista] = useState([]);
  const [inscripciones, SetInscripciones] = useState([]);
  const [cuenta, setCuenta] = useState(0);

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
  
  mutation updateEstadoIncripciongroup($_id: String ,$ins: [inscripcionesInput]  ){
    updateEstadoIncripciongroup(
      _id: $_id,
        ins: $ins
         
       )
    }   
  
  `;

  const { loading, error, data } = useQuery(PROYECTOS, {
    variables: { idProyecto },
  });
  const [creadorDeProyecto] = useMutation(MUTATION_PROYECTO);

  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error</h1>;

  const datosTabla = data.getProjectId.inscripciones.map(
    ({ estado, id_inscripcion, id_estudiante }, index) => (
      <Fragment>
        <tr>
          {" "}
          <td> {id_estudiante} </td>
          <td>
            <Form.Select
              onChangeCapture={(e) => cambio_ins(e, index, inscripciones)}
              aria-label="Default select example"
            >
              <option>{estado}</option>
              <option value="Aceptada">Aceptar</option>
              <option value="Rechazada">Rechazar</option>
            </Form.Select>
          </td>
        </tr>
      </Fragment>
    )
  );
  var inscripciones1 =inscripciones;

  if (cuenta == 0) {
    let lista1 =  data.getProjectId.inscripciones.slice()
    lista1.map((ins, index)=> {
     ins = {
        // __typename: "inscripciones",
        estado: "lista1[index].estado",
        id_inscripcion:lista1[index].id_inscripcion,
        id_estudiante:  lista1[index].id_estudiante,
      }


    })

    for(let i =0 ; i<lista1.length; i++ )
  { lista1[i] = {
    // __typename: "inscripciones",
    estado: lista1[i].estado,
    id_inscripcion:lista1[i].id_inscripcion,
    id_estudiante:  lista1[i].id_estudiante,
  }}
  
    SetInscripciones(lista1);
    Setlista(data.getProjectId.inscripciones.slice());
    setCuenta(1);
    console.log(lista1);
  }


 
  function cambio_ins(e, index) {
    let aux = [...inscripciones];
      aux[index] = {
        // __typename: "inscripciones",
        estado: e.target.value,
        id_inscripcion: inscripciones[index].id_inscripcion,
        id_estudiante: inscripciones[index].id_estudiante,
      };


    SetInscripciones(aux);
    Setlista(aux)
    inscripciones1= aux

    //  inscripciones[index].estado =

    // console.log(e.target.value);
    // console.log(index);
    console.log(inscripciones1);
    console.log(aux);
    console.log(lista)
  }

  return (
    <Fragment>
      <h2 className="te" style={{ textAlign: "center", marginTop: "3%" }}>
        Editar Proyecto{" "}
      </h2>

      <div
        className="row"
        style={{ padding: "5%", paddingTop: "1%", paddingBottom: "3%" }}
      >
        <div className="row" style={{ padding: "5%", paddingTop: "0" }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              creadorDeProyecto({
                variables: {
                  _id: idProyecto,
                  ins: inscripciones1,
                },
              });
              console.log(inscripciones1);
              window.location.href = "/misproyectos-home";
            }}
          >
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
            <Button type="submit" variant="dark" style={{ marginLeft: "45%" }}>
              Registrar{" "}
            </Button>
          </Form>
        </div>

       
      </div>
    </Fragment>
  );
}

export default Inscripciones;
