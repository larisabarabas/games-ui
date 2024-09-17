import { Home, LineChart, Settings, Search } from "lucide-react";
export const navigationItems = [
  {
    id: 1,
    title: "Games Dashboard",
    path: "/",
    iconComponent: Home,
  },
  {
    id: 2,
    title: "Search",
    path: "/search",
    iconComponent: Search,
  },
  {
    id: 3,
    title: "Analytics",
    path: "/analytics",
    iconComponent: LineChart,
  },
  {
    id: 4,
    title: "Settings",
    path: "/settings",
    iconComponent: Settings,
  },
];
