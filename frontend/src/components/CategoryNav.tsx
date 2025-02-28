import React from 'react';
import { Link } from 'react-router-dom';

const categories = ['news', 'business', 'innovation', 'culture', 'future-planet', 'travel', 'arts'];

export const CategoryNav: React.FC = () => {
  return (
    <nav className="bg-secondary p-4 mb-8">
      <ul className="flex justify-center space-x-4">
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/${category}`} className="text-secondary-foreground hover:underline capitalize">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};