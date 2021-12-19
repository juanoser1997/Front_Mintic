import React, { Fragment } from "react";
import { Redirect, Router } from "react-router";

import NavbarComponents from "./shared/components/navbar/NavbarComponents";
import { BrowserRouter as Rou, Switch, Route, Link } from 'react-router-dom'

import ProyectosAdmin from "./ProtectosAdmin/ProyectosAdmin.jsx";
import ProyectosEstudiante from "./ProyectosEstudiante/ProyectosEstudiante.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ForbidenComponent from "./shared/components/fordiben/ForbidenComponent.jsx";


import ElementContextProvider from "./context/elementContext.js";


import ProyectosHome from "./ProyectosHome/ProyectosHome.jsx";
import MisProyectosHome from "./MisProyectosHome/MisProyectosHome.jsx";
import EditarProyectoAdmin from "./ProtectosAdmin/EditarProyectoAmin.jsx";
import ProyectoPendiente from "./ProtectosAdmin/ProyectoPendiente.jsx";
import FormularioAvance from "./MisProyectosEstudiante/FormularioAvance.jsx";
import ListaAvances from "./MisProyectosEstudiante/ListaAvances.jsx";
import MisProyectosLider from "./MisProyectosLider/MisProyectosLider.jsx";
import FormularioProyecto from "./MisProyectosLider/FormularioProyecto.jsx";
import EditarProyecto from "./MisProyectosLider/EditarProyecto.jsx";
import RegistrarObservacion from "./MisProyectosLider/RegistrarObservacion.jsx";
import ListarUsuarios from "./ListarUsuarios/ListarUsuarios";
import ListarUsuariosEstudiantes from "./ListarUsuariosEstudiantes/ListarUsuariosEstudiantes";
import Inscripciones from "./MisProyectosLider/Inscripciones";
import ListaAvancesLider from "./MisProyectosLider/ListaAvancesLider";
import CrearAvance from "./MisProyectosEstudiante/CrearAvance";
import MiUsuario from "./MiUsuario/MiUsuario";
import Login from "./Login/LoginPage";
import HomePage from "./home/HomePage";
import CrearUsuario from "./CrearUsuario/CrearUsuario";
function App() {
  

  return (
    <ElementContextProvider>
    

    <Rou>
      <NavbarComponents />

      <Switch>


        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/usuario/registro" exact>
          <CrearUsuario />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        
        <Route path="/proyectos-admin" exact>
          <ProyectosAdmin />
        </Route>
        <Route path="/editar-proyecto-admin" exact>
          <EditarProyectoAdmin />
        </Route>
        <Route path="/editar-proyecto-admin-pendiente" exact>
          <ProyectoPendiente />
        </Route>
        <Route path="/proyectos-estudiante">
          <ProyectosEstudiante />
        </Route>
        <Route path="/formulario-avance">
          <FormularioAvance />
        </Route>
        <Route path="/lista-avances">
          <ListaAvances />
        </Route>
       +
        <Route path="/mi-usuario" exact>
          <MiUsuario />

        </Route>
        <Route path="/proyectos-home" exact>
          <ProyectosHome />
        </Route>
        <Route path="/misproyectos-home" exact>
          <MisProyectosHome />
        </Route>
        <Route path="/misproyectos-lider" exact>
          <MisProyectosLider />
        </Route>
        <Route path="/formulario-proyecto" exact>
          <FormularioProyecto />
        </Route>
        <Route path="/editar-proyecto" exact>
          <EditarProyecto />
        </Route>
        <Route path="/registrar-observacion" exact>
          <RegistrarObservacion />
        </Route>

        <Route path="/listar-usuarios" exact>
          <ListarUsuarios />
        </Route>
        <Route path="/listar-usuarios-estudiantes" exact>
          <ListarUsuariosEstudiantes />
        </Route>

     
        <Route path="/inscripciones" exact>
          <Inscripciones/>
        </Route>
     
        <Route path="/lista-avances-lider" exact>
          <ListaAvancesLider/>
        </Route>
        <Route path="/crear-avance" exact>
          <CrearAvance></CrearAvance>
        </Route>
     
      

        <Route path="/forbbiden" exact>
          <ForbidenComponent />

        </Route>
        


      </Switch>
    </Rou>
    </ElementContextProvider>    
  );
}

export default App;
