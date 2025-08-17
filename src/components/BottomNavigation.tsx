import { NavLink } from "react-router-dom";
import { 
  Home, 
  Stethoscope, 
  CircleDot, 
  MessageCircle, 
  User 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/treat", icon: Stethoscope, label: "Treat" },
  { path: "/dose", icon: CircleDot, label: "Dose" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
  { path: "/profile", icon: User, label: "Profile" },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50 shadow-medical">
      <div className="flex justify-around items-center h-18 px-2 py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300",
                "min-w-0 flex-1 max-w-[80px] relative group",
                isActive
                  ? "text-primary bg-primary/15 scale-110 shadow-bounce"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-105"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-6 w-6 mb-1 transition-all", isActive && "animate-bounce-subtle")} />
                <span className="text-xs font-medium truncate">{label}</span>
                {isActive && (
                  <div className="absolute -top-1 w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};