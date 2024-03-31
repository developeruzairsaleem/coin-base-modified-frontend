import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const ProfileMenu = ({ menuActive, handleClick,handleLogout,handleProfile }) => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div>
      <div
        className={`fixed ${
          menuActive ? "block" : "hidden"
        } z-10 w-screen h-screen bg-opacity-30 bg-transparent top-0 left-0`}
        onClick={handleClick}
      ></div>
      <div
        className={`flex flex-col absolute top-14 border-gray-200 border right-0 z-50 p-2 rounded-xl shadow-md ${menuActive?"block":"hidden"} `}
      >
        <div className={"border-b border-gray-300"}>
          <h3 className="p-2 text-md text-gray-600 font-semibold capitalize">
            {user.name}
          </h3>
          <p className="p-2 text-sm text-gray-400">{user.email}</p>
        </div>
        <ul className={""}>
          <li
            className={`p-2 flex items-center gap-3 cursor-pointer transition-all hover:bg-gray-100`}
           onClick={handleProfile}
           >
            <AiOutlineUser />
            Profile
          </li>
          <li
            className={`p-2 flex items-center gap-3 cursor-pointer transition-All hover:bg-gray-100`}
            onClick={()=>{
                handleClick();
                handleLogout();
            }}
          >
            <IoLogOutOutline />
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
