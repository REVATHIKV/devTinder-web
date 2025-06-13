import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux"; 
import { removeFeed } from "../utils/feedSlice";

const UserCards = ({ user }) => {
  const data = user;
  const dispatch = useDispatch();

  const handleRequest = async (_id,status) => {
    try{
      const res = await axios.post(BASE_URL+'/send/request/'+status+'/'+_id,{},{withCredentials:true}) ;
      dispatch(removeFeed(_id))
    }
    catch(err){

    }

  }

  const { _id, firstName, lastName, age, gender, about, photoUrl } = data;
  return (
    <div className="card  border border-gray-200 w-96  rounded-xl p-4 ">
      <figure>{photoUrl ? <img src={photoUrl} alt="Shoes" /> : ""}</figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>

        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleRequest(_id, "ignored");
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleRequest(_id, "interested");
            }}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
