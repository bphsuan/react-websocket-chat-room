import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ChatBar from "./bar";
import ChatBody from "./body";
import ChatFooter from "./footer";

const Chatroom = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return localStorage.getItem("userName") ? (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Chatroom;
