import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserAuthPage from "./pages/UserAuthPage/UserAuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoutes";
import SharedTaskPage from "./pages/SharedTaskPage/SharedTaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuthPage />} />
        <Route path="/home" element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/view-task/:id" element={<SharedTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
