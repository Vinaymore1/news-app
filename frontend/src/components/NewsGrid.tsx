import React from 'react';
import { NewsCard } from './NewsCard';
import { Article } from '../types/news';

interface NewsGridProps {
  articles: Article[];
}
export const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
  const filteredArticles = articles.filter(
    (article) => article.imageUrl && article.imageUrl !== "No image available"
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </div>
  );
};