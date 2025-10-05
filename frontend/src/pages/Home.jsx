import React, { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/popular")
      .then((res) => res.json())
      .then((data) => {
        if (data.popular) setBooks(data.popular);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#222] font-[Inter,system-ui,-apple-system,'Segoe_UI',Roboto,'Helvetica_Neue',Arial]">
      <nav className="bg-gradient-to-r from-[#191970] to-[#0b3a66] text-white py-[0.6rem] shadow-[0_2px_8px_rgba(16,24,40,0.06)]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.12)] flex items-center justify-center text-white font-bold mr-3">
              BR
            </div>
            <span className="text-white text-[1.1rem] font-bold tracking-[0.2px]">Book Recommender</span>
          </div>

          <div className="flex items-center">
            <a
              href="/"
              className="text-white/90 ml-3 font-semibold no-underline hover:underline hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="/recommend"
              className="text-white/90 ml-3 font-semibold no-underline hover:underline hover:text-white transition-colors"
            >
              Recommend
            </a>
          </div>
        </div>
      </nav>

      <header className="pt-[18px] pb-[12px] bg-[linear-gradient(180deg,rgba(13,110,253,0.06),transparent)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-[24px] sm:text-[32px] mb-2 text-[#191970] font-bold">Popular Books</h1>
          <p className="text-[#6c757d] mb-0">
            Curated from reader ratings. Click a book to start exploring similar reads.
          </p>
        </div>
      </header>

      <main className="w-full mt-16 text-center px-6 sm:px-10 md:px-16">
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block w-10 h-10 border-4 border-gray-200 rounded-full border-t-[#0d6efd] animate-spin" />
            <div className="mt-3 text-[#6c757d]">Loading popular books...</div>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
            {books.map((book, index) => (
              <div key={index} className="w-full max-w-[260px]">
                <div className="rounded-[16px] bg-[#ffffff] transition-transform duration-[180ms] ease-[ease] hover:-translate-y-[6px] hover:shadow-[0_10px_30px_rgba(2,6,23,0.12)] h-full shadow-sm flex flex-col overflow-hidden">
                  <div className="h-[220px] sm:h-[160px] overflow-hidden flex items-center justify-center bg-[#7e99c2]">
                    <img
                      className="w-full h-full object-cover block"
                      src={book.image || "/placeholder-book.png"}
                      alt={book.title || "Book cover"}
                      onError={(e) => { e.currentTarget.src = "/placeholder-book.png"; }}
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h5 className="text-[16px] font-bold mb-[6px] text-[#0b2236] leading-[1.2] min-h-[42px]">
                      {book.title}
                    </h5>
                    <p className="text-[13px] text-[#6c757d] mb-[6px]">{book.author}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="inline-block bg-green-500 text-white px-2 py-0.5 rounded text-sm font-semibold">
                          {(book.avg_rating || 0).toFixed(1)}
                        </span>
                        <small className="text-[#6c757d] ml-2 text-sm">({book.num_ratings || 0})</small>
                      </div>

                      <a
                        href={`/recommend?title=${encodeURIComponent(book.title)}`}
                        className="inline-block text-sm font-semibold px-3 py-1 rounded border border-[#0d6efd] text-[#0d6efd] hover:bg-[#eaf2ff]"
                      >
                        Recommend
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
