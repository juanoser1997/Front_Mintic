import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import Button from "react-bootstrap/Button";

const Usuario = ({ user }) => {

    /*
        mutation{
            activeUser(identificacion:224465)
        }
    /*/
    const ACTIVAR_USUARIO = gql`
        mutation activeUser($identificacion:Int){
            activeUser(identificacion:$identificacion)
        }
    `
    const INACTIVAR_USUARIO = gql`
        mutation inactivateUser($ide:Int){
            inactivateUser(ide:$ide)
        }
    `
    const ELIMINAR_USUARIO = gql`
        mutation deleteUser($ident:Int){
            deleteUser(ident:$ident)
        }
    `
    const [activar] = useMutation(ACTIVAR_USUARIO)
    const [eliminar] = useMutation(ELIMINAR_USUARIO)
    const [inactivar] = useMutation(INACTIVAR_USUARIO)


    const activarUser = () => {
        activar({ variables: { identificacion: user.identificacion } })
        localStorage.setItem("estado", 'Autorizado')
    }

    const eliminarUser = () => {
        eliminar({ variables: { ident: user.identificacion } })
    }

    const inactivarUser = () => {
        inactivar({ variables: { ide: user.identificacion } })
    }

    return <tr>
        <td>{user.nombre_completo}</td>
        <td>{user.identificacion}</td>
        <td>{user.estado}</td>
        <td>{user.correo}</td>
        <td>{user.tipo_usuario}</td>
        <td><Button variant="dark" style={{ marginLeft:'2%', borderRadius:'10px' }} onClick={activarUser}>Autorizar</Button>
        
            {/* <button className="btn btn-primary" onClick={eliminarUser}>No autorizar</button></td> */}
            <Button variant="dark" style={{ marginLeft:'2%', borderRadius:'10px' }} onClick={inactivarUser}>No Autorizar</Button></td>
    </tr>
}

export default Usuario
