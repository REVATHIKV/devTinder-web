import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import store from "./utils/store";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connections from "./components/Connections";
import Requests from "./components/Requests";


function App() {
 

  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/feed" element={<Feed />} />
               <Route path="/connections" element={<Connections />} />
                 <Route path="/requests" element={<Requests />} />
                 <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
