import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from './pages/Home';
import { AuthContext } from "./context/Authcontext";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  
} from "react-router-dom";
import { useContext } from "react";

function App() {

  const {currentUser} = useContext(AuthContext);
  const ProtectedRoute = ({children}) =>{
    if(!currentUser)
    {
      return <Navigate to = "/Login"/>
    }
    return children;
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="Login" element = {<Login/>}/>
            <Route path = "Register" element = {<Registration/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
