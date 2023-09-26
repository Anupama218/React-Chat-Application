import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import '../style.css';
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../Firebase";
function Chats(){
    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(()=>{
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
              setChats(doc.data());
            });
      
            return () => {
              unsub();
            };
        }

        currentUser.uid && getChats();

        console.log(Object.entries(chats));
    }, [currentUser.uid]
)

const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(

            <div className="userChat" key = {chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt = "img" className="img"></img>
                <div className="userInfo">
                    <span className="span">{chat[1].userInfo.displayName}</span>
                    <p className="p">{chat[1].lastMessage?.text} </p>
                </div>
            </div>
             ))}
           
        </div>
        
    )
}

export default Chats;