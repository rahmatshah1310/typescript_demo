// Updated Sidebar using ShadCN (Sheet, Button) + Tailwind CSS
import { useState, useMemo, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@context";
import { ROUTES, ICONS } from "@constants";
import { Button, Sheet, SheetContent } from "@components";
import { CreatePost } from "@pages";

const Sidebar = ({ isCollapsed, setIsCollapsed, activeSection, setActiveSection }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  // const isMdOrLg = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  const navigationLinks = useMemo(() => {
    const profileIcon = user?.profilePic ? (
      <img src={user.profilePic} alt="Profile" className="rounded-full w-7 h-7 object-cover border border-white" />
    ) : (
      <ICONS.profile size={24} />
    );

    return [
      { name: "Home", icon: <ICONS.home size={24} />, route: ROUTES.home },
      { name: "Search", icon: <ICONS.search size={24} />, section: "search" },
      { name: "Explore", icon: <ICONS.explore size={24} />, route: ROUTES.explore },
      { name: "Messages", icon: <ICONS.share size={24} />, section: "messages" },
      { name: "Notifications", icon: <ICONS.likeOutline size={24} />, section: "notifications" },
      { name: "Create", icon: <ICONS.addPost size={24} />, onClick: () => setIsCreateModalOpen(true), section: "create" },
      { name: "Profile", icon: profileIcon, route: `/${user?.username}` },
      { name: "More", icon: <ICONS.more size={24} />, onClick: () => {}, section: "more" },
    ];
  }, [user]);

  const handleNavClick = useCallback(
    (link) => {
      if (link.onClick) return link.onClick();
      if (link.route) return navigate(link.route);
      if (link.section) return setActiveSection((prev) => (prev === link.section ? null : link.section));
    },
    [navigate, setActiveSection]
  );

  const renderLink = (link, index) => (
    <Button
      key={index}
      className={`flex w-full justify-start gap-3 text-white px-3 py-4 rounded-xl hover:bg-gray-800 text-md ${
        activeSection === link.section ? "bg-gray-800" : ""
      }`}
      onClick={() => handleNavClick(link)}
    >
      {link.icon}
      <span>{link.name}</span>
    </Button>
  );

  return (
    <>
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 flex justify-around py-2 z-50">
          {navigationLinks.slice(0, 5).map((link, i) => (
            <Button key={i} className="flex flex-col items-center text-white" onClick={() => handleNavClick(link)}>
              {link.icon}
              <span className="text-xs">{link.name}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={`fixed top-0 left-0 h-full bg-black border-r border-gray-800 p-4 flex flex-col justify-between transition-all duration-300 z-40 ${
            isCollapsed ? "w-16" : "w-72"
          }`}
        >
          <div>
            <div className="text-white font-bold text-xl mb-6 pl-1">{isCollapsed ? <ICONS.instagram /> : "Instagram"}</div>
            <nav className="space-y-2">{navigationLinks.slice(0, 7).map(renderLink)}</nav>
          </div>

          <div className="space-y-2">
            {renderLink(navigationLinks[7])}
            <Button onClick={logout} className="hover:bg-red-900 w-full flex justify-start p-2 rounded text-white">
              Log out
            </Button>
          </div>
        </div>
      )}

      {/* Sliding Panel using ShadCN Sheet (for Search/Notifications) */}
      <Sheet open={!!activeSection} onOpenChange={() => setActiveSection(null)}>
        <SheetContent side="left" className="w-96 bg-black text-white border-r border-gray-700">
          {activeSection === "search" && <div className="p-4">Search Component</div>}
          {activeSection === "notifications" && <div className="p-4">Notifications Component</div>}
          {activeSection === "messages" && <div className="p-4">Messages Component</div>}
        </SheetContent>
      </Sheet>
      <CreatePost isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  );
};

export default Sidebar;
