import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">NewsHub</Link>
        <SearchBar />
      </div>
    </header>
  );
};
