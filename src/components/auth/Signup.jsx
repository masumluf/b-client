import React,{useState} from "react";
import {Link,Redirect} from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import {ToastContainer,  toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')

var myEnv = dotenv.config()
dotenvExpand(myEnv)

toast.configure()

const Signup=()=>{

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        repassword:'',
        buttonText: 'Submit'
    });

    const [error,setError]=useState({})
    const { name, email, password, buttonText,repassword } = values;

    const handleChange=(name)=>(e)=>{

        setValues({ ...values, [name]: e.target.value });
    }

    const sendRequest=async (e)=>{
        e.preventDefault();
        setValues({...values,buttonText: "requesting.."})
        // axios({
        //     method:'POST',
        //     url:`http://localhost:8000/api/signup`,
        //     data:{name,email,password,repassword}
        // })
        //     .then(res=>{
        //         console.log(res)
        //         toast.success("Success")
        //         setValues({...values,buttonText: "Submit"})
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //         toast.error("Failed")
        //         setValues({...values,buttonText: "Submit"})
        //     })
        try{

            let result=await axios(
                {
                    method:'POST',
                    url:`${process.env.REACT_APP_API_URL}/signup`,
                    data:{name,email,password,repassword}
                })
                if (result){
                    //console.log(result)
                    toast.success(result.data.message)
                    setValues({...values,buttonText: "Submit"})
                }

        }catch (e) {
            //console.log(e.response.data.error);
            toast.error(e.response.data.error)
            setError(e.response.data.error)
            setValues({...values,buttonText: "Submit"})
        }
    }

    const signUpForm=()=>(
        <form>
            <div className="form-group">
                <lable className="text-muted">Name</lable>
                <input onChange={handleChange('name')} value={name} type="text" className={error.name ?' form-control is-invalid':' form-control'} />
                <div className=" invalid-feedback">
                    {error.name}
                </div>
            </div>

            <div className="form-group">
                <lable className="text-muted">Email</lable>
                <input onChange={handleChange('email')} value={email}  type="email" className={error.email ?' form-control is-invalid':' form-control'} />
                <div className=" invalid-feedback">
                    {error.email}
                </div>
            </div>

            <div className="form-group">
                <lable className="text-muted">Password</lable>
                <input onChange={handleChange('password')} value={password}  type="password" className={error.password ?' form-control is-invalid':' form-control'} />
                <div className=" invalid-feedback">
                    {error.password}
                </div>
            </div>
            <div className="form-group">
                <lable className="text-muted">Confirm Password</lable>
                <input onChange={handleChange('repassword')} value={repassword}  type="password" className={error.repassword ?' form-control is-invalid':' form-control'} />
                <div className=" invalid-feedback">
                    {error.repassword}
                </div>
            </div>

            <div>
                <button className="btn btn-primary" onClick={sendRequest}>
                    {buttonText}
                </button>
            </div>
        </form>
    )

    return(<Layout>
        <ToastContainer />
        <h1>SignUp Page</h1>
        {signUpForm()}
    </Layout>)
}




export default Signup;