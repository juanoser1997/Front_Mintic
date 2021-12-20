import React from "react";
import { Link } from 'react-router-dom'
import './NavbarStyles.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import Image from 'react-bootstrap/Image'



function NavbarComponents() {

  const his = useHistory();
  let token = localStorage.getItem('auth_token')
  const { user, isAuthenticated } = useHistory();
  const cerrar = () => {
    localStorage.clear()
    window.location.href = "/";
    his.push("/")
  }
  if (token) {
    const userlogged = {
      rol: localStorage.getItem("tipo_usuario"),
      estado: localStorage.getItem("estado"),
      nombre_completo: localStorage.getItem("nombre_completo"),
    }

    return (




      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark nav">
        <div class="container-fluid contain">
          <Link to="/home" class="navbar-brand nav" href="#">Udea Proyectos</Link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav" >
            <ul class="navbar-nav">

              {userlogged.rol == 'Estudiante' || userlogged.rol == "Administrador"
                ? (<div><li class="nav-item">
                  <Link to="/proyectos-home" class="nav-link nav" aria-current="page" href="#">Proyectos</Link>
                </li>
                </div>)
                : <div></div>}
              {userlogged.rol == 'Estudiante' || userlogged.rol == "Líder"
                ? (<div>
                  <li class="nav-item">
                    <Link to="/misproyectos-home" class="nav-link nav" href="#">Mis proyectos</Link>
                  </li> </div>)
                : <div></div>}
              {userlogged.rol == 'Administrador' || userlogged.rol == "Líder"
                ? (<div>
                     <li class="nav-item">
                <Link to="/usuarios-home" class="nav-link nav" href="#">Usuarios</Link>
              </li>
             </div>)
                : <div></div>}
            </ul>
          </div>
          <span>
          <Link  to={"/mi-usuario"}  aria-expanded="false"><Button variant="success" style={{ marginRight: "10px"}}   >
       { "Usuario : " + userlogged.nombre_completo + " / "+ userlogged.rol}</Button>
            </Link>
              </span>
       
          <div >
          <li className="nav-item" >
                <Button onClick={cerrar}>Cerrar sesión</Button>
              </li>
         
          </div>
        </div>
      </nav>




    )
  }
  else {

    his.push("/")
    return ( <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark nav">
        <div class="container-fluid contain">
          <Link to="/" class="navbar-brand nav" href="#"> Udea Proyectos</Link>
          </div>
      </nav>
   
    </div>
  )
  }
}
export default NavbarComponents;
