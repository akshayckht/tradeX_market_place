import LoginPage from './feature/auth/page/LoginPage.tsx'
import {Route, Routes} from "react-router";
import RegisterPage from "./feature/auth/page/RgistrationPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>

  )
}

export default App
