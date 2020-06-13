import React,{useState,useEffect } from "react";
import {Link,Redirect} from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import {ToastContainer,  toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from "jsonwebtoken"


toast.configure()

const AccountActivation=({match})=>{

    const [values, setValues] = useState({
        token:'',
        buttonText: 'Account Activation',
        activationMessage:'Account Activation Area,Please Click on the active button',
        buttonActivation:true
    });
    const { buttonText } = values;

    useEffect(()=>{
        let token=match.params.token
        setValues({...values,token})

    },[])

   const {token,activationMessage,buttonActivation}=values

    const sendRequest=async (e)=>{
        e.preventDefault();
        setValues({...values,buttonText: "requesting.."})
        try{

            let result=await axios(
                {
                    method:'POST',
                    url:`${process.env.REACT_APP_API_URL}/account-activation`,
                    data:{token}
                })
                if (result){
                    console.log(result)
                    toast.success(result.data.message)
                    setValues({...values,buttonText: "Submit",activationMessage: "Account Activated Successfully.",buttonActivation: false})
                }

        }catch (e) {
            console.log(e)
            toast.error(e.response.data.error)
            setValues({...values,activationMessage: "Invalid Token Found",buttonActivation: false})
        }
    }

    const Activation=()=>(
        <form>
            <div>
                { buttonActivation && <button className="btn btn-outline-primary"
                         onClick={sendRequest} >
                    {buttonText}
                </button>}
            </div>
        </form>
    )

    return(<Layout>
        <ToastContainer />
        <h1>{activationMessage}</h1>
        {Activation()}
    </Layout>)
}




export default AccountActivation;