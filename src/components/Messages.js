import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { db } from "../Firebase";
import { ChatContext } from "../context/ChatContext";
import '../style.css';
import { doc, onSnapshot } from "firebase/firestore";
function Messages(){
    const {data} = useContext(ChatContext);
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages);
        });

        return ()=>{
            unSub();
        }
    },[data.chatId]);
    return(
        <div className="messages">
            {messages.map((msg)=>(
                <Message message={msg} key = {msg.id}/>
           ))}
        </div>
    )
}

export default Messages;