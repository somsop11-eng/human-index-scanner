/* eslint-disable react/prop-types */
const ResultCard = ({ data, lang }) => {
    if (!data) return null;

    const t = {
        en: { summary: "Analysis Summary", keywords: "Related Keywords", confidence: "Confidence: AI Analysis" },
        ko: { summary: "분석 요약", keywords: "관련 키워드", confidence: "신뢰도: AI 분석" }
    };
    const text = t[lang] || t.en;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-terminal-gray rounded-xl border border-gray-800 shadow-2xl mt-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className={`text-3xl font-bold ${data.score >= 50 ? 'text-neon-green' : 'text-neon-red'} uppercase tracking-wider`}>
                    {data.status}
                </h2>
                <span className="text-gray-400 font-mono text-sm mt-2 md:mt-0">
                    {text.confidence}
                </span>
            </div>

            <div className="space-y-4 mb-6 text-left">
                <h3 className="text-gray-300 font-semibold border-b border-gray-700 pb-2">{text.summary}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {data.summary.map((point, index) => (
                        <li key={index} className="leading-relaxed">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-500 mb-2">{text.keywords}:</p>
                <div className="flex flex-wrap gap-2">
                    {data.related_keywords.map((tag, index) => (
                        <span key={index} className="px-3 py-1 text-xs font-mono bg-deep-black text-neon-green border border-gray-700 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
