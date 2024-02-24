import { MdSpaceDashboard } from "react-icons/md";
import { GiExpense, GiAchievement, GiReceiveMoney } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { SideBarProps } from "./interface";
export const SideBar: React.FC<SideBarProps> = ({ selectedOption, onSidebarClick }) => {
  
  const sidebarOptions = [
    { icon: <MdSpaceDashboard className="w-8 h-8" />, label: "Dashboard", option: "dashboard" },
    { icon: <GiReceiveMoney className="w-8 h-8" />, label: "Income", option: "income" },
    { icon: <GiExpense className="w-8 h-8" />, label: "Expense", option: "expense" },
    { icon: <GiAchievement className="w-8 h-8" />, label: "Goals", option: "goals" },
  ];

  return (
    <nav className="flex flex-col w-64 p-4 bg-white border-r border-gray-200 cursor-pointer font-semibold">
      <div className="flex flex-col py-12 text-[#A1A0BD] gap-16 text-center">
        {sidebarOptions.map((option) => (
         <div
         key={option.option}
         className={`flex px-10 py-2 rounded-md font-semibold ${
           selectedOption === option.option ? "bg-[#A1A0BD] text-[#4C49ED]" : "hover:bg-[#A1A0BD] hover:text-[#4C49ED]"
         }`}
         onClick={() => onSidebarClick(option.option)}
       >
         {option.icon}
         <p className="mx-2 my-1">{option.label}</p>
       </div>
        ))}
      </div>
      <div className="flex px-10 py-2 mt-14 text-[#A1A0BD] hover:text-[#FFFFFF] hover:bg-[#E60000] rounded-md font-semibold">
        <BiLogOut className="w-8 h-8" />
        <p className="mx-2 my-1">Logout</p>
      </div>
    </nav>
  );
};
