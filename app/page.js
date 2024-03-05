"use client"

import { useState } from "react"

import Header from "@/components/header"
import MainContent from "@/components/main-content"
import Sidebar from "@/components/sidebar"

export default function Home() {
  const [isOpen, setIsOpen] = useState(true)
  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <MainContent isOpen={isOpen} />
      </div>
    </div>
  )
}
