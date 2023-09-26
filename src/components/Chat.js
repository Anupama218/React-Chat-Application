import React, { useContext } from "react";
import '../style.css';
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
function Chat(){
    const {data} = useContext(ChatContext);
    

   
    return (
         <div className="chat">
            <div className="info">
               <img src = {data.user?.photoURL} className="img" alt = "Loading"/>
                <p className="p">{data.user?.displayName}</p>
                
            </div>
            <Messages/>
            <Input/>

            
            
           
        </div>
    )
}

export default Chat;