import Link from "next/link"
import HeaderDropdown from "@/components/header-dropdown"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/theme-btn"

const Header = ({ toggleSidebar, isOpen }) => {
  return (
    <header className="my-2 me-2 bg-background rounded-3xl shadow-basic flex flex-wrap sm:justify-start sm:flex-nowrap text-sm py-4">
      <nav className="mx-auto px-6 flex flex-wrap basis-full items-center justify-between">
        <Link
          className="sm:order-1 flex items-center text-xl font-semibold"
          href="#"
        >
          <button onClick={toggleSidebar} className="hidden sm:block me-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transform transition duration-300 ease-in-out ${
                isOpen ? "" : "rotate-180"
              }`}
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          Brand
        </Link>
        <div className="sm:order-3 flex items-center gap-x-2">
          <div className="sm:hidden flex item-center">
            <HeaderDropdown />
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
        <div className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2">
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <Link
              className="font-medium text-blue-500"
              href="#"
              aria-current="page"
            >
              Link 1
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 "
              href="#"
            >
              Link 2
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 "
              href="#"
            >
              Link 3
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 "
              href="#"
            >
              Link 4
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
