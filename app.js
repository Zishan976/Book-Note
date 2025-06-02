import express from "express";
import axios from "axios";
import pg from "pg";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// async function searchBooks(query) {
//   try {
//     const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
//       query
//     )}`;
//     const response = await axios.get(url);
//   } catch (error) {
//     console.error("Error fetching book data:", error.message);
//   }
// }

const db = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "book_admin",
  password: "zishan",
  port: 5432,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books;");
    const books = result.rows;
    console.log("Books fetched successfully:", books);
    res.render("index.ejs", { books: books });
  } catch (error) {
    console.error("Error in / route:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/book/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    const book = result.rows[0];
    res.render("book.ejs", { book: book });
  } catch (error) {
    console.error("Error fetching book:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/admin", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books;");
    const books = result.rows;
    res.render("admin.ejs", { books: books });
  } catch (error) {
    console.error("Error fetching books for admin:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/admin", async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const olid = req.body.olid;
  const summary = req.body.summary;
  const rating = Number(req.body.rating);
  try {
    await db.query(
      "INSERT INTO books (olid, title, author, summary, rating) VALUES ($1, $2, $3, $4, $5)",
      [olid, title, author, summary, rating]
    );
    console.log("Book added successfully");
    res.redirect("/admin");
  } catch (error) {
    console.error("Error adding book:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/admin/update", async (req, res) => {
  const id = Number(req.body.id);
  const title = req.body.title;
  const author = req.body.author;
  const olid = req.body.olid;
  const summary = req.body.summary;
  const rating = Number(req.body.rating);
  try {
    await db.query(
      "UPDATE books SET olid = $1, title = $2, author = $3, summary = $4, rating = $5 WHERE id = $6",
      [olid, title, author, summary, rating, id]
    );
    console.log("Book updated successfully");
    res.redirect("/admin");
  } catch (error) {
    console.error("Error updating book:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/admin/delete", async (req, res) => {
  const id = Number(req.body.id);
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    console.log("Book deleted successfully");
    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting book:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
