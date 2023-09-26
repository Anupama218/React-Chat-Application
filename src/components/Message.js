import React, { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext";
import '../style.css';
function Message({message}){
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    return(
        <div className={`message ${message.senderId === currentUser.uid && "send"}`}>
            
            <div className="messageinfo">
            <img src = {
                    message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL} 
              className="profileimg" alt = "Loading"/>
            </div>
            <div className="content">
            <p className="p">{message.text}</p>
            {message.img && <img src = {message.img} className="img" alt = ""/>}
            </div>
        </div>
    )
}

export default Message;