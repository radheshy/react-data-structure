import { Routes, Route } from "react-router-dom";
import { Home, About, AsyncAwait, ReduxPlusRTK, 
  ClouserPlusPrototype, EventLoopDemo, Dragdrop, Clock } from "../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/asyncAwait" element={<AsyncAwait />} />
      <Route path="/reduxPlusRTK" element={<ReduxPlusRTK />} />
      <Route path="/clouserPlusPrototype" element={<ClouserPlusPrototype />} />
      <Route path="/eventLoop" element={<EventLoopDemo />} />
      <Route path="/dragdrop" element={<Dragdrop />} />
      <Route path="/clock" element={<Clock />} />
    </Routes>
  );
}