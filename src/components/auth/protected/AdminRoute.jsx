import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../../class/storage';

const AdminRoute =({ Component, ...rest})=>(
    <Route
        {...rest}
        render={
            props=> isAuth() && isAuth().role === 'admin' ? (<Component {...rest} />):(<Redirect to='/pagealert' />)
        }
    >

    </Route>
);

export default AdminRoute ;