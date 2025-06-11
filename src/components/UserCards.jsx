import React from "react";

const UserCards = ({user}) => {
    const data = user;
    
  
 const { firstName, lastName, age, gender , about, photoUrl} = data ;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName +" " + lastName  }</h2>
        {age && gender && <p>{age + ", "+ gender}</p>}
        <p>{about}</p>
        
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ignore</button>
           <button className="btn btn-secondary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
