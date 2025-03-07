import { useParams, useNavigate } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, User, Calendar, ArrowLeft, Share2 } from 'lucide-react';

export const ArticlePage = () => {
  const { url , category} = useParams();
  const { articles, loading, error } = useNews(category);
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card className="shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
              <div className="h-8 w-3/4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
              <div className="h-64 w-full bg-muted animate-pulse rounded mt-4"></div>
              <div className="h-4 w-full bg-muted animate-pulse rounded mt-4"></div>
              <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card className="shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-destructive text-xl font-medium">Error Loading Article</div>
              <p className="text-muted-foreground">{error}</p>
              <Button 
                onClick={() => navigate(-1)} 
                className="mt-6"
                variant="default"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Handle empty articles
  if (!articles || articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card className="shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-xl font-medium">No Articles Available</div>
              <p className="text-muted-foreground">Check back soon for new content.</p>
              <Button 
                onClick={() => navigate('/')} 
                className="mt-6"
                variant="default"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const decodedUrl = url ? decodeURIComponent(url) : '';
  const article = articles.find((a) => a.url === decodedUrl);
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card className="shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-xl font-medium">Article Not Found</div>
              <p className="text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
              <Button 
                onClick={() => navigate(-1)} 
                className="mt-6"
                variant="default"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const formattedDate = article.timestamp 
    ? new Date(article.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;
    
  const formattedTime = article.timestamp
    ? new Date(article.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Card className="overflow-hidden shadow-lg border-0">
        {article.imageUrl && (
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        )}
        
        <CardHeader className="px-6 md:px-8 pt-6 md:pt-8 pb-2">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{article.title}</h1>
        </CardHeader>
        
        <CardContent className="px-6 md:px-8 py-4">
          <div className="flex items-center gap-6 border-y border-border py-4 mb-6">
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{article.author}</span>
              </div>
            )}
            
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formattedDate}</span>
              </div>
            )}
            
            {formattedTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formattedTime}</span>
              </div>
            )}
          </div>
          
          <div className="prose max-w-none">
            {article.content ? (
              <div className="whitespace-pre-line">{article.content}</div>
            ) : (
              <p className="text-muted-foreground italic">No content available for this article.</p>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="px-6 md:px-8 py-6 border-t border-border flex justify-end">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticlePage;
