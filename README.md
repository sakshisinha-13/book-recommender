# Book Recommender System

This project is a full-stack Book Recommender System built using Python (Flask) for the backend and React.js for the frontend.
It provides book recommendations using collaborative filtering and displays the most popular books based on user ratings.

---

## Features

- Popularity-based recommender showing books with high average ratings and number of reviews.
- Collaborative filtering-based recommender using cosine similarity on user-book ratings.
- Flask backend with API endpoints for serving recommendations and popular books.
- Model data stored as `.pkl` files for fast loading and prediction.

---

## Tech Stack

- Python
- Flask
- Pandas
- NumPy
- scikit-learn
- Pickle
- React
- Tailwind CSS

---

## Project Structure

```

BookRecommenderSystem/
│
├── backend/
│   ├── app.py                # Flask backend and API
│   ├── requirements.txt      # Python dependencies
│   ├── model/
│   │   ├── popular.pkl
│   │   ├── pt.pkl
│   │   ├── books.pkl
│   │   └── similarity_scores.pkl
│   ├── data/
│   │   ├── books.csv
│   │   ├── ratings.csv
│   │   └── users.csv

````

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/BookRecommenderSystem.git
   cd BookRecommenderSystem/backend
````

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask application:

   ```bash
   python app.py
   ```

4. The backend will start on:

   ```
   http://127.0.0.1:5000/
   ```

---

## Datasets Used

The project uses three CSV files:

* `books.csv` – Contains book details such as title, author, and image URLs.
* `ratings.csv` – Contains user ratings for books.
* `users.csv` – Contains user information such as location and age.

Dataset size:

* Books: 271,000+
* Ratings: 1.1 million+
* Users: 278,000+

---

## Model Details

1. **Popularity-Based Recommender**

   * Calculates the number of ratings and average rating per book.
   * Displays top books with the highest popularity score.

2. **Collaborative Filtering**

   * Builds a pivot table of users vs books.
   * Uses cosine similarity to find books similar to a given book.

---

## Example Recommendation

**Input:** `1984`
**Output:**

1. Animal Farm — George Orwell
2. The Handmaid’s Tale — Margaret Atwood
3. Brave New World — Aldous Huxley
4. The Vampire Lestat — Anne Rice

---

## Author

**Sakshi Sinha**

```


