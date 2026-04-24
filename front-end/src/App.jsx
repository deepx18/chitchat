import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import { useEffect } from "react";

export default function App() {
  // useEffect(() => {
  //   fetch("http://localhost:8000/sanctum/csrf-cookie", {
  //     credentials: "include",
  //   });
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LogIn />} />
      {/* <Route path="/user/:id" element={<UserProfile />} /> */}
    </Routes>
  );
}
