import React from 'react';
import { NewsGrid } from '../components/NewsGrid';
import { useNews } from '../hooks/useNews';

export const HomePage: React.FC = () => {
  const { articles, loading, error } = useNews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Top News</h1>
      <NewsGrid articles={articles} category={'news'} />
    </div>
  );
};

