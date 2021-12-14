import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
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

    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Identificacion</th>
                    <th>Estado</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    
                </tr>
                {data.usuarios.map((usuario) => <Usuario user={usuario} />)}
            </thead>
        </table>
    </div>
}

export default ListaUsuarios