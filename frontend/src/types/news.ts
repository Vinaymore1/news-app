export interface Article {
    title: string;
    description: string;
    author: string;
    timestamp: string;
    imageUrl: string;
    content: string;
    url: string;
    scrapedAt: string;
  }
  
  export interface NewsResponse {
    articles: Article[];
  }