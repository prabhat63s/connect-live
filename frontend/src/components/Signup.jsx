import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "..";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      gender: "",
    });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-200">
      <div className="min-w-96 mx-auto p-6 rounded-lg shadow-xl bg-white text-black border">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label py-2">Full Name</label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="bg-neutral-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label py-2">Username </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="bg-neutral-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label py-2">Password </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="bg-neutral-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
          </div>
          <p className="text-center my-4">
            Already have an account? <Link to="/login"  className="text-neutral-500"> login </Link>
          </p>
          <div>
            <button
              type="submit"
               className="w-full text-white bg-black hover:bg-neutral-200 font-medium rounded-lg p-2"
            >
              Singup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
