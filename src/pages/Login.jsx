import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";
import { useState } from "react";
import '../style.css';
function Login()
{

    const [error, setError] = useState(false);
    const [link, setLink] = useState(false);
    const [emailId, setEmailId] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        const email = e.target[0].value;
        const password = e.target[1].value;
      

        //const auth = getAuth();
        try{
           await signInWithEmailAndPassword(auth, email, password)
           navigate("/")
             
            }
       
        catch(error){
            setError(true);
        }
        
        
    }

    const handleClick=()=>{
        
        sendPasswordResetEmail(auth, emailId)
        .then(() => {
            // Password reset email sent!
            // ..
            setLink(true);
        })
        .catch((error) => {
            
            // ..
        });
    }
    
    return(
        <div className="container">
            <div className="wrapper">
                {link && <p className="password">A reset link has been sent to your registered email. Please use it to reset your password.</p>}
                <span className="title">Login</span>
                {/* <div className="form"> */}
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" className="i" onChange={(e)=>setEmailId(e.target.value)}/>
                    <input type="password" placeholder="Password" className="i"/>
                    <button className="btn">Log in</button>
                    {error && <span>Something went wrong</span>}
                  
                </form>
                <p onClick={handleClick} className="para-1">Forgot Password?</p>
                <p className="para-2">Need an account? <Link to = "/Register">Sign up here</Link> </p>
                {/* </div> */}
                
            </div>
        </div>
    )
}

export default Login;