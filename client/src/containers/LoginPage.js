import React, { useState } from "react";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <label>Username: </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label>Password: </label>
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input type="submit" value="Submit"></input>
    </div>
  );
};

export default LoginPage;
