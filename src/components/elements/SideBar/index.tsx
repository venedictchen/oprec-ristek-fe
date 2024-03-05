import { MdSpaceDashboard } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { SideBarProps } from "./interface";
import { useAuth } from "@/components/contexts";
import { useState } from "react";
export const SideBar: React.FC<SideBarProps> = ({ selectedOption, onSidebarClick }) => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    onSidebarClick("dashboard");

  }
  const sidebarOptions = [
    { icon: <MdSpaceDashboard className="w-8 h-8" />, label: "Dashboard", option: "dashboard" },
    { icon: <GrTransaction className="w-8 h-8" />, label: "Transaction", option: "transactions" },
    // { icon: <GiAchievement className="w-8 h-8" />, label: "Goals", option: "goals" },
  ];

  return (
    <nav className="flex flex-col w-64 justify-between p-4 py-16 bg-white border-r border-gray-200 cursor-pointer font-semibold">

      <div className="flex flex-col items-center py-24 text-[#A1A0BD] gap-24 text-center justify-center">
        {sidebarOptions.map((option) => (
          <div
            key={option.option}
            className={`flex px-10 py-2 rounded-md font-semibold ${selectedOption === option.option ? "bg-[#A1A0BD] text-[#4C49ED]" : "hover:bg-[#A1A0BD] hover:text-[#4C49ED]"
              }`}
            onClick={() => onSidebarClick(option.option)}
          >
            {option.icon}
            <p className="mx-2 my-1">{option.label}</p>
          </div>
        ))}
      </div>
      <div
        className="flex px-10 py-2 mt-24 text-[#A1A0BD] hover:text-[#FFFFFF] hover:bg-[#E60000] rounded-md font-semibold"
        onClick={handleLogout}
      >
        <BiLogOut className="w-8 h-8" />
        <p className="mx-2 my-1">Logout</p>
      </div>
    </nav>
  );
};  