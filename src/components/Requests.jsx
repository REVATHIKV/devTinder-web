import axios from "axios";
import React, { useEffect } from "react";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests) ?? [];
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    if (requests && requests.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
     
      dispatch(addRequests(res?.data?.reqReceived));
    } catch (err) {
      console.error("Failed to fetch Requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequestReview = async (_id, status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/send/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      
      dispatch(removeRequests(_id));
    } catch (err) {}
  };

     if (requests &&  requests.length <= 0)   return (<div> No Requests found !! </div> ) ;


  return (
    <div>
      {console.log(requests)}
      {requests.map((conn, index) => {
        console.log(conn.fromUserId)
        const {_id, firstName, lastName, age, gender, about, photoUrl } = conn.fromUserId;
        return (
          <div
            key={_id}
            className="chat chat-start flex justify-center my-10 w-full"
          >
            <div className="card bg-white border border-gray-100 rounded-box p-4 w-1/2">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    {photoUrl ? (
                      <img alt="User profile" src={photoUrl} />
                    ) :  '' }
                  </div>
                </div>

                {/* User Details */}
                <div className="flex flex-col">
                  <h1 className="font-bold text-gray-600 text-lg">
                    {firstName + " " + lastName}
                  </h1>
                  <p className="text-sm text-gray-600">{about}</p>
                  {age && gender && (
                    <p className="text-sm text-gray-500">
                      {age} • {gender}
                    </p>
                  )}
                </div>
                <button className="btn btn-active btn-primary" onClick={() => handleRequestReview(conn._id, 'accepted') }>Accept</button>
                <button className="btn btn-active btn-secondary"  onClick={() => handleRequestReview(conn._id, 'rejected') }> Reject</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
