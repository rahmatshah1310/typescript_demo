import { ICONS } from "@/constants/iconsMap";

export const tabs = [
  {
    id: "posts",
    label: "POSTS",
    icon: ICONS.mdGridOn,
  },
  {
    id: "saved",
    label: "SAVED",
    icon: ICONS.bookMark,
  },
  {
    id: "tagged",
    label: "TAGGED",
    icon: ICONS.userSquare,
  },
];

export const COLOR = {
  primaryColor: "#1877F2",
};

export const MORE_MENU_ITEMS = [
  "Settings",
  "Your activity",
  "Saved",
  "Switch appearance",
  "Report a problem",
  "Switch accounts",
];

export const PANEL_SECTIONS = ["search", "notifications", "messages"];


export const isValidPanelSection = (section) =>
  PANEL_SECTIONS.includes(section);

export const isValidActiveSection = (section) =>
  [...PANEL_SECTIONS, "create", "more", null].includes(section);

//new