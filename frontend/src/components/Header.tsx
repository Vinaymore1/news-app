import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { SearchBar } from "./SearchBar"
import { CategoryNav } from "../components/CategoryNav"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "../components/ui/button"

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle("dark", newMode)
  }

  return (
    <div className="flex flex-col">
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity">
              NewsHub
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block w-1/3 max-w-md">
              <SearchBar />
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col space-y-4 py-2">
              <SearchBar />
              <div className="flex justify-between items-center pt-2 border-t border-primary-foreground/20">
                <span className="text-sm">Toggle theme</span>
                <Button
                  onClick={toggleDarkMode}
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation - Moved outside the main header */}
      <CategoryNav />
    </div>
  )
}

