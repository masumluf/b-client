import React, { Component,useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../../class/storage';

const PrivateRoute =({ Component:Component, ...rest})=>(

    <Route
        {...rest}
        render={
            props=> isAuth() ? (<Component {...rest} />):(<Redirect to='/signin' />)
        }
    >

    </Route>

);

export default PrivateRoute ;