'use client'

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import DarkModeToggle from "./DarkModeToggle"
import { Home, User, FileText, Lock, Bell } from "lucide-react"
import { Dock, DockIcon, DockItem, DockLabel } from "../ui/dock"

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollY } = useScroll()

  const headerHeight = useTransform(
      scrollY,
      [0, 100],
      ["8rem", "5rem"]
  )

  const logoSize = useTransform(
      scrollY,
      [0, 100],
      ["6.5rem", "3.5rem"]
  )

  const navItems = [
    { label: "Homepage", href: "/", icon: Home },
    { label: "Student Space", href: "/student", icon: User },
    { label: "Teacher Space", href: "/teacher", icon: FileText },
    { label: "About application", href: "/about", icon: Lock },
    { label: "Contact admin", href: "/contact", icon: Bell },
  ]

  const mobileTabs = [
    { title: "Homepage", icon: <Home className='h-full w-full text-[#8B4513] dark:text-[#f4e3c8]' /> },
    { title: "Student Space", icon: <User className='h-full w-full text-[#8B4513] dark:text-[#f4e3c8]' /> },
    { title: "Teacher Space", icon: <FileText className='h-full w-full text-[#8B4513] dark:text-[#f4e3c8]' /> },
    { title: "About application", icon: <Lock className='h-full w-full text-[#8B4513] dark:text-[#f4e3c8]' /> },
    { title: "Contact admin", icon: <Bell className='h-full w-full text-[#8B4513] dark:text-[#f4e3c8]' /> },
  ]

  return (
      <>
        {/* Header */}
        <motion.header
            style={{ height: headerHeight }}
            className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-full items-center justify-between">
              <Link to="/" className="flex flex-col items-center justify-center">
                <motion.img
                    src="/logoensam.svg"
                    alt="ENSA Marrakech Logo"
                    style={{ width: logoSize, height: logoSize }}
                    className="object-contain"
                />
              </Link>

              <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className="text-sm font-medium text-neutral-600 transition-colors hover:text-[#8B4513] dark:text-neutral-400 dark:hover:text-[#8B4513] lg:text-base"
                    >
                      {item.label}
                    </Link>
                ))}
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} className="ml-4" />
              </nav>
            </div>
          </div>
        </motion.header>

        {/* Mobile Dock (Bottom)
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <Dock className="items-end pb-3">
            {mobileTabs.map((item, idx) => (
                <DockItem
                    key={idx}
                    className="aspect-square rounded-full bg-[#f4e3c8] dark:bg-[#8B4513]" // Saddle brown color palette
                >
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>{item.icon}</DockIcon>
                </DockItem>
            ))}
          </Dock>
        </div>
        */}
      </>
  )
}