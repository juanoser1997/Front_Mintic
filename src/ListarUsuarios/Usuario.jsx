import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import Button from "react-bootstrap/Button";

const Usuario = ({ user , control}) => {

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

        if (control == "estudiantes"){
        window.location.href = "/listar-usuarios-estudiantes";
      localStorage.setItem("estado", 'Autorizado')
        }
        if (control == "usuarios"){
        window.location.href = "/listar-usuarios";
      localStorage.setItem("estado", 'Autorizado')
        }
        alert("Usted Ha autorizado al " +  user.tipo_usuario+ " "  + user.nombre_completo)

    }

    const eliminarUser = () => {
        eliminar({ variables: { ident: user.identificacion } })
        

    }

    const inactivarUser = () => {
        inactivar({ variables: { ide: user.identificacion } })
        if (control == "estudiantes")
        window.location.href = "/listar-usuarios-estudiantes";
        if (control == "usuarios")
        window.location.href = "/listar-usuarios";
        alert(" el  " +  user.tipo_usuario+ " "  + user.nombre_completo + " ahora no está autorizado")
    }

    return <tr>
        <td>{user.nombre_completo}</td>
        <td>{user.identificacion}</td>
        <td>{user.estado}</td>
        <td>{user.correo}</td>
        <td>{user.tipo_usuario}</td>
        <td><Button variant="dark" style={{ marginLeft:'2%', borderRadius:'10px' }} onClick={activarUser}>Autorizar</Button>
        
            {/* <button className="btn btn-primary" onClick={eliminarUser}>No autorizar</button></td> */}
            {localStorage.getItem("tipo_usuario") != 'Líder' ? <Button variant="dark" style={{ marginLeft:'2%', borderRadius:'10px' }} onClick={inactivarUser}>No Autorizar</Button>: <div></div> }
            </td>
    </tr>
}

export default Usuario
