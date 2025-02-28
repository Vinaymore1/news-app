import React from 'react';
import { useLocation } from 'react-router-dom';
import { NewsGrid } from '../components/NewsGrid';
import { useNews } from '../hooks/useNews';

export const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const { articles, loading, error } = useNews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{query}"</h1>
      <NewsGrid articles={filteredArticles} />
    </div>
  );
};