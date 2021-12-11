import React from 'react';
import ProyectosAdmin from '../ProtectosAdmin/ProyectosAdmin';
import ProyectosEstudiante from '../ProyectosEstudiante/ProyectosEstudiante';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';

  

function ProyectosHome() {
  const user = {
    rol:'estudiante',
    //  rol:'pendiente',
    // rol:'administrador',
    _id:'6195bf66eb635c2c3e729713'
  }
   if (user.rol === 'estudiante')
    return <ProyectosEstudiante></ProyectosEstudiante>;
   if (user.rol === 'administrador')
    return <ProyectosAdmin></ProyectosAdmin>;
   if (user.rol === 'pendiente')
    return <ForbidenComponent></ForbidenComponent>;
      
    }
    
    export default ProyectosHome;