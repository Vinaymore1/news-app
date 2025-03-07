import React from 'react';
import { useParams } from 'react-router-dom';
import { NewsGrid } from '../components/NewsGrid';
import { useNews } from '../hooks/useNews';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>(); 
  const categoryName = category?.toLowerCase() === 'news' ? 'Breaking' : category ?? '';
  const { articles, loading, error } = useNews(category);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  if (articles.length === 0) return <div className="container mx-auto px-4 py-8">No articles found for {categoryName}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 capitalize">{categoryName} News</h1>
      <NewsGrid articles={articles} category={categoryName} />
    </div>
  );
};
