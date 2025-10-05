import React, { useState } from "react";

export default function Recommend() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: query }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Book not found");
        setRecommendations([]);
      } else {
        setRecommendations(data.recommendations || []);
      }
    } catch (err) {
      setError("Server not reachable!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d1d3d4] text-[#222] font-[Inter,system-ui,-apple-system,'Segoe_UI',Roboto,'Helvetica_Neue',Arial]">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#191970] to-[#0b3a66] text-white py-3 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold mr-3 shadow-md">
              BR
            </div>
            <span className="text-white text-lg font-semibold tracking-wide">
              Book Recommender
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="/"
              className="text-white/80 font-medium hover:text-white transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/recommend"
              className="text-white/80 font-medium hover:text-white transition-colors duration-300"
            >
              Recommend
            </a>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="w-full mt-16 text-center px-6 sm:px-10 md:px-16">
        <h1 className="text-3xl font-bold text-[#191970] mb-6">
          Find Similar Books
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="text"
            placeholder="Enter a book title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 w-72 sm:w-80 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#191970] transition-all duration-200 shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#191970] text-white font-medium rounded-lg hover:bg-[#0b3a66] transition-all duration-300 shadow-md"
          >
            {loading ? "Searching..." : "Recommend"}
          </button>
        </form>

        {error && (
          <h4 className="text-red-600 mt-5 font-medium text-sm">{error}</h4>
        )}

        {/* Recommendations */}
        <div className="mt-12 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {recommendations.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-gray-800 font-semibold truncate">
                  {book.title}
                </p>
                <h4 className="text-[#191970] font-medium text-sm mt-1">
                  {book.author}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
