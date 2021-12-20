import React from 'react';
import ProyectosAdmin from '../ProtectosAdmin/ProyectosAdmin';
import ProyectosEstudiante from '../ProyectosEstudiante/ProyectosEstudiante';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';

  

function ProyectosHome() {
  const user = {
    rol: localStorage.getItem("tipo_usuario"),
    estado: localStorage.getItem("estado"),
  }
  if (user.estado === 'Pendiente' || user.estado === 'No autorizado' )
    return <ForbidenComponent></ForbidenComponent>;
   if (user.rol === 'Estudiante' && user.estado == 'Autorizado' )
    return <ProyectosEstudiante></ProyectosEstudiante>;
    if (user.rol === 'Líder'  && user.estado == 'Autorizado')
    return <ProyectosAdmin></ProyectosAdmin>;
   if (user.rol === 'Administrador'  && user.estado  == 'Autorizado')
    return <ProyectosAdmin></ProyectosAdmin>;
    
   
      
    }
    
    export default ProyectosHome;