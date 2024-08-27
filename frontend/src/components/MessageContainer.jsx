import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { FaHandshakeSimple } from "react-icons/fa6";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[75%] flex flex-col">
          <div className="flex gap-2 items-center bg-neutral-900 text-white p-4 mb-2">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-9 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>
                  {selectedUser?.fullName} |{" "}
                  <span className="text-neutral-200 text-sm">
                    @{selectedUser.username} | Joined on{" "}
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[75%] flex flex-col justify-center items-center">
          <div className="text-neutral-400">
            <FaHandshakeSimple size={80} />
          </div>
          <h1 className="text-4xl text-black font-bold">
            Hello, {authUser?.fullName}{" "}
          </h1>
          <h1 className="text-2xl text-neutral-600 font-medium">
            Let's start conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
