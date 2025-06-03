# Book Notes Website

This is a personal book notes and review website created by Khalilur Rahman. The website displays a collection of books that have been read, along with detailed notes and ratings for each book. It is designed to be updated regularly as more books are read.

## Features

- View a list of books with cover images, titles, authors, reading dates, ratings, and summaries.
- Click on a book to see detailed information.
- Admin interface to add, update, and delete books from the collection.
- Uses Open Library IDs (OLID) to fetch book cover images.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS templating engine
- Axios (for potential external API calls)
- dotenv for environment variable management

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up a PostgreSQL database and configure the connection string in a `.env` file as `DATABASE_URL`.
4. Run the server:
   ```
   node app.js
   ```
5. Open your browser and navigate to `https://book-note-9jgn.onrender.com` to view the website.

## License

This project is licensed under the MIT License.
