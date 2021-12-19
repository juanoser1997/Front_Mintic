import React from "react";
import { Link } from 'react-router-dom'
import './NavbarStyles.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";


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
    }

    return (



      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark nav">
        <div class="container-fluid contain">
          <Link to="/" class="navbar-brand nav" href="#">Udea Proyectos</Link>

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


              <li class="nav-item">
                <Link to="/mi-usuario" class="nav-link nav" href="#">Mi Usuario</Link>
              </li>
              <li class="nav-item">
                <Link to="/usuarios-home" class="nav-link nav" href="#">Usuario</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Usuarios
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><Link to="/listar-usuarios" className="dropdown-item" href="#">Usuarios Registrados</Link></li>
                  <li><Link to="/listar-usuarios-estudiantes" className="dropdown-item" href="#">Estudiantes Registrados</Link></li>


                </ul>
              </li>
              <li className="nav-item" >
                <button onClick={cerrar}>Cerrar sesión</button>
              </li>
            </ul>
          </div>
          <form class="d-flex">
            
          </form>
          <div class="dropdown">
            <a class=" dropdown-toggle navv0" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              {isAuthenticated ? user.name : "Usuario"}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
           

              

          

            </ul>
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
          <Link to="/" class="navbar-brand nav" href="#">Udea Proyectos</Link>
          </div>
      </nav>
    </div>
  )
  }
}
export default NavbarComponents;

/* 

import React from "react";
import { Link } from 'react-router-dom'
import './NavbarStyles.css'
import { useHistory } from "react-router";


const NavbarComponents = () => {
  const his = useHistory();
  let token = localStorage.getItem('auth_token')
  const { user, isAuthenticated } = useHistory();
  const cerrar = () => {
    localStorage.clear()
    his.push("/")
  }
  if (token) {

    return (

      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark nav">
        <div class="container-fluid contain">
          <div class="collapse navbar-collapse" id="navbarNav" >
            <ul class="navbar-nav">
            <li class="nav-item">
                <Link to="/home" class="nav-link nav" aria-current="page" href="#">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/proyectos-home" class="nav-link nav" aria-current="page" href="#">Proyectos</Link>
              </li>
              <li class="nav-item">
                <Link to="/misproyectos-home" class="nav-link nav" href="#">Mis proyectos</Link>
              </li>
              <li class="nav-item">
                <Link to="/mi-usuario" class="nav-link nav" href="#">Mi usuario</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Usuarios
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><Link to="/listar-usuarios" className="dropdown-item" href="#">Usuarios Registrados</Link></li>
                  <li><Link to="/listar-usuarios-estudiantes" className="dropdown-item" href="#">Estudiantes Registrados</Link></li>

                </ul>
              </li>
              <li className="nav-item" >
                <button onClick={cerrar}>Cerrar sesión</button>
              </li>
            </ul>
          </div>
          <form class="d-flex">
                    <button className="btn btn-outline-success" type="submit">{isAuthenticated ? user.nombre_completo  : "User"}</button>
          </form>
        </div>
      </nav>




    )
  }
  else {

    his.push("/")
    return <div></div>
  }
}
export default NavbarComponents; */