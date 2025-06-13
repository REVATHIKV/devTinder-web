import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

import { useDispatch } from "react-redux";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    try {
      const response = axios
        .post(
          BASE_URL + "/login",
          { emailId: emailId, password: password },
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
      setError("Somthing went wrong" + err);

      //setError(err)
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
     
    setError(err.response.data.message);
    }
  };
  return (
    <div className="flex justify-center  my-10">
      <div className="card  border border-gray-200 w-96  rounded-xl p-4">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {!isLogin && (
            <>
              <label className="label">First Name</label>
              <input
                type="text"
                onChange={(event) => setFirstName(event.target.value)}
                className="input"
                placeholder="Enter your First Name"
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                onChange={(event) => setLastName(event.target.value)}
                className="input"
                placeholder="Enter your Last Name"
              />
            </>
          )}
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
            <button
              className="btn btn-lg btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp }
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="cursor-pointer" onClick={() => setIsLogin(!isLogin) }>{isLogin ? "New User ? Sign Up here" : "Existing User ? Login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
