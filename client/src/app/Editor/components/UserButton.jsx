import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/userSlice";

const UserButton = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth0();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(logoutUser());
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <img
          src={user?.picture}
          alt={user?.name}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-full min-w-[240px] bg-[#1e1e2e]/95 
            backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50 "
          >
            <div className="px-2 py-2 mb-2 border-b border-gray-800/50">
              <div className="flex items-center gap-2">
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-100">
                    {user?.name}
                  </span>
                  <span className="text-xs text-gray-400">{user?.email}</span>
                </div>
              </div>
            </div>
            <div>
              <button
                className="w-full flex items-center gap-2 px-4 py-2.5 text-white bg-[#1e1e2e]/80 hover:bg-[#262637] 
                        rounded-lg transition-all duration-200  cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <User className="w-4 h-4" />
                <span className="text-sm ">Profile</span>
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 bg-[#1e1e2e]/80 hover:bg-red-400/10
                        rounded-lg transition-all duration-200  cursor-pointer"
                onClick={() => handleLogout()}
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserButton;
