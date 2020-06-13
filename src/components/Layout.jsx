import React from "react";
import {Link,withRouter} from "react-router-dom";

import {isAuth,signout} from '../class/storage'


const  Layout=({children,match,history})=>{

    const LinkChecker=path =>{
        if (match.path === path) return{color:'#000'}
        else return{color: '#6495ED'}
    }

    const nav=()=>
        (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to="/" style={LinkChecker('/')}>Home <span className="sr-only">(current)</span></Link>

                    {!isAuth() &&<> <Link className="nav-item nav-link" to="/signin" style={LinkChecker('/signin')} > Signin</Link>
                        <Link className="nav-item nav-link" to="/signup" style={LinkChecker('/signup')} > SignUp</Link> </>}

                    {isAuth() && <><Link className="nav-item nav-link" to="/user" > {isAuth().name}</Link>
                        <Link className="nav-item nav-link" to="/signin" style={LinkChecker('/signin')} onClick={()=>{signout(()=>{history.push('/')})}} > Signout</Link>

                    </>
                        }
                    <a className="nav-item nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </div>
            </div>
        </nav>);

    return(
        <>
            {nav()}
            <div className="container">{children}</div>
        </>
    );
}

export default withRouter(Layout);