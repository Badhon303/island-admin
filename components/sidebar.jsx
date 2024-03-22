import {
  MdOutlineDashboard,
  MdOutlinePrecisionManufacturing,
  MdOutlineInventory,
  MdGroups,
  MdMoney,
  MdOutlinePersonOutline,
  MdLogout,
  MdExpandMore,
} from "react-icons/md"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`hidden sm:block px-2 py-6 ${
        isOpen ? "w-64" : "w-20"
      } min-h-[calc(100svh-1rem)] bg-background relative duration-300 my-2 ms-2 rounded-3xl shadow-basic`}
    >
      <div>
        {Menus.map((menu, index) => (
          <div key={index}>
            <div className="px-3 font-medium text-sm text-[#6c757d] opacity-80 dark:text-white">
              {menu.objective}
            </div>
            <ul className="py-3">
              {menu.items.map((menuItem, index) => (
                <Collapsible key={index}>
                  <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                    <Tooltip>
                      <div className="text-start py-1">
                        {isOpen ? (
                          <CollapsibleTrigger className="w-full">
                            <li
                              className={`py-2 text-sm ${
                                menuItem.active
                                  ? "text-[#7888fc] bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                  : "text-[#5b5b5b]"
                              } flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md duration-300 ${
                                isOpen && "hover:ps-2"
                              }`}
                            >
                              <span className="ps-5 text-2xl float-left">
                                {menuItem.icon}
                              </span>
                              <span
                                className={`text-base flex-1${
                                  !isOpen && "hidden"
                                }`}
                              >
                                {menuItem.title}
                              </span>
                              {menuItem.submenu && (
                                <MdExpandMore className="text-2xl ms-auto me-2" />
                              )}
                            </li>
                          </CollapsibleTrigger>
                        ) : (
                          <TooltipTrigger className="w-full">
                            <li
                              className={`py-2 text-sm ${
                                menuItem.active
                                  ? "text-[#7888fc] bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                  : "text-[#5b5b5b]"
                              } flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md duration-300 ${
                                isOpen && "hover:ps-2"
                              }`}
                            >
                              <span className="ps-5 text-2xl float-left">
                                {menuItem.icon}
                              </span>
                            </li>
                          </TooltipTrigger>
                        )}
                      </div>

                      {menuItem.submenu && isOpen && (
                        <CollapsibleContent className="CollapsibleContent pt-1">
                          <ul className="ms-8 border-l-2 border-grey-400">
                            {menuItem.submenuItems.map((subMenuItem, index) => (
                              <div key={index} className="ps-2">
                                <li
                                  className={`py-2 text-sm ${
                                    subMenuItem.active
                                      ? "text-[#7888fc] bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                      : "text-[#5b5b5b]"
                                  } flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md duration-300 ${
                                    isOpen && "hover:ps-2"
                                  }`}
                                >
                                  <span
                                    className={`text-base text-start flex-1 ps-8`}
                                  >
                                    {subMenuItem.title}
                                  </span>
                                </li>
                              </div>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      )}
                      <TooltipContent
                        className={`${isOpen ? "hidden" : "block"} ms-1`}
                        side="right"
                      >
                        <p>{menuItem.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Collapsible>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
