import React, { Fragment, useEffect, useState } from "react";
import './HomeStyles.css'
import { Link } from 'react-router-dom'
import apiBaseUrl from "../shared/utils/Api";
import ForbidenComponent from "../shared/components/fordiben/ForbidenComponent";
import { useQuery, gql } from "@apollo/client";



const HomePage = () => {
    let usuarioLog = localStorage.getItem("usuarioLog");

    const CORREO = gql`
    query usuarioCorreo($usuarioLog: String) {
        usuarioCorreo(correo: $usuarioLog) {
        tipo_usuario
        nombre_completo
        _id
        identificacion      
        estado
    }
    }
  `;

  const { loading, error, data } = useQuery(CORREO, {
    variables: { usuarioLog },
    
  });
  if (loading) return <h1>Cargando....</h1>;
  console.log(data.usuarioCorreo.tipo_usuario)
  
    localStorage.setItem("nombre_completo", String(data.usuarioCorreo.nombre_completo));
    localStorage.setItem("_id_usuario", String(data.usuarioCorreo._id));
    localStorage.setItem("identificacion", String(data.usuarioCorreo.identificacion));
    localStorage.setItem("tipo_usuario", String(data.usuarioCorreo.tipo_usuario));
    localStorage.setItem("estado", String(data.usuarioCorreo.estado));
    
    
    return(
    <div className="container">
        <h1>
          Bienvenido al sistema de Gestión de Proyectos
        </h1>
    </div>
    )}
export default HomePage