import { useState } from "react";
import "./App.css";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Screens/ProtectedRoute";
import ProtectedRoute2 from "./Screens/ProtectedRoute2";
import TodoApp from "./Screens/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute2 />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<TodoApp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
