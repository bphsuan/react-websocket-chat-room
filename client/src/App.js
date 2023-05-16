import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatroom from "./pages/Chatroom";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<Chatroom socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
