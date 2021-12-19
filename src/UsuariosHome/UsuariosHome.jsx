import React from 'react';
import ListaUsuarios from '../ListarUsuarios/ListarUsuarios';
import ListarUsuariosEstudiantes from '../ListarUsuariosEstudiantes/ListarUsuariosEstudiantes';
import ProyectosAdmin from '../ProtectosAdmin/ProyectosAdmin';
import ProyectosEstudiante from '../ProyectosEstudiante/ProyectosEstudiante';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';

  

function UsuariosHome() {
  const user = {
    rol:'lider',
    //  rol:'pendiente',
    // rol:'administrador',
    _id:'6195bf66eb635c2c3e729713'
  }
   if (user.rol === 'lider')
    return <ListarUsuariosEstudiantes/>;
   if (user.rol === 'administrador')
    return <ListaUsuarios/>;
   if (user.rol === 'pendiente')
    return <ForbidenComponent></ForbidenComponent>;
      
    }
    
    export default UsuariosHome;