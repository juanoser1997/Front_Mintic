import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";

const CrearUsuario = () => {
    const his = useHistory();

    let nombre_completo, identificacion, clave, tipo_usuario, correo

    const registrarUsuarioNuevo = async (e) => {
        e.preventDefault()
        let nuevoUsuario = {
            "nombre_completo": nombre_completo.value,
            "identificacion": parseInt(identificacion.value),
            "correo": correo.value,
            "tipo_usuario": tipo_usuario.value,
            "clave": clave.value,
            
        }
        const response = await crearUser({ variables: { user: nuevoUsuario } })
        if (response?.data?.createUser) {
            alert("Usuario Creado")
            his.push("/")
        } else {
            alert("Se presento un error")
        }
    }

    const CREAR_USUARIO = gql`
        mutation CreateUser($user: UserInput) {
            createUser(user: $user)
        }
    `
    const [crearUser] = useMutation(CREAR_USUARIO)



    return <div className="container">
        <h2 className="te" style={{ textAlign:'center',marginTop:'3%' }}>Crear Usuario  </h2>
        <form>
            <div className="form-group">
                <label>Nombre</label>
                <input className="form-control" ref={val => nombre_completo = val}></input>
            </div>
           
            <div className="form-group">
                <label>Identificacion</label>
                <input type="number" className="form-control" ref={val => identificacion = val}></input>
            </div>
            <div className="form-group">
                <label>Clave</label>
                <input type="password" className="form-control" ref={val => clave = val}></input>
            </div>
            <div className="form-group">
                <label>Correo</label>
                <input className="form-control" ref={val => correo = val}></input>
            </div>
            <div className="form-group">
                <label>Tipo de Usuario</label>
                <select className="form-control" ref={val => tipo_usuario = val}>
                    <option></option>
                    <option value="Líder">Líder</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Estudiante">Estudiante</option>
                </select>
            </div>
            <Button onClick={registrarUsuarioNuevo} variant="dark" style={{ marginLeft:'44%' }} >Registrarse </Button>
        </form>
    </div>
}

export default CrearUsuario;