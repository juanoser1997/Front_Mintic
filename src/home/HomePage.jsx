import React, { Fragment, useEffect, useState } from "react";
import './HomeStyles.css'
import { Link } from 'react-router-dom'
import apiBaseUrl from "../shared/utils/Api";
import ForbidenComponent from "../shared/components/fordiben/ForbidenComponent";
import { useAuth0 } from "@auth0/auth0-react";



function HomePage() {
    const [services, setServices] = useState([]);
    const [validUser, setValidUser] = useState(false);
    const { user, isAuthenticated } = useAuth0();
   
   
    const addUser = async (name,role,email,autorizado) => {
        const productData = {
            
            name: name,
            role: role,
            email: email,
           autorizado: autorizado,
        }
        const response = await fetch(`http://localhost:3001/add-users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }

      const userExist = async (logUserEmail) => {
        let exist=false;
        try {
          const response = await fetch("http://localhost:3001/get-users");
          const jsonResponse = await response.json();
          const responseServices = jsonResponse.data;

            responseServices.map((user) => {
           if(user.email  == logUserEmail) {
               
            exist=true;
           }
    
          });
         
        
        } catch (error) {
          console.log(error);
        }
            console.log(exist);
    
        return exist;
      };
   
    if( isAuthenticated == true){
    console.log(user.email)
    
  let exist=userExist(user.email)
 if(exist==false){
  addUser(user.name,"Admin",user.email,"Si");
}
  console.log(exist)

   }


   
  
  

    const getService = async () => {
        try {
            const response = await fetch("http://localhost:3001/get-Service");
            const jsonResponse = await response.json();
            const responseServices = jsonResponse.data;
            const listservices = responseServices.map((service) =>
                <tr>
                    <th scope="row">{service.id}</th>
                    <td>{service.detalle}</td>
                    <td>{service.valor}</td>
                    <td>{service.estado}</td>
                </tr>
            );
            setServices(listservices)
        }
        catch (error) {
            console.log(error)
        }
    }

    const validateUserRole = async () => {
        const response = await fetch(`http://localhost:3001/get-user?email=${user.email}`);
        const jsonResponse = await response.json();
        return jsonResponse;
    }

    const grantAccess = async () => {
        let userData;
        if (isAuthenticated) {
            userData = await validateUserRole();
        }
        else {
            // window.location.href = "https://dev-hhz06300.us.auth0.com/u/login?state=hKFo2SBKcmFxZUJaZUxvSURwT0FyQWxRUHQzemVlamc4M3IwRKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHZoeXZIb0dJT0pKX0Nvb05aQTVscXBoLXc0azFvTm50o2NpZNkgMmZaemNrR1FKZzJoVTRhUWpGcXNWSXNwZWplRUVvYXE"
            setValidUser(false);
            return;
        }
        if (userData) {
            if (userData.role != 'Invited') {
                setValidUser(true);
                localStorage.setItem("state", 'Admin');
                await getService();
                
            }
            else {
                setValidUser(false);
            }
        }
        else {
            setValidUser(false);
        }
    }

    useEffect(() => {
        grantAccess();

        // getService();
    }, [isAuthenticated,validUser]);
    return (
        <Fragment>

                <hr class="linea"></hr>

            <h2 className="te" style={{textAlign:"center"}}>BIENVENIDO AL SISTEMA DE GESTIÓN DE PROYECTOS DE INVESTIGACIÓN</h2>
            <div className="row">
              
            </div>
            <hr class="linea line0"></hr>
            <div class="row row0">
                
                
            </div>
            


            

            {/* <!-- Button trigger modal --> */}



        </Fragment>

    )


}
export default HomePage;