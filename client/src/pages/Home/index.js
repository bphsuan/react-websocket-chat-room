import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("userName", userName);

    socket.emit("newUser", { userName, socketID: socket.id });

    navigate("/chat");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">簡易聊天室</h2>

      <label htmlFor="username">使用者名稱</label>

      <input
        type="text"
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <button className="home__cta">進入聊天室</button>
    </form>
  );
};

export default Home;
