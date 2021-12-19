import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Fragment } from "react";
import Usuario from './Usuario';



const ListaUsuarios = () => {
    const USUARIOS = gql`
    query {
        usuarios {
        nombre_completo
        identificacion
        estado
        correo
        tipo_usuario
      }
    }
`;
    const { data, loading, error } = useQuery(USUARIOS);
    let control = "usuarios"
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
        <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }} >Usuarios registrados </h2>
        <div className="row" style={{ padding:'5%',paddingTop:'1%', paddingBottom:'3%' }}>
          
      
        <hr className="lin"></hr>
        <table className="table">
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
          {data.usuarios.map((usuario) => <Usuario user={usuario} control = {control} />)}
        </tbody>
        </table>
        </div>
      
      </Fragment>
    
    )
}

export default ListaUsuarios