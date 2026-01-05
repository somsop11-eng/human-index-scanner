/* eslint-disable react/prop-types */
const ResultCard = ({ data }) => {
    if (!data) return null;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-terminal-gray rounded-xl border border-gray-800 shadow-2xl mt-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className={`text-3xl font-bold ${data.score >= 50 ? 'text-neon-green' : 'text-neon-red'} uppercase tracking-wider`}>
                    {data.status}
                </h2>
                <span className="text-gray-400 font-mono text-sm mt-2 md:mt-0">
                    Confidence: AI Analysis
                </span>
            </div>

            <div className="space-y-4 mb-6 text-left">
                <h3 className="text-gray-300 font-semibold border-b border-gray-700 pb-2">Analysis Summary</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {data.summary.map((point, index) => (
                        <li key={index} className="leading-relaxed">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-500 mb-2">Related Keywords:</p>
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
