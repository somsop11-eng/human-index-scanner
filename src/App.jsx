import { useState } from 'react';
import GaugeChart from './components/GaugeChart';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (keyword) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/.netlify/functions/analyze', {
        method: 'POST',
        body: JSON.stringify({ keyword }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-black flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2 drop-shadow-lg">
          HUMAN INDEX
        </h1>
        <p className="text-neon-green font-mono tracking-[0.2em] text-sm uppercase">
          Market Sentiment Scanner
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl text-center">
        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="p-4 mb-4 text-sm text-neon-red border border-neon-red rounded bg-red-900/10" role="alert">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center py-12 animate-pulse">
            <div className="text-neon-green font-mono text-xl">SCANNING MARKET DATA...</div>
            <div className="text-gray-500 text-sm mt-2">Accessing Neural Networks</div>
          </div>
        )}

        {result && !loading && (
          <div className="animate-fade-in transition-all duration-500">
            <GaugeChart score={result.score} />
            <ResultCard data={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-gray-600 text-xs font-mono">
        &copy; 2024 Human Index. Powered by Gemini AI.
      </footer>
    </div>
  );
}

export default App;
