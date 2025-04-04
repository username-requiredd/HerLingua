"use client";
import { LogOut } from "lucide-react";

export default function LogoutButton({ 
  className = "", 
  iconOnly = false,
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      aria-label="Logout"
      role="button" 
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <LogOut className="h-5 w-5" />
      {!iconOnly && <span>Logout</span>}
    </div>
  );
}