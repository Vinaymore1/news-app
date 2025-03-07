import React from 'react';
import { NewsCard } from './NewsCard';
import { Article  } from '../types/news';

interface NewsGridProps {
  articles: Article[];
  category: string;
}
export const NewsGrid: React.FC<NewsGridProps> = ({ articles , category }) => {
  const filteredArticles = articles.filter(
    (article) => article.imageUrl && article.imageUrl !== "No image available" 
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <NewsCard key={article.url} article={article} category={category}/>
      ))}
    </div>
  );
};