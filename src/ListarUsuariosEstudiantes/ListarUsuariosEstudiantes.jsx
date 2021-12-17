import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Fragment } from "react";
import Usuario from '../ListarUsuarios/Usuario';



const ListarUsuariosEstudiantes = () => {
    const USUARIOSESTUDIANTES = gql`
    query {
        usuariosEstudiantes {
        nombre_completo
        identificacion
        estado
        correo
        tipo_usuario
      }
    }
`;
    const { data, loading, error } = useQuery(USUARIOSESTUDIANTES);

    if (loading) {
        return <div>
            <p>Estoy cargando aún</p>
        </div>
    }

    if (error) {
        return <div>
            <p>Hubo un error</p>
        </div>
    }

    return (
        <Fragment>
        <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }} >Estudiantes registrados </h2>
        <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
          
      
        <hr className="lin"></hr>
        <table className="table row1">
          {" "}
          <thead className="table-dark">
            {" "}
            <tr>
            <th>Nombre</th>
                    <th>Identificacion</th>
                    <th>Estado</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    <th></th>
            </tr>
          </thead>
          <tbody> 
          {data.usuariosEstudiantes.map((usuario) => <Usuario user={usuario} />)}
        </tbody>
        </table>
        </div>
      
      </Fragment>
    );
    
    
    

}

export default ListarUsuariosEstudiantes