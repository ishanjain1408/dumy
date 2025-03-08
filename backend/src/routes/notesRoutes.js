"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../config/db");
const router = express_1.default.Router();
// ✅ Get all notes
router.get("/", (req, res) => {
    db_1.db.query("SELECT * FROM notes", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
// ✅ Add a new note
router.post("/", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title & content required" });
    }
    const query = "INSERT INTO notes (title, content) VALUES (?, ?)";
    db_1.db.query(query, [title, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const insertResult = result;
        res.status(201).json({ id: insertResult.insertId, title, content });
    });
});
// ✅ Update a note
router.put("/:id", (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const query = "UPDATE notes SET title=?, content=? WHERE id=?";
    db_1.db.query(query, [title, content, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Note updated successfully" });
    });
});
// ✅ Delete a note
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db_1.db.query("DELETE FROM notes WHERE id=?", [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Note deleted successfully" });
    });
});
exports.default = router;
