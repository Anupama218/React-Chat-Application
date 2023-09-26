import React, { useContext, useState } from "react";
import { collection, getDoc, doc, query, setDoc, where, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import {AuthContext} from '../context/Authcontext';
import {db} from '../Firebase';
function Searchbar(){
    const [user, setUser]=useState(null);
    const [userName, setUserName] = useState("");
    const [error, setError] = useState(false)
    const {currentUser} = useContext(AuthContext);

    const handleSearch = async()=>{

        const dbRef = collection(db, "users");

        // Create a query against the collection.
        //console.log(userName);
        const q = query(dbRef, where("displayName", "==", userName));
        //console.log(q);
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
                console.log("USername",doc);
                console.log("Photo", user.photoURL);
            });
        } catch (error){
            setError(true);
        }
    }

    const handleKey=(e)=>{
        e.code === "Enter" && handleSearch();

    }

    const handleClick = async ()=>{
        const cId =  currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

        try{
            const res = await getDoc(doc(db, "chats", cId));

            if(!res.exists())
            {
                await setDoc(doc(db, "chats", cId), {messages:[]})

                await updateDoc(doc(db, "userChats", currentUser.uid),{
                    [cId+'.userInfo']:{
                        uid : user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [cId + ".date"] : serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid),{
                    [cId+'.userInfo']:{
                        uid : currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [cId + ".date"] : serverTimestamp(),
                });
            }
        } catch(error){

        }
        setUser(null);
       setUserName("");
    }
    return (
        <div className="searchbar">
            <div className="searchForm" > 
                <input className="input" type="search" placeholder="Search here" onChange={(e)=>setUserName(e.target.value)} value = {userName} onKeyDown={handleKey}></input>
            </div>
            
           {user && ( <div className="userChats" onClick={handleClick}>
                <img src={user.photoURL} alt = "img" className="img"></img>
                <div className="userInfo">
                    <span className="span">{user.displayName}</span>
                    <p className="p">Hii there </p>
                </div>
           
            </div>)}
        </div>
    )
}

export default Searchbar;