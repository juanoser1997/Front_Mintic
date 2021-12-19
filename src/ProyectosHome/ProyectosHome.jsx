import React from 'react';
import ProyectosAdmin from '../ProtectosAdmin/ProyectosAdmin';
import ProyectosEstudiante from '../ProyectosEstudiante/ProyectosEstudiante';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';

  

function ProyectosHome() {
  const user = {
    rol: localStorage.getItem("tipo_usuario"),
    estado: localStorage.getItem("estado"),

    //  rol:'pendiente',
    
    
  }
  if (user.estado === 'Pendiente')
    return <ForbidenComponent></ForbidenComponent>;
   if (user.rol === 'Estudiante' && user.estado!= 'Pendiente')
    return <ProyectosEstudiante></ProyectosEstudiante>;
    if (user.rol === 'Líder'  && user.estado!= 'Pendiente')
    return <ProyectosAdmin></ProyectosAdmin>;
   if (user.rol === 'Administrador'  && user.estado!= 'Pendiente')
    return <ProyectosAdmin></ProyectosAdmin>;
    
   
      
    }
    
    export default ProyectosHome;