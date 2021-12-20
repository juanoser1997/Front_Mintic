import React from 'react';
import MisProyectosEstudiante from '../MisProyectosEstudiante/MisProyectosEstudiante';
import MisProyectosLider from '../MisProyectosLider/MisProyectosLider';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';


  

function MisProyectosHome() {
  const user = {
    rol: localStorage.getItem("tipo_usuario"),
    estado: localStorage.getItem("estado"),
  }
   if (user.rol === 'Estudiante'  && user.estado == "Autorizado")
    return <MisProyectosEstudiante></MisProyectosEstudiante>;
   if (user.rol === 'Líder' && user.estado == "Autorizado")
    return <MisProyectosLider></MisProyectosLider>;
    if (user.estado === 'Pendiente' || user.estado === 'No autorizado')
    return <ForbidenComponent></ForbidenComponent>;
    }
    
    export default MisProyectosHome;