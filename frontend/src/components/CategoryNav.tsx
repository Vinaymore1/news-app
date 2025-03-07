import type React from "react";
import { Link, useLocation } from "react-router-dom";

const categories = ["news", "business", "innovation", "culture", "future-planet", "travel", "arts"];

export const CategoryNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-secondary shadow-sm">
      <div className="container mx-auto px-4 py-2 overflow-x-auto">
        <ul className="flex space-x-1 md:space-x-6 justify-start md:justify-center whitespace-nowrap">
          {categories.map((category) => {
            const displayCategory = ["news", "News"].includes(category) ? "Breaking" : category.replace("-", " ");
            const path = `/${category}`;
            const isActive = currentPath === path;

            return (
              <li key={category}>
                <Link
                  to={path}
                  className={`
                    px-3 py-2 rounded-md inline-block capitalize transition-colors
                    ${isActive ? "bg-secondary-foreground/10 font-medium" : "hover:bg-secondary-foreground/5"}
                  `}
                >
                  {displayCategory}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

