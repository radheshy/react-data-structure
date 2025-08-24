import { Routes, Route } from "react-router-dom";
import { Home, About, AsyncAwait, ReduxPlusRTK } from "../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/asyncAwait" element={<AsyncAwait />} />
      <Route path="/reduxPlusRTK" element={<ReduxPlusRTK />} />
    </Routes>
  );
}