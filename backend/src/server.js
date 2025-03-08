"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db"); // Import MySQL connection
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// ✅ Fetch all notes
app.get("/notes", (req, res) => {
    db_1.db.query("SELECT * FROM notes", (err, results) => {
        if (err)
            return res.status(500).json(err);
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
    db_1.db.query(query, [title, content], (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, title, content });
    });
});
// ✅ Update a note
app.put("/notes/:id", (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const query = "UPDATE notes SET title=?, content=? WHERE id=?";
    db_1.db.query(query, [title, content, id], (err) => {
        if (err)
            return res.status(500).json(err);
        res.json({ message: "Note updated successfully" });
    });
});
// ✅ Delete a note
app.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    db_1.db.query("DELETE FROM notes WHERE id=?", [id], (err) => {
        if (err)
            return res.status(500).json(err);
        res.json({ message: "Note deleted successfully" });
    });
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
