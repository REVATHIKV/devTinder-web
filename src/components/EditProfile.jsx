import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

import { useDispatch, useSelector } from "react-redux";
import UserCards from "./UserCards";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data.data));
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/login"); // or handle differently
      }
    };

    if (!user) {
      fetchUserData();
    } else {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileUpdaten = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );

      setSuccessMessage(res?.data?.message);
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);

      dispatch(addUser(res?.data?.data));
    } catch (err) {
       setError(true);
      setErrorMessage(err.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center  my-10">
      {message && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="toast toast-top toast-center"></div>
      <div className="card  border border-gray-200 w-96  rounded-xl p-4">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age </legend>
            <input
              type="text"
              value={age}
              className="input"
              onChange={(event) => setAge(event.target.value)}
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className="select"
            >
              <option disabled={true}>Select a gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea"
              placeholder="About here"
              value={about}
              onChange={(event) => setAbout(event.target.value)}
            ></textarea>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="Type here"
            />
          </fieldset>

          <div className="card-actions justify-center">
            <button
              className="btn btn-lg btn-primary"
              onClick={handleProfileUpdaten}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <UserCards user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
