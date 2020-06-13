import React,{useState,useEffect } from "react";
import {Link,Redirect} from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import {ToastContainer,  toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from "jsonwebtoken"


toast.configure()

const AccountActivation=({match,history})=>{

    const [values, setValues] = useState({
        token:'',
        error:'',
        password:'',
        repassword:'',
        buttonText: 'Change Password',
        activationMessage:'Please put your New password',
        buttonActivation:true,
        boxStatus:true
    });
    const {token,email,activationMessage,buttonActivation,buttonText,error,boxStatus,finalMessage,password,repassword}=values
    const handleChange=(name)=>(e)=>{

        setValues({ ...values, [name]: e.target.value });
    }


    useEffect(()=>{
        let token=match.params.token
        setValues({...values,token})
        //console.log(token)

    },[])



    const sendRequest=async (e)=>{
        e.preventDefault();
        setValues({...values,buttonText: "requesting.."})
        try{

            let result=await axios(
                {
                    method:'POST',
                    url:`${process.env.REACT_APP_API_URL}/user/forget/password/active`,
                    data:{token,password,repassword}
                })
                if (result){
                    console.log(result.data.message)
                    toast.success(result.data.message);

                    setValues({...values,buttonText: "Submit",activationMessage: "Password Has Been Changed",buttonActivation: false,boxStatus: false});
                    setTimeout(function(){
                        console.log("password changed") }, 2000);
                    history.push('/signin');


                }

        }catch (e) {
            console.log(e)
            toast.error(e.response.data.error)
            setValues({...values,activationMessage: "Invalid Token Found",buttonActivation: false,error: e.response.data.error})
        }
    }

    const Activation=()=>(
        <form>

            {boxStatus &&<div className="form-group">
                <lable className="text-muted">Password</lable>
                <input onChange={handleChange('password')} type="password"
                       className={error.password ? ' form-control is-invalid' : ' form-control'}/>
                <div className=" invalid-feedback">
                    {error.password}
                </div>
            </div>}

            {boxStatus && <div className="form-group">
                <lable className="text-muted">Re-Password</lable>
                <input onChange={handleChange('repassword')} type="password"
                       className={error.repassword ? ' form-control is-invalid' : ' form-control'}/>
                <div className=" invalid-feedback">
                    {error.repassword}
                </div>
            </div>}

            {boxStatus &&<div>
                <button className="btn btn-outline-primary"
                        onClick={sendRequest}>
                    {buttonText}
                </button>
            </div>}
        </form>
    )

    return(<Layout>
        <ToastContainer />
        <h1>{activationMessage}</h1>
        {Activation()}
    </Layout>)
}




export default AccountActivation;