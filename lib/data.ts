import { Home, LineChart, Table, Settings } from "lucide-react";
export const navigationItems = [
  {
    id: 1,
    title: "Games Dashboard",
    path: "/",
    iconComponent: Home,
  },
  {
    id: 2,
    title: "Reports",
    path: "/reports",
    iconComponent: Table,
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
