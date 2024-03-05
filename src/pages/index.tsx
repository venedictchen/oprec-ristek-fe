import HomePage from "./HomePage";
import { Poppins } from "next/font/google";
import { SiMoneygram } from "react-icons/si";
import TransactionPage from "./TransactionPage";
import { SideBar } from "@/components/elements/SideBar";
import GoalsPage from "./GoalsPage";
import { useAuth, useSidebarContext } from "@/components/contexts";
import { useEffect } from "react";
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ['latin'],
  variable: "--font-poppins",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function Home() {
  
  const router = useRouter();
  const { selectedOption, setOption } = useSidebarContext();
  const { isLoading, isAuthenticated,user } = useAuth();
  console.log(user);
  console.log(isLoading);
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/LoginPage');
    }
  }, [isLoading, isAuthenticated]);

  return (
    isAuthenticated && (
      <main className={`flex min-h-screen flex-col justify-between bg-[#F5F5F5] ${poppins.className}`}>
      <div className="flex flex-col bg-[#A1A0BD]">
        <div className="flex items-center justify-between p-4 bg-[#4C49ED] shadow-md">
          <div className="flex items-center space-x-2 text-[#FFFFFF]">
            <SiMoneygram className="text-3xl" />
            <h1 className="text-xl font-bold text-[#FFFFFF]">CuanTracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white">Welcome, {user.username}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 ">
        <SideBar selectedOption={selectedOption} onSidebarClick={setOption} />
        {selectedOption === "dashboard" && <HomePage />}
        {selectedOption === "transactions" && <TransactionPage />}
        {selectedOption === "goals" && <GoalsPage />}
      </div>
    </main>
    )
  );
}
