import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainPage from "./pages/MainPage";
import Heeyo from "./pages/Heeyo";
import Mingsoon from "./pages/Mingsoon";
import Choa from "./pages/Choa";
import Jjyeony from "./pages/Jjyeony";
import "./style.css";

const streamers = [
  { path: "/Heeyo", component: Heeyo },
  { path: "/Mingsoon", component: Mingsoon },
  { path: "/Choa", component: Choa },
  { path: "/Jjyeony", component: Jjyeony },
];

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait"> 
      <Routes location={location} key={location.pathname}>
  <Route path="/" element={<MainPage />} />
  {streamers.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ))}
</Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
