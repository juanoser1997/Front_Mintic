import React from 'react';
import ListaUsuarios from '../ListarUsuarios/ListarUsuarios';
import ListarUsuariosEstudiantes from '../ListarUsuariosEstudiantes/ListarUsuariosEstudiantes';
import ProyectosAdmin from '../ProtectosAdmin/ProyectosAdmin';
import ProyectosEstudiante from '../ProyectosEstudiante/ProyectosEstudiante';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';

  

function UsuariosHome() {
  const user = {
    rol: localStorage.getItem("tipo_usuario"),
    estado: localStorage.getItem("estado"),
  }
   if (user.rol === 'Líder')
    return <ListarUsuariosEstudiantes/>;
   if (user.rol === 'Administrador')
    return <ListaUsuarios/>;
   if (user.rol === 'Estudiante')
    return <ForbidenComponent></ForbidenComponent>;
      
    }
    
    export default UsuariosHome;