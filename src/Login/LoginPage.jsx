import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { useState } from "react";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";

const Login = () => {
    const [usuarioLog, setUsuarioLog] = useState("");
    const his = useHistory();
    let user;
    const [pass, setPass] = useState("")
    const AUTENTICAR_USUARIO = gql`
        mutation autenticar($usuario:String,$clave:String){
            autenticar(usuario:$usuario,clave:$clave){
                status
                jwt
            }
        }
    `
    const changeClave = (e) => {
        e.preventDefault();
        setPass(e.target.value)
    }
    const [auth] = useMutation(AUTENTICAR_USUARIO)
    const autenticar = async (e) => {
        setUsuarioLog(String(user.value));
        localStorage.setItem("usuarioLog", String(user.value));
        localStorage.getItem("usuarioLog");
        e.preventDefault();
        
        const { data: { autenticar } } = await auth({
            variables: {
                usuario: user.value,
                clave: pass
            }
        })
        if (autenticar.status != 200) {
            alert("Usuario y/o contrasena invalida")
        } else {
            localStorage.setItem('auth_token', autenticar.jwt)
            window.location.href = "/home";
            his.push("/home")
        }
    }
    const registroUsuarioNuevo = () => {
        his.push("/usuario/registro")
    }
    return <div className="container">
        <form>
                <h3>Autenticar</h3>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email" id="username" ref={u => user = u} />
                <label htmlFor="password" style={{ marginLeft: '2%' }}>Password</label>
                <input type="password" placeholder="Password" id="password"
                    value={pass}
                    onChange={changeClave} />
                <Button variant="dark" type="submit" style={{ marginLeft: '2%' }} onClick={autenticar}>Log In</Button>
                <Button variant="dark" type="submit" style={{ marginLeft: '2%' }} onClick={registroUsuarioNuevo}>Registro Usuario Nuevo</Button>

        </form>
    </div>
}

export default Login
