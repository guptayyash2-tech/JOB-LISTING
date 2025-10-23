import React from "react";
import Home from "./Header/Home";
import { Route, Router, Routes } from "react-router";

import Login from "./userlogin/Login";
import Userpersonalinfo from "./userpersonalinfo/Userpersonalinfo";
import UpdateUserProfile from "./userlogin/Userupdateprofile";
import Usergetpersonalinfo from "./userpersonalinfo/Usergetpersonalinfo";
import UserUpdateInfo from "./userpersonalinfo/Userupdatepersonalinfo";
import UserProfile from "./userlogin/Usergetprofile";
import CreateResume from "../Resumecreate";
import UserGetResume from "../Getresume";
import AdminRegister from "./ADMIN/Adminlogin/Adminregister";
import UserRegister from "./userlogin/Register";
import Adminlogin from "./ADMIN/Adminlogin/Adminlogin";
import AdminProfile from "./ADMIN/Adminlogin/Amingetprofile";
import AdminUpdate from "./ADMIN/Adminlogin/Adminupdate";
import CompanyInformation from "./ADMIN/Companyinformtion/Comapnyinformation";
import Employerjob from "./ADMIN/Companyinformtion/Employerjob";


function App() {
  return (
    <div>
      
    
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} 
        /> 

        <Route path="/savepersonalinfo" element={<Userpersonalinfo />} />
        <Route path="/usergetprofile" element={<UserProfile />} />
        <Route path="/updateuserprofile" element={<UpdateUserProfile />} />
        <Route path="/getpersonalinfo" element={<Usergetpersonalinfo />} />
        <Route path="/updatepersonalinfo" element={<UserUpdateInfo />} />
<Route path="/postresume" element={<CreateResume />} />
<Route path="/getresumes" element={<UserGetResume />} />


<Route path="/adminregister" element={<AdminRegister />} />
<Route path="/adminlogin" element={<Adminlogin />} />
<Route path="/admingetprofile" element={<AdminProfile />} />
<Route path="/adminupdateprofile" element={<AdminUpdate />} />

<Route path="/companycreate" element={<CompanyInformation />} />
<Route path="/createjoblisting" element={<Employerjob />} />
      </Routes>
  
    
    </div>
  );
}

export default App;
