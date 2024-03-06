import HomePage from "./HomePage";
import { Poppins } from "next/font/google";
import { SiMoneygram } from "react-icons/si";
import TransactionPage from "./TransactionPage";
import { SideBar } from "@/components/elements/SideBar";
import { useAuth, useSidebarContext } from "@/components/contexts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";

const poppins = Poppins({
  subsets: ['latin'],
  variable: "--font-poppins",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function Home() {
  const router = useRouter();
  const { selectedOption, setOption } = useSidebarContext();
  const { isLoading, isAuthenticated, user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setWindowWidth(width);
        setShowSidebar(width >= 1200);
      }
    };

    handleResize(); 

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/LoginPage');
    }
  }, [isLoading, isAuthenticated]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (option: string) => {
    setOption(option);
    if (windowWidth < 1200) {
      setShowSidebar(false);
    }
  };

  return (
    isAuthenticated && (
      <main className={`flex min-h-screen flex-col justify-between bg-[#F5F5F5] ${poppins.className}`}>
        
        <div className="flex flex-col bg-[#A1A0BD]">
          <div className="flex  justify-between p-4 bg-[#4C49ED] shadow-md">
            <div className="flex items-center sm:space-x-2 text-[#FFFFFF]">
              <GiHamburgerMenu className="text-[#FFFFFF] xl:hidden mr-4" onClick={toggleSidebar} />
              <SiMoneygram className="text-3xl" />
              <h1 className="text-md sm:text-xl font-bold text-[#FFFFFF]">CuanTracker</h1>
            </div>
            <div className="flex items-center text-center space-x-">
              <span className="text-xs sm:text-xl text-white">Welcome, {user.username}</span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-1 overflow-hidden"
          onClick={() => {
            if (windowWidth < 1200) {
              setShowSidebar(false);
            }
          }}
        >
          {showSidebar && <SideBar selectedOption={selectedOption} onSidebarClick={handleSidebarClick} />}
          <div className="flex flex-1 overflow-x-auto xl:justify-center items-center">
            {selectedOption === "dashboard" && <HomePage />}
            {selectedOption === "transactions" && <TransactionPage />}
          </div>
        </div>
      </main>
    )
  );
}
