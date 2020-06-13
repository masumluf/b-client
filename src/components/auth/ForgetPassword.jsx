import React,{useState,useEffect } from "react";
import {Link,Redirect} from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import {ToastContainer,  toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from "jsonwebtoken"


toast.configure()

const ForgetPassword=({match})=>{

    const [values, setValues] = useState({
        email:'',
        error:'',
        buttonText: 'Send Request',
        activationMessage:'To reset Your password Please put your registered Email address.',
        buttonActivation:true,
        boxStatus:true,
        finalMessage:''
    });


    const {email,activationMessage,buttonActivation,buttonText,error,boxStatus,finalMessage}=values

    const handleChange=(name)=>(e)=>{

        setValues({ ...values, [name]: e.target.value });
    }



    const sendRequest=async (e)=>{
        e.preventDefault();
        setValues({...values,buttonText: "requesting.."})
        try{

            let result=await axios(
                {
                    method:'POST',
                    url:`${process.env.REACT_APP_API_URL}/user/forget/password`,
                    data:{email}
                })
                if (result){
                    console.log(result)
                    toast.success(result.data.message)
                    setValues({...values,buttonText: "Submit",activationMessage: "Account Activated Successfully.",buttonActivation: false,boxStatus: false,finalMessage: "Email Has Been Sent.Please check Your Email"})
                }

        }catch (e) {
            console.log(e.response.data.error)
            toast.error(e.response.data.error)
            setValues({...values,error: e.response.data.error})
        }
    }

    const Activation=()=>(


        <form>

            {boxStatus && <div className="form-group">
                 <lable className="text-muted">Email</lable>
                <input onChange={handleChange('email')} value={email} type="email"
                       className={error.email ? ' form-control is-invalid' : ' form-control'}/>
                <div className=" invalid-feedback">
                    {error.email}
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
        <h1>{finalMessage}</h1>
        {Activation()}
    </Layout>)
}




export default ForgetPassword;