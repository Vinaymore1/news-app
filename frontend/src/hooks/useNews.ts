import { useState, useEffect } from 'react';
import axios from 'axios';
import { Article, NewsResponse } from '../types/news';


const BASE_API_URL = 'https://news-app-2-cwaa.onrender.com/api';

export const useNews = (category?: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const endpoint = category && category !== 'news' 
          ? `${BASE_API_URL}/category/${category}`
          : `${BASE_API_URL}/category/news`;
        
        const response = await axios.get<NewsResponse>(endpoint);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch ${category || 'news'}`);
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchNews();
  }, [category]);

  return { articles, loading, error };
};


// // src/hooks/useNews.ts
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Article, NewsResponse } from '../types/news';

// const API_URL = 'http://localhost:5000/api/category/news';

// export const useNews = (category?: string) => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get<NewsResponse>(API_URL, {
//           params: { category },
//         });
//         setArticles(response.data.articles);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch news');
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, [category]);

//   return { articles, loading, error };
// };