import React from 'react';
import MisProyectosEstudiante from '../MisProyectosEstudiante/MisProyectosEstudiante';
import MisProyectosLider from '../MisProyectosLider/MisProyectosLider';
import ForbidenComponent from '../shared/components/fordiben/ForbidenComponent';


  

function MisProyectosHome() {
  const user = {
    // rol:'estudiante',
    rol:'lider',
    // rol:'pendiente',
    _id:'6195bf66eb635c2c3e729713',
    varible: false
  }
   if (user.rol === 'estudiante')
    return <MisProyectosEstudiante></MisProyectosEstudiante>;
   if (user.rol === 'lider')
    return <MisProyectosLider></MisProyectosLider>;
    if (user.rol === 'pendiente')
    return <ForbidenComponent></ForbidenComponent>;
    if( user.varible == false)
    window.location.href = "/editar-proyecto";

    }
    
    export default MisProyectosHome;