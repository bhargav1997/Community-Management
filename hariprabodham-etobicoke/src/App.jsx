import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/HomePage";
import ChooseUser from "./pages/ChooseUser";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

function App() {
   const { currentRole } = useSelector((state) => state.user);

   return (
      <Router>
         {currentRole === null && (
            <Routes>
               <Route path='/' element={<Homepage />} />
               <Route path='/choose' element={<ChooseUser visitor='normal' />} />
               <Route path='/chooseasguest' element={<ChooseUser visitor='guest' />} />
               <Route path='/Adminlogin' element={<LoginPage role='Admin' />} />
               <Route path='/Studentlogin' element={<LoginPage role='Student' />} />
               <Route path='/Teacherlogin' element={<LoginPage role='Teacher' />} />
               <Route path='/Adminregister' element={<AdminRegisterPage />} />

               <Route path='*' element={<Navigate to='/' />} />
            </Routes>
         )}

         {currentRole === "Admin" && (
            <>
               <AdminDashboard />
            </>
         )}

         {currentRole === "Teacher" && (
            <>
               <TeacherDashboard />
            </>
         )}
      </Router>
   );
}

export default App;
