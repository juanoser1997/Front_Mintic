import {
  gql, useMutation
} from "@apollo/client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MUTATION_PROYECTO = gql`
  mutation creeProyecto($objGe:String,$objEs:[String],$presupuesto:Int, $nombreProyecto: String, $lider:String, $fechaIni:Date, $fase:String, $id_lider: String){
      createProject(project:{nombre:$nombreProyecto,lider:$lider,objetivos_generales:$objGe,objetivos_especificos:$objEs,presupuesto:$presupuesto, fecha_inicio:$fechaIni, fase:$fase, id_lider: $id_lider})
  }
`;

const FormularioProyecto = () => {
  let nombre_completo = localStorage.getItem("nombre_completo");
  const [creadorDeProyecto] = useMutation(MUTATION_PROYECTO)
  let project = {
    nombreProyecto: "",
    objetivosGenerales: "",
    objetivosEspecificos: "",
    lider: "",
    fechaInicio: "",
    presupuesto: 0,
    fase: ""



  }

  return (<div className="container"><h2 className="te" style={{ textAlign: 'center' }} >Registrar Proyecto </h2>
    <div className="row">
      <div className="col "></div>
    </div>
    <div style={{ padding: '1%' }}></div>
    <form onSubmit={e => {
      e.preventDefault();
      creadorDeProyecto({
        variables: {
          objGe: project.objetivosGenerales.value,
          objEs: project.objetivosEspecificos.value.split("/"),
          id_lider: localStorage.getItem("_id_usuario"),
          presupuesto: parseInt(project.presupuesto.value),
          nombreProyecto: project.nombreProyecto.value,
          lider: nombre_completo,
          fechaIni: "",
          fase: ""
        }
      })
      console.log(project.objetivosEspecificos.value.split("/"))
     window.location.href = "/misproyectos-lider";
     alert("Proyecto " + project.nombreProyecto.value+" Creado" )
    }} >
      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Nombre Proyecto</Form.Label>
          <Form.Control type="text" input ref={nombre => project.nombreProyecto = nombre} placeholder="Nombre" />
        </Form.Group>
      </div>

      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Objetivos Generales</Form.Label>
          <Form.Control type="text" input ref={objetivosGenerales => project.objetivosGenerales = objetivosGenerales} placeholder="Objetivos Generales" />
        </Form.Group>
      </div>
      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Objetivos Específicos</Form.Label>
          <Form.Control type="text" input ref={objetivosEspecificos => project.objetivosEspecificos = objetivosEspecificos} placeholder="Objetivos Específicos" />
          <Form.Text className="text-muted">
     Separe cada objetivo usando un slash "/" ; ej: obj 1<b>/</b>obj 2<b>/</b> obj 3<b>/</b>obj4...
    </Form.Text>
        </Form.Group>
      </div>
     
      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Presupuesto</Form.Label>
          <Form.Control type="number" input ref={presupuesto => project.presupuesto = presupuesto} placeholder="Presupuesto" />
        </Form.Group>
      </div>
      
      <div><Button variant="dark" type="submit" style={{ marginLeft: '40%' }} >Registrar Proyecto</Button></div>
    </form>
  </div>)

}

export default FormularioProyecto