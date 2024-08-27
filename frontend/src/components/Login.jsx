import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BASE_URL } from "..";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-200">
      <div className="min-w-96 mx-auto p-6 rounded-lg shadow-xl bg-white text-black border">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label py-2">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="bg-neutral-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label py-2">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="bg-neutral-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              type="password"
              placeholder="Password"
            />
          </div>
          <p className="text-center my-4">
            Don't have an account? <Link to="/signup" className="text-neutral-500"> signup </Link>
          </p>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-neutral-200 font-medium rounded-lg p-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
