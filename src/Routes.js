import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import App from "./App"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"
import AccountActivation from "./components/auth/AccountActivation"
import Profile from "./components/auth/protected/Profile";
import PageAlert from "./components/PageAlert";
import PrivateRoute  from "./components/auth/protected/PrivateRoute";
import ForgetPassword from "./components/auth/ForgetPassword"
import ActiveForgetPassword from "./components/auth/ActiveForgetPassword"
import Admin from "./components/auth/Admin";
import AdminRoute from"./components/auth/protected/AdminRoute"


const Routes=()=>{
    return(
        <BrowserRouter>
          <Switch>
                <Route path="/" exact component={App}  />
                <Route path="/signup" component={Signup}  />
                <Route path="/signin" component={Signin}  />
                <Route path="/pagealert" component={PageAlert}  />
                <Route path="/auth/activation/:token" component={AccountActivation}  />
                <Route path="/forgetpassword" component={ForgetPassword}  />
                <Route path="/api/user/forget/password/active/:token" component={ActiveForgetPassword}  />
                <PrivateRoute path="/profile" Component={Profile}  exact  />
                <AdminRoute path="/admin" Component={Admin}  exact  />
          </Switch>
        </BrowserRouter>
    )
}

export default Routes;
