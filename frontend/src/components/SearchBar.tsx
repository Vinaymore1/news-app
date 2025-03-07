import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Search } from "lucide-react"

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 w-full"
        />
        <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
          <Search size={18} />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  )
}
