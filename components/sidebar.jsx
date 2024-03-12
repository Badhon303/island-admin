import { RiDashboardFill } from "react-icons/ri"
import {
  MdOutlineDashboard,
  MdOutlinePrecisionManufacturing,
  MdOutlineInventory,
  MdGroups,
  MdMoney,
  MdOutlinePersonOutline,
  MdLogout,
} from "react-icons/md"

const Menus = [
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
      },
      // { tithe: "Media", spacing: true },
      // {
      //   title: "Projects",
      //   submenu: true,
      //   submenuItems: [
      //     { title: "Submenu 1" },
      //     { title: "Submenu 2" },
      //     { title: "Submenu 3" },
      //   ],
      // },
      { title: "Inventory", icon: <MdOutlineInventory />, active: false },
      { title: "Dealer", icon: <MdGroups />, active: false },
      { title: "Sales", icon: <MdMoney />, active: false },
      { title: "Employee", icon: <MdOutlinePersonOutline />, active: false },
      { title: "Logout", icon: <MdLogout />, active: false },
    ],
  },
]

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`hidden sm:block px-2 py-6 ${
        isOpen ? "w-64" : "w-20"
      } min-h-[98.3vh] bg-background relative duration-300 m-2 rounded-3xl shadow-basic`}
    >
      <div>
        {Menus.map((menu, index) => (
          <div key={index}>
            <div className="px-3 font-medium text-sm text-[#6c757d] opacity-80 dark:text-white">
              {menu.objective}
            </div>
            <ul className="py-3">
              {menu.items.map((menuItem, index) => (
                <div key={index} className="py-1">
                  <li
                    className={`py-2 text-sm ${
                      menuItem.active
                        ? "text-[#7888fc] bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                        : "text-[#5b5b5b]"
                    } flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md duration-300 ${
                      isOpen && "hover:ps-3"
                    }`}
                  >
                    <span className="ps-5 text-2xl float-left">
                      {menuItem.icon}
                    </span>
                    <span className={`text-base flex-1 ${!isOpen && "hidden"}`}>
                      {menuItem.title}
                    </span>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar

// import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
// import { useContext, createContext, useState } from "react"

// const SidebarContext = createContext()

// export default function Sidebar({ children }) {
//   const [expanded, setExpanded] = useState(true)

//   return (
//     <aside className="h-screen">
//       <nav className="h-full flex flex-col bg-white border-r shadow-sm">
//         <div className="p-4 pb-2 flex justify-between items-center">
//           <img
//             src="https://img.logoipsum.com/243.svg"
//             className={`overflow-hidden transition-all ${
//               expanded ? "w-32" : "w-0"
//             }`}
//             alt=""
//           />
//           <button
//             onClick={() => setExpanded((curr) => !curr)}
//             className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
//           >
//             {expanded ? <ChevronFirst /> : <ChevronLast />}
//           </button>
//         </div>

//         <SidebarContext.Provider value={{ expanded }}>
//           <ul className="flex-1 px-3">{children}</ul>
//         </SidebarContext.Provider>

//         <div className="border-t flex p-3">
//           <img
//             src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
//             alt=""
//             className="w-10 h-10 rounded-md"
//           />
//           <div
//             className={`
//               flex justify-between items-center
//               overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
//           `}
//           >
//             <div className="leading-4">
//               <h4 className="font-semibold">John Doe</h4>
//               <span className="text-xs text-gray-600">johndoe@gmail.com</span>
//             </div>
//             <MoreVertical size={20} />
//           </div>
//         </div>
//       </nav>
//     </aside>
//   )
// }

// export function SidebarItem({ icon, text, active, alert }) {
//   const { expanded } = useContext(SidebarContext)

//   return (
//     <li
//       className={`
//         relative flex items-center py-2 px-3 my-1
//         font-medium rounded-md cursor-pointer
//         transition-colors group
//         ${
//           active
//             ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//             : "hover:bg-indigo-50 text-gray-600"
//         }
//     `}
//     >
//       {icon}
//       <span
//         className={`overflow-hidden transition-all ${
//           expanded ? "w-52 ml-3" : "w-0"
//         }`}
//       >
//         {text}
//       </span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//             expanded ? "" : "top-2"
//           }`}
//         />
//       )}

//       {!expanded && (
//         <div
//           className={`
//           absolute left-full rounded-md px-2 py-1 ml-6
//           bg-indigo-100 text-indigo-800 text-sm
//           invisible opacity-20 -translate-x-3 transition-all
//           group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
//       `}
//         >
//           {text}
//         </div>
//       )}
//     </li>
//   )
// }
