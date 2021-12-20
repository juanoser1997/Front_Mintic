import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { useState } from "react";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import { Card } from "react-bootstrap";

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
            localStorage.setItem("cuenta",0)
            window.location.href = "/home";
            his.push("/home")
        }
    }
    const registroUsuarioNuevo = () => {
        his.push("/usuario/registro")
    }
    return <div className="container">
        {/* <Form>
            <br />
       
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Correo</Form.Label>
    <Form.Control type="email" placeholder="Ingrese el correo" id="username" ref={u => user = u}  />
    <Form.Text className="text-muted">
      Ingrese el correo con el que se registró en la plataforma 
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Contraseña</Form.Label>
    <Form.Control type="password" placeholder="Contraseña" id="password" value={pass} onChange={changeClave} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <span>
  <Button variant="primary"  style={{ marginLeft: '2%' }} type="submit"onClick={autenticar}>Log In
  </Button>
  <Button variant="primary" style={{ marginLeft: '2%' }}  type="submit"onClick={registroUsuarioNuevo}>Registro Usuario Nuevo
  </Button>
  </span>
</Form> */}
 <br />
 <span>
 <h1 style={{textAlign:"center", marginTop:"10%"}}>
         Plataforma de Gestión de Proyectos UDEA
        </h1>
  </span>
<Card  style={{marginTop:"5%", borderRadius:"20px"}}>
  <Card.Header  style={{backgroundColor: "black" , borderRadius:"15px"}}> <h3 style={{textAlign:"center", color: "lightgray"}}>Autenticar</h3></Card.Header>
  <Card.Body>
    <Card.Title style={{textAlign:"center"}} >ingrese sus datos</Card.Title>
    <Form>
          
       
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Correo</Form.Label>
    <Form.Control type="email" placeholder="Ingrese el correo" id="username" ref={u => user = u}  />
    <Form.Text className="text-muted">
      Ingrese el correo con el que se registró en la plataforma 
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Contraseña</Form.Label>
    <Form.Control type="password" placeholder="Contraseña" id="password" value={pass} onChange={changeClave} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  
  </Form.Group>
  <span style={{ marginLeft: '38%' }}>
  <Button variant="dark"  style={{ marginLeft: '2%' }} type="submit"onClick={autenticar}>Log In
  </Button>
  <Button variant="dark" style={{ marginLeft: '2%' }}  type="submit"onClick={registroUsuarioNuevo}>Registro Usuario Nuevo
  </Button>
  </span>
</Form>
    
  </Card.Body>
</Card>
<img src="https://www.udea.edu.co/wps/wcm/connect/udea/0318df88-160e-402b-90c5-bfab4712aa1f/Logos%C3%ADmbolo+Universidad+de+Antioquia+horizontal+%C2%AE-01.png?MOD=AJPERES&CVID=nG2syxx" style={{width:"30%",marginLeft: "33%"}} />
        {/* <form>
                <h3>Autenticar</h3>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email" id="username" ref={u => user = u} />
                <label htmlFor="password" style={{ marginLeft: '2%' }}>Password</label>
                <input type="password" placeholder="Password" id="password"
                    value={pass}
                    onChange={changeClave} />
                <Button variant="dark" type="submit" style={{ marginLeft: '2%' }} onClick={autenticar}>Log In</Button>
                <Button variant="dark" type="submit" style={{ marginLeft: '2%' }} onClick={registroUsuarioNuevo}>Registro Usuario Nuevo</Button>

        </form> */}
    </div>
}

export default Login
