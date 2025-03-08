"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.getNotes = void 0;
const db_1 = require("../config/db");
const getNotes = (req, res) => {
    db_1.db.query('SELECT * FROM notes', (err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
exports.getNotes = getNotes;
const createNote = (req, res) => {
    const { title, content } = req.body;
    const newNote = { title, content };
    db_1.db.query('INSERT INTO notes SET ?', newNote, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Note created successfully' });
    });
};
exports.createNote = createNote;
