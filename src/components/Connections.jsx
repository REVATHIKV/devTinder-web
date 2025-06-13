import axios from "axios";
import React, { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connection) ?? [];
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections && connections.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

   if (connections &&  connections.length <= 0)   return (<div> No connections found !! </div> ) ;

  return (

   
    <div>
      {console.log(connections)}
      {connections.map((conn, index) => {
        const { firstName, lastName, age, gender, about, photoUrl } = conn;
        return (
          <div
            key={index}
            className="chat chat-start flex justify-center my-10 w-full"
          >
            <div className="card bg-white border border-gray-100 rounded-box p-4 w-1/2">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    {photoUrl ? (
                      <img alt="User profile" src={photoUrl} />
                    ) : (
                      <img
                        alt="Default user"
                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      />
                    )}
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
