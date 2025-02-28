import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Article } from '../types/news';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  article: Article;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} className="w-full h-48 object-cover mb-4 rounded-md" />
        <p className="text-muted-foreground">{article.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{new Date(article.timestamp).toLocaleDateString()}</span>
        <Button asChild>
          <Link to={`/article/${encodeURIComponent(article.url)}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};


