/* eslint-disable react/prop-types */
import { useState } from 'react';

const SearchForm = ({ onSearch, isLoading, lang }) => {
    const [input, setInput] = useState("");

    const t = {
        en: { placeholder: "Enter Asset (e.g. Bitcoin, Tesla)...", button: "SCAN" },
        ko: { placeholder: "자산 입력 (예: 비트코인, 테슬라)...", button: "스캔" }
    };
    const text = t[lang] || t.en;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSearch(input);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8 relative">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-green to-neon-red rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex">
                    <input
                        type="text"
                        className="block w-full p-4 text-sm text-white bg-deep-black border border-terminal-gray rounded-l-lg focus:ring-neon-green focus:border-neon-green placeholder-gray-500 focus:outline-none"
                        placeholder={text.placeholder}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        maxLength={50}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-4 text-sm font-bold text-black bg-neon-green rounded-r-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "SCAN"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;
