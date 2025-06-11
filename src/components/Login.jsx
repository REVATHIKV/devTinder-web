import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("revathi@gmail.com");
  const [password, setPassword] = useState("Revathi@123");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    try {
      const response = axios
        .post(
          BASE_URL + "/login",
          { emailId: email, password: password },
          { withCredentials: true }
        )
        .then((res) => {       
          dispatch(addUser(res.data.data));
          return navigate("/feed");
        })
        .catch((err) => {
         setError(err.response.data);
        });
    } catch (err) {
     setError("Somthing went wrong"+ err);

      //setError(err)
    }
  };
  return (
    <div className="flex justify-center  my-10">
      

 <div className="card card-border bg-border-300 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
     <label className="label">Email ID</label>
        <input
          type="text"
          onChange={(event) => setEmail(event.target.value)}
          className="input"
          placeholder="Enter your Email ID"
        />

        <label className="label">Password</label>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          className="input"
          placeholder="Password"
        />
        <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-lg btn-primary"  onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
 
    </div>
  );
};

export default Login;
