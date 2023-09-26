import React, { useState, useEffect} from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from '../Firebase';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {Link, useNavigate} from "react-router-dom";
import '../style.css';
function Registration()
{
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        password: "",
      });
      // ...
    
      useEffect(() => {
        // Set initial values to empty strings to prevent autofill
        setFormData({
          ...formData,
          email: "",
          password: "",
        });
      }, []);
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        //const auth = getAuth();
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)

           const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on(
            (error) => {
                setError(true)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("URl is", downloadURL)
                    await updateProfile(res.user, {
                        displayName:displayName, 
                        photoURL:downloadURL,
                    });

                    await setDoc(doc(db, "users", res.user.uid),{
                        uid : res.user.uid,
                        displayName:displayName,
                        email,
                        photoURL:downloadURL,
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {});

                    navigate("/");
                })
                .catch((err) => {
                    setError(true);
                    console.error("Firestore update error:", err);
                });
                }

                
            )


            
            }
       
        catch(error){
            setError(true);
        }
       
        
    }
    return(
        <div className="container">
            <div className="wrapper">
                <span className="title">Registration</span>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" className="i" autoComplete="off"/>
                    <input type="email" placeholder="Email" className="i" autoComplete="off"/>
                    <input type="password" placeholder="Password" className="i" autoComplete="off"/>
                    <input type="file" ></input>
                    <button className="btn">Sign up</button>
                    {error && <span>Something went wrong </span>}
                  
                </form>
                <p className="para">You've already registered <Link to ="/Login"> Login </Link></p>
            </div>
        </div>
    )
}

export default Registration;