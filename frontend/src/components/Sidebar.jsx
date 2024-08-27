import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";
import { IoChatbubble, IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { authUser, otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };
  return (
    <div className="border-r w-[25%] border-neutral-200 flex flex-col">
      <div className="mb-5 border-b">
        <h1 className="text-white flex items-center gap-2 bg-black font-semibold text-3xl p-4">
        <IoChatbubble />Connect
        </h1>
      </div>
      <form
        onSubmit={searchSubmitHandler}
        className="flex items-center gap-2 mb-5 px-4"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="bg-neutral-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
        <button
          type="submit"
          className="text-white bg-black hover:bg-neutral-200 font-medium rounded-lg p-2"
        >
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>

      <OtherUsers />
      <div className="mt-2 w-full px-4 py-3 flex items-center border-t">
        <div className="flex justify-between w-full items-center text-black bg-neutral-200 hover:bg-black hover:text-white rounded-lg py-2 font-medium px-4">
          <p>{authUser?.fullName}</p>
          <button onClick={logoutHandler} className="flex items-center gap-1 rounded-md p-1 px-2 text-white bg-neutral-700">
           Logout <IoLogOut size={24}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
