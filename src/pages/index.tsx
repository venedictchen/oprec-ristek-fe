import HomePage from "./HomePage";
import { Poppins } from "next/font/google";
import { SiMoneygram } from "react-icons/si";
import IncomePage from "./IncomePage";
import { useState } from "react";
import { SideBar } from "@/components/elements/SideBar";
import ExpensePage from "./ExpensePage";
import GoalsPage from "./GoalsPage";
import { SidebarProvider, useSidebarContext } from "@/components/contexts";

const poppins = Poppins({
  subsets: ['latin'],
  variable: "--font-poppins",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function Home() {
  const { selectedOption, setOption } = useSidebarContext();
  console.log(selectedOption);
  return (
    <main className={`flex min-h-screen flex-col justify-between bg-[#252525] ${poppins.className}`}>
      <div className="flex flex-col bg-gray-100">
        <div className="flex items-center justify-between p-4 bg-[#4C49ED] shadow-md">
          <div className="flex items-center space-x-2 text-[#FFFFFF]">
            <SiMoneygram className="text-3xl" />
            <h1 className="text-xl font-bold text-[#FFFFFF]">CuanTracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white">Welcome, User</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 ">
        <SideBar selectedOption={selectedOption} onSidebarClick={setOption} />
        {selectedOption === "dashboard" && <HomePage />}
        {selectedOption === "income" && <IncomePage />}
        {selectedOption === "expense" && <ExpensePage />}
        {selectedOption === "goals" && <GoalsPage />}
      </div>
    </main>
    
  );
}
