import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { AuthContext } from "../context/Authcontext";
function Navbar(){
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="navbar">
            <span className="p">{currentUser.displayName}</span>
            <img src={currentUser.photoURL} alt = "img" className="img"/>
            <button onClick = {()=>signOut(auth)} className="btn">Sign Out</button>
        </div>
        
    )
}

export default Navbar;