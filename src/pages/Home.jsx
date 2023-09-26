import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import '../style.css';

function Home()
{
    return(
        <div className="Home">
            <div className="containers">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Home;