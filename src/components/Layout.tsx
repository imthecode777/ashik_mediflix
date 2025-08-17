import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";
import { TopNavigation } from "./TopNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {!isMobile && <TopNavigation />}
      
      <main className={`${isMobile ? 'pb-20' : 'pt-16'} min-h-screen overflow-x-hidden transition-all duration-300 ease-out`}>
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      
      {isMobile && <BottomNavigation />}
    </div>
  );
};