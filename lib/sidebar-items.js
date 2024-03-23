import {
  MdOutlineDashboard,
  MdOutlinePrecisionManufacturing,
  MdOutlineInventory,
  MdGroups,
  MdMoney,
  MdOutlinePersonOutline,
  MdLogout,
} from "react-icons/md"

export const Menus = [
  {
    objective: "Main",
    items: [{ title: "Dashboard", icon: <MdOutlineDashboard />, active: true }],
  },
  {
    objective: "Apps",
    items: [
      {
        title: "Production",
        icon: <MdOutlinePrecisionManufacturing />,
        active: false,
        submenu: true,
        submenuItems: [
          { title: "Submenu 1", active: false },
          { title: "Submenu 2", active: false },
          { title: "Submenu 3", active: false },
        ],
      },
      {
        title: "Inventory",
        icon: <MdOutlineInventory />,
        active: false,
        submenu: true,
        submenuItems: [
          { title: "Submenu 1", active: false },
          { title: "Submenu 2", active: false },
          { title: "Submenu 3", active: false },
        ],
      },
      {
        title: "Dealer",
        icon: <MdGroups />,
        active: false,
        submenu: true,
        submenuItems: [
          { title: "Submenu 1", active: false },
          { title: "Submenu 2", active: false },
          { title: "Submenu 3", active: false },
        ],
      },
      {
        title: "Sales",
        icon: <MdMoney />,
        active: false,
        submenu: true,
        submenuItems: [
          { title: "Submenu 1", active: false },
          { title: "Submenu 2", active: false },
          { title: "Submenu 3", active: false },
        ],
      },
      { title: "Employee", icon: <MdOutlinePersonOutline />, active: false },
      { title: "Logout", icon: <MdLogout />, active: false },
    ],
  },
]
