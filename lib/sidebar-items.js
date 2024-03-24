import {
  MdOutlineDashboard,
  MdOutlinePrecisionManufacturing,
  MdOutlineInventory,
  MdGroups,
  MdMoney,
  MdOutlinePersonOutline,
  MdLogout,
} from "react-icons/md"

export const Routes = (pathname) => {
  console.log("pathname", pathname)
  return [
    {
      objective: "Main",
      items: [
        {
          title: "Dashboard",
          icon: <MdOutlineDashboard />,
          submenu: false,
          href: "/dashboard",
          active: pathname === "/dashboard",
        },
      ],
    },
    {
      objective: "Apps",
      items: [
        {
          title: "Production",
          icon: <MdOutlinePrecisionManufacturing />,
          submenu: true,
          active: false,
          submenuItems: [
            {
              title: "Submenu 1",
              href: "/production",
              active: pathname === "/production",
            },
            {
              title: "Submenu 2",
              active: false,
              href: "/production2",
              active: pathname === "/production2",
            },
            {
              title: "Submenu 3",
              active: false,
              href: "/production3",
              active: pathname === "/production3",
            },
          ],
        },
        {
          title: "Inventory",
          icon: <MdOutlineInventory />,
          submenu: true,
          active: false,
          submenuItems: [
            {
              title: "Inventory 1",
              active: false,
              href: "/Submenu 1",
              active: pathname === "/Submenu 1",
            },
            {
              title: "Submenu 2",
              active: false,
              href: "/productioczzn",
              active: pathname === "/productzcxion",
            },
            {
              title: "Submenu 3",
              active: false,
              href: "/sdad",
              active: pathname === "/produsdasdction",
            },
          ],
        },
        {
          title: "Dealer",
          icon: <MdGroups />,
          submenu: true,
          active: false,
          submenuItems: [
            {
              title: "Submenu 1",
              active: false,
              href: "/producsdasdastion",
              active: pathname === "/produdsadaction",
            },
            {
              title: "Submenu 2",
              active: false,
              href: "/prosdsaduction",
              active: pathname === "/productidsadon",
            },
            {
              title: "Submenu 3",
              active: false,
              href: "/prodasduction",
              active: pathname === "/productisdason",
            },
          ],
        },
        {
          title: "Sales",
          icon: <MdMoney />,
          submenu: true,
          active: false,
          submenuItems: [
            {
              title: "Submenu 1",
              active: false,
              href: "/prdsadaoduction",
              active: pathname === "/produdsadaction",
            },
            {
              title: "Submenu 2",
              active: false,
              href: "/prsdasoduction",
              active: pathname === "/proddasdasuction",
            },
            {
              title: "Submenu 3",
              active: false,
              href: "/produsdadction",
              active: pathname === "/produdasasction",
            },
          ],
        },
        {
          title: "Employee",
          icon: <MdOutlinePersonOutline />,
          submenu: false,
          active: false,
          href: "/employee",
          active: pathname === "/employee",
        },
        // { title: "Logout", icon: <MdLogout /> },
      ],
    },
  ]
}
