import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatBar = ({ socket }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      if (
        data?.length === 0 ||
        (data?.length > 0 &&
          !data?.find(
            (user) => user?.userName === localStorage.getItem("userName")
          ))
      ) {
        localStorage.removeItem("userName");
        navigate("/");

        window.location.reload();
      }
      setUsers(data);
    });
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Chat Room</h2>
      <div>
        <h4 className="chat__header">聊天室使用者</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
