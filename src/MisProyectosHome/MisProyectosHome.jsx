import React from 'react';
import MisProyectosEstudiante from '../MisProyectosEstudiante/MisProyectosEstudiante';
import MisProyectosLider from '../MisProyectosLider/MisProyectosLider';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';


  

function MisProyectosHome() {
  const user = {
    rol: localStorage.getItem("tipo_usuario"),
    estado: localStorage.getItem("estado"),

    //  rol:'pendiente',
    
    
  }
   if (user.rol === 'Estudiante'  && user.estado!= 'Pendiente')
    return <MisProyectosEstudiante></MisProyectosEstudiante>;
   if (user.rol === 'Líder' && user.estado!= 'Pendiente')
    return <MisProyectosLider></MisProyectosLider>;
    if (user.estado === 'Pendiente')
    return <ForbidenComponent></ForbidenComponent>;
    

    }
    
    export default MisProyectosHome;