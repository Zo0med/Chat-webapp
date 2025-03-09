import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./routes/login";
import { Register } from "./routes/register";
import ChatWrapper from "./routes/chatWrapper";
import Main from "./routes/main";
function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<ChatWrapper />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;
