import React, { useState } from 'react';
import { NewsGrid } from '../components/NewsGrid';
import { useNews } from '../hooks/useNews';

export const HomePage: React.FC = () => {
  const { articles, loading, error } = useNews();

  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState<string | null>(null);
  const [predicting, setPredicting] = useState(false);

  const handlePredict = async () => {
    if (!inputText.trim()) return;
    setPredicting(true);
    setPrediction(null);
  
    try {
      const encodedText = encodeURIComponent(inputText);
      const response = await fetch(`http://127.0.0.1:5001/predict?text=${encodedText}`, {
        method: 'GET',
      });
  
      const data = await response.json();
      const label = Number(data.prediction) === 0 ? 'Real' : 'Fake';
      setPrediction(label);
    } catch (err) {
      setPrediction('Error predicting news');
    } finally {
      setPredicting(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Top News</h1>

      {/* 🔍 Fake News Predictor Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 border">
        <h2 className="text-2xl font-semibold mb-4">Fake News Detector</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          placeholder="Enter news text here..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
        />
        <button
          onClick={handlePredict}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={predicting}
        >
          {predicting ? 'Predicting...' : 'Predict'}
        </button>
        {prediction && (
          <div className="mt-4 text-lg font-medium">
            Prediction: <span className={prediction === 'Real' ? 'text-green-600' : 'text-red-600'}>{prediction}</span>
          </div>
        )}
      </div>

      {/* 📰 News Grid */}
      <NewsGrid articles={articles} category={'news'} />
    </div>
  );
};

// import React from 'react';
// import { NewsGrid } from '../components/NewsGrid';
// import { useNews } from '../hooks/useNews';

// export const HomePage: React.FC = () => {
//   const { articles, loading, error } = useNews();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-4xl font-bold mb-8">Top News</h1>
//       <NewsGrid articles={articles} category={'news'} />
//     </div>
//   );
// };

