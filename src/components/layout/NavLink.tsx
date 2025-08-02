import { LinkConfig } from "@types";
import * as React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  link: LinkConfig;
  isBottomBar?: boolean;
  isMdSidebar?: boolean;
  isCollapsed?: boolean;
  activeSection?: string;
  onLinkClick: (section: string) => void;
  userProfilePic?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ link, isBottomBar, isMdSidebar, isCollapsed, activeSection, onLinkClick, userProfilePic }) => {
  let classes = "flex items-center text-white rounded-lg hover:bg-gray-700 cursor-pointer transition-colors";
  if (isBottomBar) classes += " flex-col justify-center p-2 text-xs w-1/5";
  if (isMdSidebar)
    classes += ` gap-4 text-lg py-2 px-4 ${
      activeSection === (link.section || link.name.toLowerCase()) ? (link.name === "Messages" ? "bg-gray-600 opacity-50 cursor-default" : "bg-gray-600") : ""
    }`;

  const handleClick = (e: React.MouseEvent) => {
    if (link.onClick && !link.route) e.preventDefault();
    onLinkClick(link.section || link.name.toLowerCase());
  };

  const content = (
    <>
      {link.name === "Profile" && userProfilePic ? (
        <img
          src={userProfilePic}
          alt="Profile"
          className="rounded-full object-cover border-2 border-white w-7 h-7 md:ml-[-5px] min-w-[1.75rem] min-h-[1.75rem]"
        />
      ) : (
        link.icon
      )}
      {(isBottomBar || (isMdSidebar && !isCollapsed)) && <span className={isBottomBar ? "mt-1" : ""}>{link.name}</span>}
    </>
  );

  return link.route ? (
    <Link to={link.route} className={classes} onClick={handleClick}>
      {content}
    </Link>
  ) : (
    <button className={classes} onClick={handleClick}>
      {content}
    </button>
  );
};

export default React.memo(NavLink);
