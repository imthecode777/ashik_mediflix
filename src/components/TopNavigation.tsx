import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Stethoscope, 
  CircleDot, 
  MessageCircle, 
  User,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NotificationSystem from "./NotificationSystem";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/treat", icon: Stethoscope, label: "Treat" },
  { path: "/dose", icon: CircleDot, label: "Dose" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
  { path: "/profile", icon: User, label: "Profile" },
];

export const TopNavigation = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border z-50 shadow-medical">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}

          {/* Gradient Text */}
          <div className="flex items-center gap-2">
            {/* Heart Icon */}
            <img
              src="./Heart.png" // adjust this path
              alt="Mediflix Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
            />

            {/* Logo Text */}
            <span className="font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Mediflix
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group",
                    isActive
                      ? "text-primary bg-primary/15 shadow-bounce scale-105"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-105"
                  )
                }
              >
                <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Notification - Desktop Only */}
          <div className="flex items-center space-x-2 relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover-glow"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                3
              </span>
            </Button>

            <NotificationSystem
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};