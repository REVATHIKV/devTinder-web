import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

import UserCards from "./UserCards";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
   const getFeed = async () => {
       try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data.feedList)
      dispatch(addFeed(res?.data?.feedList));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found !!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCards user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
