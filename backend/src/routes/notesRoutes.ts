import express, { Request, Response, Router } from "express";
import { db } from "../config/db";
import { ResultSetHeader } from "mysql2";

const router: Router = express.Router();

// ✅ Get all notes
router.get("/", (req: Request, res: Response) => {
    db.query("SELECT * FROM notes", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ✅ Add a new note
router.post("/", (req: Request, res: Response) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title & content required" });
    }

    const query = "INSERT INTO notes (title, content) VALUES (?, ?)";
    db.query(query, [title, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const insertResult = result as ResultSetHeader;
        res.status(201).json({ id: insertResult.insertId, title, content });
    });
});

// ✅ Update a note
router.put("/:id", (req: Request, res: Response) => {
    const { title, content } = req.body;
    const { id } = req.params;

    const query = "UPDATE notes SET title=?, content=? WHERE id=?";
    db.query(query, [title, content, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Note updated successfully" });
    });
});

// ✅ Delete a note
router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    db.query("DELETE FROM notes WHERE id=?", [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Note deleted successfully" });
    });
});

export default router;
