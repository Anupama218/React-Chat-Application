import React, { useContext, useState } from "react";
import send from '../img/10.png';
import attach from '../img/attach.png';
import '../style.css';
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {v4 as uuid} from "uuid";
import { db, storage } from "../Firebase";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadBytesResumable } from "firebase/storage";
function Input()
{
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const handleClick = async(e) =>{
        e.preventDefault();
        if(img)
        {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) =>{

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
                        await updateDoc(doc(db, "chats", data.chatId),{
                            messages : arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date:Timestamp.now(),
                                img: downloadURL,
                            }),
                    })
                })
            }
            );
            
        }
        else{
            await updateDoc(doc(db, "chats", data.chatId),{
                messages : arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date:Timestamp.now(),
                }),
            });

        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
      
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        setText("");
        setImg(null);
    }
    return (
        <div className="input">
            <div className="text">
            <input placholder = "Type here" className="text" onChange={(e)=>setText(e.target.value)} value={text}></input>
            </div>

            <div className="send">
                <input type="file" style={{display:"none"}} id="file" onChange={(e)=>setImg(e.target.files[0])}></input>
                <label htmlFor="file">
                    <img src={attach} className="attach" alt = "img"/>
                </label>
                
                <button style={{display:"none"}} id="btn" onClick={handleClick}/>
                <label htmlFor="btn">
                    <img src={send} className="btn" alt = "img"/>
                </label>
            </div>
        </div>
    )
}

export default Input;