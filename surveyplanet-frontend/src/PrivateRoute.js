import React from 'react'

import {Route, Redirect} from 'react-router-dom'


export const IsAdminRoute = ({component:Component, ...rest})=> {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const is_superUser = userInfo.is_superuser
    console.log(is_superUser);
   
    
    return (
      <Route {...rest} component={props =>(
        is_superUser ? ( <Component  />) : (<Redirect to="/" />)
      )}  />
    )
}

