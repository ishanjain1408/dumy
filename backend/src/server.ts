import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { db } from "./config/db"; // Import MySQL connection

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Fetch all notes
app.get("/notes", (req, res) => {
    db.query("SELECT * FROM notes", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
 
// ✅ Add a new note
app.post("/notes", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title & content required" });
    }

    const query = "INSERT INTO notes (title, content) VALUES (?, ?)";
    db.query(query, [title, content], (err, result: any) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, title, content });
    });
});

// ✅ Update a note
app.put("/notes/:id", (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    const query = "UPDATE notes SET title=?, content=? WHERE id=?";
    db.query(query, [title, content, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Note updated successfully" });
    });
});

// ✅ Delete a note
app.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM notes WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Note deleted successfully" });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
