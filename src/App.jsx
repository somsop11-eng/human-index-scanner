import { useState } from 'react';
import GaugeChart from './components/GaugeChart';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';

function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'ko'
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ko' : 'en');
  };

  const handleSearch = async (keyword) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/.netlify/functions/analyze', {
        method: 'POST',
        body: JSON.stringify({ keyword, lang }), // Send lang to backend
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data);
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Text Resources
  const t = {
    en: {
      title: "HUMAN INDEX",
      subtitle: "Market Sentiment Scanner",
      scanning: "SCANNING MARKET DATA...",
      accessing: "Accessing Neural Networks",
      footer: "© 2024 Human Index. Powered by Gemini AI."
    },
    ko: {
      title: "인간 지표 판독기",
      subtitle: "AI 기반 시장 심리 분석",
      scanning: "시장 데이터를 스캔 중입니다...",
      accessing: "신경망 데이터에 접근 중",
      footer: "© 2024 휴먼 인덱스. Powered by Gemini AI."
    }
  };

  const text = t[lang];

  return (
    <div className="min-h-screen bg-deep-black flex flex-col items-center justify-center p-4 relative">
      {/* Language Toggle */}
      <button
        onClick={toggleLang}
        className="absolute top-4 right-4 px-3 py-1 bg-terminal-gray border border-gray-700 rounded text-xs font-mono text-neon-green hover:bg-gray-800 transition-colors z-50"
      >
        {lang === 'en' ? '🇰🇷 KR' : '🇺🇸 EN'}
      </button>

      {/* Header */}
      <header className="mb-12 text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2 drop-shadow-lg">
          {text.title}
        </h1>
        <p className="text-neon-green font-mono tracking-[0.2em] text-sm uppercase">
          {text.subtitle}
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl text-center">
        <SearchForm onSearch={handleSearch} isLoading={loading} lang={lang} />

        {error && (
          <div className="p-4 mb-4 text-sm text-neon-red border border-neon-red rounded bg-red-900/10" role="alert">
            <span className="font-bold">Error:</span> {error}
            {result?.available_models && (
              <div className="mt-2 text-xs text-gray-400">
                <p className="font-bold text-white">Available Models (Try one of these):</p>
                <div className="mt-1 break-all font-mono">{result.available_models}</div>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center py-12 animate-pulse">
            <div className="text-neon-green font-mono text-xl">{text.scanning}</div>
            <div className="text-gray-500 text-sm mt-2">{text.accessing}</div>
          </div>
        )}

        {result && !loading && (
          <div className="animate-fade-in transition-all duration-500">
            <GaugeChart score={result.score} />
            <ResultCard data={result} lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-gray-600 text-xs font-mono">
        {text.footer}
      </footer>
    </div>
  );
}

export default App;
