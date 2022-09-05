import React from "react";
//import { Switch , Route , BrowserRouter} from 'react-router-dom'
import { Routes , Route , BrowserRouter, Navigate} from 'react-router-dom'
//In React router v6, we have to replace the <Switch> component with <Routes>
//Old way: 
/*
<Switch>  
  <Route path='/' exact component={Home}/>
</Switch>
*/
import Header from "./Components/Header_footer/header";
import Footer from "./Components/Header_footer/footer";
import Home from "./Components/Home";
import SignIn from './Components/Signin'
import Dashboard from "./Components/Admin/Dashboard";
import AuthGuard from "./Hoc/Auth";

import AdminPlayers from './Components/Admin/players'
import AddEditPlayers from "./Components/Admin/players/addEditPlayers";
import TheTeam from "./Components/theTeam";
import AdminMatches from './Components/Admin/matches/index'
import AddEditMatch from './Components/Admin/matches/addEditMatch'
import TheMatches from "./Components/theMatches";
import { ToastContainer } from 'react-toastify';
import NotFound from "./Components/notFound";
import 'react-toastify/dist/ReactToastify.css';


const RoutesFunc = ({user}) => {



  return (
   <BrowserRouter>
      <Header user={user}  />

      <Routes>
        <Route path='/admin_matches' element={<AdminMatches/>} />
        <Route path='/admin_matches/add_match' element={<AddEditMatch/>} />
        <Route path='/admin_matches/edit_match/:matchid' element={<AddEditMatch/>} />

        <Route path='/admin_players/edit_player/:playerid' element={<AuthGuard component={AddEditPlayers} />} />
        <Route path='/admin_players/add_player' element={<AuthGuard component={AddEditPlayers} />} />
        <Route path='/admin_players' element={<AuthGuard component={AdminPlayers} />} />
        
        <Route path='/dashboard' element={<AuthGuard component={Dashboard} />} />
        <Route path='/the_team' element={<TheTeam/>} />
        <Route path='/sign_in' element={<SignIn  user={user} />} />
        <Route path='/the_matches' element={<TheMatches/>} />
        <Route path="/" element={<Home />} /> 
        <Route path="/*"element={<NotFound/>} /> 
      </Routes>

      <Footer/>
      <ToastContainer/>
   </BrowserRouter>
  )
}

export default RoutesFunc