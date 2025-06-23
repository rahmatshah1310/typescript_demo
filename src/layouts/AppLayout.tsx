import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ROUTES } from "@constants";
// import Sidebar from "@components/layout/Sidebar";
import {Spinner} from "@components";
import { useAuth } from "@context";
import {Sidebar} from "@components";

const AppLayout = () => {
  const { userData, isLoading } = useAuth();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isMdOrLg = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isXlOrLarger = useMediaQuery({ minWidth: 1280 });

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768 && window.innerWidth < 1280;
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!activeSection) {
      if (isMdOrLg) {
        setIsCollapsed(true); 
      } else if (isXlOrLarger) {
        setIsCollapsed(false); 
      }
    }
  }, [isMdOrLg, isXlOrLarger, activeSection]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900">
        <Spinner type="sync" />
      </div>
    );
  }

  if (!userData) {
    return <Navigate to={ROUTES.login} replace />;
  }

  // Calculate dynamic left margin for the main content area
  const getMainContentMarginLeft = () => {
    if (isMobile) {
      return "0px"; // No margin on mobile
    }

    if (
      activeSection === "search" ||
      activeSection === "notifications" ||
      activeSection === "messages"
    ) {
      return "448px"; // 64 + 384 = 448px
    } else if (isCollapsed) {
      return "64px";
    } else {
      return "336px";
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-white">
      {/* Mobile-only Navbar */}
      {/* {isMobile && <Navbar />} */}

      <div
        className={`flex flex-1 overflow-hidden ${isMobile ? "pt-16" : "pt-0"}`}
      >
        {/* Sidebar for Desktop/Tablet views - It's always positioned on the left */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main content area */}
        <div
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out
                        ${isMobile ? "pb-16" : "pb-0"}
                      `}
          style={{ marginLeft: getMainContentMarginLeft() }}
        >
          <main className="px-4 md:px-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
