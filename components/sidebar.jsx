import { MdExpandMore } from "react-icons/md"
import styles from "./sidebar.module.css"

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

import { Menus } from "@/lib/sidebar-items"

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`hidden sm:block px-2 py-6 ${
        isOpen ? "w-64" : "w-20"
      } h-[calc(100svh-1rem)] bg-background relative duration-300 my-2 ms-2 rounded-3xl shadow-basic`}
    >
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:hover:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
        {Menus.map((menu, index) => (
          <div key={index} className="px-1">
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
                                <MdExpandMore
                                  className={`text-2xl ms-auto me-2 ${styles.iconRotate}`}
                                />
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
                        <CollapsibleContent
                          className={`${styles.CollapsibleContent} pt-1`}
                        >
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
                        {!menuItem.submenu ? (
                          <p className="cursor-pointer">{menuItem.title}</p>
                        ) : (
                          <ul>
                            {menuItem.submenuItems.map((subMenuItem, index) => (
                              <div key={index}>
                                <li
                                  onClick={() => setIsDropdownOpen(false)}
                                  className={`py-2 flex items-center gap-x-4 cursor-pointer`}
                                >
                                  <span>{subMenuItem.title}</span>
                                </li>
                              </div>
                            ))}
                          </ul>
                        )}
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
