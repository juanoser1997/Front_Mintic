import React from "react";
import { Link } from 'react-router-dom'
import './NavbarStyles.css'
import { useAuth0 } from "@auth0/auth0-react";


function NavbarComponents() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const userlogged = {
    // rol:'lider',
    rol:'estudiante',
    //  rol:'pendiente',
    //  rol:'administrador',

    _id:'6195bf66eb635c2c3e729713'
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
            
          { userlogged.rol == 'estudiante' ||  userlogged.rol =="administrador"
        ? (<div><li class="nav-item">
        <Link to="/proyectos-home" class="nav-link nav" aria-current="page" href="#">Proyectos</Link>
      </li>
    </div>)
        : <div></div> }
          { userlogged.rol == 'estudiante' ||  userlogged.rol =="lider"
        ? (<div>
           <li class="nav-item"> 
              <Link to="/misproyectos-home" class="nav-link nav" href="#">Mis proyectos</Link>
            </li> </div>)
        : <div></div> }
              
             
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
          </ul>
        </div>
        <form class="d-flex">
          {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
          {/* <a class="" type="submit" onClick={() => loginWithRedirect()}>{isAuthenticated ? user.email: "Login"}</a> */}

        </form>
        <div class="dropdown">
          <a class=" dropdown-toggle navv0" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
            {isAuthenticated ? user.name : "Usuario"}
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button class="dropdown-item navv" type="button" onClick={() => loginWithRedirect()}>{isAuthenticated ? user.nickname : "login"}</button></li>

            {isAuthenticated ? <li> <button class="dropdown-item navv" type="button" onClick={() => logout({ returnTo: window.location.origin })}>Sign out</button>

            </li> : null}

          </ul>
        </div>
      </div>
    </nav>




  )
}
export default NavbarComponents;