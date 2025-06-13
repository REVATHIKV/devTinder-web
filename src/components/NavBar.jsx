import React from "react";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { removeConnection } from "../utils/connectionSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
   axios.post(BASE_URL + "/logout",{}, { withCredentials: true }) ;
      dispatch(removeUser());
       dispatch(removeFeed());
        dispatch(removeConnection());
      return navigate("/login");
   
  };




  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to='/feed' className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          {user && user.firstName && (
            <div className="dropdown dropdown-end">
              
              <p>Welcome {user.firstName }</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile Image"
                    src={user?.photoUrl}
                  />
                </div>  
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link  to="/profile">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li>
                 <Link to='/connections'>Connections</Link>
                </li>
                   <li>
                 <Link to='/requests'>Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
