"use client"

import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const HeaderDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <DropdownMenu onOpenChange={() => setIsDropdownOpen(!isDropdownOpen)}>
      <DropdownMenuTrigger>
        <svg
          className={`${
            isDropdownOpen ? "hidden" : "block"
          } flex-shrink-0 size-4 transition duration-300 ease-in-out`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
        <svg
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } flex-shrink-0 size-4 transition duration-300 ease-in-out`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menus</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Link 1</DropdownMenuItem>
        <DropdownMenuItem>Link 2</DropdownMenuItem>
        <DropdownMenuItem>Link 3</DropdownMenuItem>
        <DropdownMenuItem>Link 4</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeaderDropdown
