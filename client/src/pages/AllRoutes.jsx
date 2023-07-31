import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Page404 from "./Page404";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import Workout from "./Workout"
import Calorie from "./Calorie";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/workout" element={<Workout />} />
      <Route path="/calorie" element={<Calorie />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
