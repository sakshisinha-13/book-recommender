from flask import Flask, request, jsonify
import pickle
import numpy as np
import os
from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

popular_df = pickle.load(open(os.path.join(MODEL_DIR, "popular.pkl"), "rb"))
pt = pickle.load(open(os.path.join(MODEL_DIR, "pt.pkl"), "rb"))
books = pickle.load(open(os.path.join(MODEL_DIR, "books.pkl"), "rb"))
similarity_scores = pickle.load(open(os.path.join(MODEL_DIR, "similarity_scores.pkl"), "rb"))

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"status": "ok", "message": "Book Recommender API is running"})

@app.route("/api/popular", methods=["GET"])
def get_popular():
    try:
        n = int(request.args.get("n", 50))
        data = []
        for _, row in popular_df.head(n).iterrows():
            data.append({
                "title": row.get("Book-Title"),
                "author": row.get("Book-Author"),
                "image": row.get("Image-URL-M"),
                "num_ratings": int(row.get("num_ratings", 0)),
                "avg_rating": float(row.get("avg_rating", 0))
            })
        return jsonify({"popular": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        user_input = data.get("title", "").strip()
        if not user_input:
            return jsonify({"error": "Please provide a book title."}), 400
        matches = [i for i, title in enumerate(pt.index) if user_input.lower() in title.lower()]
        if not matches:
            return jsonify({"error": "Book not found in dataset."}), 404
        index = matches[0]
        similar_items = sorted(
            list(enumerate(similarity_scores[index])),
            key=lambda x: x[1],
            reverse=True
        )[1:6]
        recommendations = []
        for i, score in similar_items:
            temp_df = books[books["Book-Title"] == pt.index[i]].drop_duplicates("Book-Title")
            if not temp_df.empty:
                book_info = temp_df.iloc[0]
                recommendations.append({
                    "title": book_info.get("Book-Title"),
                    "author": book_info.get("Book-Author"),
                    "image": book_info.get("Image-URL-M"),
                    "score": float(score)
                })
        return jsonify({"query": user_input, "recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
